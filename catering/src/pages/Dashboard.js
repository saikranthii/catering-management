import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-google-charts';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Register Chart.js components for the bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Simple debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), 500);
  };
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [monthlySales, setMonthlySales] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [categorySales, setCategorySales] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateDashboard = async (initialOrders = []) => {
    setLoading(true);

    let storedOrders = initialOrders;
    let backendData = null;

    try {
      const response = await fetch('http://localhost:5000/api/dashboard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (response.ok) {
        backendData = result;
        console.log('Fetched dashboard data from backend:', backendData);
      } else {
        console.error('Failed to fetch dashboard data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }

    if (!backendData) {
      storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      if (storedOrders.length === 0) {
        storedOrders = [
          {
            orderId: "001",
            orderDate: "2025-06-09T10:00:00.000Z",
            items: [
              { name: "Chicken Biryani", quantity: 2, price: 150 },
              { name: "Masala Dosa", quantity: 4, price: 50 }
            ],
            totalPrice: "500"
          },
          {
            orderId: "002",
            orderDate: "2025-06-09T11:00:00.000Z",
            items: [
              { name: "Veg Pulao", quantity: 3, price: 100 }
            ],
            totalPrice: "300"
          },
          {
            orderId: "003",
            orderDate: "2025-05-01T09:00:00.000Z",
            items: [
              { name: "Paneer Tikka", quantity: 1, price: 200 }
            ],
            totalPrice: "200"
          }
        ];
        localStorage.setItem("orders", JSON.stringify(storedOrders));
        console.log('Set sample orders in localStorage:', storedOrders);
      }
      console.log('Stored orders:', storedOrders);
    }

    setOrders(storedOrders);

    let totalOrders, totalSales, totalProfit, trend;

    if (backendData) {
      totalSales = parseFloat(backendData.totalSales);
      totalOrders = backendData.totalOrders;
      totalProfit = parseFloat(backendData.profit);
      trend = backendData.monthlyTrend;
    } else {
      totalOrders = storedOrders.length;
      console.log('Total number of orders:', totalOrders);

      totalSales = storedOrders.reduce((sum, order) => {
        const price = parseFloat(order.totalPrice || 0);
        console.log(`Order ${order.orderId}: Adding ₹${price} to total sales`);
        return sum + price;
      }, 0);
      console.log('Total sales (all orders):', totalSales);

      totalProfit = totalSales * 0.3;
      console.log('Profit (30% of total sales):', totalProfit);

      trend = Array(25).fill(0).map((_, i) => {
        const date = new Date(2024, 10, 1);
        date.setMonth(date.getMonth() + i);

        const monthOrders = storedOrders.filter(order => {
          const orderDate = new Date(order.orderDate);
          const isMatch = orderDate.getMonth() === date.getMonth() && orderDate.getFullYear() === date.getFullYear();
          return isMatch;
        });

        const sales = monthOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice || 0), 0);

        return {
          month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
          sales,
          orderCount: monthOrders.length,
        };
      });
      console.log('Monthly trend (for bar graph):', trend);
    }

    setOrderCount(totalOrders);
    setMonthlySales(totalSales);
    setProfit(totalProfit);
    setMonthlyTrend(trend);

    if (!backendData) {
      debouncedSaveDashboardData(totalSales, totalOrders, totalProfit, trend);
    }

    setLoading(false);
  };

  const saveDashboardData = async (totalSales, totalOrders, totalProfit, trend) => {
    const categorySalesForSave = orders.reduce((acc, order) => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (item.name && typeof item.name === 'string') {
            const category = item.name.split(' ')[0];
            acc[category] = (acc[category] || 0) + (item.price * item.quantity);
          }
        });
      }
      return acc;
    }, {});

    const dashboardData = {
      totalSales: totalSales.toFixed(2),
      totalOrders,
      profit: totalProfit.toFixed(2),
      categorySales: {
        labels: Object.keys(categorySalesForSave),
        values: Object.values(categorySalesForSave),
      },
      monthlyTrend: trend,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/dashboard/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dashboardData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Dashboard - Data saved to backend:', result);
      } else {
        console.error('Dashboard - Failed to save to backend:', result.message);
      }
    } catch (error) {
      console.error('Dashboard - Error saving to backend:', error);
    }
  };

  const debouncedSaveDashboardData = debounce(saveDashboardData, 500);

  useEffect(() => {
    console.log('useEffect triggered');
    const initialOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(initialOrders);
    updateDashboard(initialOrders);

    const handleOrdersUpdated = () => {
      console.log('Orders updated event received');
      updateDashboard();
    };
    window.addEventListener('ordersUpdated', handleOrdersUpdated);

    return () => {
      console.log('Cleaning up event listener');
      window.removeEventListener('ordersUpdated', handleOrdersUpdated);
    };
  }, []);

  // Compute categorySales whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      console.log('Computing categorySales from orders:', orders);
      const categories = orders.reduce((acc, order) => {
        if (order.items && Array.isArray(order.items)) {
          order.items.forEach(item => {
            if (item.name && typeof item.name === 'string' && item.price && item.quantity) {
              const category = item.name.split(' ')[0];
              acc[category] = (acc[category] || 0) + (item.price * item.quantity);
            } else {
              console.warn('Invalid item in order:', item);
            }
          });
        } else {
          console.warn('Order missing items:', order);
        }
        return acc;
      }, {});
      console.log('Computed categorySales:', categories);
      setCategorySales(categories);
    } else {
      setCategorySales({});
    }
  }, [orders]);

  const pieChartData = [
    ['Category', 'Sales'],
    ...Object.keys(categorySales).map((category, index) => [
      category,
      Object.values(categorySales)[index]
    ]),
  ];

  const pieChartOptions = {
    title: '',
    is3D: true,
    chartArea: { width: '80%', height: '80%' },
    legend: { position: 'top', alignment: 'center' },
    pieSliceText: 'percentage',
    slices: {
      0: { offset: 0.1 },
      1: { offset: 0.05 },
    },
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#2ECC71'],
  };

  const barData = {
    labels: monthlyTrend.map(m => m.month),
    datasets: [{
      label: 'Monthly Sales (₹)',
      data: monthlyTrend.map(m => m.sales),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#2ECC71',
        '#F1C40F', '#3498DB', '#9B59B6', '#E67E22', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#E74C3C', '#2ECC71', '#F1C40F', '#3498DB', '#9B59B6', '#E67E22', '#FF6384'
      ],
      borderColor: [
        '#E74C3C', '#2ECC71', '#F1C40F', '#3498DB', '#9B59B6', '#E67E22', '#FF6384', '#36A2EB',
        '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#2ECC71', '#F1C40F', '#3498DB',
        '#9B59B6', '#E67E22', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C'
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        '#E55A74', '#2A92DB', '#E5B846', '#3AB0B0', '#8956EF', '#E58F30', '#D64764', '#2692CB',
        '#E5A846', '#3AB0B0', '#8956EF', '#E58F30', '#E55A74', '#2A92DB', '#E5B846', '#3AB0B0',
        '#8956EF', '#E58F30', '#D64764', '#2692CB', '#E5A846', '#3AB0B0', '#8956EF', '#E58F30', '#E55A74'
      ],
      hoverBorderWidth: 4,
      inflateAmount: 4,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'Months' },
        ticks: { maxRotation: 45, minRotation: 45, font: { size: 10 } },
      },
      y: {
        title: { display: true, text: 'Sales (₹)' },
        suggestedMax: 60000,
        ticks: {
          callback: function(value) {
            if (value % 5000 === 0 && value <= 60000) {
              return '₹' + value.toLocaleString();
            }
            return null;
          },
          beginAtZero: true,
          font: { size: 12 },
        },
      },
    },
    elements: { bar: { borderWidth: 2, inflateAmount: 4 } },
    hover: { mode: 'index', intersect: false, animationDuration: 400 },
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const downloadExcel = () => {
    const currentTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const summaryData = [
      { Metric: 'Total Sales', Value: `₹${monthlySales.toFixed(2)}`, Notes: 'Sum of all orders' },
      { Metric: 'Total Orders', Value: orderCount, Notes: 'Total number of orders placed' },
      { Metric: 'Profit', Value: `₹${profit.toFixed(2)}`, Notes: '30% of total sales' },
      { Metric: 'Report Generated At', Value: currentTimestamp, Notes: `Generated on ${currentTimestamp}` },
    ];
    console.log('Summary Data for Excel:', summaryData);

    const categorySalesData = Object.keys(categorySales).map((category, index) => ({
      Category: category,
      Sales: `₹${Object.values(categorySales)[index].toFixed(2)}`,
    }));
    if (categorySalesData.length === 0) {
      console.warn('No Category-wise Sales data available.');
      categorySalesData.push({ Category: 'No Data', Sales: 'N/A' });
    }
    console.log('Category Sales Data for Excel:', categorySalesData);

    const monthlyTrendData = monthlyTrend.map(trend => ({
      Month: trend.month,
      Sales: `₹${trend.sales.toFixed(2)}`,
      'Order Count': trend.orderCount,
    }));
    if (monthlyTrendData.length === 0) {
      console.warn('No Monthly Sales Trend data available.');
      monthlyTrendData.push({ Month: 'No Data', Sales: 'N/A', 'Order Count': 'N/A' });
    }
    console.log('Monthly Trend Data for Excel:', monthlyTrendData);

    const orderDetailsData = orders.map(order => {
      const itemsText = order.items.map(item => 
        `${item.name}: ${item.quantity} x ₹${item.price.toFixed(2)} = ₹${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');
      return {
        'Order ID': order.orderId,
        'Date': new Date(order.orderDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Items': itemsText || 'No Items',
        'Total Price': `₹${parseFloat(order.totalPrice).toFixed(2)}`,
      };
    });
    if (orderDetailsData.length === 0) {
      console.warn('No Order Details data available.');
      orderDetailsData.push({ 'Order ID': 'No Data', 'Date': 'N/A', 'Items': 'N/A', 'Total Price': 'N/A' });
    }
    console.log('Order Details Data for Excel:', orderDetailsData);

    const workbook = XLSX.utils.book_new();
    
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');
    
    const categoryWorksheet = XLSX.utils.json_to_sheet(categorySalesData);
    XLSX.utils.book_append_sheet(workbook, categoryWorksheet, 'Category Sales');
    
    const trendWorksheet = XLSX.utils.json_to_sheet(monthlyTrendData);
    XLSX.utils.book_append_sheet(workbook, trendWorksheet, 'Monthly Trend');
    
    const orderDetailsWorksheet = XLSX.utils.json_to_sheet(orderDetailsData);
    XLSX.utils.book_append_sheet(workbook, orderDetailsWorksheet, 'Order Details');
    
    XLSX.writeFile(workbook, 'Detailed_Dashboard_Report.xlsx');
    setIsDropdownOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    let currentY = 15;

    doc.text('Detailed Dashboard Report', 14, currentY);
    currentY += 5;
    const currentTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    doc.setFontSize(8);
    doc.text(`Generated on: ${currentTimestamp}`, 14, currentY);
    currentY += 10;

    doc.setFontSize(12);
    doc.text('Summary', 14, currentY);
    currentY += 5;
    autoTable(doc, {
      startY: currentY,
      margin: { top: 20, right: 10, bottom: 10, left: 10 },
      head: [['Metric', 'Value', 'Notes']],
      body: [
        ['Total Sales', `₹${monthlySales.toFixed(2)}`, 'Sum of all orders'],
        ['Total Orders', orderCount.toString(), 'Total number of orders placed'],
        ['Profit', `₹${profit.toFixed(2)}`, '30% of total sales'],
        ['Report Generated At', currentTimestamp, `Generated on ${currentTimestamp}`],
      ],
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        valign: 'middle',
        halign: 'left',
        lineWidth: 0.1,
        lineColor: [50, 50, 50]
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 80 },
        2: { cellWidth: 137 }
      },
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineWidth: 0.1,
      tableLineColor: [50, 50, 50]
    });

    currentY = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(12);
    doc.text('Category-wise Sales', 14, currentY);
    currentY += 5;
    const categorySalesBody = Object.keys(categorySales).length > 0
      ? Object.keys(categorySales).map((category, index) => [
          category,
          `₹${Object.values(categorySales)[index].toFixed(2)}`
        ])
      : [['No Data', 'N/A']];
    autoTable(doc, {
      startY: currentY,
      margin: { top: 20, right: 10, bottom: 10, left: 10 },
      head: [['Category', 'Sales']],
      body: categorySalesBody,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        valign: 'middle',
        halign: 'left',
        lineWidth: 0.1,
        lineColor: [50, 50, 50]
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 177 }
      },
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineWidth: 0.1,
      tableLineColor: [50, 50, 50]
    });

    currentY = doc.lastAutoTable.finalY + 15;

    if (currentY > 150) {
      doc.addPage();
      currentY = 15;
    }
    doc.setFontSize(12);
    doc.text('Monthly Sales Trend', 14, currentY);
    currentY += 5;
    const monthlyTrendBody = monthlyTrend.length > 0
      ? monthlyTrend.map(trend => [
          trend.month,
          `₹${trend.sales.toFixed(2)}`,
          trend.orderCount
        ])
      : [['No Data', 'N/A', 'N/A']];
    autoTable(doc, {
      startY: currentY,
      margin: { top: 20, right: 10, bottom: 10, left: 10 },
      head: [['Month', 'Sales', 'Order Count']],
      body: monthlyTrendBody,
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: 'linebreak',
        valign: 'middle',
        halign: 'left',
        lineWidth: 0.1,
        lineColor: [50, 50, 50]
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 100 },
        2: { cellWidth: 97 }
      },
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineWidth: 0.1,
      tableLineColor: [50, 50, 50]
    });

    currentY = doc.lastAutoTable.finalY + 15;

    if (currentY > 100) {
      doc.addPage();
      currentY = 15;
    }
    doc.setFontSize(12);
    doc.text('Order Details', 14, currentY);
    currentY += 5;

    if (orders.length === 0) {
      autoTable(doc, {
        startY: currentY,
        margin: { top: 20, right: 10, bottom: 10, left: 10 },
        head: [['Order ID', 'Date', 'Items', 'Total Price']],
        body: [['No Data', 'N/A', 'N/A', 'N/A']],
        styles: {
          fontSize: 8,
          cellPadding: 3,
          overflow: 'linebreak',
          valign: 'middle',
          halign: 'left',
          lineWidth: 0.1,
          lineColor: [50, 50, 50]
        },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 40 },
          2: { cellWidth: 167 },
          3: { cellWidth: 40 }
        },
        headStyles: {
          fillColor: [50, 50, 50],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        tableLineWidth: 0.1,
        tableLineColor: [50, 50, 50]
      });
    } else {
      orders.forEach((order, index) => {
        const itemsText = order.items.map(item => 
          `${item.name}: ${item.quantity} x ₹${item.price.toFixed(2)} = ₹${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        autoTable(doc, {
          startY: currentY,
          margin: { top: 20, right: 10, bottom: 10, left: 10 },
          head: [['Order ID', 'Date', 'Items', 'Total Price']],
          body: [[
            order.orderId,
            new Date(order.orderDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            itemsText || 'No Items',
            `₹${parseFloat(order.totalPrice).toFixed(2)}`
          ]],
          styles: {
            fontSize: 8,
            cellPadding: 3,
            overflow: 'linebreak',
            valign: 'middle',
            halign: 'left',
            lineWidth: 0.1,
            lineColor: [50, 50, 50]
          },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 40 },
            2: { cellWidth: 167 },
            3: { cellWidth: 40 }
          },
          headStyles: {
            fillColor: [50, 50, 50],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center'
          },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          tableLineWidth: 0.1,
          tableLineColor: [50, 50, 50]
        });

        currentY = doc.lastAutoTable.finalY + 5;
        if (index < orders.length - 1 && currentY > 150) {
          doc.addPage();
          currentY = 15;
        }
      });
    }

    doc.save('Detailed_Dashboard_Report.pdf');
    setIsDropdownOpen(false);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header-container">
          <h1>Dashboard</h1>
          <div className="download-report">
            <button className="download-button" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faDownload} /> Download Report
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={downloadExcel}>Download as Excel File</button>
                <button onClick={downloadPDF}>Download as PDF File</button>
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="no-data">
            <FontAwesomeIcon icon={faFaceMeh} className="no-data-icon" />
            No Orders Available
          </p>
        ) : (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p>₹{monthlySales.toFixed(2)}</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{orderCount}</p>
              </div>
              <div className="stat-card">
                <h3>Profit</h3>
                <p className="profit">₹{profit.toFixed(2)}</p>
              </div>
            </div>
            <div className="charts-grid">
              <div className="chart-card pie-chart">
                <h3>Category-wise Sales (3D Pie)</h3>
                {pieChartData.length > 1 ? (
                  <Chart
                    chartType="PieChart"
                    data={pieChartData}
                    options={pieChartOptions}
                    width="100%"
                    height="250px"
                  />
                ) : (
                  <p>No Data Available</p>
                )}
              </div>
              <div className="chart-card bar-chart">
                <h3>Monthly Sales Trend (3D Bar)</h3>
                <div className="bar-chart-scroll">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
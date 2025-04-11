import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Simple debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [monthlySales, setMonthlySales] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [profit, setProfit] = useState(0);
  const [monthlyTrend, setMonthlyTrend] = useState([]);

  const updateDashboard = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log('Stored orders:', storedOrders);
    setOrders(storedOrders);

    const totalOrders = storedOrders.length;
    console.log('Total number of orders:', totalOrders);

    const totalSales = storedOrders.reduce((sum, order) => {
      const price = parseFloat(order.totalPrice || 0);
      console.log(`Order ${order.orderId}: Adding ₹${price} to total sales`);
      return sum + price;
    }, 0);
    console.log('Total sales (all orders):', totalSales);

    const totalProfit = totalSales * 0.3;
    console.log('Profit (30% of total sales):', totalProfit);

    // Generate data for all 12 months of 2025
    const trend = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2025, i, 1); // January to December 2025
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      // Filter orders for this specific month and year
      const monthOrders = storedOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate.getMonth() === i && orderDate.getFullYear() === 2025;
      });

      const sales = monthOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice || 0), 0);

      trend.push({
        month: monthYear,
        sales,
        orderCount: monthOrders.length,
      });
    }

    console.log('Monthly trend (for bar graph):', trend);

    setOrderCount(totalOrders);
    setMonthlySales(totalSales);
    setProfit(totalProfit);
    setMonthlyTrend(trend);
    debouncedSaveDashboardData(totalSales, totalOrders, totalProfit, trend);
  };

  const saveDashboardData = async (totalSales, totalOrders, totalProfit, trend) => {
    const categorySales = orders.reduce((acc, order) => {
      order.items.forEach(item => {
        const category = item.name.split(' ')[0];
        acc[category] = (acc[category] || 0) + (item.price * item.quantity);
      });
      return acc;
    }, {});

    const dashboardData = {
      totalSales: totalSales.toFixed(2),
      totalOrders,
      profit: totalProfit.toFixed(2),
      categorySales: {
        labels: Object.keys(categorySales),
        values: Object.values(categorySales),
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
    updateDashboard();

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

  const categorySales = orders.reduce((acc, order) => {
    order.items.forEach(item => {
      const category = item.name.split(' ')[0];
      acc[category] = (acc[category] || 0) + (item.price * item.quantity);
    });
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categorySales),
    datasets: [{
      data: Object.values(categorySales),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#2ECC71'],
      borderWidth: 2,
      hoverOffset: 5,
    }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    elements: {
      arc: { borderWidth: 2, borderColor: '#fff' },
    },
    animation: { animateRotate: true, animateScale: true },
    hover: { mode: 'nearest', intersect: true, animationDuration: 400 },
  };

  const barData = {
    labels: monthlyTrend.map(m => m.month),
    datasets: [{
      label: 'Monthly Sales (₹)',
      data: monthlyTrend.map(m => m.sales),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        '#E74C3C', '#2ECC71', '#E67E22', '#3498DB', '#9B59B6', '#F1C40F'
      ],
      borderColor: [
        '#E74C3C', '#2ECC71', '#F1C40F', '#3498DB', '#9B59B6', '#E67E22',
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        '#E55A74', '#2A92DB', '#E5B846', '#3AB0B0', '#8956EF', '#E58F30',
        '#D64131', '#27B062', '#D66D12', '#2B87C9', '#8A4AA6', '#E1B400'
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
        ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 }
      },
      y: { 
        title: { display: true, text: 'Sales (₹)' },
        beginAtZero: true
      },
    },
    elements: { bar: { borderWidth: 2, inflateAmount: 4 } },
    hover: { mode: 'index', intersect: false, animationDuration: 400 },
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        {orders.length === 0 ? (
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
                <Pie data={pieData} options={pieOptions} />
              </div>
              <div className="chart-card bar-chart" style={{ overflowX: 'auto', maxWidth: '100%' }}>
  <h3>Monthly Sales Trend (3D Bar)</h3>
  <div style={{ minWidth: '800px', height: '233px' }}>
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
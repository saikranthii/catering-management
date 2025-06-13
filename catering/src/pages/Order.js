import React, { useState, useEffect } from 'react';
import './Order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateOrders = async () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log('Order.js - Fetched orders from localStorage:', storedOrders);
    setOrders(storedOrders);

    // Sync with backend
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const backendOrders = await response.json();
      if (response.ok) {
        console.log('Order.js - Fetched orders from backend:', backendOrders);
        // Optionally sync localStorage with backend if needed
        // localStorage.setItem("orders", JSON.stringify(backendOrders));
      } else {
        console.error('Order.js - Failed to fetch from backend:', backendOrders.message);
      }
    } catch (error) {
      console.error('Order.js - Error fetching from backend:', error);
    }

    // Save localStorage orders to backend
    try {
      for (const order of storedOrders) {
        await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
      }
      console.log('Order.js - Synced localStorage orders to backend');
    } catch (error) {
      console.error('Order.js - Error syncing to backend:', error);
    }
  };

  useEffect(() => {
    updateOrders();

    // Listen for updates from other components
    const handleOrdersUpdated = () => {
      console.log('Order.js - Orders updated event received');
      updateOrders();
    };
    window.addEventListener('ordersUpdated', handleOrdersUpdated);

    return () => {
      console.log('Order.js - Cleaning up event listener');
      window.removeEventListener('ordersUpdated', handleOrdersUpdated);
    };
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    console.log('Order.js - Deleted order:', orderId);
    window.dispatchEvent(new Event('ordersUpdated')); // Notify Dashboard.js

    // Sync deletion with backend
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok && result.success) {
        console.log('Order.js - Deleted order from backend:', orderId);
      } else {
        console.error('Order.js - Failed to delete from backend:', result.message);
      }
    } catch (error) {
      console.error('Order.js - Error deleting from backend:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const downloadExcel = () => {
    const worksheetData = orders.map((order, index) => ({
      'Order #': index + 1,
      'Order ID': order.orderId,
      'User': order.userName,
      'Order Date': order.orderDate,
      'Delivery Date': order.deliveryDate || 'Not specified',
      'Delivery Time': order.deliveryTime || 'Not specified',
      'Venue': order.venue || 'Not specified',
      'Payment Mode': order.paymentMode || 'COD',
      'Total Price': `₹${order.totalPrice}`,
      'Items': order.items.map(item => `${item.name} - ₹${item.price} x ${item.quantity}`).join('; ')
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'Orders_Report.xlsx');
    setIsDropdownOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text('Orders Report', 14, 15);

    const tableData = orders.map((order, index) => ({
      orderNumber: index + 1,
      orderId: order.orderId,
      user: order.userName,
      orderDate: order.orderDate,
      deliveryDate: order.deliveryDate || 'Not specified',
      deliveryTime: order.deliveryTime || 'Not specified',
      venue: order.venue || 'Not specified',
      paymentMode: order.paymentMode || 'COD',
      totalPrice: `₹${order.totalPrice}`,
      items: order.items.map((item, itemIndex) => `${itemIndex + 1}. ${item.name} - ₹${item.price} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`).join('\n')
    }));

    autoTable(doc, {
      startY: 20,
      margin: { top: 20, right: 10, bottom: 10, left: 10 },
      head: [['Order #', 'ID', 'User', 'Order Date', 'Delivery Date', 'Delivery Time', 'Venue', 'Payment', 'Total', 'Items']],
      body: tableData.map(row => [
        row.orderNumber,
        row.orderId,
        row.user,
        row.orderDate,
        row.deliveryDate,
        row.deliveryTime,
        row.venue,
        row.paymentMode,
        row.totalPrice,
        row.items
      ]),
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
        0: { cellWidth: 13 }, // Order #
        1: { cellWidth: 16 }, // ID
        2: { cellWidth: 21 }, // User (increased)
        3: { cellWidth: 22 }, // Order Date (decreased)
        4: { cellWidth: 25 }, // Delivery Date (decreased)
        5: { cellWidth: 25 }, // Delivery Time (decreased)
        6: { cellWidth: 16 }, // Venue
        7: { cellWidth: 16 }, // Payment
        8: { cellWidth: 23 }, // Total (increased)
        9: { cellWidth: 100 }  // Items
      },
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 8
      },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineWidth: 0.1,
      tableLineColor: [50, 50, 50],
      didParseCell: (data) => {
        // Ensure all columns are vertically centered in the body
        if (data.column.index >= 0 && data.column.index <= 9 && data.cell.section === 'body') {
          data.cell.styles.valign = 'middle';
        }
      }
    });

    doc.save('Orders_Report.pdf');
    setIsDropdownOpen(false);
  };

  return (
    <div className="order-page">
      <div className="order-container">
        <div className="order-header-container">
          <h1>Your Orders</h1>
          <div className="download-report">
            <button className="download-button" onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faDownload} /> Download Report
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={downloadExcel}>Download as Excel</button>
                <button onClick={downloadPDF}>Download as PDF</button>
              </div>
            )}
          </div>
        </div>
        {orders.length === 0 ? (
          <p className="no-orders">
            <FontAwesomeIcon icon={faFaceMeh} className="no-orders-icon" />
            No Orders Received
          </p>
        ) : (
          <div className="order-list">
            {orders.map((order, index) => (
              <div key={order.orderId} className="order-item">
                <div className="order-header">
                  <h2>Order #{index + 1} - {order.orderId}</h2>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteOrder(order.orderId)}
                    title="Delete Order"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <p><strong>User:</strong> {order.userName}</p>
                <p><strong>Order Date:</strong> {order.orderDate}</p>
                <p><strong>Delivery Date:</strong> {order.deliveryDate || 'Not specified'}</p>
                <p><strong>Delivery Time:</strong> {order.deliveryTime || 'Not specified'}</p>
                <p><strong>Venue:</strong> {order.venue || 'Not specified'}</p>
                <p><strong>Payment Mode:</strong> {order.paymentMode || 'COD'}</p>
                <h3>Items:</h3>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} - ₹{item.price} x ${item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p className="order-total"><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
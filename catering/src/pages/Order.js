import React, { useState, useEffect } from 'react';
import './Order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh, faTrash } from '@fortawesome/free-solid-svg-icons';

const Order = () => {
  const [orders, setOrders] = useState([]);

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

    // Listen for updates from other components (e.g., if orders are added elsewhere)
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

  return (
  
      <div className="order-page">
        <div className="order-container">
          <h1>Your Orders</h1>
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
                  <p><strong>Payment Mode:</strong> {order.paymentMode || 'COD'}</p> {/* Default to COD if not set */}
                  <h3>Items:</h3>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} - ₹{item.price} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
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
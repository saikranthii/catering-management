import React, { useState, useEffect } from 'react';
import './Cart.css';
import Navbar2 from "../components/Navbar2.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons';

// Import all images (unchanged)
import idliImage from '../images/idli.jpg';
import puriImage from '../images/puri.jpg';
import masalaDosaImage from '../images/masala-dosa.jpg';
import bondaImage from '../images/bonda.jpg';
import pohaImage from '../images/poha.jpg';
import vadaImage from '../images/vada.jpg';
import samosaImage from '../images/samosa.jpg';
import sandwichImage from '../images/sandwich.jpg';
import mirchiBajjiImage from '../images/mirchi-bajji.jpg';
import biscuitsImage from '../images/biscuits.jpg';
import chickenBiryaniImage from '../images/chicken-biryani.jpg';
import riceImage from '../images/rice.jpg';
import chickenCurryImage from '../images/chicken-curry.jpg';
import muttonCurryImage from '../images/mutton-curry.jpg';
import fishFryImage from '../images/fish-fry.jpg';
import eggCurryImage from '../images/egg-curry.jpg';
import pannerBiryaniImage from '../images/panner-biryani.jpg';
import vegPulaoImage from '../images/veg-pulao.jpg';
import sambarImage from '../images/sambar.jpg';
import dalImage from '../images/dal.jpg';
import ladiesfingerFryImage from '../images/ladiesfinger-fry.jpg';
import tomatoCurryImage from '../images/tomato-curry.jpg';
import potatoCurryImage from '../images/potato-curry.jpg';
import vegFriedRiceImage from '../images/veg-fried-rice.jpg';
import gobiManchurianImage from '../images/gobi-manchurian.jpg';
import rasmalaiImage from '../images/rasmalai.jpg';
import vanillaIcecreamImage from '../images/vanilla-icecream.jpg';
import chocolateIcecreamImage from '../images/chocolate-icecream.jpg';
import gulabJamunImage from '../images/gulab-jamun.jpg';
import cakeImage from '../images/cake.jpg';
import doubleKaMeethaImage from '../images/double-ka-meetha.jpg';
import lemonJuiceImage from '../images/lemon-juice.jpg';
import orangeJuiceImage from '../images/orange-juice.jpg';
import badamMilkImage from '../images/badam-milk.jpg';
import fruitSaladImage from '../images/fruit-salad.jpg';
import teaImage from '../images/tea.jpg';
import dinnerBiryaniImage from '../images/dinner-biryani.jpg';
import chapatiImage from '../images/chapati.jpg';
import parotaImage from '../images/parota.jpg';
import naanImage from '../images/naan.jpg';

const imageMap = {
  'Idli': idliImage,
  'Puri': puriImage,
  'Masala Dosa': masalaDosaImage,
  'Bonda': bondaImage,
  'Poha': pohaImage,
  'Vada': vadaImage,
  'Samosa': samosaImage,
  'Sandwich': sandwichImage,
  'Mirchi Bajji': mirchiBajjiImage,
  'Biscuits': biscuitsImage,
  'Chicken Biryani': chickenBiryaniImage,
  'Rice': riceImage,
  'Chicken Curry': chickenCurryImage,
  'Mutton Curry': muttonCurryImage,
  'Fish Fry': fishFryImage,
  'Egg Curry': eggCurryImage,
  'Panner Biryani': pannerBiryaniImage,
  'Veg Pulao': vegPulaoImage,
  'Sambar': sambarImage,
  'Dal': dalImage,
  'Ladiesfinger Fry': ladiesfingerFryImage,
  'Tomato Curry': tomatoCurryImage,
  'Potato Curry': potatoCurryImage,
  'Veg Fried Rice': vegFriedRiceImage,
  'Gobi Manchurian': gobiManchurianImage,
  'Rasmalai': rasmalaiImage,
  'Vanilla Icecream': vanillaIcecreamImage,
  'Chocolate Icecream': chocolateIcecreamImage,
  'Gulab Jamun': gulabJamunImage,
  'Cake': cakeImage,
  'Double Ka Meetha': doubleKaMeethaImage,
  'Lemon Juice': lemonJuiceImage,
  'Orange Juice': orangeJuiceImage,
  'Badam Milk': badamMilkImage,
  'Fruit Salad': fruitSaladImage,
  'Tea': teaImage,
  'Dinner Biryani': dinnerBiryaniImage,
  'Chapati': chapatiImage,
  'Parota': parotaImage,
  'Naan': naanImage,
};

// Default items for fallback (if localStorage is empty)
const defaultItems = [
  { id: '1', name: 'Idli', price: 30 },
  { id: '2', name: 'Puri', price: 40 },
  { id: '3', name: 'Masala Dosa', price: 60 },
  { id: '4', name: 'Bonda', price: 25 },
  { id: '5', name: 'Poha', price: 35 },
  { id: '6', name: 'Vada', price: 30 },
  { id: '7', name: 'Samosa', price: 20 },
  { id: '8', name: 'Sandwich', price: 40 },
  { id: '9', name: 'Mirchi Bajji', price: 15 },
  { id: '10', name: 'Biscuits', price: 10 },
  { id: '11', name: 'Chicken Biryani', price: 180 },
  { id: '12', name: 'Rice', price: 40 },
  { id: '13', name: 'Chicken Curry', price: 120 },
  { id: '14', name: 'Mutton Curry', price: 150 },
  { id: '15', name: 'Fish Fry', price: 100 },
  { id: '16', name: 'Egg Curry', price: 80 },
  { id: '17', name: 'Panner Biryani', price: 160 },
  { id: '18', name: 'Veg Pulao', price: 120 },
  { id: '19', name: 'Sambar', price: 50 },
  { id: '20', name: 'Dal', price: 40 },
  { id: '21', name: 'Ladiesfinger Fry', price: 60 },
  { id: '22', name: 'Tomato Curry', price: 50 },
  { id: '23', name: 'Potato Curry', price: 50 },
  { id: '24', name: 'Veg Fried Rice', price: 100 },
  { id: '25', name: 'Gobi Manchurian', price: 80 },
  { id: '26', name: 'Rasmalai', price: 30 },
  { id: '27', name: 'Vanilla Icecream', price: 40 },
  { id: '28', name: 'Chocolate Icecream', price: 45 },
  { id: '29', name: 'Gulab Jamun', price: 20 },
  { id: '30', name: 'Cake', price: 50 },
  { id: '31', name: 'Double Ka Meetha', price: 60 },
  { id: '32', name: 'Lemon Juice', price: 20 },
  { id: '33', name: 'Orange Juice', price: 30 },
  { id: '34', name: 'Badam Milk', price: 40 },
  { id: '35', name: 'Fruit Salad', price: 50 },
  { id: '36', name: 'Tea', price: 15 },
  { id: '37', name: 'Dinner Biryani', price: 180 },
  { id: '38', name: 'Chapati', price: 10 },
  { id: '39', name: 'Parota', price: 15 },
  { id: '40', name: 'Naan', price: 20 },
  { id: '41', name: 'Chicken Curry', price: 120 },
  { id: '42', name: 'Mutton Curry', price: 150 },
];

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    date: '',
    hour: '',
    minute: '',
    period: 'AM', // Default to AM
    venue: '',
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map(cartItem => {
      const storedPrice = localStorage.getItem(`price_${cartItem.id}`);
      const defaultItem = defaultItems.find(item => item.id === cartItem.id);
      return {
        ...cartItem,
        price: storedPrice !== null ? parseFloat(storedPrice) : defaultItem.price,
      };
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserRole(storedUser.role);
    }
  }, []);

  const removeFromCart = (id) => {
    const newCart = cart.filter((i) => i.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('₹', '')) : item.price;
    return acc + (price * item.quantity);
  }, 0);

  const handlePlaceOrder = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const time = `${orderDetails.hour}:${orderDetails.minute} ${orderDetails.period}`;
    const order = {
      userName: storedUser.name || storedUser.email || "Unknown User",
      items: cart,
      totalPrice: totalPrice.toFixed(2),
      orderDate: new Date().toLocaleString(),
      orderId: Date.now().toString(),
      deliveryDate: orderDetails.date,
      deliveryTime: time,
      venue: orderDetails.venue,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    alert("Your order has been placed successfully!");
    localStorage.removeItem("cart");
    setCart([]);
    setOrderDetails({ date: '', hour: '', minute: '', period: 'AM', venue: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const isOrderDetailsComplete = orderDetails.date && orderDetails.hour && orderDetails.minute && orderDetails.venue;

  // Options for hours (1-12) and minutes (00-59)
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <>
      <Navbar2 />
      <div className="cart-page">
        <div className="cart-container">
          {cart.length === 0 ? (
            <p className="empty-cart">
              <FontAwesomeIcon icon={faFaceMeh} className="empty-icon" />
              Oops! Your cart is empty.
            </p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={imageMap[item.name]} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p className="quantity-text">Quantity: {item.quantity}</p>
                    <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                      Remove from Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="order-summary">
              {userRole === "user" ? (
                <>
                  <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
                  <div className="delivery-details">
                    <h3>Delivery Details</h3>
                    <div className="form-group">
                      <label htmlFor="date">Delivery Date:</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={orderDetails.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]} // Restrict to today or future
                        required
                      />
                    </div>
                    <div className="form-group time-group">
                      <label>Delivery Time:</label>
                      <div className="time-selectors">
                        <select
                          name="hour"
                          value={orderDetails.hour}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Hour</option>
                          {hours.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                          ))}
                        </select>
                        <select
                          name="minute"
                          value={orderDetails.minute}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Minute</option>
                          {minutes.map(minute => (
                            <option key={minute} value={minute}>{minute}</option>
                          ))}
                        </select>
                        <select
                          name="period"
                          value={orderDetails.period}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="venue">Venue:</label>
                      <input
                        type="text"
                        id="venue"
                        name="venue"
                        placeholder="Enter delivery location"
                        value={orderDetails.venue}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="payment-container">
                    <label htmlFor="payment-mode">Select Payment Mode:</label>
                    <select id="payment-mode" className="payment-dropdown" onChange={(e) => e.target.value = "cod"}>
                      <option value="cod" selected>Cash on Delivery (COD)</option>
                      <option value="upi" disabled>UPI (Currently Unavailable)</option>
                      <option value="card" disabled>Credit/Debit Card (Currently Unavailable)</option>
                    </select>
                  </div>
                  <button
                    className="place-order-button"
                    onClick={handlePlaceOrder}
                    disabled={!isOrderDetailsComplete}
                  >
                    Place Order
                  </button>
                </>
              ) : (
                <h4 style={{ fontSize: '30px', fontWeight: 'bold', lineHeight: '1.5', color: '#2e4a4a',marginBottom:'20px',marginTop:'50px' }}>
                  Login to place your order !
                </h4>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
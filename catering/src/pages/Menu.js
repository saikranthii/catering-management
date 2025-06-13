import React, { useState, useEffect } from 'react';
import './Menu.css';
import Navbar2 from "../components/Navbar2.js";

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

// Base items without price and quantity (to be fetched from localStorage)
const initialItems = [
  { id: '1', category: 'Tiffins', name: 'Idli' },
  { id: '2', category: 'Tiffins', name: 'Puri' },
  { id: '3', category: 'Tiffins', name: 'Masala Dosa' },
  { id: '4', category: 'Tiffins', name: 'Bonda' },
  { id: '5', category: 'Tiffins', name: 'Poha' },
  { id: '6', category: 'Tiffins', name: 'Vada' },
  { id: '7', category: 'Snacks', name: 'Samosa' },
  { id: '8', category: 'Snacks', name: 'Sandwich' },
  { id: '9', category: 'Snacks', name: 'Mirchi Bajji' },
  { id: '10', category: 'Snacks', name: 'Biscuits' },
  { id: '11', category: 'Lunch', name: 'Chicken Biryani' },
  { id: '12', category: 'Lunch', name: 'Rice' },
  { id: '13', category: 'Lunch', name: 'Chicken Curry' },
  { id: '14', category: 'Lunch', name: 'Mutton Curry' },
  { id: '15', category: 'Lunch', name: 'Fish Fry' },
  { id: '16', category: 'Lunch', name: 'Egg Curry' },
  { id: '17', category: 'Lunch', name: 'Panner Biryani' },
  { id: '18', category: 'Lunch', name: 'Veg Pulao' },
  { id: '19', category: 'Lunch', name: 'Sambar' },
  { id: '20', category: 'Lunch', name: 'Dal' },
  { id: '21', category: 'Lunch', name: 'Ladiesfinger Fry' },
  { id: '22', category: 'Lunch', name: 'Tomato Curry' },
  { id: '23', category: 'Lunch', name: 'Potato Curry' },
  { id: '24', category: 'Lunch', name: 'Veg Fried Rice' },
  { id: '25', category: 'Lunch', name: 'Gobi Manchurian' },
  { id: '26', category: 'Desserts', name: 'Rasmalai' },
  { id: '27', category: 'Desserts', name: 'Vanilla Icecream' },
  { id: '28', category: 'Desserts', name: 'Chocolate Icecream' },
  { id: '29', category: 'Desserts', name: 'Gulab Jamun' },
  { id: '30', category: 'Desserts', name: 'Cake' },
  { id: '31', category: 'Desserts', name: 'Double Ka Meetha' },
  { id: '32', category: 'Drinks', name: 'Lemon Juice' },
  { id: '33', category: 'Drinks', name: 'Orange Juice' },
  { id: '34', category: 'Drinks', name: 'Badam Milk' },
  { id: '35', category: 'Drinks', name: 'Fruit Salad' },
  { id: '36', category: 'Drinks', name: 'Tea' },
  { id: '37', category: 'Dinner', name: 'Dinner Biryani' },
  { id: '38', category: 'Dinner', name: 'Chapati' },
  { id: '39', category: 'Dinner', name: 'Parota' },
  { id: '40', category: 'Dinner', name: 'Naan' },
  { id: '41', category: 'Dinner', name: 'Chicken Curry' },
  { id: '42', category: 'Dinner', name: 'Mutton Curry' },
];

// Default prices and quantities for fallback (if localStorage is empty)
const defaultItems = [
  { id: '1', price: '₹30', quantity: 400 },
  { id: '2', price: '₹40', quantity: 400 },
  { id: '3', price: '₹60', quantity: 300 },
  { id: '4', price: '₹25', quantity: 400 },
  { id: '5', price: '₹35', quantity: 250 },
  { id: '6', price: '₹30', quantity: 400 },
  { id: '7', price: '₹20', quantity: 250 },
  { id: '8', price: '₹40', quantity: 200 },
  { id: '9', price: '₹15', quantity: 300 },
  { id: '10', price: '₹10', quantity: 500 },
  { id: '11', price: '₹180', quantity: 500 },
  { id: '12', price: '₹40', quantity: 400 },
  { id: '13', price: '₹120', quantity: 400 },
  { id: '14', price: '₹150', quantity: 300 },
  { id: '15', price: '₹100', quantity: 250 },
  { id: '16', price: '₹80', quantity: 300 },
  { id: '17', price: '₹160', quantity: 200 },
  { id: '18', price: '₹120', quantity: 200 },
  { id: '19', price: '₹50', quantity: 200 },
  { id: '20', price: '₹40', quantity: 300 },
  { id: '21', price: '₹60', quantity: 500 },
  { id: '22', price: '₹50', quantity: 250 },
  { id: '23', price: '₹50', quantity: 250 },
  { id: '24', price: '₹100', quantity: 200 },
  { id: '25', price: '₹80', quantity: 500 },
  { id: '26', price: '₹30', quantity: 400 },
  { id: '27', price: '₹40', quantity: 400 },
  { id: '28', price: '₹45', quantity: 400 },
  { id: '29', price: '₹20', quantity: 300 },
  { id: '30', price: '₹50', quantity: 200 },
  { id: '31', price: '₹60', quantity: 300 },
  { id: '32', price: '₹20', quantity: 500 },
  { id: '33', price: '₹30', quantity: 500 },
  { id: '34', price: '₹40', quantity: 400 },
  { id: '35', price: '₹50', quantity: 300 },
  { id: '36', price: '₹15', quantity: 300 },
  { id: '37', price: '₹180', quantity: 500 },
  { id: '38', price: '₹10', quantity: 300 },
  { id: '39', price: '₹15', quantity: 250 },
  { id: '40', price: '₹20', quantity: 200 },
  { id: '41', price: '₹120', quantity: 300 },
  { id: '42', price: '₹150', quantity: 300 },
];

const Menu = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [inputQuantities, setInputQuantities] = useState({});
  const [disabledInputs, setDisabledInputs] = useState({});

  // Sync items with localStorage (price and quantity from Provider.jsx)
  const syncItemsWithLocalStorage = () => {
    const updatedItems = initialItems.map(item => {
      const storedQuantity = localStorage.getItem(`quantity_${item.id}`);
      const storedPrice = localStorage.getItem(`price_${item.id}`);
      const defaultItem = defaultItems.find(i => i.id === item.id);

      return {
        ...item,
        quantity: storedQuantity !== null ? parseInt(storedQuantity) : defaultItem.quantity,
        price: storedPrice !== null ? `₹${storedPrice}` : defaultItem.price,
      };
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page

    // Initialize localStorage with default values if not set (consistent with Provider.jsx)
    initialItems.forEach(item => {
      const defaultItem = defaultItems.find(i => i.id === item.id);
      if (localStorage.getItem(`quantity_${item.id}`) === null) {
        localStorage.setItem(`quantity_${item.id}`, defaultItem.quantity);
      }
      if (localStorage.getItem(`price_${item.id}`) === null) {
        localStorage.setItem(`price_${item.id}`, defaultItem.price.replace('₹', ''));
      }
    });
    syncItemsWithLocalStorage(); // Initial sync

    const handleStorageChange = () => {
      syncItemsWithLocalStorage();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleQuantityChange = (id, value) => {
    const quantity = value === '' ? '' : Math.max(0, parseInt(value) || 0);
    setInputQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const addToCart = (id, name, price) => {
    const item = items.find(i => i.id === id);
    const requestedQuantity = inputQuantities[id] || 0;

    if (requestedQuantity < 0) {
      alert('Please enter a quantity of 0 or greater.');
      return;
    }

    const cartItem = cart.find(i => i.id === id);
    const previousCartQuantity = cartItem ? cartItem.quantity : 0;
    const quantityDifference = requestedQuantity - previousCartQuantity;

    if (quantityDifference > item.quantity) {
      alert(`Sorry, only ${item.quantity} ${item.name} available.`);
      return;
    }

    const newItems = items.map(i =>
      i.id === id ? { ...i, quantity: i.quantity - quantityDifference } : i
    );
    setItems(newItems);
    localStorage.setItem(`quantity_${id}`, newItems.find(i => i.id === id).quantity);

    const newCart = cartItem
      ? cart.map(i => (i.id === id ? { ...i, quantity: requestedQuantity } : i))
      : [...cart, { id, name, price, quantity: requestedQuantity }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));

    setDisabledInputs(prev => ({ ...prev, [id]: true }));
    alert(`${requestedQuantity} ${name} added to your cart!`);
  };

  const editQuantity = (id) => {
    setDisabledInputs(prev => ({ ...prev, [id]: false }));
  };

  const removeFromCart = (id) => {
    const cartItem = cart.find(i => i.id === id);
    if (cartItem && cartItem.quantity > 0) {
      const newItems = items.map(i =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setItems(newItems);
      localStorage.setItem(`quantity_${id}`, newItems.find(i => i.id === id).quantity);

      const newCart = cartItem.quantity === 1
        ? cart.filter(i => i.id !== id)
        : cart.map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i));
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <>
      <Navbar2 />
      <div className="menu-page">
        <div className="menu-container">
          <h1 className="menu-title">Menu</h1>
          {categories.map(category => (
            <div key={category} className="category">
              <h2>{category}</h2>
              {items
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="item" data-id={item.id}>
                    <img src={imageMap[item.name]} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                      <input
                        type="number"
                        min="0"
                        placeholder="Enter quantity"
                        value={inputQuantities[item.id] !== undefined ? inputQuantities[item.id] : ''}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="quantity-input"
                        disabled={disabledInputs[item.id] || false}
                      />
                      <div className="button-container">
                        <button
                          className="add-to-cart"
                          onClick={() => addToCart(item.id, item.name, item.price)}
                        >
                          Add to Cart
                        </button>
                        {disabledInputs[item.id] ? (
                          <>
                            <button className="edit-button" onClick={() => editQuantity(item.id)}>
                              Edit
                            </button>
                            <div className="green-tick-box">✓</div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
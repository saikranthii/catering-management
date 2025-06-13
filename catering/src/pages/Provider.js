import React, { useState, useEffect, useCallback } from 'react';
import './Provider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const initialItems = [
  { id: '1', category: 'Tiffins', name: 'Idli', price: '₹30', quantity: 400 },
  { id: '2', category: 'Tiffins', name: 'Puri', price: '₹40', quantity: 400 },
  { id: '3', category: 'Tiffins', name: 'Masala Dosa', price: '₹60', quantity: 300 },
  { id: '4', category: 'Tiffins', name: 'Bonda', price: '₹25', quantity: 400 },
  { id: '5', category: 'Tiffins', name: 'Poha', price: '₹35', quantity: 250 },
  { id: '6', category: 'Tiffins', name: 'Vada', price: '₹30', quantity: 400 },
  { id: '7', category: 'Snacks', name: 'Samosa', price: '₹20', quantity: 250 },
  { id: '8', category: 'Snacks', name: 'Sandwich', price: '₹40', quantity: 200 },
  { id: '9', category: 'Snacks', name: 'Mirchi Bajji', price: '₹15', quantity: 300 },
  { id: '10', category: 'Snacks', name: 'Biscuits', price: '₹10', quantity: 500 },
  { id: '11', category: 'Lunch', name: 'Chicken Biryani', price: '₹180', quantity: 500 },
  { id: '12', category: 'Lunch', name: 'Rice', price: '₹40', quantity: 400 },
  { id: '13', category: 'Lunch', name: 'Chicken Curry', price: '₹120', quantity: 400 },
  { id: '14', category: 'Lunch', name: 'Mutton Curry', price: '₹150', quantity: 300 },
  { id: '15', category: 'Lunch', name: 'Fish Fry', price: '₹100', quantity: 250 },
  { id: '16', category: 'Lunch', name: 'Egg Curry', price: '₹80', quantity: 300 },
  { id: '17', category: 'Lunch', name: 'Panner Biryani', price: '₹160', quantity: 200 },
  { id: '18', category: 'Lunch', name: 'Veg Pulao', price: '₹120', quantity: 200 },
  { id: '19', category: 'Lunch', name: 'Sambar', price: '₹50', quantity: 200 },
  { id: '20', category: 'Lunch', name: 'Dal', price: '₹40', quantity: 300 },
  { id: '21', category: 'Lunch', name: 'Ladiesfinger Fry', price: '₹60', quantity: 500 },
  { id: '22', category: 'Lunch', name: 'Tomato Curry', price: '₹50', quantity: 250 },
  { id: '23', category: 'Lunch', name: 'Potato Curry', price: '₹50', quantity: 250 },
  { id: '24', category: 'Lunch', name: 'Veg Fried Rice', price: '₹100', quantity: 200 },
  { id: '25', category: 'Lunch', name: 'Gobi Manchurian', price: '₹80', quantity: 500 },
  { id: '26', category: 'Desserts', name: 'Rasmalai', price: '₹30', quantity: 400 },
  { id: '27', category: 'Desserts', name: 'Vanilla Icecream', price: '₹40', quantity: 400 },
  { id: '28', category: 'Desserts', name: 'Chocolate Icecream', price: '₹45', quantity: 400 },
  { id: '29', category: 'Desserts', name: 'Gulab Jamun', price: '₹20', quantity: 300 },
  { id: '30', category: 'Desserts', name: 'Cake', price: '₹50', quantity: 200 },
  { id: '31', category: 'Desserts', name: 'Double Ka Meetha', price: '₹60', quantity: 300 },
  { id: '32', category: 'Drinks', name: 'Lemon Juice', price: '₹20', quantity: 500 },
  { id: '33', category: 'Drinks', name: 'Orange Juice', price: '₹30', quantity: 500 },
  { id: '34', category: 'Drinks', name: 'Badam Milk', price: '₹40', quantity: 400 },
  { id: '35', category: 'Drinks', name: 'Fruit Salad', price: '₹50', quantity: 300 },
  { id: '36', category: 'Drinks', name: 'Tea', price: '₹15', quantity: 300 },
  { id: '37', category: 'Dinner', name: 'Dinner Biryani', price: '₹180', quantity: 500 },
  { id: '38', category: 'Dinner', name: 'Chapati', price: '₹10', quantity: 300 },
  { id: '39', category: 'Dinner', name: 'Parota', price: '₹15', quantity: 250 },
  { id: '40', category: 'Dinner', name: 'Naan', price: '₹20', quantity: 200 },
  { id: '41', category: 'Dinner', name: 'Chicken Curry', price: '₹120', quantity: 300 },
  { id: '42', category: 'Dinner', name: 'Mutton Curry', price: '₹150', quantity: 300 },
];

const Provider = () => {
  const [items, setItems] = useState(initialItems);
  const [zeroQuantityItems, setZeroQuantityItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editValues, setEditValues] = useState({ price: '', quantity: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const syncItemsWithLocalStorage = useCallback(() => {
    const updatedItems = initialItems.map(item => {
      const storedQuantity = localStorage.getItem(`quantity_${item.id}`);
      const storedPrice = localStorage.getItem(`price_${item.id}`);
      return {
        ...item,
        quantity: storedQuantity !== null ? parseInt(storedQuantity) : item.quantity,
        price: storedPrice !== null ? `₹${storedPrice}` : item.price,
      };
    });
    setItems(updatedItems);
    const zeroItems = updatedItems.filter(item => item.quantity === 0);
    setZeroQuantityItems(zeroItems);

    // Sync with backend
    updatedItems.forEach(async (item) => {
      try {
        await fetch('http://localhost:5000/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: item.id,
            category: item.category,
            name: item.name,
            price: parseFloat(item.price.replace('₹', '')),
            quantity: item.quantity,
          }),
        });
      } catch (error) {
        console.error(`Error syncing item ${item.id} to backend:`, error);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page

    // Initialize localStorage with initial values if not set
    initialItems.forEach(item => {
      if (localStorage.getItem(`quantity_${item.id}`) === null) {
        localStorage.setItem(`quantity_${item.id}`, item.quantity);
      }
      if (localStorage.getItem(`price_${item.id}`) === null) {
        localStorage.setItem(`price_${item.id}`, item.price.replace('₹', ''));
      }
    });
    syncItemsWithLocalStorage();

    const handleStorageChange = () => {
      syncItemsWithLocalStorage();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [syncItemsWithLocalStorage]);

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditValues({
      price: item.price.replace('₹', ''),
      quantity: item.quantity.toString(),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        const newPrice = parseFloat(editValues.price);
        const newQuantity = parseInt(editValues.quantity);
        if (isNaN(newPrice) || isNaN(newQuantity) || newQuantity < 0) {
          alert('Please enter valid price and quantity');
          return item;
        }
        localStorage.setItem(`price_${itemId}`, newPrice);
        localStorage.setItem(`quantity_${itemId}`, newQuantity);
        return { ...item, price: `₹${newPrice}`, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);
    setZeroQuantityItems(updatedItems.filter(item => item.quantity === 0));
    setEditingItemId(null);

    // Sync updated item with backend
    const updatedItem = updatedItems.find(item => item.id === itemId);
    try {
      await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: updatedItem.id,
          category: updatedItem.category,
          name: updatedItem.name,
          price: parseFloat(updatedItem.price.replace('₹', '')),
          quantity: updatedItem.quantity,
        }),
      });
      console.log(`Item ${itemId} synced to backend`);
    } catch (error) {
      console.error(`Error syncing item ${itemId} to backend:`, error);
    }
  };

  const handleCancel = () => {
    setEditingItemId(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const downloadExcel = () => {
    const worksheetData = items.map(item => ({
      'Item No': item.id,
      'Category': item.category,
      'Name': item.name,
      'Price': item.price,
      'Quantity': item.quantity
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BiteBank');
    XLSX.writeFile(workbook, 'BiteBank_Report.xlsx');
    setIsDropdownOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text('Bite Bank Report', 14, 15);

    const tableData = items.map(item => ({
      id: item.id,
      category: item.category,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    autoTable(doc, {
      startY: 20,
      margin: { top: 20, right: 10, bottom: 10, left: 10 },
      head: [['Item No', 'Category', 'Name', 'Price', 'Quantity']],
      body: tableData.map(row => [
        row.id,
        row.category,
        row.name,
        row.price,
        row.quantity
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
        0: { cellWidth: 31 },  // Item No
        1: { cellWidth: 61 },  // Category
        2: { cellWidth: 91 },  // Name
        3: { cellWidth: 47 },  // Price
        4: { cellWidth: 47 }   // Quantity
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

    doc.save('BiteBank_Report.pdf');
    setIsDropdownOpen(false);
  };

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div>
      <div className="provider-header-container">
        <h1 className="providerhead">Bite Bank</h1>
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
      <div className="provider-container">
        {categories.map(category => (
          <div key={category} className="category">
            <h2>{category}</h2>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter(item => item.category === category)
                  .map(item => (
                    <tr key={item.id} data-id={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        {editingItemId === item.id ? (
                          <input
                            type="number"
                            name="price"
                            value={editValues.price}
                            onChange={handleInputChange}
                            min="0"
                            step="1"
                            className="edit-input"
                          />
                        ) : (
                          item.price
                        )}
                      </td>
                      <td>
                        {editingItemId === item.id ? (
                          <input
                            type="number"
                            name="quantity"
                            value={editValues.quantity}
                            onChange={handleInputChange}
                            min="0"
                            step="1"
                            className="edit-input"
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td>
                        {editingItemId === item.id ? (
                          <>
                            <button
                              onClick={() => handleSave(item.id)}
                              className="save-btn"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="cancel-btn"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEditClick(item)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
        {zeroQuantityItems.length > 0 && (
          <div className="suggestion-box">
            <h3>Stock Suggestions</h3>
            <ul>
              {zeroQuantityItems.map(item => (
                <li key={item.id}>
                  Please add more <strong>{item.name}</strong> (Item No: {item.id})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Provider;
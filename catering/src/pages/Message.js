import React, { useState, useEffect } from "react";
import "./Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh, faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateMessages = async () => {
    let fetchedMessages = [];
    
    // Try fetching from backend first
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (response.ok) {
        fetchedMessages = result.map(msg => ({
          ...msg,
          id: msg._id // Map MongoDB's _id to id
        }));
        console.log('Fetched messages from backend:', fetchedMessages);
        // Sync backend data to localStorage
        localStorage.setItem("messages", JSON.stringify(fetchedMessages));
      } else {
        console.error('Failed to fetch messages from backend:', result.message);
      }
    } catch (error) {
      console.error('Error fetching messages from backend:', error);
    }

    // If backend fetch fails or returns no data, fall back to localStorage
    if (fetchedMessages.length === 0) {
      const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
      console.log("Fetched messages from localStorage:", storedMessages);
      fetchedMessages = storedMessages;
    }

    setMessages(fetchedMessages);
  };

  useEffect(() => {
    updateMessages(); // Initial load

    const handleMessagesUpdated = () => {
      console.log("Messages updated event received");
      updateMessages();
    };
    window.addEventListener("messagesUpdated", handleMessagesUpdated);

    return () => {
      console.log("Cleaning up event listener");
      window.removeEventListener("messagesUpdated", handleMessagesUpdated);
    };
  }, []);

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    window.dispatchEvent(new Event("messagesUpdated"));
    console.log(`Deleted message with ID: ${messageId}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const downloadExcel = () => {
    const reportData = messages.map(msg => ({
      ID: msg.id,
      Name: msg.name,
      Email: msg.email,
      Subject: msg.subject,
      Message: msg.message,
      Timestamp: new Date(msg.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }));

    const summaryData = [
      { 
        ID: 'Total Messages', 
        Name: messages.length.toString(), 
        Email: '', 
        Subject: '', 
        Message: '', 
        Timestamp: `Report Generated At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
      },
      ...reportData
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Messages');
    
    XLSX.writeFile(workbook, 'Messages_Report.xlsx');
    setIsDropdownOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let currentY = 15;

    doc.text('Messages Report', 14, currentY);
    currentY += 5;
    const currentTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    doc.setFontSize(8);
    doc.text(`Generated on: ${currentTimestamp}`, 14, currentY);
    currentY += 10;

    doc.setFontSize(12);
    doc.text(`Total Messages: ${messages.length}`, 14, currentY);
    currentY += 10;

    const messagesBody = messages.length > 0
      ? messages.map(msg => [
          msg.id,
          msg.name,
          msg.email,
          msg.subject,
          msg.message,
          new Date(msg.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        ])
      : [['No Data', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A']];

    autoTable(doc, {
      startY: currentY,
      margin: { top: 20, right: 10, bottom: 10, left: 10 },
      head: [['ID', 'Name', 'Email', 'Subject', 'Message', 'Timestamp']],
      body: messagesBody,
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
        0: { cellWidth: 15 },
        1: { cellWidth: 25 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30 },
        4: { cellWidth: 50 },
        5: { cellWidth: 30 }
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

    doc.save('Messages_Report.pdf');
    setIsDropdownOpen(false);
  };

  return (
    <div className="message-page">
      <div className="message-container">
        <div className="message-header-container">
          <h1>Notifications</h1>
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
        {messages.length === 0 ? (
          <p className="no-messages">
            <FontAwesomeIcon icon={faFaceMeh} className="no-messages-icon" />
            No Messages Received
          </p>
        ) : (
          <div className="message-list">
            {messages.map((msg) => (
              <div key={msg.id} className="message-item">
                <div className="message-header">
                  <h3>{msg.subject}</h3>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteMessage(msg.id)}
                    title="Delete Message"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <p>
                  <strong>From:</strong> {msg.name} ({msg.email})
                </p>
                <p>
                  <strong>Date:</strong> {new Date(msg.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
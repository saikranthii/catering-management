import React, { useState, useEffect } from "react";
import "./Message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMeh, faTrash } from "@fortawesome/free-solid-svg-icons";

const Message = () => {
  const [messages, setMessages] = useState([]);

  const updateMessages = () => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    console.log("Fetched messages from localStorage:", storedMessages);
    setMessages(storedMessages);
  };

  useEffect(() => {
    updateMessages(); // Initial load

    // Listen for updates from ContactForm.js or other components
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
    window.dispatchEvent(new Event("messagesUpdated")); // Notify other components
    console.log(`Deleted message with ID: ${messageId}`);
  };

  return (
    <div className="message-page">
      <div className="message-container">
        <h1>Notifications</h1>
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

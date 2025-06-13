import React, { useState, useEffect } from "react";
import "./Contact.css";
import Navbar2 from "../components/Navbar2.js";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      id: Date.now(), // Unique ID for local storage
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        // Save to local storage
        const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
        localStorage.setItem("messages", JSON.stringify([...storedMessages, newMessage]));

        window.dispatchEvent(new Event("messagesUpdated"));
        setFormData({ name: "", email: "", subject: "", message: "" });
        alert("Message sent successfully!");
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <p className="contact-subtext">
          We consider all the drivers of change, giving you the components you need 
          to create a truly happening moment.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Write a subject"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message"
              required
            ></textarea>
          </div>

          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;

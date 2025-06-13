import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    // Only allow changes to name and password fields
    if (e.target.name !== "email") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to update your profile");
      return;
    }

    // Prepare data to send, excluding email to prevent updates
    const updateData = {
      name: formData.name,
      password: formData.password || undefined, // Only include password if provided
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        setSuccess("Profile updated successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(result.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError("An error occurred while updating your profile");
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h1>Edit Profile</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name (required for non-admin users)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password (optional)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password (min 6 characters)"
            />
          </div>
          <button type="submit" className="submit-btn">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
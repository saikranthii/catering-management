import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar2 from "../components/Navbar2.js";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => setIsSignup(!isSignup);

  const handleLogin = async () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);
      if (role === "admin") {
        navigate("/providerdashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }
    if (!email || !password || (role !== 'admin' && !name)) {
      alert("Please fill in all required fields!");
      return;
    }

    console.log('Sending signup request:', { name, email, password, role });

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Signup response:', res); // Log full response
      alert(res.data.message);
      setIsSignup(false);
    } catch (error) {
      console.error('Signup error:', {
        message: error.message,
        response: error.response,
        request: error.request,
      });
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    // JSX remains unchanged, omitted for brevity
    <>
      <Navbar2 />
      <div className="login-page">
        <div className="container">
          <div className="left-side">
            <p style={{ marginTop: "0px" }}>
              Welcome to ELITE CATERINGS! Log in to manage your orders, customize menus, and track your catering requests.
            </p>
          </div>
          <div className="right-side">
            <div className="form-container">
              <h2>{isSignup ? "Create an Account" : "Log In to your Account"}</h2>
              {isSignup ? (
                <>
                  <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <div className="password-container">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="eye-icon"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  </div>
                  <select
                    className="role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={{ width: "107%" }}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <button onClick={handleSignup}>Sign Up</button>
                  <p>
                    Already have an account? <a href="#" onClick={toggleForm}>LOGIN HERE</a>
                  </p>
                </>
              ) : (
                // Login form unchanged
                <>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <div className="password-container">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={passwordVisible ? faEyeSlash : faEye}
                      className="eye-icon"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                  </div>
                  <select
                    className="role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={{ width: "107%" }}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <button onClick={handleLogin}>Login</button>
                  <p>
                    New User? <a href="#" onClick={toggleForm}>SIGN UP</a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
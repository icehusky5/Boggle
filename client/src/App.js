import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "./Login.js";
import Register from "./Register.js";
import Boggle from "./Boggle.js";

function App() {
  // State variables to manage user authentication and data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [games, setGames] = useState([]);
  const [loginFailed, setLoginFailed] = useState(false);

  // Function to verify user login status on component mount
  const verifyLogin = async () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      try {
        const response = await axios.post("http://localhost:3001/verify-token",
          { token: savedToken },
        );

        const { isValid } = response.data;

        if (isValid) {
          setIsLoggedIn(true);

          const { username } = response.data.response;
          const { games } = response.data;

          setUsername(username);
          setGames(games);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error verifying token: ", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  // Function to handle user login
  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: username,
        password: password
      });
      const { message, token, games } = response.data;
      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUsername(username);
        setGames(games);
        setLoginFailed(false);
      }
    } catch (error) {
      setLoginFailed(true);
      console.error("Error logging in: ", error);
    }
  };

  // Function to handle user registration
  const handleRegister = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username: username,
        password: password
      });
      const { message, token, games } = response.data;
      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setUsername(username);
        setGames(games);
      }
    } catch (error) {
      console.error("Error registering: ", error);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUsername(null);
    setGames([]);
    localStorage.removeItem("token");
  };

  // Effect hook to verify login status on component mount
  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} loginFailed={loginFailed} />} />
        <Route exact path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register onRegister={handleRegister} />} />
        <Route exact path="/" element={!isLoggedIn ? <Navigate to="/login" /> : <Boggle token={token} setToken={setToken} username={username} games={games} setGames={setGames} handleLogout={handleLogout} verifyLogin={verifyLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

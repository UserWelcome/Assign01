import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import useAuth from './hooks/useAuth';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  

  return (
    <Router>
      {useAuth() && (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
         
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      )}
      {!useAuth() && (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;

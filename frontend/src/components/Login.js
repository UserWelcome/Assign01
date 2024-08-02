import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({email:"", password:"" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://userapp-v8uf.onrender.com/api/auth/Login', formData);
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <div>
      <button type="submit">Login</button>
      </div>
      <span>Don't have an account ?</span>
      <Link to={'/signup'}>Create one</Link>
    </form>
  );
};

export default Login;

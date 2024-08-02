import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://userapp-v8uf.onrender.com/api/auth/', formData);
      navigate('/dashboard');
    } catch (error) {
      alert('Error adding user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;

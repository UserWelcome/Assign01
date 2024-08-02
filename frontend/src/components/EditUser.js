import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const {id} = useParams();
  const [formData, setFormData] = useState({ id:id, name: '', email: '', phone: '' });
  const navigate = useNavigate();
  console.log('id',id);

  useEffect(() => {
    const fetchData=async()=>{
      
      try {
      
         const response=await axios.get(`https://userapp-v8uf.onrender.com/api/auth/added/${id}`)
         console.log(response);
        setFormData({ name:response.data.name, email:response.data.email,  phone:response.data.phone});
      } catch (error) {
        alert(error);
      }
    }
     fetchData();
  },[id] );

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await axios.put(`https://userapp-v8uf.onrender.com/api/auth/${id}`, formData);
     
      alert("user updated");
      navigate('/dashboard');
    } catch (error) {
      alert('Error updating user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" required />
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;

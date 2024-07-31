import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    city: '',
    state: '',
    howDidYouHear: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      howDidYouHear: checked
        ? [...formData.howDidYouHear, name]
        : formData.howDidYouHear.filter(item => item !== name)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Signup successful');
      navigate('/login');
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
      <div>
      <span>Gender</span><br/>
        <label>
          <input type="radio" name="gender" value="male" onChange={handleChange} required />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" onChange={handleChange} required />
          Female
        </label>
        <label> 
          <input type="radio" name="gender" value="other" onChange={handleChange} required />
          Other
        </label>
      </div>
      <div>
      <span>How Did You Hear?</span><br/>
        <label>
          <input type="checkbox" name="LinkedIn" onChange={handleCheckboxChange} />
          LinkedIn
        </label>
        <label>
          <input type="checkbox" name="Friends" onChange={handleCheckboxChange} />
          Friends
        </label>
        <label>
          <input type="checkbox" name="Job Portal" onChange={handleCheckboxChange} />
          Job Portal
        </label>
        <label>
          <input type="checkbox" name="Others" onChange={handleCheckboxChange} />
          Others
        </label>
      </div>
      <select name="city" value={formData.city} onChange={handleChange} required>
        <option value="">Select City</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Pune">Pune</option>
        <option value="Ahmedabad">Ahmedabad</option>
      </select>
      <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
      <button type="submit">Signup</button>
      <span>Already have an account .</span>
      <Link to={'/login'}>Login</Link>
    </form>
  );
};

export default Signup;

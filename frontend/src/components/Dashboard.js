import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
import { Card } from 'react-bootstrap';
import { Button, ListGroup } from 'react-bootstrap';


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [userAdded, setUserAdded] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://userapp-v8uf.onrender.com/api/auth/');
      setUsers(response.data);
      const response1 = await axios.get('https://userapp-v8uf.onrender.com/api/auth/added');
      setUserAdded(response1.data);
    };
    fetchUsers();
  }, []);
  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className='container'>
      <h1>Dashboard</h1>
      <Button onClick={logOut}>Logout</Button>
      <h3>Added Users</h3>
      <div className="row row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div className="col">
          {userAdded.length === 0 ? (
            <p>
              no users
            </p>
          ) : (
            userAdded.map(user => (

              <Card className='card' style={{ width: '18rem', textAlign: 'center' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>{user.email}</ListGroup.Item>
                      <ListGroup.Item>{user.phone}</ListGroup.Item>
                    </ListGroup>

                    <Card.Link href={`/edit-user/${user._id}`}>Edit</Card.Link>

                  </Card.Text>
                  <Button variant="primary" onClick={async () => {
                    await axios.delete(`https://userapp-v8uf.onrender.com/api/auth/${user._id}`);
                    setUserAdded(userAdded.filter(u => u._id !== user._id));
                  }}>Delete</Button>
                </Card.Body>
              </Card>))
          )}
        </div>
      </div>
      <button type="button" className="btn btn-dark  btn-lg btn-block"><Link to={'/add-user'}>Add user</Link></button>
      <div>
        <h3>Signed Users</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone no</th>
              <th>Gender</th>
              <th>City</th>
              <th>State</th>
              <th>How did you here</th>
            </tr></thead>
          <tbody>
            {users.length === 0 ? (
              <p>No Data Found</p>
            ) : (
              users.map(user => (

                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.gender}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.howDidYouHear}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

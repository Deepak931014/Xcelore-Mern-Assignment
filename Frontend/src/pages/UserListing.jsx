
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import Modal from '../components/Modal';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const UserListing = () => {
  
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({});

    const handleChange =(key,value)=>{
      if(key === 'firstName'){
        setNewUser({...newUser,firstName:value});
      }else if(key === 'lastName'){
        setNewUser({...newUser,lastName:value});
      }else if(key === 'email'){
        setNewUser({...newUser,email:value});
      }else if(key === 'password'){
        setNewUser({...newUser,password:value});
      } else if (key === 'confirmPassword') {
        setNewUser({...newUser,confirmPassword:value});
      }
    }
    useEffect(() => {
      axios.get(`${config.apiUrl}/users/listing`)
      .then((response) => {
        setUsers(response.data.data);
        console.log('User Listing Response ', response);
      })
      .catch((error) => {
        console.error('User Listing Error ', error);
      })
    }, []);

    const handleDelete = (id) => {
      axios.delete(`${config.apiUrl}/users/${id}`)
      .then((response) => {
        console.log('User Delete Response ', response);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((error) => {
        console.error('User Delete Error ', error);
      })
    }

    const handleUpdate = () => {
      axios.put(`${config.apiUrl}/users/${editUser._id}`, editUser)
      .then((response) => {
        console.log('User Update Response ', response);
        setUsers(users.map(user => user._id === editUser._id ? editUser : user));
        setEditUser({});
      })
      .catch((error) => {
        console.error('User Update Error ', error);
      })
    }

    const handleCreate = () => {
      if (newUser.firstName === '' || newUser.lastName === '' || newUser.email === '' || newUser.password === '') {
        alert('Please fill all fields');
        return;
      }
      if(newUser.password !== newUser.confirmPassword){
        alert('Password and Confirm Password are not same');
        return;
      }
      axios.post(`${config.apiUrl}/users/register`, newUser)
      .then((response) => {
        console.log('User Create Response ', response);
        setUsers([...users, response.data.data]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('User Create Error ', error);
      })

    }

    return (
      <div style={{ width: '100%'}}>
        <h1>User Listing</h1>
        <Button onClick={() => setShowModal(true)} style={{ float: 'right', marginBottom: '20px' }}>Create</Button>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              const isEdit = editUser._id === user._id;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {isEdit ? <td><input value={editUser.firstName} onChange={(e) => setEditUser(prev => ({ ...prev, firstName: e.target.value }))} /></td>: <td>{user.firstName}</td>}
                  {isEdit ? <td><input value={editUser.lastName} onChange={(e) => setEditUser(prev => ({ ...prev, lastName: e.target.value }))} /></td>: <td>{user.lastName}</td>}
                  {isEdit ? <td><input value={editUser.email} onChange={(e) => setEditUser(prev => ({ ...prev, email: e.target.value }))}/></td> : <td>{user.email}</td>}
                  <td>
                    { isEdit ? <Button onClick={handleUpdate}>Update</Button> : <Button onClick={() => setEditUser(user)} >Edit</Button>}
                    <span>{' '}</span>
                    <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)} handleCreate={handleCreate}>
          <Form style={{ width: '500px' }}>
            <Row className="mb-3">
              <Form.Group controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange = {(e) => handleChange('firstName',e.target.value)} type="text" placeholder="Enter first name" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control onChange = {(e) => handleChange('lastName',e.target.value)} type="text" placeholder="Lastname" />
                </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange = {(e) => handleChange('email',e.target.value)} type="email" placeholder="Enter email" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
            <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange = {(e) => handleChange('password',e.target.value)} type="password" placeholder="Password" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group controlId="formGridPasswordConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control onChange = {(e) => handleChange('confirmPassword',e.target.value)} type="password" placeholder="Confirm Password" />
                </Form.Group>
            </Row>
          </Form>
        </Modal>
      )}
      </div>
      )
    }
  
    export default UserListing;

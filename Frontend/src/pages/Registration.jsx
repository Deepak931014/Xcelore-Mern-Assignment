import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import config from '../config';

const RegistrationForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 

  const navigate = useNavigate();

  const handleChange =(key,value)=>{
         if(key === 'firstName'){
          setFirstName(value); 
         }else if(key === 'lastName'){
          setLastName(value); 
         }else if(key === 'email'){
          setEmail(value); 
         }else if(key === 'password'){
          setPassword(value); 
         }else if(key === 'confirmPassword'){
          setConfirmPassword(value); 
         }
  }


  const handleSubmit = async () => {
    if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please fill all fields');
      return;
    }
    if(password !== confirmPassword){
      alert('Password and Confirm Password are not same');
      return;
    }
    const result = await axios.post(`${config.apiUrl}/users/register`, { firstName, lastName, email, password });
    navigate('/login');
    console.log('Registration Result API ', result);
    console.log('Registration Data ', { firstName, lastName, email, password, confirmPassword })
  }
  
  return (

    <div>
      <h1>Registration Form</h1>
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

        <Button variant="primary" onClick={handleSubmit} >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationForm;

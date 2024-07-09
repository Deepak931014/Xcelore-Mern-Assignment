import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AuthContext from '../context/AuthContext';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const handleChange = (key, value) => {
    if (key === 'email') {
      setEmail(value);
    } else if (key === 'password') {
      setPassword(value);
    }
  }

  const handleLoginSubmit = async () => {

    if (email === '' || password === '') {
      alert('Please fill all fields');
      return;
    }
    try {
      const result = await handleLogin(email, password);
      if (result.isAdmin) {
        navigate('/users');
      } else {
        navigate('/view');
      }
    } catch (error) {
      console.log('Error ', error);
    }

   
  };


  return (
    <div>
      <h1>Login Form</h1>
      <Form style={{ width: '500px' }}>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={(e) => handleChange('email', e.target.value)} type="email" placeholder="Enter email" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => handleChange('password', e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
        </Row>
        <Button variant="primary" onClick={handleLoginSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;

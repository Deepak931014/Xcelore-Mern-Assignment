import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <h1>Assignment App</h1>
        <p>Welcome to the Home Page</p>
        <p>Click the below buttons to Login or Register</p>
        <div>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <span> </span>
          <Link to="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </div>
      </div>
    )
  }
export default HomePage;
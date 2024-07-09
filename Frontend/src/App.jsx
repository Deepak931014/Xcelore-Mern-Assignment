import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Routes from './Routes';


const App = () => {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App

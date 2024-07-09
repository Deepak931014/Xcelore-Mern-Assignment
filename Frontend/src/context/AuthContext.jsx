import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import config from '../config.js';
import axios from 'axios';
import { decodeToken } from "react-jwt";

const AuthContext = createContext();

export const AuthProvider = (props) => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        role: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('user-token');
        const tokenInfo = decodeToken(token) || {};
        setUser({ ...tokenInfo, isAdmin: tokenInfo.role === 'admin'});
        console.log('Token Info ', tokenInfo);
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
        localStorage.clear();
    }

    const handleLogin = async (email, password) => {
        try {
            const result = await axios.post(`${config.apiUrl}/users/login`, { email, password });
            localStorage.setItem('user-token', result.data.data);
            const tokenInfo = decodeToken(result.data.data);
            setUser({ ...tokenInfo, isAdmin: tokenInfo.role === 'admin' });
            setIsLoggedIn(true);
            return { ...tokenInfo, isAdmin: tokenInfo.role === 'admin' };
        } catch (error) {
            console.log('Error ', error);
        }
      
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, handleLogout, handleLogin, user }}>
            {props.children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthContext;
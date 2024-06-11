import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import AuthService from '../services/AuthService';

const Home = () => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') === 'true');

    localStorage.removeItem('user'); // Remove the user information
    localStorage.removeItem('userRole');
    const userName = localStorage.getItem('userName');

    return (
        <div>
        {isAuthenticated ? (
            <div className="text-center">
                <Header />
                <h4>Welcome to the Home Page!</h4>
                Hello, {userName}!
                <Footer />
            </div>
        ) : (
            <div className="text-center">
                <h1>Please log in to access the Home Page</h1>
            </div>
        )}
    </div>
    );
};

export default Home;

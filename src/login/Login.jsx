import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();



    // const handleLogin = async (e) => {

        
    //     e.preventDefault();
    //     try {
    //         const response = await AuthService.login({ email, password });
    //         console.log(response.data)

    //         if (response.data === 'Login successful') {
                
    //            console.log(response)
    //             navigate('/home');
    //         } else {
    //             setMessage('Invalid credentials');
    //         }
    //     } catch (error) {
    //         setMessage('Invalid credentials');
    //     }
    // };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, password });
            console.log("Login response:", response); // Debug log
            if (localStorage.getItem('isLoggedIn') === 'true') {
                navigate('/home');
            } else {
                setMessage('Invalid credentials');
            }
        } catch (error) {
            setMessage('Invalid credentials');
        }
    };

    

    return (
        <section className="vh-100 d-flex align-items-center" style={{ backgroundColor: '#508bfc' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong rounded-3">
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-4">Sign in</h3>
                                {message && <div className="alert alert-danger">{message}</div>}

                                <form onSubmit={handleLogin}>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"

                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            className="form-control"

                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-check mb-4 text-start">
                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                        <label className="form-check-label" htmlFor="form1Example3"> Remember password</label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                </form>
                                <hr className="my-4" />
                                <p className="text-muted">Don't have an account? <a href="/register">Sign up</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

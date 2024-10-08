import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './clientLogin.css';
import Footer from '../../components_home/Home_Footer';
import HomeNavbar from '../../components_home/Home_NavBar';

const ClientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/client/loginClient', { email, password });
            if (response.status === 200) {
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('userName', response.data.user.fname);
                localStorage.setItem('userNic', response.data.user.nic);
                navigate(`/clientHome/${response.data.user._id}`);
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <HomeNavbar />
            <div className="login-page">
                <div className="login-container-client">
                    <h2 className="login-title">Login</h2>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input 
                                type="email" 
                                id="email"
                                className="form-input" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input 
                                type="password" 
                                id="password"
                                className="form-input" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ClientLogin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header';
import './updateClient.css';
import Footer from '../../components_home/Home_Footer';

const UpdateClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({
        fname: '',
        lname: '',
        nic: '',
        address: '',
        district: '',
        province: '',
        phone: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/client/getClient/${id}`);
                setClient(response.data.user);
            } catch (err) {
                console.error('Error fetching client data:', err);
            }
        };
        fetchClient();
    }, [id]);

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate NIC before submitting the form
        const nicPattern = /^(?:\d{12}|\d{10}V)$/; 
        if (!nicPattern.test(client.nic)) {
            alert('NIC must be 12 digits or 10 digits followed by "V".');
            return; // Stop form submission if NIC is invalid
        }
    
        try {
            await axios.put(`http://localhost:8070/client/updateClient/${id}`, client);
            navigate(`/clientProfile/${id}`);
        } catch (err) {
            console.error('Error updating client data:', err);
        }
    };    

    return (
        <div>
            <Header />
        <div className="update-client-container">
            <h2 className="update-title">Update Profile</h2>
            <form className="update-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">First Name:</label>
                    <input
                        type="text"
                        name="fname"
                        className="form-input"
                        value={client.fname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name:</label>
                    <input
                        type="text"
                        name="lname"
                        className="form-input"
                        value={client.lname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">NIC:</label>
                    <input
                        type="text"
                        name="nic"
                        className="form-input"
                        value={client.nic}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Address:</label>
                    <input
                        type="text"
                        name="address"
                        className="form-input"
                        value={client.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">District:</label>
                    <input
                        type="text"
                        name="district"
                        className="form-input"
                        value={client.district}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Province:</label>
                    <input
                        type="text"
                        name="province"
                        className="form-input"
                        value={client.province}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-input"
                        value={client.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        value={client.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        value={client.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Update Profile</button>
            </form>
        </div>
        <Footer />
        </div>
    );
};

export default UpdateClient;

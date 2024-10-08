import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header';
import Footer from "../../components_home/Home_Footer";
import './clientProfile.css';

const ClientProfile = () => {
    const { id } = useParams(); // Fetch the user ID from URL
    const [client, setClient] = useState(null);
    const userId = id || localStorage.getItem('userId'); // Use URL param or localStorage

    const navigateUpdate = useNavigate();
    const handleUpdateClick = () => {
        navigateUpdate(`/updateClient/${client._id}`);
    }

    const navigateDelete = useNavigate();
    const handleDeleteClick = () => {
        navigateDelete(`/deleteClient/${client._id}`);
    }

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/client/getClient/${userId}`);
                setClient(response.data.user);
            } catch (err) {
                console.error('Error fetching client data:', err);
            }
        };
        fetchClient();
    }, [userId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!client) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="profile-container">
                <h2 className="profile-title">Your Profile</h2>

                <div className="profile-row">
                    <p className="profile-info"><strong>First Name:</strong> {client.fname}</p>
                    <p className="profile-info"><strong>Last Name:</strong> {client.lname}</p>
                </div>

                <p className="profile-info"><strong>NIC:</strong> {client.nic}</p>
                <p className="profile-info"><strong>Address:</strong> {client.address}</p>

                <div className="profile-row">
                    <p className="profile-info"><strong>District:</strong> {client.district}</p>
                    <p className="profile-info"><strong>Province:</strong> {client.province}</p>
                </div>

                <p className="profile-info"><strong>Email:</strong> {client.email}</p>
                <p className="profile-info"><strong>Phone:</strong> {client.phone}</p>
                
                <div className="profile-actions">
                    <button className="profile-button update-button" onClick={handleUpdateClick}>Update Profile</button>
                    <button className="profile-button delete-button" onClick={handleDeleteClick}>Delete Profile</button>
                </div>
                <br/>
                <center><p className="profile-joined"><strong>Joined:</strong> {formatDate(client.createdDate)}</p></center>
            </div>

            <Footer />
        </div>
    );
};

export default ClientProfile;

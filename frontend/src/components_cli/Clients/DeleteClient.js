import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header';
import './deleteClient.css';
import Footer from '../../components_home/Home_Footer';

const DeleteClient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);

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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8070/client/deleteClient/${id}`);
            navigate('/loginClient');
        } catch (err) {
            console.error('Error deleting client:', err);
        }
    };

    if (!client) return <div className="loading">Loading...</div>;

    return (
        <div>
            <Header />
        
        <div className="delete-client-container">
            <h2 className="delete-title">Delete Profile</h2>
            <div className="client-details">
                <p><strong>First Name:</strong> {client.fname}</p>
                <p><strong>Last Name:</strong> {client.lname}</p>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Joined Date:</strong> {client.createdDate}</p>
            </div>
            <button className="delete-button" onClick={handleDelete}>Confirm Delete</button>
        </div>
        <Footer />
        </div>
    );
};

export default DeleteClient;

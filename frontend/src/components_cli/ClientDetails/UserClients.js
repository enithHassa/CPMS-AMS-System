import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserClients.css";
import Header from "../header";
import Footer from "../../components_home/Home_Footer";

export default function UserClients() {
    const [clientDetails, setClientDetails] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
    const navigate = useNavigate();

    useEffect(() => {
        function getClientDetails() {
            setLoading(true); // Set loading to true when starting data fetch
            axios.get("http://localhost:8070/client/")
                .then((res) => {
                    console.log(res.data);
                    setClientDetails(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                })
                .finally(() => {
                    setLoading(false); // Set loading to false when data fetch is complete
                });
        }

        getClientDetails();
    }, []);

    const handleAddClient = () => {
        navigate('/addClient');
    };

    // Delete client function
    const deleteClient = (id) => {
        axios
        .delete(`http://localhost:8070/client/deleteClient/${id}`)
        .then((res) => {
            alert("Client Deleted Successfully!");

            // After deleting the client from the server, remove it from the state
            setClientDetails(clientDetails.filter((client) => client._id !== id));
        })
        .catch((err) => {
            console.error(err);
            alert("Error deleting client");
        });
    };

    // Function to send email
    const sendEmail = (client) => {
        const { email, password } = client;

        axios.post("http://localhost:8070/client/sendEmail", { email, password })
            .then((res) => {
                alert("Email sent successfully!");
            })
            .catch((err) => {
                console.error(err);
                alert("Error sending email");
            });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
        <div className="user-clients-container">
            <div className="user-clients-header">
                <button className="btn add-client-btn" onClick={handleAddClient}>Add Client</button>
                <h1 className="user-clients-title">All Client Details</h1>
            </div>

            <table className="user-clients-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>NIC</th>
                        <th>Address</th>
                        <th>District</th>
                        <th>Province</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {clientDetails.map(client => (
                        <tr key={client._id}>
                            <td>{client.fname}</td>
                            <td>{client.lname}</td>
                            <td>{client.nic}</td>
                            <td>{client.address}</td>
                            <td>{client.district}</td>
                            <td>{client.province}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                            <td>{client.password}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteClient(client._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => sendEmail(client)} // Send email on click
                                >
                                    Send Email
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer />
        </div>
    );
}

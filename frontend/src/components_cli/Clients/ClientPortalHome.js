import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get userId
import './ClientPortalHome.css'; 
import Header from "../header";
import BalanceIcon from '@mui/icons-material/Balance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import axios from "axios";
import Footer from "../../components_home/Home_Footer";

function ClientPortalHome() {
    const [clientName, setClientName] = useState('');
    const [nic, setNic] = useState('');
    const [userId, setid] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [caseCount, setCaseCount] = useState(0);
    const [grantorDeedCount, setGrantorDeedCount] = useState(0);
    const [granteeDeedCount, setGranteeDeedCount] = useState(0);
    const [totalDeedCount, setTotalDeedCount] = useState(0);

    const [userMsg, setUserMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const navigate = useNavigate();
    //const { userId } = useParams(); // Get userId from URL

    // Fetch messages when the component loads
    useEffect(() => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        setCurrentDate(formattedDate);

        // Retrieve client name and NIC from localStorage
        const storedClientName = localStorage.getItem('userName');
        const storedNic = localStorage.getItem('userNic');
        const userId = localStorage.getItem('userId');

        setClientName(storedClientName || 'Client');
        setNic(storedNic); 
        setid(userId);

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/message/getMessages/${userId}`);
                setMessages(response.data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        if (userId) {
            fetchMessages(); // Fetch messages based on userId
        }

        // Fetch case count by NIC
        const fetchCaseCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/case/get_case_count_by_nic/${storedNic}`);
                setCaseCount(response.data.count);
            } catch (err) {
                console.error("Error fetching case count:", err);
            }
        };

        // Fetch deed count by NIC
        const fetchDeedCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/deeds/get_deed_count_by_nic/${storedNic}`);
                setGrantorDeedCount(response.data.grantorCount);
                setGranteeDeedCount(response.data.granteeCount);
                setTotalDeedCount(response.data.totalCount);
            } catch (err) {
                console.error("Error fetching deed count:", err);
            }
        };

        if (storedNic) {
            fetchCaseCount();
            fetchDeedCount();
        }
    }, [userId]); // Include userId in the dependency array

    // Handle sending messages
    const handleSendMessage = async () => {
        try {
            const newMessage = { userId, userMsg };
            await axios.post('http://localhost:8070/message/send', newMessage);
            // Update messages locally with new message structure
            setMessages([...messages, { userId, userMsg, dateTime: new Date(), userId: { name: clientName } }]); 
            setUserMsg(''); // Clear the input field
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    // Handle deleting messages
    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:8070/message/delete/${messageId}`);
            setMessages(messages.filter(msg => msg._id !== messageId)); // Update messages locally
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    return (
        <div>
            <Header />
            <div className="welcome-tag">
                <h1>Client Portal Management</h1>
                <p>Today is {currentDate}</p>
                <p>Welcome, <h2>{clientName}!</h2></p>
            </div>

            <div className="main-container">
                <div className="clickable-container" onClick={() => navigate(`/viewCase/${nic}`)}>
                    <BalanceIcon sx={{ fontSize: 80 }} /> <br /><br />
                    <p>Cases</p>
                </div>

                <div className="clickable-container" onClick={() => navigate(`/viewDeed/${nic}`)}>
                    <ReceiptLongIcon sx={{ fontSize: 80 }} /> <br /><br />
                    <p>Deeds</p>
                </div>
            </div>

            <div className="case-count-container">
                <h2>Total Cases: {caseCount}</h2>
            </div>

            <div className="deed-count-container">
                <h2>Total Deeds: {totalDeedCount}</h2>
                <p>Grantor: {grantorDeedCount}</p>
                <p>Grantee: {granteeDeedCount}</p>
            </div>

            {/* Messaging System Section */}
            <br/><br/>
            <div className="messaging-system-container">
                <h2>Messaging System</h2>
                <div className="messaging-box">
                    <div className="message-list">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <div key={msg._id} className={`message-item ${msg.userId._id === userId ? 'sent' : 'received'}`}>
                                    <p>
                                        <strong>{msg.userId.name}</strong>: {msg.userMsg} - {new Date(msg.dateTime).toLocaleString()}
                                    </p>
                                    <button onClick={() => handleDeleteMessage(msg._id)}>Delete</button>
                                </div>
                            ))
                        ) : (
                            <p>No messages to display.</p>
                        )}
                    </div>

                    {/* Input field for sending messages */}
                    <div className="send-message-section">
                        <input
                            type="text"
                            value={userMsg}
                            onChange={(e) => setUserMsg(e.target.value)}
                            placeholder="Type your message"
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ClientPortalHome;

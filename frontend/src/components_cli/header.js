import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./header.css";

function Header() {
    const userId = localStorage.getItem('userId'); // Fetch the logged-in user ID
    const userNic = localStorage.getItem('userNic');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(""); // State to hold search input

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Clear user data from localStorage
        navigate('/loginClient'); // Redirect to login page
    };

    // Handle form submission for search
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/searchResults?q=${searchQuery}`); // Navigate to the search results page with the query
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a className="navbar-brand" href="/">AMS</a>
                <button className="navbar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggle-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarContent">
                    <ul className="navbar-menu">
                        <li className="navbar-item">
                            <a className="navbar-link active" aria-current="page" href={`/clientHome/${userId}`}>Home</a>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="#">Support</a>
                        </li>
                        <li className="navbar-item dropdown">
                            <a className="navbar-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Services
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href={`/viewCase/${userNic}`}>Cases</a></li>
                                <li><a className="dropdown-item" href={`/viewDeed/${userNic}`}>Deeds</a></li>
                                <li><a className="dropdown-item" href="#">Appointments</a></li>
                                <li><a className="dropdown-item" href="#">Documents</a></li>
                                <li><a className="dropdown-item" href="#">Payments</a></li>
                                <li><hr className="dropdown-divider"></hr></li>
                                <li><a className="dropdown-item" href={`/clientProfile/${userId}`}>Profile</a></li> {/* Dynamic Profile Link */}
                            </ul>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link disabled" aria-disabled="true">Contact</a>
                        </li>
                        {!userId ? (
                            <li className="navbar-item">
                                <a className="navbar-link" href="/loginClient">Login</a>
                            </li>
                        ) : (
                            <li className="navbar-item">
                                <a className="navbar-link" onClick={handleLogout} href="/loginClient">Logout</a> {/* Handle logout */}
                            </li>
                        )}
                    </ul>
                    {/* Search form */}
                    <form className="navbar-search" role="search" onSubmit={handleSearchSubmit}>
                        <input 
                            className="navbar-search-input" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="navbar-search-button" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Header;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../header";
import Footer from "../../components_home/Home_Footer";
import './searchResults.css';  // Import your CSS file

function SearchResults() {
    const [cases, setCases] = useState([]);
    const [deeds, setDeeds] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation(); // Get search query from URL
    const navigate = useNavigate(); // Hook to navigate

    // Extract the search query from the URL
    const searchQuery = new URLSearchParams(location.search).get("q") || "";

    useEffect(() => {
        // Fetch both cases and deeds based on the search query
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/api/search/search_all?q=${searchQuery}`);
                setCases(response.data.cases);
                setDeeds(response.data.deeds);
            } catch (err) {
                setError("Error fetching search results. Please try again.");
                console.error(err);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    // Function to handle go back action
    const handleGoBack = () => {
        navigate(-1); // This navigates back to the previous page
    };

    return (
        <div className="search-results-page">
            <Header />
            <div className="search-results-container">
                <h1>Search Results for "{searchQuery}"</h1>

                {error && <p className="error-message">{error}</p>}

                {/* Display cases */}
                {cases.length > 0 && (
                    <div>
                        <h2>Cases</h2>
                        <table className="search-results-table">
                            <thead>
                                <tr>
                                    <th>Case Number</th>
                                    <th>NIC</th>
                                    <th>Court Area</th>
                                    <th>Assigned Lawyer</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases.map((caseItem) => (
                                    <tr key={caseItem._id}>
                                        <td data-label="Case Number">{caseItem.caseNumber}</td>
                                        <td data-label="NIC">{caseItem.nic}</td>
                                        <td data-label="Court-area">{caseItem.courtArea}</td>
                                        <td data-label="lawyer-id">{caseItem.lawyerId}</td>
                                        <td data-label="Status">{caseItem.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Display deeds */}
                {deeds.length > 0 && (
                    <div>
                        <h2>Deeds</h2>
                        <table className="search-results-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Pre-regi No</th>
                                    <th>Division</th>
                                    <th>Consideration Value</th>
                                    <th>Total Fee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deeds.map((deed) => (
                                    <tr key={deed._id}>
                                        <td data-label="Title">{deed.title}</td>
                                        <td data-label="preRegisteredNo">{deed.preRegisteredNo}</td>
                                        <td data-label="division">{deed.division}</td>
                                        <td data-label="considerationValue">{deed.considerationValue}</td>
                                        <td data-label="totalFee">{deed.totalFee}</td>
                                        <td data-label="Status">{deed.deedStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* If no results are found */}
                {cases.length === 0 && deeds.length === 0 && !error && (
                    <p>No results found for "{searchQuery}".</p>
                )}

                {/* Add Go Back button */}
                <button className="go-back-button" onClick={handleGoBack}>
                    Go Back
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default SearchResults;

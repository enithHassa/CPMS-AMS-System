import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation to get search query from header
import jsPDF from "jspdf"; // Import jsPDF
import './clientCases.css'; 
import Header from "../header";
import Footer from "../../components_home/Home_Footer";
import 'jspdf-autotable';

function ClientCase() {
    const { nic } = useParams(); // Get NIC from the URL params
    const [cases, setCases] = useState([]);
    const [filteredCases, setFilteredCases] = useState([]); // For storing filtered cases
    const [error, setError] = useState('');
    const location = useLocation(); // Get search query from header
    const searchQuery = new URLSearchParams(location.search).get("q") || ""; // Extract the search query

    useEffect(() => {
        // Fetch cases by NIC
        const fetchCases = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/case/get_cases_by_nic/${nic}`);
                setCases(response.data);
                filterCases(response.data); // Initial filter based on the search query
            } catch (err) {
                setError("Error fetching cases. Please try again.");
                console.error(err);
            }
        };

        fetchCases();
    }, [nic]);

    // Function to filter cases based on search query
    const filterCases = (casesData) => {
        const filtered = casesData.filter((caseData) => {
            return (
                caseData.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                caseData.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                caseData.status.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredCases(filtered);
    };

    // Function to filter complete and pending cases (for PDF generation)
    const filterByStatus = (status) => {
        return filteredCases.filter(caseData => caseData.status === status);
    };

    // Function to generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Print the header
        doc.setFontSize(18); // Optional: set a larger font size for the header
        doc.text("AMS - Law System", 20, 10); // Position at (20, 10)
        
        // Move down before printing "Case Report"
        doc.setFontSize(14);
        doc.text("Case Report", 20, 20); // Position for the Case Report title
        
        // Prepare table data
        const tableData = filteredCases.map(caseData => [
            caseData.caseNumber,
            caseData.nic,
            caseData.procedure,
            caseData.courtType,
            caseData.courtArea,
            caseData.monetaryValue,
            caseData.date,
            caseData.nature,
            caseData.status
        ]);

        // Add the table with column headers
        doc.autoTable({
            startY: 30, // Start below the title
            head: [['Case Number', 'NIC', 'Procedure', 'Court Type', 'Court Area', 'Monetary Value', 'Date', 'Nature', 'Status']],
            body: tableData,
            theme: 'striped', // Optional: add striped rows for better visibility
        });

        // Save the PDF
        doc.save("case_report.pdf"); 
    };

    return (
        <div>
            <Header />
            <div className="cases-container">
                <h1>Cases</h1> <br/>
                {error && <p className="error-message">{error}</p>}
                {filteredCases.length > 0 ? (
                    <table className="cases-table">
                        <thead>
                            <tr>
                                <th>Case Number</th>
                                <th>NIC</th>
                                <th>Procedure</th>
                                <th>Court Type</th>
                                <th>Court Area</th>
                                <th>Monetary Value</th>
                                <th>Date</th>
                                <th>Nature</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCases.map((caseData) => (
                                <tr key={caseData._id}>
                                    <td>{caseData.caseNumber}</td>
                                    <td>{caseData.nic}</td>
                                    <td>{caseData.procedure}</td>
                                    <td>{caseData.courtType}</td>
                                    <td>{caseData.courtArea}</td>
                                    <td>{caseData.monetaryValue}</td>
                                    <td>{caseData.date}</td>
                                    <td>{caseData.nature}</td>
                                    <td>{caseData.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No cases found for this NIC or search query.</p>
                )}
                <button onClick={generatePDF} className="btn btn-primary">Generate Report</button> {/* Button to generate report */}
            </div>
            <Footer />
        </div>
    );
}

export default ClientCase;

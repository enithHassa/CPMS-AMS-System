import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom"; 
import jsPDF from "jspdf"; 
import './clientDeeds.css'; 
import Header from "../header";
import Footer from "../../components_home/Home_Footer";
import 'jspdf-autotable';

function ClientDeeds() {
    const { nic } = useParams(); 
    const [grantorDeeds, setGrantorDeeds] = useState([]); // For grantor deeds
    const [granteeDeeds, setGranteeDeeds] = useState([]); // For grantee deeds
    const [error, setError] = useState('');
    const location = useLocation(); 
    const searchQuery = new URLSearchParams(location.search).get("q") || ""; 

    useEffect(() => {
        // Fetch deeds by NIC
        const fetchDeeds = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/deeds/get_deeds_by_nic/${nic}`);
                categorizeDeeds(response.data); // Categorize deeds as grantor or grantee
            } catch (err) {
                setError("Error fetching deeds. Please try again.");
                console.error(err);
            }
        };

        fetchDeeds();
    }, [nic]);

    // Function to categorize deeds based on whether NIC is grantor or grantee
    const categorizeDeeds = (deedsData) => {
        const grantor = deedsData.filter(deed => deed.grantorNic === nic);
        const grantee = deedsData.filter(deed => deed.granteeNic === nic);
        setGrantorDeeds(grantor);
        setGranteeDeeds(grantee);
    };

    // Function to generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Print the header
        doc.setFontSize(18); // Optional: set a larger font size for the header
        doc.text("AMS - Law System", 20, 10); // Position at (20, 10)

        // Move down before printing "Deed Report"
        doc.setFontSize(12); // Reset to normal font size
        doc.text("Deed Report", 20, 20);
        
        // Print Grantor Deeds section
        doc.text("Grantor Deeds:", 20, 30); // Position Grantor Deeds
        
        // Add grantor deeds table
        doc.autoTable({
            startY: 40, // Starting position for the table
            head: [['Deed Number', 'Title', 'Pre-Registered No', 'District', 'Division', 'Consideration Value', 'Lawyer Fee', 'Tax Fee', 'Total Fee', 'Status']],
            body: grantorDeeds.map(deed => [deed.deedNo, deed.title, deed.preRegisteredNo, deed.district, deed.division, deed.considerationValue, deed.lawyerFee, deed.taxFee, deed.totalFee, deed.deedStatus])
        });

        // Start a new page for Grantee Deeds
        doc.addPage();
        
        // Print Grantee Deeds section
        doc.text("Grantee Deeds:", 20, 10); // Position Grantee Deeds
        
        // Add grantee deeds table
        doc.autoTable({
            startY: 20, // Starting position for the table
            head: [['Deed Number', 'Title', 'Pre-Registered No', 'District', 'Division', 'Consideration Value', 'Lawyer Fee', 'Tax Fee', 'Total Fee', 'Status']],
            body: granteeDeeds.map(deed => [deed.deedNo, deed.title, deed.preRegisteredNo, deed.district, deed.division, deed.considerationValue, deed.lawyerFee, deed.taxFee, deed.totalFee, deed.deedStatus])
        });

        doc.save("deed_report.pdf"); 
    };

    return (
        <div>
            <Header />
            <div className="deeds-container">
                <h1>Deeds</h1> <br/>
                {error && <p className="error-message">{error}</p>}
                
                {grantorDeeds.length > 0 ? (
                    <div>
                        <h2>Grantor Deeds</h2>
                        <table className="deeds-table">
                            <thead>
                                <tr>
                                    <th>Deed Number</th>
                                    <th>Title</th>
                                    <th>Pre-Registered No</th>
                                    <th>District</th>
                                    <th>Division</th>
                                    <th>Consideration Value</th>
                                    <th>Lawyer Fee</th>
                                    <th>Tax Fee</th>
                                    <th>Total Fee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grantorDeeds.map((deedData) => (
                                    <tr key={deedData._id}>
                                        <td>{deedData.deedNo}</td>
                                        <td>{deedData.title}</td>
                                        <td>{deedData.preRegisteredNo}</td>
                                        <td>{deedData.district}</td>
                                        <td>{deedData.division}</td>
                                        <td>{deedData.considerationValue}</td>
                                        <td>{deedData.lawyerFee}</td>
                                        <td>{deedData.taxFee}</td>
                                        <td>{deedData.totalFee}</td>
                                        <td>{deedData.deedStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No deeds found where NIC is the grantor.</p>
                )}

                {granteeDeeds.length > 0 ? (
                    <div>
                        <h2>Grantee Deeds</h2>
                        <table className="deeds-table">
                            <thead>
                                <tr>
                                    <th>Deed Number</th>
                                    <th>Title</th>
                                    <th>Pre-Registered No</th>
                                    <th>District</th>
                                    <th>Division</th>
                                    <th>Consideration Value</th>
                                    <th>Lawyer Fee</th>
                                    <th>Tax Fee</th>
                                    <th>Total Fee</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {granteeDeeds.map((deedData) => (
                                    <tr key={deedData._id}>
                                        <td>{deedData.deedNo}</td>
                                        <td>{deedData.title}</td>
                                        <td>{deedData.preRegisteredNo}</td>
                                        <td>{deedData.district}</td>
                                        <td>{deedData.division}</td>
                                        <td>{deedData.considerationValue}</td>
                                        <td>{deedData.lawyerFee}</td>
                                        <td>{deedData.taxFee}</td>
                                        <td>{deedData.totalFee}</td>
                                        <td>{deedData.deedStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No deeds found where NIC is the grantee.</p>
                )}

                <button onClick={generatePDF} className="btn btn-primary">Generate Report</button> {/* Button to generate report */}
            </div>
            <Footer />
        </div>
    );
}

export default ClientDeeds;

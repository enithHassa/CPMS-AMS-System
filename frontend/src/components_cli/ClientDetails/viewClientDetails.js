import React from "react";
import { useNavigate } from "react-router-dom";
import './viewClientDetails.css'; 

function SuccessPage() {
    const navigate = useNavigate();

    const gotoViewButton = () => {
        navigate("/viewClient");
    };

    const goBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="success-page-container">
            <h1 className="success-message">Successful</h1>
            <div className="icon-container">
                <i className="bi bi-check2-circle success-icon"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="green" className="checkIcon" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                </svg>
            </div>
            <div className="button-container">
                <button className="view-button" onClick={gotoViewButton}>User Details Page</button>
                <button className="go-back-button" onClick={goBack}>Go Back</button>
            </div>
        </div>
    );
}

export default SuccessPage;

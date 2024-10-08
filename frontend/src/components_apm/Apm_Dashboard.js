import React from "react";
import NavBar from "../components_apm/Apm_NavBar"
import Footer from "../components_apm/Apm_Footer"

function Dashboard(){
       return(
        <div>
            <NavBar />
            
            <h1>Appointment Manager Dashboard</h1>

            <Footer/>
        </div>
    )
}

export default Dashboard;
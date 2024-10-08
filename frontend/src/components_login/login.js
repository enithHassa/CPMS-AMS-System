import React from "react";
import NavBar from "../components_home/Home_NavBar"
import Footer from "../components_home/Home_Footer"

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BalanceIcon from '@mui/icons-material/Balance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Login(){

    const userRoleDataTop = [
        {
            icon: <EditCalendarIcon/>,
            title: <a href="/apm_dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Appointment Manager</a>      
        },
        {
            icon: <SupportAgentIcon/>,
            title: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Support Agent</a> 
        },
        {
            icon: <BalanceIcon/>,
            title: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Legal Case Manager</a>     
        },
        {
            icon: <FileCopyIcon/>,
            title: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Document Manager</a> 
        }
      ];
    
      const userRoleDataBottom = [
        {
            icon: <MonetizationOnIcon/>,
            title: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Finance Manager</a>      
        },
        {
            icon: <SensorOccupiedIcon/>,
            title: <a href="/loginClient" style={{ textDecoration: 'none', color: 'inherit' }}>Client Portal</a> 
        },
        {
          icon: <AccountBalanceIcon/>,    
          title: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Attorney Manager</a>     
        },
        {
          icon: <ReceiptLongIcon/>,
          title: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Deed Manager</a> 
        }
      ];

       return(
        <div>
            <NavBar />
        
        <div className="login-container">
            <div className="login-section">
                <div className="login-section-top">
                    <h1>Select Your User Role</h1>
                </div>

                <div className="login-section-bottom">
                    {userRoleDataTop.map((data) => (
                    <div className="login-section-info" key={data.title}>
                        <div className="login-section-icon">{data.icon}</div>
                        <h2>{data.title}</h2>
                    </div>
                    ))}
                </div>

                <div className="login-section-bottom">
                    {userRoleDataBottom.map((data) => (
                    <div className="login-section-info" key={data.title}>
                        <div className="login-section-icon">{data.icon}</div>
                        <h2>{data.title}</h2>
                    </div>
                    ))}
                </div>
            </div>

        </div>
        <Footer/>
        </div>
    )
}

export default Login;

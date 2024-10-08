import React from "react";
import NavBar from "./Home_NavBar"
import Footer from "./Home_Footer"

import BannerBackground from "../assets/home/home-banner-background.png";
import BannerImage from "../assets/home/home-banner-image.png";
import AboutBackground from "../assets/home/about-background.png";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BalanceIcon from '@mui/icons-material/Balance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


function Home(){

    const featureInfoData = [
        {
          icon: <MonetizationOnIcon/>,
          title: "Finance Management",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        },
        {
          icon: <FileCopyIcon/>,
          title: "Document Management",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        },
        {
          icon: <BalanceIcon/>,
          title: "Legal Case Management",      
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        },
        {
          icon: <ReceiptLongIcon/>,
          title: "Deed Management",
          text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
        }
      ];

    return(
        <div className="home-container">
            <NavBar />

            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>

                <div className="home-text-section">
                    <h1 className="home-primary-heading">
                        Simplify Your Legal Practice with our Attorney Management System
                    </h1>
                    <p className="home-primary-text">
                        Make your day to day tasks easier and more efficient with our Attorney Management System. From scheduling 
                        appointments and case management to managing document, AMS helps you stay organized so you can focus on 
                        what you do best serving your clients.
                    </p>
                    <button className="home-secondary-button">
                        Contact Us <NavigateNextIcon />{" "}
                    </button>
                </div>

                <div className="home-image-section">
                    <img src={BannerImage} alt="" />
                </div>
            </div>

            <div className="home-feature-section">
                <div className="home-feature-background-image-container">
                    <img src={AboutBackground} alt="" />
                </div>

                <div className="home-feature-section-top">
                    <h1>Features of AMS</h1>
                </div>

                <div className="home-feature-section-bottom">
                    {featureInfoData.map((data) => (
                    <div className="home-feature-section-info" key={data.title}>            
                        <h2>{data.title}</h2>
                        <div className="home-feature-section-icon">{data.icon}</div>
                        <p>{data.text}</p>
                    </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Home;
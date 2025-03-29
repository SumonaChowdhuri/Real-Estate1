import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Booking from "../Pages/Booking/Booking";
import Search from "../Search/Search"; 
const LayoutBooking=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <Dashboard className="dashboard" />
            <Search className="dashboard" />
            <Booking className="dashboard" />
            
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutBooking;
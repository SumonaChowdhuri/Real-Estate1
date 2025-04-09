import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import  Seller from "../Pages/Seller/Seller";
// import Search from "../Search/Search"; 
const LayoutSeller=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            {/* <Dashboard className="dashboard" /> */}
            {/* <Search className="search"/> */}
            <Seller className="seller" />
        </div>
        </div>
        </div>


        </>
    )
}

export default LayoutSeller;
import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Search from "../Search/Search"; 
import Buyers from "../Pages/Buyers/Buyers";
const LayoutBuyers=()=>
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
            <Buyers className="dashboard" />
            
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutBuyers;
import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Agent from "../Pages/Agent/Agent";
import Search from "../Search/Search"; 
const LayoutAgent=()=>
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
            <Agent className="dashboard" />
            
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutAgent;
import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import Project from "../Pages/Project/Project"

const Layoutproject = () => {
    return(
        <>
        <div className="layout">
        <div className="main-container">
            <Sidebar/>
            <div className="content">
            <Header className="header" />
            <div className="pages">
              <Project className="Project" />
              </div>
            
           
            </div>
        </div>
        </div>
        </>
    )
}
export default Layoutproject;

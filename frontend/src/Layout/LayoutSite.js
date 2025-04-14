import React from "react";
import Header from "../Component/Header/Header";
import Sidebar from "../Component/Sidebar/Sidebar";
import SiteVisit from "../Pages/SiteVisit/SiteVisit";
const LayoutSite=()=>
{
    return (
        <>
          <div className="layout">
        <div className="main-container"><Sidebar/>
            <div className="content">
            <Header className="header" />
            <SiteVisit className="SiteVisit" />
            
            </div>
        </div>
        </div>


        </>
    )
}

export default LayoutSite;
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ComponentDashboard from '../components/Dashboard';

function Dashboard() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='block md:flex'>
      <ComponentDashboard />
      <Sidebar />
      </div>
    </React.Fragment>
  );
}

export default Dashboard;

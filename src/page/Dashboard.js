import React from "react";
import ComponentDashboard from "../components/Dashboard";
import NavbarDashboard from "../components/NavbarDashboard";
import Navbar from "../components/Navbar";
function Dashboard() {
  return (
    <React.Fragment>
      <Navbar />
      <ComponentDashboard />
    </React.Fragment>
  );
}

export default Dashboard;

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HomeDash from '../components/HomeDash';

function NewDash() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='block md:flex'>
      <HomeDash />
      <Sidebar />
      </div>
    </React.Fragment>
  );
}

export default NewDash;

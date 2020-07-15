import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ComponentAdd from "../components/Add";

function Add() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='block md:flex'>
      <ComponentAdd />
      <Sidebar />
      </div>
    </React.Fragment>
  );
}

export default Add;

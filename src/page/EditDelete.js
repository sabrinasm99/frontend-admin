import React from "react";
import Navbar from '../components/Navbar';
import EdDel from "../components/EditDelete";
import Sidebar from '../components/Sidebar';

function EditDelete() {
  return (
  <React.Fragment>
    <Navbar />
    <div className='block md:flex'>
      <EdDel />
      <Sidebar />
      </div>
  </React.Fragment>
  );
}

export default EditDelete;

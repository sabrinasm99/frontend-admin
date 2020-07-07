import React from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import shopbag from './location-shopping.svg';

function NavbarDashboard() {
  const test = useSelector(state => state.test);
  return (
    <React.Fragment>
      <div className="flex w-full text-purple-800 shadow-md bg-white relative" style={{zIndex: 9999}}>
      {/* <div className='absolute h-12 w-24 bg-white shadow-md right-0 text-black border-t-4 border-green-400' style={{top:'56px'}}>
        <div className='cursor-pointer font-semibold text-center hover:bg-green-300'>LOGOUT</div>
      </div> */}
        {/* <img src={shopbag} className="h-6 w-6 mt-4 mr-1 ml-3" /> */}
        <div className='p-4'>
          <i className="fas fa-gifts m-auto h-auto"></i>
          </div>
        <div className="p-2 text-xl md:text-2xl my-auto font-bold">
          <Link to='/'>{test.title}</Link>
        </div>
        
        <div className="ml-auto py-4 pr-0 sm:pr-4 text-sm sm:text-base text-right cursor-pointer hover:underline">
          Welcome, {test.name}
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavbarDashboard;

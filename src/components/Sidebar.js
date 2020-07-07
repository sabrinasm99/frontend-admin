import React from "react";
import { Link, useLocation } from "react-router-dom";
import udadd from "./undraw_add.svg";
import udeddel from "./undraw_eddel.svg";

function Sidebar() {
  const location = useLocation();
  return (
    <React.Fragment>
      <div className={`order-none md:order-first`}>
        <div className={`${location.pathname === '/dashboard'? 'flex md:block': 'hidden md:block' } w-4/5 md:w-48 md:min-h-screen m-auto md:m-0 pt-0 px-5 pb-5 md:p-0 md:bg-white sm:w-full flex-wrap`}>
            <div className="w-1/2 md:w-full flex-none p-1 px-2">
              <Link to='/edit-delete'>
              <div className={`${location.pathname === '/edit-delete' ? 'md:border-b-2 md:border-purple-800' : 'md:border-b-2 md:border-gray-200'} rounded-md md:rounded-none shadow-lg md:shadow-none text-center md:text-left bg-white p-3 h-full flex flex-col cursor-pointer`}>
                <img
                  src={udeddel}
                  alt="grocery"
                  className="block m-auto md:hidden"
                />
                <span className={`${location.pathname === '/edit-delete' ? 'text-black' : 'text-gray-600'} block pt-3 md:pt-0 mt-auto md:mt-0 text-black tracking-wider`}>
                  Edit/Delete Product
                </span>
              </div>
              </Link>
            </div>

            <div className="w-1/2  md:w-full flex-none p-1 px-2">
              <Link to='/add'>
              <div className={`${location.pathname === '/add' ? 'md:border-b-2 md:border-purple-800' : 'md:border-b-2 md:border-gray-200'} rounded-md md:rounded-none shadow-lg md:shadow-none text-center md:text-left bg-white p-3 h-full flex flex-col cursor-pointer`}>
                <img
                  src={udadd}
                  alt="mom & kids"
                  className="block m-auto md:hidden"
                />
                <span className={`${location.pathname === '/add' ? 'text-black' : 'text-gray-600'} block pt-3 md:pt-0 mt-auto md:mt-0 tracking-wider`}>
                  Add Product
                </span>
              </div>
              </Link>
            </div>
          </div>
      </div>
    </React.Fragment>
  );
}

export default Sidebar;

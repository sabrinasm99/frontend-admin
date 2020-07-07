import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Backdrop from "./Backdrop";
import useBackdrop from "../hooks/useBackdrop";
import Auth from "../settings/auth";

import tw, { styled } from "twin.macro";

const SearchInSearch = styled.div`
  ${tw`ml-auto p-4 text-purple-800`}
`;

function Navbar(props) {
  const test = useSelector((state) => state.test);
  const [backdrop, setBackdrop] = useBackdrop();
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [activeIcon, setActiveIcon] = useState(1);
  const location = useLocation();
  const history = useHistory();

  const onLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem('name');
    clearAll();
    history.push("/");
  };

  function clearAll() {
    setBackdrop(false);
    setShowMenu(false);
    setShowSearch(false);
    setShowAccount(false);
  }

  //   const account = {
  //     status: false,
  //     checkStatus() {
  //         return this.status;
  //     },
  //     on() {
  //         this.status = false
  //     },
  //     off() {
  //         this.status = true
  //     }
  // }

  return (
    <React.Fragment>
      <div
        className={` ${
          showSearch ? "z-0 hidden" : "block z-full"
        } flex w-full text-purple-800 bg-white top-0 inset-x-0 z-full shadow-md relative`}
        style={{ height: "61px" }}
      >
        {/* <div className="p-4 sm:text-lg lg:text-xl">
          <i className="fas fa-gifts"></i>
        </div> */}
        <div className="py-4 pl-4 text-lg sm:text-xl lg:text-2xl font-bold">
          <Link to="/">{test.title}</Link>
        </div>
        {/* <div className="m-auto relative hidden sm:block w-1/2">
          <div>
            <input
              type="search"
              className="pl-8 w-full pr-4 py-1  rounded-lg border-gray-200 border-2 focus:outline-none focus:shadow-outline text-gray-600 text-sm sm:text-base "
              placeholder="Search..."
            />
            <div className="absolute top-0 left-0 inline-flex items-center p-1 sm:p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x={0} y={0} width={24} height={24} stroke="none" />
                <circle cx={9} cy={9} r={5} />
                <line x1={17} y1={17} x2={13} y2={13} />
              </svg>
            </div>
          </div>
        </div> */}
        <div className="ml-auto my-auto">
          <div
            className={`${activeIcon === 1 && location.pathname === '/dashboard' ? 'bg-purple-800 text-white md:bg-white md:text-purple-800' : 'text-purple-800 bg-gray-200 md:bg-white md:text-gray-400'} py-1 px-2 md:py-0 md:px-0 rounded-full md:rounded-none  text-sm sm:text-base md:text-lg cursor-pointer`}
            onClick={() => {
              clearAll();
              setActiveIcon(1);
              history.push('/dashboard');
            }}
          >
            <i className="fas fa-home"></i>
          </div>
        </div>

        <div className="my-auto pl-3 md:pl-6">
          <div
            className={`${activeIcon === 2 ? 'bg-purple-800 text-white md:bg-white md:text-purple-800' : 'text-purple-800 bg-gray-200 md:bg-white md:text-gray-400'} py-1 px-2 md:py-0 md:px-0  rounded-full md:rounded-none text-sm sm:text-base md:text-lg cursor-pointer`}
            onClick={() => {
              clearAll();
              setActiveIcon(2)
            }}
          >
            <i className="fas fa-bell"></i>
          </div>
        </div>

        <div className="pr-4 pl-3 md:pl-6 py-4">
          <div
            className={`${activeIcon === 3 ? 'bg-purple-800 text-white md:bg-white md:text-purple-800' : 'text-purple-800 bg-gray-200 md:bg-white md:text-gray-400'} py-1 px-2 md:py-0 md:px-0 rounded-full md:rounded-none text-sm sm:text-base md:text-lg cursor-pointer`}
            onClick={() => {
              clearAll();
              setActiveIcon(3);
              setShowAccount(true);
              setBackdrop(true);
            }}
          >
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>

      <div
        className={`${
          showMenu ? "block" : "hidden"
        } fixed bg-purple-800 w-full sm:w-auto overflow-y-auto left-0 sm:left-auto p-4 border-purple-500 border-t-4 border-solid sm:h-auto h-full`}
        style={{
          // bottom: 0,
          // borderTopColor: "#6c63ff",
          // top:0,
          zIndex: 50,
          // top: "64.12px",
          top: "56.24px",
        }}
      >
        <div className="flex">
          <div className=" border-white border-b-2 text-white text-xl tracking-widest">
            Menu
          </div>
          <div
            onClick={() => {
              clearAll();
            }}
            className="cursor-pointer ml-auto text-white"
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="py-2">
          <Link to="/login">
            <div className="p-2 flex border-b border-white">
              <div className="pr-3 text-white">
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <div className="tracking-wider  text-white">Login</div>
            </div>
          </Link>

          <Link to="/login">
            <div className="p-2 flex border-b border-white">
              <div className="pr-3 text-white">
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="tracking-wider  text-white">Cart</div>
            </div>
          </Link>
        </div>
      </div>

      <div
        className={`${
          showAccount ? "block" : "hidden"
        } fixed text-purple-800 bg-white border-t-4 border-purple-500 left-auto right-0 w-40 h-24 shadow-md p-3 z-50`}
        style={{ top: "61px" }}
      >
        <div className="text-center border-b-2 border-purple-800 text-xl tracking-widest capitalize">
          {localStorage.getItem("name")}
        </div>
        <div
          className="flex py-2 px-1 items-baseline cursor-pointer"
          onClick={onLogout}
        >
          <div className="pr-2">
            <i className="fas fa-sign-out-alt"></i>
          </div>
          <div className="tracking-wider">Logout</div>
        </div>
      </div>

      <div
        className={`${
          showSearch ? "block" : "hidden"
        } fixed  bg-white left-0 z-full w-full shadow-md`}
        style={{ top: 0, height: "61px" }}
      >
        <div className="flex">
          <div
            className="p-4 text-purple-800 mr-auto"
            onClick={() => {
              clearAll();
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="my-auto w-56">
            <input
              className="w-full focus:outline-none pl-3"
              type="search"
              placeholder="Search..."
            />
          </div>
          <SearchInSearch>
            <i className="fas fa-search"></i>
          </SearchInSearch>
          {/* <button onClick={() => setDuthy(true)}>
            GANTI AYUNG
          </button> */}
          {/* <div className="my-auto text-purple-800 ml-3">
          </div> */}
        </div>
      </div>
      <Backdrop
        clearAll={() => {
          clearAll();
        }}
        backdrop={backdrop}
      />
    </React.Fragment>
  );
}

export default Navbar;

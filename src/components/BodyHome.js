import React, { useState, useEffect } from "react";
// import { connect, useSelector } from "react-redux";
import { Site } from "../config/site";
// import { changeName } from "../action/action";
import Axios from "axios";

// import { set } from "mongoose";

function BodyHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(`${Site.getProduct}`);
      setProducts(result.data);
    };

    getData();
  }, []);

  let productList = null;
  if (products.length > 0) {
    productList = products.map((val) => {
      return (
        <div
          className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex-none p-1 py-3 md:p-2"
          key={val._id}
        >
          <div
            className="rounded-md shadow-md h-64 p-3 md:p-2 flex flex-col bg-white text-center "
            // style={{ maxWidth: "180px" }}
          >
            <div>
              <img
                src={`${Site.ori}/${val.image}`}
                alt="product"
                className="h-24 md:h-32 m-auto"
              />
              <div className="absolute top-0 left-0 inline-flex items-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x={0} y={0} width={24} height={24} stroke="none" />
                  <circle cx={10} cy={10} r={7} />
                  <line x1={21} y1={21} x2={15} y2={15} />
                </svg>
              </div>
            </div>
            <div className="mt-auto w-full">
              <span className="w-full text-gray-800 text-sm md:text-base">
                {val.name}
              </span>
              <h6 className="mx-auto text-base md:text-lg font-medium md:font-semibold">
                Rp{val.price.toLocaleString("id-ID")}
              </h6>
              <button className="m-auto mt-1 bg-purple-800 text-white rounded-sm">
                <i className="fas fa-plus p-1"></i>
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <div className="w-4/5 m-auto">
        <h1 className="text-lg font-medium">All Product</h1>
        <hr />
        <div className="w-full py-2 md:py-5 flex flex-wrap m-auto">
          {productList}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  test: state.test,
});

export default BodyHome;

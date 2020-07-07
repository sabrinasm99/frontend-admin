import React, { useState, useEffect } from "react";
import {useLocation, Redirect} from 'react-router-dom';
import { Site } from "../config/site";
import Axios from "axios";
// import Auth from '../settings/auth';
// import account from './Navbar';

function Dashboard() {
  const [input, setInput] = useState({ name: "", price: "" });
  const [fileObj, setFileObj] = useState(null);
  const [fileblob, setFileblob] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentEdit, setCurrentEdit] = useState({
    _id: "",
    name: "",
    price: "",
    image: "",
    fileObj: null,
    fileblob: null,
  });
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  

  const location = useLocation();
  
  useEffect(() => {
    const getData = async () => {
      const result = await Axios.get(Site.getProduct);
      setProducts(result.data);
    };

    getData();
  }, []);

  const onChangeInput = (event) => {
    const newInput = {
      ...input,
      [event.target.name]: event.target.value,
    };
    setInput(newInput);
  };

  const onChangeImage = (event) => {
    let [file] = event.target.files;
    if (file) {
      setFileblob(URL.createObjectURL(file));
      setFileObj(file);
    } else {
      setFileblob(null);
      setFileObj(null);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("productImage", fileObj);
    formData.append("name", input.name);
    formData.append("price", input.price);
    Axios.post(`${Site.uploadProduct}`, formData).then((res) => {
      Axios.get(`${Site.getProduct}`).then((res) => {
        const newInput = {
          name: "",
          price: "",
        };
        setInput(newInput);
        setFileObj(null);
        setFileblob(null);
        setProducts(res.data);
      });
    });
  };

  // EDIT SYSTEM
  const editProductOnClick = (id) => {
    Axios.get(`${Site.getProduct}/${id}`)
      .then((res) => {
        const { _id, name, price, image } = res.data;
        setShowEditMenu(true);
        const newCurrentEdit = {
          ...currentEdit,
          _id,
          name,
          price,
          image,
        };
        setCurrentEdit(newCurrentEdit);
      })
      .catch((err) => console.log(err));
  };

  const onChangeInputEdit = (event) => {
    const newCurrentEdit = {
      ...currentEdit,
      [event.target.name]: event.target.value,
    };
    setCurrentEdit(newCurrentEdit);
  };

  const onChangeFile = (event) => {
    let [file] = event.target.files;
    if (file !== undefined) {
      const newCurrentEdit = {
        ...currentEdit,
        fileObj: file,
        fileblob: URL.createObjectURL(file),
      };
      setCurrentEdit(newCurrentEdit);
    } else {
      const newCurrentEdit = {
        ...currentEdit,
        fileObj: null,
        fileblob: null,
      };
      setCurrentEdit(newCurrentEdit);
    }
  };

  const onCancelEdit = () => {
    setShowEditMenu(false);
    const newCurrentEdit = {
      ...currentEdit,
      fileObj: null,
      fileblob: null,
    };
    setCurrentEdit(newCurrentEdit);
  };

  const onSaveEdit = () => {
    let formData = new FormData();
    formData.append("name", currentEdit.name);
    formData.append("price", currentEdit.price);
    if (currentEdit.fileObj !== undefined || currentEdit.fileObj !== null)
      formData.append("productImage", currentEdit.fileObj);
    Axios.put(`${Site.updateProduct}/${currentEdit._id}`, formData)
      .then((res) => {
        Axios.get(`${Site.getProduct}`)
          .then((res) => {
            setProducts(res.data);
            setShowEditMenu(false);
            const newCurrentEdit = {
              ...currentEdit,
              fileObj: null,
              fileblob: null,
            };
            setCurrentEdit(newCurrentEdit);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  let editMenu = null;
  let src = `${Site.ori}/${currentEdit.image}`;
  if (currentEdit.fileObj !== null) {
    src = currentEdit.fileblob;
  }

  if (showEditMenu)
    editMenu = (
      <React.Fragment>
        <div
          style={{
            overflowY: "auto",
            position: "fixed",
            zIndex: 200,
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            boxShadow: "1px 1px 5px black",
            left: "50%",
            top: "50%",
            padding: "20px",
            backfaceVisibility: "hidden",
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <h2 className="font-semibold text-lg">Edit Menu</h2>
            </div>
            <div
              className="text-purple-800 cursor-pointer"
              style={{ marginTop: "6px", marginLeft: "auto" }}
            >
              <i onClick={onCancelEdit} className="far fa-times-circle fa-2x" />
            </div>
          </div>
          <hr />
          <div className="form-group flex mt-3">
            <label className="w-1/4">Name</label>
            <input
              className="form-control w-3/4 border border-solid border-purple-800 pl-1 focus:outline-none"
              type="text"
              name="name"
              value={currentEdit.name}
              onChange={onChangeInputEdit}
            />
          </div>
          <div className="form-group flex mt-1">
            <label className="w-1/4">Price</label>
            <input
              className="form-control w-3/4 border border-solid border-purple-800 pl-1 focus:outline-none"
              type="number"
              name="price"
              value={currentEdit.price}
              onChange={onChangeInputEdit}
            />
          </div>
          <div className="form-group">
            <div>Picture</div>
            <img
              alt="product"
              style={{ width: "100px", height: "100px" }}
              src={src}
            />

            <input
              className="form-control-file"
              style={{ verticalAlign: "bottom" }}
              onChange={onChangeFile}
              type="file"
            />
          </div>
          <div className="form-group mt-3">
            <button
              onClick={onSaveEdit}
              className="btn btn-warning p-1 px-3 bg-purple-800 text-white focus:outline-none border border-purple-800"
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="btn btn-primary ml-1 p-1 px-3 border border-purple-800 font-semibold text-purple-800 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
        <div
          onClick={onCancelEdit}
          style={{
            position: "fixed",
            zIndex: 199,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </React.Fragment>
    );

  // DELETE SYSTEM
  const deleteProductOnClick = (id) => {
    Axios.get(`${Site.getProduct}/${id}`)
      .then((res) => {
        const { _id, name } = res.data;
        setShowDeleteMenu(true);
        const newCurrentEdit = {
          ...currentEdit,
          _id,
          name,
        };
        setCurrentEdit(newCurrentEdit);
      })
      .catch((err) => console.log(err));
  };

  const deleteProductConfirm = (id) => {
    Axios.delete(`${Site.removeProduct}/${id}`)
      .then((msg) => {
        Axios.get(`${Site.getProduct}`)
          .then((res) => {
            setShowDeleteMenu(false);
            setProducts(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteProductCancel = () => {
    setShowDeleteMenu(false);
  };

  let deleteMenu = null;
  if (showDeleteMenu) {
    deleteMenu = (
      <div>
        <div
          style={{
            position: "fixed",
            backgroundColor: "white",
            zIndex: 301,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "300px",
            padding: "10px",
          }}
        >
          <h2 className="text-warning font-semibold text-lg">Warning</h2>
          <hr />
          <p className="mt-3">
            You <strong style={{ color: "red" }}>cannot</strong> undo deletion
            process.
          </p>
          <p>
            Do you want to delete{" "}
            <strong className="text-purple-800">{currentEdit.name}</strong>?
          </p>
          <div style={{ textAlign: "right" }} className="mt-3">
            <button
              onClick={() => deleteProductConfirm(currentEdit._id)}
              // style={{ padding: "10px 30px" }}
              className="btn btn-warning mr-1 p-1 px-3 bg-purple-800 border border-purple-800 text-white focus:outline-none"
            >
              Yes
            </button>
            <button
              onClick={deleteProductCancel}
              // style={{ padding: "10px 30px" }}
              className="btn btn-info p-1 px-3 text-purple-800 border border-purple-800 font-semibold focus:outline-none"
            >
              No
            </button>
          </div>
        </div>
        <div
          onClick={deleteProductCancel}
          style={{
            position: "fixed",
            zIndex: 300,
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </div>
    );
  }

  let productList = null;

  if (products.length > 0) {
    productList = products.map((val) => {
      return (
        <div key={val._id}>
          <div className="hidden sm:flex w-full p-1">
            <div className="flex w-1/3 ">
              <img
                src={`${Site.ori}/${val.image}`}
                className=" m-auto w-1/3 inline"
                style={{ height: "50px", width: "50px" }}
                alt={val.name}
              />
              <h6 className="w-2/3 m-auto  text-gray-700">{val.name}</h6>
            </div>
            <div className="w-1/3 hidden sm:flex">
              <div className="m-auto text-gray-500">
                Rp{val.price.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="w-1/3 hidden sm:flex p-3">
              <div className="md:w-1/2 w-full text-green-700 cursor-pointer text-center">
                <div
                  onClick={() => editProductOnClick(val._id)}
                  className="fas fa-edit"
                ></div>
              </div>
              <div className="md:w-1/2 w-full text-red-700 cursor-pointer text-center">
                <div
                  onClick={() => deleteProductOnClick(val._id)}
                  className="fas fa-trash"
                ></div>
              </div>
            </div>
          </div>

          <div className="block sm:hidden w-full border border-gray-200 rounded-md bg-white mb-3">
            <div className="w-full flex flex-col">
              <div className="w-full border-b border-gray-200 py-1">
                <img
                  src={`${Site.ori}/${val.image}`}
                  className="m-auto h-24"
                  // style={{ height: "100px" }}
                  alt={val.name}
                />
              </div>
              <div className="w-full flex border-b border-gray-200">
                <div className="w-1/3 bg-purple-800 text-white py-1 px-2 flex items-center font-semibold text-sm">
                  Name
                </div>
                <div className="w-2/3 py-1 px-2 text-gray-700">{val.name}</div>
              </div>
              <div className="w-full flex border-b border-gray-200">
                <div className="w-1/3 bg-purple-800 text-white py-1 px-2 font-semibold text-sm">
                  Price
                </div>
                <div className="w-2/3 py-1 px-2 text-gray-700">
                  Rp{val.price.toLocaleString("id-ID")}
                </div>
              </div>
              <div className="w-full flex ">
                <div className="w-1/3 bg-purple-800 text-white py-1 px-2 rounded-bl-md font-semibold text-sm">
                  Edit/Delete
                </div>
                <div className="w-2/3 flex py-1 px-2">
                  <div
                    className="mx-auto text-green-700"
                    onClick={() => editProductOnClick(val._id)}
                  >
                    <i className="fas fa-edit"></i>
                  </div>
                  <div
                    className="mx-auto text-red-700"
                    onClick={() => deleteProductOnClick(val._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  // if (auth) {
  //   return <Redirect to='/dashboard' />;
  // }
  return (
    <React.Fragment>
      {/* <div> */}
      <div className='w-full sm:w-4/5 p-3 mx-0 sm:mx-auto mt-px61'>
        <div className="px-3 sm:px-0">
          <div className="w-full font-bold text-lg sm:text-xl md:text-2xl">
            Product List
          </div>
          <hr />

          <div className="mt-3 w-full hidden rounded-md shadow-md border border-gray-200 bg-white sm:flex flex-col">
            <div className="rounded-t-md border-b border-gray-200 bg-purple-800 text-white text-center flex">
              <div className="font-bold w-1/3 m-auto text-lg tracking-wider p-2">
                Name
              </div>
              <div className="font-bold w-1/3 m-auto text-lg tracking-wider p-2">
                Price
              </div>
              <div className="font-bold w-1/3 m-auto text-lg tracking-wider p-2">
                Edit/Delete
              </div>
            </div>
            <div className="w-full">{productList}</div>
          </div>

          <div
            className="block sm:hidden mt-3 overflow-y-auto"
            style={{ height: "400px" }}
          >
            {productList}
          </div>

          <div className="font-bold text-lg mt-3  sm:text-xl md:text-2xl">
            Add Product
          </div>
          <hr />

          <form onSubmit={onSubmit} className="w-full  mt-3">
            <div className="block md:flex">
              <div className="w-full md:w-1/2 pr-1">
                <label className="block">Name :</label>
                <input
                  type="text"
                  className=" form-control border-solid border border-gray-300 block w-full p-1 pl-3 focus:outline-none"
                  // style={{ backgroundColor: "#edf2f7" }}
                  value={input.name}
                  onChange={onChangeInput}
                  name="name"
                />

                <label className="block">Price :</label>
                <input
                  type="text"
                  className="form-control border-solid border border-gray-300 block w-full p-1 pl-3 focus:outline-none"
                  value={input.price}
                  onChange={onChangeInput}
                  name="price"
                />
                <br />
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  // padding: "5px 10px",
                }}
                className="w-full md:w-1/2 pl-1" // className='py-24 px-48 sm:py-0 sm:px-0'
              >
                <label className="font-semibold focus:outline-none">
                  Upload Image
                </label>
                {fileblob !== null ? (
                  <img src={fileblob} style={{ width: "100%" }} alt="product" />
                ) : (
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      width: "100%",
                      height: "15em",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "grey",
                        fontSize: "2em",
                        letterSpacing: "3px",
                        fontWeight: 400,
                      }}
                      className="px-1"
                    >
                      PREVIEW IMAGE
                    </span>
                  </div>
                )}

                <br />
                <div className="form-group">
                  <input
                    onChange={onChangeImage}
                    className="form-control-file"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <button
              style={{ minWidth: 0 }}
              className="focus:outline-none my-4 w-full p-1 bg-purple-800 text-white text-lg font-semibold hover:bg-purple-600 tracking-widest"
              type="submit"
              onClick={onSubmit}
            >
              ADD PRODUCT
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
      {editMenu}
      {deleteMenu}
      
    </React.Fragment>
  );
}

export default Dashboard;

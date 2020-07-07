import React, { Component } from "react";
import { connect } from "react-redux";
import { changeName } from "../action/action";
import youcorange from "./yc1000-o.jpg";
import nabaticheese from "./nabati-cheese.jpg";
import cimoryleci from "./cimory-leci.jpg";
import indomieaceh from "./indomie-aceh.jpg";
import shopbag from "./location-shopping.svg";
import Axios from "axios";
import { toast } from "react-toastify";

export class Body extends Component {
  state = {
    input: {
      name: "",
      price: ""
    },
    file: null,
    fileblob: null,
    arr: []
  };

  onChangeInput = event => {
    const input = {
      ...this.state.input,
      [event.target.name]: event.target.value
    };
    this.setState({ input });
  };
  onChangeImage = event => {
    let [file] = event.target.files;
    if (file !== undefined) {
      this.setState({ fileblob: URL.createObjectURL(file), file });
    } else {
      this.setState({ fileblob: null, file: null });
    }
  };
  onSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("productImage", this.state.file);
    formData.append("name", this.state.input.name);
    formData.append("price", this.state.input.price);
    Axios.post("http://localhost:5000/upload-product", formData).then(res => {
      console.log("Success");
    });
  };

  getData = () => {
    Axios.get("http://localhost:5000/get-product")
      .then(res => {
        console.log(res.data);
        this.setState({
          input: {
            name: "",
            price: ""
          },
          file: null,
          fileblob: null,
          arr: res.data
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <h2>Add Product</h2>
        <hr />
        <form onSubmit={this.onSubmit}>
          <label>Name :</label> <br />
          <input
            type="text"
            className="border border-black border-solid form-control"
            value={this.state.input.name}
            onChange={this.onChangeInput}
            name="name"
          />
          <br />
          <label>Price :</label> <br />
          <input
            type="text"
            className="border border-black border-solid form-control"
            value={this.state.input.price}
            onChange={this.onChangeInput}
            name="price"
          />
          <br />
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              padding: "10px 20px"
            }}
          >
            <label>Upload Image</label>
            {this.state.fileblob !== null ? (
              <img
                src={this.state.fileblob}
                style={{ width: "100%" }}
                alt="product"
              />
            ) : (
              <div
                style={{
                  backgroundColor: "lightgray",
                  width: "100%",
                  height: "15em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <span
                  style={{
                    color: "grey",
                    fontSize: "2em",
                    letterSpacing: "3px",
                    fontWeight: 400
                  }}
                >
                  PREVIEW IMAGE
                </span>
              </div>
            )}

            <br />
            <div className="form-group">
              <input
                onChange={this.onChangeImage}
                className="form-control-file"
                type="file"
                accept="image/*"
              />
            </div>
          </div>
          <button
            style={{ minWidth: 0 }}
            className="border border-black border-solid m-auto"
            type="submit"
            onClick={this.onSubmit}
          >
            Add Product
          </button>
        </form>
      </React.Fragment>
    );
  }
}

// onFileChange = event => {
//   this.setState({
//     input: {
//       ...this.state.input,
//       file: event.target.files[0]
//     }
//   })
//   console.log(this.state.input.file)
//   let reader = new FileReader();
//   reader.onloadend = () => {
//     this.setState({
//       input: {
//         ...this.state.input,
//         imagePreviewUrl: reader.result
//       }
//     }, () => {

//     });
//   }
//   reader.readAsDataURL(event.target.files[0])
// }

// <div className="bg-white border border-black border-solid m-0 inline-block fixed rounded-full bottom-0 p-4"style={{right: '2%'}}>
//   <img src={shopbag} className='h-6 w-6' />
// </div>

const mapStateToProps = state => ({
  test: state.test
});

export default connect(mapStateToProps, {
  changeName
})(Body);

import React, { Component } from "react";
import { connect } from "react-redux";

export class SidebarFood extends Component {
  render() {
    return (
      <div className="h-screen w-1/6" style={{backgroundColor:'#e5ffe4'}}>
        {/* <div className="flex p-2"> */}
        {/* <img src={food} className="h-6 w-6 p-2" /> */}
        <div className="p-2 pl-5 bg-green-400">{this.props.test.menu1}</div>
        {/* </div> */}
        {/* <div className="flex p-2"> */}
        {/* <img src={beverage} className='h-6 w-6 p-2' /> */}
        <div className="p-2 pl-5">{this.props.test.menu2}</div>
        {/* </div> */}
        <div className="p-2 pl-5">{this.props.test.menu3}</div>
        <div className="p-2 pl-5">{this.props.test.menu4}</div>
        <div className="p-2 pl-5">{this.props.test.menu5}</div>
        <div className="p-2 pl-5">{this.props.test.menu6}</div>
        <div className="p-2 pl-5">{this.props.test.menu7}</div>
        <div className="p-2 pl-5">{this.props.test.menu8}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    test: state.test
  });
  
  export default connect(mapStateToProps)(SidebarFood);

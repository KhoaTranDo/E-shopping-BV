import React, { Component } from "react";
import {Link} from "react-router-dom"
class slider extends Component{
  render() {
    return (
      <div className="left-sidebar col-4">
        <h2>Account</h2>
        <div className="panel-group category-products" id="accordian">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link name="profile" to='/profile'>
                  Profile
                <span className="badge pull-right">
                  <i className="fa fa-plus"></i>
                </span>
                </Link>
              </h4>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <Link name="myproduct" to='/Product' >
                  My Product
                <span className="badge pull-right">
                  <i className="fa fa-plus"></i>
                </span>
                </Link>
              </h4>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default slider;

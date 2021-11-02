import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AppContext } from "../homepage/AppContext";


class headerMiddle extends Component {
  static contextType=AppContext;
  constructor(props) {
    super(props);
    this.state = {
      isLogin: localStorage.token ? true : false,
    };
    this.Loadlogin = this.Loadlogin.bind(this);
    this.Logout = this.Logout.bind(this);
  }
  Loadlogin() {
    let a = localStorage.token ? true : false;
    if (a) {
      return (
        <>
          <li>
            <Link to="/profile">
              <i className="fa fa-user"></i> Account
            </Link>
          </li>
          <li>
            <Link to="/member" onClick={this.Logout}>
              <i className="fa fa-lock"></i> Logout
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <li>
          <Link to="/member">
            <i className="fa fa-lock"></i> Login
          </Link>
        </li>
      );
    }
  }
  Logout(e) {
    e.preventDefault();
    localStorage.removeItem("data");
    this.setState({ isLogin: false });
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    this.props.history.push("/member");
  }
  render() {
    return (
      <>
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="/">
                    <img src="images/home/logo.png" alt="" />
                  </Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="#/">Canada</Link>
                      </li>
                      <li>
                        <Link to="#/">UK</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="#/">Canadian Dollar</Link>
                      </li>
                      <li>
                        <Link to="#/">Pound</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/">
                        <i className="fa fa-star"></i> Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <i className="fa fa-crosshairs"></i> Checkout
                      </Link>
                    </li>
                    <li>
                     
                           
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart"></i>  {this.context.state.cart} Cart
                      </Link>
                         
                    </li>
                    {/* <li><Link to="/#"><i className="fa fa-user"></i> Account</Link></li>
                            <li><Link to="/member"><i className="fa fa-lock"></i> Login</Link></li> */}
                    {this.Loadlogin()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(headerMiddle);

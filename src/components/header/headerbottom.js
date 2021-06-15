import React, { Component } from "react";
import{Link} from "react-router-dom"

class headerBottom extends Component {
  render() {
      return(
        <div className="header-bottom">
        <div className="container">
            <div className="row">
                <div className="col-sm-9">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="mainmenu pull-left">
                        <ul className="nav navbar-nav collapse navbar-collapse">
                            <li><Link to="/">Home</Link></li>
                            <li className="dropdown"><a href="/">Shop<i className="fa fa-angle-down"></i></a>
                                <ul role="menu" className="sub-menu">
                                    <li><a href="shop.html">Products</a></li>
                                    <li><a href="product-details.html">Product Details</a></li> 
                                    <li><a href="checkout.html">Checkout</a></li> 
                                    <li><a href="cart.html">Cart</a></li> 
                                    <li><a href="login.html">Login</a></li> 
                                </ul>
                            </li> 
                            <li className="dropdown"><a href="/blog" className="active">Blog<i className="fa fa-angle-down"></i></a>
                            </li> 
                            <li><Link to="/404">404</Link></li>
                            <li><Link to="/404">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="search_box pull-right">
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
      )
  }
}
export default headerBottom;

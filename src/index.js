import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Blogdetail from "./components/Blog/blogdetail";
import Blog from "./components/Blog/blog";
import None from "./components/layout/none";
import Homepage from "./components/homepage/Homepage";
import Account from "./components/Member/index"
import Productdetail from "./components/homepage/Productdetail"
import Cart from "./components/homepage/cart"
ReactDOM.render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route  path="/cart" component={Cart}></Route>
        <Route  path="/blog/detail/:id" component={Blogdetail}></Route>
        <Route path="/Detail/:slug" component={Productdetail}></Route>
        <Route  path="/blog" component={Blog}></Route>
        <Route  path="/404" component={None}></Route>
        <Route  component={Account}></Route>
      </Switch>
    </App>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

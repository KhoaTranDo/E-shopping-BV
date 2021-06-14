import React, { Component } from "react";
import App from "./App";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
// Product
import Myproduct from "./Product/myProduct"
import Addproduct from "./Product/addproduct"
import Editproduct from "./Product/editproduct"
// Account
import Updateaccount from "./Account/updateaccount"
import Myaccount from "./Account/profile"
import Member from "./member"

class index extends Component {
  render() {
    return (
        <App>
          <Switch>
            <Route path="/Account/Update" component={Updateaccount}></Route>
            <Route path="/Product/Addnew" component={Addproduct}></Route>
            <Route path="/Product/Edit/:slug" component={Editproduct}></Route>
            <Route path="/Product" component={Myproduct}></Route>
            {/* <Route path="/Product/Delete" component={Editproduct}></Route> */}
            <Route path="/profile" component={Myaccount}></Route>
            <Route path="/member" component={Member}></Route>
          </Switch>
        </App>

    );
  }
}

export default index;

import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      level: 0,
      errors: {},
    };
    this.Handlechange = this.Handlechange.bind(this);
    this.SubmitData = this.SubmitData.bind(this);
    this.Rendererror = this.Rendererror.bind(this);
  }
  Handlechange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  SubmitData(e) {
    e.preventDefault();
    const { email, password, errors, level } = this.state;
    let validate = 0;
    const errorms = {};
    errorms["password"] = errorms["email"] = "";

    if (email === "") {
      validate = 1;
      errorms["email"] = "Vui long nhap email";
    } else {
      let vldemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (vldemail.test(String(email).toLocaleLowerCase()) !== true) {
        validate = 1;
        errorms["email"] = "Email sai dinh dang";
      } 
    }
    if (password === "") {
      validate = 1;
      errorms["password"] = "Vui long nhap mat khau";
    } 
    if (validate === 0) {
      let data = { email, password, level };
      axios
        .post("http://localhost:8080/laravel/public/api/login", data)
        .then((res) => {
          if (res.data.errors) {
            this.setState({
              errors: res.data.errors,
            });
          } else {
            localStorage.setItem("token", res.data.success["token"]);
            localStorage.setItem("data", JSON.stringify(res.data.Auth));
            localStorage.setItem("isLogin", JSON.stringify(true));
            this.props.history.push("/");
          }
        });
    } else {
      this.setState({
        errors: errorms,
      });
    }
  }
  Rendererror() {
    const { errors } = this.state;
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((value, index) => {
        return (
          <p key={index} id="error" style={{ color: "red" }}>
            {errors[value]}
          </p>
        );
      });
    }
  }
  render() {
    return (
      <>
        <div className="login-form">
          <h2>Login to your account</h2>
          <form action="#">
            <input
              id="email"
              type="text"
              onChange={this.Handlechange}
              placeholder="Email Address"
            />
            <input
              id="password"
              type="password"
              onChange={this.Handlechange}
              placeholder="Password"
            />
            <span>
              <input type="checkbox" className="checkbox" />
              Keep me signed in
            </span>
            {/* <p id='error' style={{color: 'red'}} ></p> */}
            {this.Rendererror()}
            <button
              type="submit"
              onClick={this.SubmitData}
              className="btn btn-default"
            >
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(Login);

import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";

class UpdateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      avatar: "",
      level: 0,
      error: "",
      errorForm: {},
    };

    this.Handlechange = this.Handlechange.bind(this);
    this.HandleUserInputFile = this.HandleUserInputFile.bind(this);
    this.Submitdata = this.Submitdata.bind(this);
    this.renderError = this.renderError.bind(this);
  }
  componentDidMount() {
    if (localStorage.data) {
      let a = JSON.parse(localStorage.data);
      this.setState({
        name: a.name,
        email: a.email,
        phone: a.phone,
        address: a.address,
        avatar: a.avatar,
        id: a.id,
      });
    } else {
      <Redirect to="/login"></Redirect>;
    }
  }
  Handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  Submitdata(e) {
    e.preventDefault();
    let validate = 0;
    let a = {};
    let {
      name,
      email,
      password,
      phone,
      address,
      avatar,
      level,
      id,
    } = this.state;
    if (!name) {
      validate = 1;
      a["name"] = "Vui long nhap ten";
    }
    if (!phone) {
      validate = 1;
      a["phone"] = "Vui long nhap số điện thoại";
    }
    if (!address) {
      validate += 1;
      a["address"] = "Vui long nhap dia chi";
    }
   
    if (validate === 0) {
      const formData = new FormData();
      let token = localStorage.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token, // CÓ dấu cách
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("avatar", avatar);
      formData.append("level", level);
      axios
        .post(
          "http://localhost:8080/laravel/public/api/user/update/" + id,
          formData,
          config
        )
        .then((res) => {
          localStorage.data = JSON.stringify(res.data["Auth"]);
        });
    }else{
      this.setState({
        errorForm: a,
      });
    }
  }
  HandleUserInputFile(e) {
    const typeimage = ["jpg", "PNG", "png", "jpeg", "JPG"];
    const file = e.target.files;
    if (file[0].size < 1024 * 1024) {
      const check = file[0].type.split("/");
      if (typeimage.includes(check[1])) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            avatar: e.target.result,
            file: file[0],
            error: "",
          });
        };
        reader.readAsDataURL(file[0]);
      } else {
        this.setState({
          error: "File đẩy lên không phải hình ảnh",
        });
      }
    } else {
      this.setState({
        error: "Anh vượt quá 1mb",
      });
    }
  }

  renderError() {
    let { errorForm } = this.state;
    if (Object.keys(errorForm).length > 0) {
      return Object.keys(errorForm).map((key, index) => {
        return (
          <p style={{ color: "red" }} key={index}>
            {errorForm[key]}
          </p>
        );
      });
    }
  }

  //tu dong render khi co state thay doi
  render() {
    return (
      <>
        <div className="signup-form">
          <h2>Profile</h2>

          <form action="#">
            <input
              type="text"
              name="name"
              onChange={this.Handlechange}
              value={this.state.name}
            />
            <input
              type="text"
              name="email"
              onChange={this.Handlechange}
              value={this.state.email}
              readOnly
            />
            <input
              type="password"
              name="password"
              onChange={this.Handlechange}
              placeholder="*********"
              value={this.state.password}
            />
            <input
              type="text"
              name="phone"
              onChange={this.Handlechange}
              value={this.state.phone}
            />
            <input
              type="text"
              name="address"
              onChange={this.Handlechange}
              value={this.state.address}
            />
            <input
              type="file"
              name="image"
              onChange={this.HandleUserInputFile}
              placeholder={this.state.avatar}
            />
            <p style={{ color: "red" }}>{this.state.error}</p>
            {/* Set level default =0 */}
            <p id="error" style={{ color: "red" }}></p>
            {this.renderError()}
            <button onClick={this.Submitdata} className="btn btn-default">
              Update
            </button>
            <br />
          </form>
        </div>
      </>
    );
  }
}

export default UpdateAccount;

// - bat loi form:
// + FE tu bat : 15,16
// + BE tu bat: (khi e gui data qua, dung thi tien hanh insert data -> DB)
// => Object, lay loi tu BE neu co, hien thi ra man hinh

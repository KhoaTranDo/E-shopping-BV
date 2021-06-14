import axios from "axios";
import { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      avatar: "",
      level: 0,
      error: "",
      errorForm: {}
    };

    this.Handlechange = this.Handlechange.bind(this);
    this.HandleUserInputFile = this.HandleUserInputFile.bind(this);
    this.Submitdata = this.Submitdata.bind(this);
    this.renderError = this.renderError.bind(this);

  }
  Handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  Submitdata(e) {
    e.preventDefault()
    let validate = 0;
    let a=this.state.errorForm;
    let vldemail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let { name, email, password, phone, address, avatar,level } = this.state;
    if(!name)
    {
      validate+=1
      a['name']="Vui long nhap ten"
    }
    else{
      validate =0
      a['name']=""
    }

    if(!email)
    {
      validate+=1
      a['email']="Vui long email"
    }
    else{
      if (vldemail.test(String(email).toLocaleLowerCase()) !== true) {
        validate += 1;
        a['email']="Email sai dinh dang"
        console.log(a)
        this.setState({
           errorForm: a,
         });
      } 
      else{
        validate =0
        a['email']=""
      }
    }
    console.log(a)
    if (validate === 0) {
      this.setState({
        errorForm: {}
      });
      let data={name,email,password,phone,address,avatar,level}
      axios.post("http://localhost:8080/laravel/public/api/register", data)
      .then(res=>{
        console.log(res)
        if(res.data.errors){
          this.setState({
            errorForm: res.data.errors
          })
        }
        
      })
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
      }
      else{
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

  renderError(){
    let {errorForm} = this.state

    if(Object.keys(errorForm).length > 0) {
        return Object.keys(errorForm).map((key, index)=> {
          return (
            <p style={{ color: "red" }} key={index}>{errorForm[key]}</p>
          )
        })
    }
  
  }

  //tu dong render khi co state thay doi
  render() {
    return (
      <>
        <div className="signup-form">
          <h2>New User Signup!</h2>
        
          <form action="#">
            <input
              type="text"
              name="name"
              onChange={this.Handlechange}
              placeholder="Name"
            />
            <input
              type="text"
              name="email"
              onChange={this.Handlechange}
              placeholder="Email Address"
            />
            <input
              type="password"
              name="password"
              onChange={this.Handlechange}
              placeholder="Password"
            />
            <input
              type="text"
              name="phone"
              onChange={this.Handlechange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="address"
              onChange={this.Handlechange}
              placeholder="Address"
            />
            <input
              type="file"
              name="image"
              onChange={this.HandleUserInputFile}
              placeholder="avatar"
            />
            <p style={{ color: "red" }}>{this.state.error}</p>
            {/* Set level default =0 */}
            <p id="error" style={{ color: "red" }}></p>
            {this.renderError()}
            <button onClick={this.Submitdata} className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Register;


// - bat loi form: 
// + FE tu bat : 15,16
// + BE tu bat: (khi e gui data qua, dung thi tien hanh insert data -> DB)
// => Object, lay loi tu BE neu co, hien thi ra man hinh 


import axios from "axios";
import { Component } from "react";
import Addproduct from "./addproduct";
import Editproduct from "./editproduct"
import { Modal } from '@material-ui/core';
import {Link} from "react-router-dom"
class Myproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };

    this.Handlechange = this.Handlechange.bind(this);
  }
  componentDidMount() {
    if (localStorage.data) {
      let a = JSON.parse(localStorage.data);
      this.setState({
        addproduct: false,
        editproduct: false,
        loadproduct: true,
      });
    }
    let token = localStorage.token;
    let config = {
      headers: {
        Authorization: "Bearer " + token, // CÓ dấu cách
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .get("http://localhost:8080/laravel/public/api/user/my-product", config)
      .then((res) => {
        this.setState({
          data: res.data.data,
        });
      });
  }
  Changeform = (e,data) => {
  //  Edit delete
      e.preventDefault();
      if(e.target.id==='edit'){
          console.log('edit')
          this.setState({
            id:data
          })
          return this.Submitdata(e,'edit')
      }
      else if(e.target.id==='delete'){  
        let token = localStorage.token;
        let config = {
          headers: {
            "Authorization":"Bearer "+ token, // CÓ dấu cách
            'Accept': "application/json",
          },
        };    
        
        axios.get(`http://localhost:8080/laravel/public/api/user/delete-product/${data}`,
        config)
        .then((res) => {
          this.setState({
            data: res.data.data,
          });
        });
      }
  };

  Handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // Đổi form sản phẩm
  Submitdata = (e, data) => {
    console.log(data)
    // e.preventDefault();
    if (data==='edit')
      this.setState({
        editproduct:true,
        addproduct: false,
        loadproduct: false,
      });
    else if(data==='add'){
      this.setState({
        editproduct:false,
        addproduct: true,
        loadproduct: false,
      });
    }
    else if(data==='myproduct'){
      this.setState({
        editproduct:false,
        addproduct: false,
        loadproduct: true,
      });
    }
  };
  VerDelete=(e,data)=>{
  return  <Modal
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"

>
  Bạn co chắc muốn xoá không 
  <button onClick={(e)=>this.Changeform(e,data)}>Bạn có chắc muốn xoá</button>
</Modal>
  }
  RenderProduct = (e) => {
    let dataproduct = this.state.data;
    if (Object.keys(dataproduct).length > 0) {
      return Object.keys(dataproduct).map((value, index) => {
        let a=[]
        a=JSON.parse(dataproduct[value].image)
        return (
          <tr key={index}>
            <th scope="row">{dataproduct[value].id}</th>
            <td>{dataproduct[value].name}</td>
            <td>
              <img
                src={
                  "http://localhost:8080/laravel/public/upload/user/product/" +
                  dataproduct[value].id_user +
                  "/"+a[0]
                }
                width="150px"
                height="100px"
                alt="?"
              ></img>
            </td>
            <td>{dataproduct[value].price}</td>
            <td>
              <i
                class="fa fa-pencil-square-o fa-2x"
                name={dataproduct[value].id}
                aria-hidden="true"
                id='edit'
                onClick={(e)=>this.Changeform(e,dataproduct[value].id)}
              ></i>
            </td>
            <td>
              <i
                class="fa fa-times"
                name={dataproduct[value].id}
                aria-hidden="true"
                id='delete'
                onClick={(e)=>this.VerDelete(e,dataproduct[value].id)}
              ></i>
            </td>
          </tr>
        );
      });
    }
  };
  RenderForm = () => {
    if (this.state.loadproduct) {
      return (
        <div className="signup-form">
          <h2>Product</h2>

          <form action="#">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col" colspan="2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{this.RenderProduct()}</tbody>
            </table>
            <Link to='/Product/Addnew'
              className="btn btn-default float-right"
            >
              Add New
            </Link>
            <br />
          </form>
        </div>
      );
    }
    if (this.state.addproduct) {
      return (
        <>
          <Addproduct />
          <button onClick={(e)=>this.Submitdata(e,'myproduct')} className="btn btn-default">
            Cancel
          </button>
        </>
      );
    }
    if (this.state.editproduct) {
      return (
        <>
          <Editproduct idproduct={this.state.id}/>
          <button onClick={(e)=>this.Submitdata(e,'myproduct')} className="btn btn-default">
            Cancel
          </button>
        </>
      );
    }
  };
  //tu dong render khi co state thay doi
  render() {
    return <>{this.RenderForm()}</>;
  }
}

export default Myproduct;

// - bat loi form:
// + FE tu bat : 15,16
// + BE tu bat: (khi e gui data qua, dung thi tien hanh insert data -> DB)
// => Object, lay loi tu BE neu co, hien thi ra man hinh

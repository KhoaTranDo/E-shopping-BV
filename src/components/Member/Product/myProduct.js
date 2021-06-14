import axios from "axios";
import { Component } from "react";
import {Link} from "react-router-dom"
class Myproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
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
  Deleteproduct=(e,data)=>{
    e.preventDefault();
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
              <Link
                to={`/Product/Edit/${dataproduct[value].id}`}
                className="fa fa-pencil-square-o fa-2x"
                aria-hidden="true"
              ></Link>
            </td>
            <td>
              <i
                className="fa fa-times"
                name={dataproduct[value].id}
                aria-hidden="true"
                id='delete'
                onClick={(e)=>this.Deleteproduct(e,dataproduct[value].id)}
              ></i>
            </td>
          </tr>
        );
      });
    }
  };
  RenderForm = () => {
      return (
        <div className="signup-form col-sm-8">
          <h2>Product</h2>
          <form action="#">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col" colSpan="2">
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

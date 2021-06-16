import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/laravel/public/api/product")
      .then((res) => {
        this.setState({
          data: res.data.data,
        });
      });
  }

  productdetail = (e, data) => {
    console.log(data);
  };

  renderProduct = () => {
    if (this.state.data.length > 0) {
      return this.state.data.map((value) => {
        let image = JSON.parse(value["image"]);
        return (
          <>
            <div key={value} className="col-sm-4">
              <div className="product-image-wrapper">
                <Link to={`/detail/${value["id"]}`}>
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img
                        src={`http://localhost:8080/laravel/public/upload/user/product/${value["id_user"]}/${image[0]}`}
                      />
                      {/* <img src="images/shop/product7.jpg" /> */}
                      <h2> <NumberFormat value={value["price"]} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h2>
                      <p>{value["name"]}</p>
                      <a href="#" className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart" />
                        Add to cart
                      </a>
                    </div>
                    <div className="product-overlay">
                      <div className="overlay-content">
                        <h2> <NumberFormat value={value["price"]} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h2>
                       
                        <p>{value["name"]}</p>
                        <a href="#" className="btn btn-default add-to-cart">
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="choose">
                  <ul className="nav nav-pills nav-justified">
                    <li>
                      <a href>
                        <i className="fa fa-plus-square" />
                        Add to wishlist
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-plus-square" />
                        Add to compare
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  render() {
    return (
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Features Items</h2>
          <div className="row">{this.renderProduct()}</div>
          <div className="row">
            <ul className="pagination">
              <li className="active">
                <a href>1</a>
              </li>
              <li>
                <a href>2</a>
              </li>
              <li>
                <a href>3</a>
              </li>
              <li>
                <a href>»</a>
              </li>
            </ul>
          </div>
        </div>
        {/*features_items*/}
      </div>
    );
  }
}

export default Homepage;

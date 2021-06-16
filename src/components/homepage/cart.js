import axios from "axios";
import React, { Component } from "react";
import NumberFormat from "react-number-format";
class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listproduct: [],
      total: 0,
    };
  }
  renderData = (idProduct) => {
    axios
      .post("http://localhost:8080/laravel/public/api/product/cart", idProduct)
      .then((res) => {
        this.setState({ listproduct: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    if (localStorage.cart) {
      let idProduct = JSON.parse(localStorage.cart);
      this.renderData(idProduct);
    }
  }
  deleteProduct = (id) => {
    let idProduct = JSON.parse(localStorage.cart);
    delete idProduct[id];
    console.log(idProduct);
    localStorage.cart = JSON.stringify(idProduct);
    this.renderData(idProduct);
  };
  qtyproduct = (e, id) => {
    e.preventDefault();
    let idProduct = JSON.parse(localStorage.cart);
    if (e.target.name === "-") {
      if (idProduct[id] > 1) {
        idProduct[id] = idProduct[id] - 1;
      } else {
        delete idProduct[id];
      }
    } else {
      idProduct[id] = idProduct[id] + 1;
    }
    localStorage.cart = JSON.stringify(idProduct);
    this.renderData(idProduct);
  };
  renderProduct = () => {
    let total = 0;
    if (this.state.listproduct.length > 0) {
      let data = this.state.listproduct.map((value, index) => {
        total += parseInt(value["price"]) * value["qty"];
        let image = JSON.parse(value["image"]);
        return (
          <tr key={index}>
            <td>
              <img
                src={`http://localhost:8080/laravel/public/upload/user/product/${value["id_user"]}/small_${image[0]}`}
                alt="product"
              ></img>
            </td>
            <td>
              <h4>
                <a href="">{value["name"]}</a>
              </h4>
              <p>Web ID: 1089772</p>
            </td>
            <td>
              {/* <p>{value['price']}
              </p> */}
              <NumberFormat
                value={value["price"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
            <td>
              <div class="cart_quantity_button">
                <a
                  className="cart_quantity_up"
                  name="+"
                  onClick={(e) => this.qtyproduct(e, value["id"])}
                >
                  +
                </a>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  value={value["qty"]}
                  autocomplete="off"
                  size="2"
                />
                <a
                  className="cart_quantity_down"
                  name="-"
                  onClick={(e) => this.qtyproduct(e, value["id"])}
                >
                  -
                </a>
              </div>
            </td>
            <td>
              {/* <p className="cart_total_price">{parseInt(value['price']) * value['qty']}</p> */}
              <NumberFormat
                value={parseInt(value["price"]) * value["qty"]}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
            <td>
              <button
                className="cart_quantity_delete"
                onClick={() => this.deleteProduct(value["id"])}
              >
                <i className="fa fa-times"></i>
              </button>
            </td>
          </tr>
        );
      });
      return data;
    }
  };
  totalcost = () => {
    let total = 0;
    if (this.state.listproduct.length > 0) {
      let data = this.state.listproduct.map((value, index) => {
        total += parseInt(value["price"]) * value["qty"];
      });
    }

    return total;
  };
  render() {
    return (
      <>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li>
                  <a href="#">Home</a>
                </li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>{this.renderProduct()}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>
                Choose if you have a discount code or reward points you want to
                use or would like to estimate your delivery cost.
              </p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>
                    Get Quotes
                  </a>
                  <a className="btn btn-default check_out" href>
                    Continue
                  </a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>
                      Cart Sub Total{" "}
                      <span id="Subtotal">
                        <NumberFormat
                          value={this.totalcost()}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </span>
                    </li>
                    <li>
                      Eco Tax <span>$2</span>
                    </li>
                    <li>
                      Shipping Cost <span>Free</span>
                    </li>
                    <li>
                      Total{" "}
                      <span id="total">
                        <NumberFormat
                          value={this.totalcost() + 2}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </span>
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>
                    Update
                  </a>
                  <a className="btn btn-default check_out" href>
                    Check Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default cart;

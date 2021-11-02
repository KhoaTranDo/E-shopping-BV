import axios from "axios";
import React, { Component } from "react";
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"
import NumberFormat from 'react-number-format';
import { AppContext } from "./AppContext";
class Productdetail extends Component {
  static contextType=AppContext;
  constructor(props) {
    super(props);
    this.state = {
      productdetail: {},
      image:[],
      imageindex:0,
      quanlity:3
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/laravel/public/api/product/detail/${this.props.match.params.slug}`
      )
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          productdetail: res.data.data,
          image:JSON.parse(res.data.data.image)
          
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  chilrenImage=(data,image)=>{
      if(image.length>0 &&data["id_user"]){
          return image.map((value,index)=>{
              return( <a href>
                <img src={`http://localhost:8080/laravel/public/upload/user/product/${data["id_user"]}/small_${image[index]}`} onClick={()=>this.changeImage(index)} alt='product'/>
              </a>)
          })
      }
  }
  changeImage=(index)=>{
    this.setState({
        imageindex:index
    })
  }
  openPopupbox(e,data,image) {
      e.preventDefault()
    const content = <img src={`http://localhost:8080/laravel/public/upload/user/product/${data}/larger_${image}`} alt='product' />
    PopupboxManager.open({
      content,
      config: {
        fadeIn: true,
        fadeInSpeed: 500
      }
    })
  }
  Addtocart=(id,qty)=>{
    if(qty>0){
      let productod={}
    if(localStorage.cart){
      let productod=JSON.parse(localStorage.cart)
      if(productod[id]){
        productod[id]= productod[id]+qty
        localStorage.cart=JSON.stringify(productod)
       this.context.Updatecart(Object.keys(productod).length)
      }
      else{
        productod[id]= qty
        localStorage.cart=JSON.stringify(productod)
        this.context.Updatecart(Object.keys(productod).length)
      }
    }
    else{
      productod[id]=qty
      console.log(productod)
      localStorage.cart=JSON.stringify(productod)
      this.context.Updatecart(Object.keys(productod).length)
    }
    }
  }
  Handchange=(e)=>{
    let qty=parseInt(e.target.value)
    if(e.target.value==='' &&qty<0){
        this.setState({
          quanlity:0
        })
    }else{
      this.setState({
        quanlity:qty
      })
    }
  }
  render() {
      if(this.state.productdetail){
          let data=this.state.productdetail
          let {image} =this.state
    return (
      <div>
                <PopupboxContainer />
        <div className="col-sm-9 padding-right">
          <div className="product-details">
            {/*product-details*/}
            <div className="col-sm-5">
              <div className="view-product">
                <img src={`http://localhost:8080/laravel/public/upload/user/product/${data["id_user"]}/larger_${image[this.state.imageindex]}`} alt='product'/>
                <a href="/images/product-details/1.jpg" rel="prettyPhoto" onClick={(e)=>this.openPopupbox(e,data["id_user"],image[this.state.imageindex])}>
                  <h3>ZOOM</h3>
                </a>
              </div>
              <div
                id="similar-product"
                className="carousel slide"
                data-ride="carousel"
              >
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="item active">
                    {this.chilrenImage(data,image)}
                  </div>
                  <div className="item">
                  {this.chilrenImage(data,image)}
                  </div>
                  <div className="item">
                  {this.chilrenImage(data,image)}
                  </div>
                </div>
                {/* Controls */}
                <a
                  className="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left" />
                </a>
                <a
                  className="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
            <div className="col-sm-7">
              <div className="product-information">
                {/*/product-information*/}
                <img
                  src="/images/product-details/new.jpg"
                  className="newarrival"
                  alt='product'
                />
                <h2>{data.name}</h2>
                <p>Web ID: {data.id}</p>
                <img src="/images/product-details/rating.png" alt="#" />
                <span>
                  <span>US<NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span>
                  <label>Quantity:</label>
                  <input type="number" min='0' defaultValue={this.state.quanlity} value={this.state.quanlity} onChange={(e)=>this.Handchange(e)} />
                  <button type="button" className="btn btn-fefault cart" onClick={()=>this.Addtocart(data.id,this.state.quanlity)}>
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                  </button>
                </span>
                <p>
                  <b>Availability:</b> In Stock
                </p>
                <p>
                  <b>Condition:</b> New
                </p>
                <p>
                  <b>Brand:</b> E-SHOPPER
                </p>
                <a href>
                  <img
                    src="/images/product-details/share.png"
                    className="share img-responsive"
                    alt="#"
                  />
                </a>
              </div>
              {/*/product-information*/}
            </div>
          </div>
          {/*/product-details*/}
          <div className="category-tab shop-details-tab">
            {/*category-tab*/}
            <div className="col-sm-12">
              <ul className="nav nav-tabs">
                <li>
                  <a href="#details" data-toggle="tab">
                    Details
                  </a>
                </li>
                <li>
                  <a href="#companyprofile" data-toggle="tab">
                    Company Profile
                  </a>
                </li>
                <li>
                  <a href="#tag" data-toggle="tab">
                    Tag
                  </a>
                </li>
                <li className="active">
                  <a href="#reviews" data-toggle="tab">
                    Reviews (5)
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade" id="details">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery1.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery2.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery3.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery4.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="companyprofile">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery1.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery3.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery2.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery4.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="tag">
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery1.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery2.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery3.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productinfo text-center">
                        <img src="/images/home/gallery4.jpg" alt="#" />
                        <h2>$56</h2>
                        <p>Easy Polo Black Edition</p>
                        <button
                          type="button"
                          className="btn btn-default add-to-cart"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade active in" id="reviews">
                <div className="col-sm-12">
                  <ul>
                    <li>
                      <a href>
                        <i className="fa fa-user" />
                        EUGEN
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-clock-o" />
                        12:41 PM
                      </a>
                    </li>
                    <li>
                      <a href>
                        <i className="fa fa-calendar-o" />
                        31 DEC 2014
                      </a>
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis
                    aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p>
                    <b>Write Your Review</b>
                  </p>
                  <form action="#">
                    <span>
                      <input type="text" placeholder="Your Name" />
                      <input type="email" placeholder="Email Address" />
                    </span>
                    <textarea name defaultValue={""} />
                    <b>Rating: </b>{" "}
                    <img src="/images/product-details/rating.png" alt="#" />
                    <button
                      type="button"
                      className="btn btn-default pull-right"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*/category-tab*/}
          <div className="recommended_items">
            {/*recommended_items*/}
            <h2 className="title text-center">recommended items</h2>
            <div
              id="recommended-item-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="item active">
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/images/home/recommend1.jpg" alt="#" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/images/home/recommend2.jpg" alt="#" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/images/home/recommend3.jpg" alt="#" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/images/home/recommend1.jpg" alt="#" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/images/home/recommend2.jpg" alt="#" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src="/images/home/recommend3.jpg" alt="#" />
                          <h2>$56</h2>
                          <p>Easy Polo Black Edition</p>
                          <button
                            type="button"
                            className="btn btn-default add-to-cart"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="left recommended-item-control"
                href="#recommended-item-carousel"
                data-slide="prev"
              >
                <i className="fa fa-angle-left" />
              </a>
              <a
                className="right recommended-item-control"
                href="#recommended-item-carousel"
                data-slide="next"
              >
                <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
          {/*/recommended_items*/}
        </div>
      </div>
    );
      }
  }
}

export default Productdetail;

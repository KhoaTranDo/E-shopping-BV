import React, { Component } from "react";
import Sliderbar from "../layout/slide";
import Rating from "./rating";
import Listcomment from "./listcomment";
// import Blogcontent from "./newblog";
import axios from "axios";
import Comment from "./comment";
class blogdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datablog: {},
      comment: [],
      idReplay:0
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get("http://localhost:8080/laravel/public/api/blog/detail/" + id)
      .then((res) => {
        if (res.data["data"] instanceof Object) {
          this.setState({
            datablog: res.data["data"],
            comment: res.data["data"].comment
          });
        }
      });
  }
  getDataComment = (data) => {
    if (this.state.comment) {
      let rwcomment = this.state.comment;
      rwcomment.push(data["data"]);
      this.setState({
        comment: rwcomment,
      });
    }
  };
  getReplay=(data)=>{
    console.log(data)
    this.setState({
      idReplay:data
    })
  }
  render() {
    return (
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post">
                  <h3>{this.state.datablog.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <i className="fa fa-user"></i> Mac Doe
                      </li>
                      <li>
                        <i className="fa fa-clock-o"></i> 1:33 pm
                      </li>
                      <li>
                        <i className="fa fa-calendar"></i> DEC 5, 2013
                      </li>
                    </ul>
                  </div>
                  <a href="/#">
                    <img
                      src={
                        "http://localhost:8080/laravel/public/upload/Blog/image/" +
                        this.state.datablog.image
                      }
                      alt="#"
                    />
                  </a>
                  <p>{this.state.datablog.description}</p> <br />
                  <p>{this.state.datablog.description}</p>{" "}
                  <div className="pager-area">
                    <ul className="pager pull-right">
                      <li>
                        <a href="/#">Pre</a>
                      </li>
                      <li>
                        <a href="/#">Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rating-area">
                <ul className="ratings">
                  <Rating id={this.props.match.params.id} />
                </ul>
                <ul className="tag">
                  <li>TAG:</li>
                  <li>
                    <a className="color" href="/#">
                      Pink <span>/</span>
                    </a>
                  </li>
                  <li>
                    <a className="color" href="/#">
                      T-Shirt <span>/</span>
                    </a>
                  </li>
                  <li>
                    <a className="color" href="/#">
                      Girls
                    </a>
                  </li>
                </ul>
              </div>

              <div className="socials-share">
                <a href="/#">
                  <img
                    src={process.env.PUBLIC_URL + "/images/blog/socials.png"}
                    alt="#"
                  />
                </a>
              </div>           
              <Listcomment
                data={{
                  comment: this.state.comment,
                  idBlog: this.props.match.params.id,
                }}
                getReplay={this.getReplay}
              ></Listcomment>
              <Comment
                data={{
                  comment: this.state.comment,
                  id: this.props.match.params.id,
                  idReplay:this.state.idReplay
                }}
                getDataComment={this.getDataComment}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default blogdetail;

import React, { Component } from "react";
import {Link} from "react-router-dom"
import axios from "axios";

class newblog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datablog: {},
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8080/laravel/public/api/blog").then((res) => {
      this.setState({ datablog: res.data });
    });
  }
  render() {
    return (
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {Object.keys(this.state.datablog).map((index, value) => {
          const data = this.state.datablog[index].data.map((key)=> {
            return (
              <div key={key.id}  className="single-blog-post">
                <h3>{key.title}</h3>
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
                  <span>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </span>
                </div>
                <Link to={"blog/detail/"+key.id}>
                  <img
                    src={
                      "http://localhost:8080/laravel/public/upload/Blog/image/" +
                      key.image
                    }
                    alt="/#"
                  />
                </Link>
                <p>{key.description}</p>
                <Link className="btn btn-primary" to={"blog/detail/"+key.id}>Read More</Link>
                
                  
              
              </div>
            );
          })
          return data
        })}
      </div>
    );
  }
}

export default newblog;

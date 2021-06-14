import axios from "axios";
import { Component } from "react";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errors: {},
    };
    this.Handlechange = this.Handlechange.bind(this);
    this.Submitdata = this.Submitdata.bind(this);
    this.RenderError = this.RenderError.bind(this);
  }
  Handlechange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      id_blog: this.props.data.id,
    });
  }
  Submitdata(e) {
    e.preventDefault();
    let dataerror = {};
    let validate = 0;
    if(!localStorage.isLogin){
      validate=1
      dataerror['login']='Vui long dang nhap tai khoan'
    }
    if (this.state.comment ===""||!this.state.comment) {
      validate=1
      dataerror['comment']='Vui long viet binh luan'    
    } 
    if(validate===0){
      let token = localStorage.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token, // CÓ dấu cách
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      let { comment, id_blog, id_user, name_user, image_user } = this.state;
      if (comment) {
        const formData = new FormData();
        formData.append("id_blog", id_blog);
        formData.append("id_user", id_user);
        formData.append("id_comment", this.props.data.idReplay ? this.props.data.idReplay : 0 );
        formData.append("comment", comment);
        formData.append("image_user", image_user);
        formData.append("name_user", name_user);
        axios
          .post(
            "http://localhost:8080/laravel/public/api/blog/comment/" + id_blog,
            formData,
            config
          )
          .then((res) => {
            this.props.getDataComment(res.data);
            this.setState({
              errors:dataerror
            })
          });
      }
    }
    else{
      this.setState({
        errors:dataerror
      })
    }
  }
  RenderError(e) {
    const { errors } = this.state;
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((value, index) => {
        return (
          <p style={{ color: "red" }} key={index}>
            {errors[value]}
          </p>
        );
      });
    }
  }
  componentDidMount() {
    if (localStorage.data) {
      let user_data = JSON.parse(localStorage.data);
      this.setState({
        id_user: user_data.id,
        name_user: user_data.name,
        image_user: user_data.avatar,
      });
    }
  }
  render() {
    return (
      <>
        <div className="replay-box" id="comment">
          <div className="row">
            <div className="col-sm-12">
              <h2>Leave a replay</h2>
              <div className="text-area">
                <div className="blank-arrow">
                  <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea
                  name="comment"
                  onChange={this.Handlechange}
                  rows="11"
                ></textarea>
                {this.RenderError()}
                <a
                  className="btn btn-primary"
                  href="/#"
                  onClick={this.Submitdata}
                >
                  Post comment
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Comment;

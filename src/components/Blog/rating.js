import axios from "axios";
import { Component } from "react";
import StarRatings from "react-star-ratings";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.changeRating = this.changeRating.bind(this);
    this.state = {
      rating: 0,
      uservote: 0,
      vote: 0,
      ErrorMs: {},
    };
  }
  changeRating(rating) {
    let user_data;
    if (localStorage.data) {
      user_data = JSON.parse(localStorage.data);
    }
    let demo = 0;
    let ErrorValidate = {};
    if (!localStorage.data) {
      demo = 1;
      ErrorValidate["login"] = "Vui long dang nhap tai khoan";
    }
    if (demo === 0) {
      let token = localStorage.token;
      let config = {
        headers: {
          Authorization: "Bearer " + token, // CÓ dấu cách
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("blog_id", this.props.id);
      formData.append("user_id", user_data.id);
      formData.append("rate", rating);
      axios
        .post(
          "http://localhost:8080/laravel/public/api/blog/rate/" + this.props.id,
          formData,
          config
        )
        .then((res) => {
          ErrorValidate["sucess"] = res.data["message"];
          this.setState({
            ErrorMs: ErrorValidate,
            rating: rating,
          });
        });
    } else {
      this.setState({
        ErrorMs: ErrorValidate,
      });
    }
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:8080/laravel/public/api/blog/rate/" + this.props.id
      )
      .then((res) => {
        if (Object.keys(res.data.data).length > 0) {
          let data = res.data.data;
          let vote = Object.keys(data).length;
          let Srate = 0;
          Object.keys(data).map((value) => {
            Srate = Srate + parseInt(data[value]["rate"], 10);
          });
          this.setState({
            vote: vote,
            rating: Srate / vote,
          });
        }
      });
  }
  Errormessage = () => {
    let RenderErr = this.state.ErrorMs;
    return Object.keys(RenderErr).map((value, index) => {
      return (
        <p key={index} style={{ color: "red" }}>
          {RenderErr[value]}
        </p>
      );
    });
  };
  render() {
    return (
      <>
        <li className="rate-this">Rate this item:</li>
        <li>
          <StarRatings
            rating={this.state.rating}
            starRatedColor="orange"
            starDimension="40px"
            starSpacing="15px"
            changeRating={this.changeRating}
          />
        </li>
        <li className="color">({this.state.vote})</li>
        <li>{this.Errormessage()}</li>
      </>
    );
  }
}
export default Rating;

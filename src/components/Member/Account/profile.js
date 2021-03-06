import { Component } from "react";
import Product from "../Product/myProduct";
import Account from "./updateaccount";
import { Redirect } from "react-router";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "panel-collapse in",
      myproduct: "panel-collapse collapse",
      heighpf: "auto",
      heighpr: "0px",
    };
  }
  PropsChange = (data) => {
    if (data === "profile") {
      this.setState({
        profile: "panel-collapse in",
        myproduct: "panel-collapse collapse",
        heighpf: "auto",
        heighpr: "0px",
      });
    } else {
      this.setState({
        myproduct: "panel-collapse in",
        profile: "panel-collapse collapse",
        heighpr: "auto",
        heighpf: "0px",
      });
    }
  };
  //tu dong render khi co state thay doi
  render() {
    if(localStorage.isLogin){
      return (
        <>
              <div className="col-sm-8">
                <div
                  id="sportswear"
                  className={this.state.profile}
                  style={{ height: this.state.heighpf }}
                >
                  <div className="panel-body">
                    <Account />
                  </div>
                </div>
                <div
                  id="mens"
                  className={this.state.myproduct}
                  style={{ height: this.state.heighpr }}
                >
                  <div className="panel-body">
                    <Product />
                  </div>
                </div>
              </div>
        </>
      );
    }else{
      return <Redirect to="/" />
    }
  }
}

export default Profile;

// - bat loi form:
// + FE tu bat : 15,16
// + BE tu bat: (khi e gui data qua, dung thi tien hanh insert data -> DB)
// => Object, lay loi tu BE neu co, hien thi ra man hinh

import { Component } from "react";
import "./App.css";
import Header from "./components/layout/header.js";
import Footer from "./components/layout/footer.js";
import Sliderbar from "./components/layout/slide";
import { withRouter } from "react-router";

class App extends Component {
  constructor(props){
    super(props)

  }
 
  render() {
    const path=['Account','Product','profile','member','cart']
    const pathurl=this.props.location.pathname.split('/')
    return (
      <>
        <Header />
        <div className="container">
          <div className="row">
           {!path.includes(pathurl[1]) ? <Sliderbar /> : ""}
            <div className="col-sm-9">
              <section>{this.props.children}</section>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);

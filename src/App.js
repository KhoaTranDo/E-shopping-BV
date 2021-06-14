import { Component } from "react";
import "./App.css";
import Header from "./components/layout/header.js";
import Footer from "./components/layout/footer.js";
import Sliderbar from "./components/Blog/slide";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <Sliderbar />
            </div>
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

export default App;

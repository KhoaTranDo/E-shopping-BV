import React,{ Component } from "react";
import "./App.css";
import Header from "./components/layout/header.js";
import Footer from "./components/layout/footer.js";
import Sliderbar from "./components/layout/slide";
import { withRouter } from "react-router";
import { AppContext } from "./components/homepage/AppContext";
const MyContext=React.createContext();

class MyProvider extends Component{
  state={
    name:'Khoa',
    cart:0,
  }
  render(){
    return(
      <MyContext.Provider value={{
        state:this.state,
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
class App extends Component {
  constructor(props){
    super(props)
    this.state=({
      name:'Khoa',
      cart:localStorage.cart?Object.keys(JSON.parse(localStorage.cart)).length:0
    })
  }
  Updatecart=(qty)=>{
    this.setState({
      cart:qty
    })
  }
  render() {
    const path=['Account','Product','profile','member','cart']
    const pathurl=this.props.location.pathname.split('/')
    return (
      <>
      <AppContext.Provider value={{
        state:this.state,
        Updatecart:this.Updatecart
      }}>
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
        </AppContext.Provider>
      </>
    );
  }
}

export default withRouter(App);

import React, { Component } from "react";
import Menuleft from './slide'
class App extends Component {
  render() {
    return(<>
    <Menuleft/>
    {this.props.children}
    </>)
  }
}

export default App
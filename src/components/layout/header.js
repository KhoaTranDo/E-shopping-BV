import React, { Component } from "react";
import HeaderTop from '../header/headertop'
import HeaderMiddle from '../header/headermiddle'
import HeaderBottom from '../header/headerbottom'
class header extends Component {
  render() {
    return (
      <header id="header">
        {/* header_top */}
        <HeaderTop></HeaderTop>
        {/*/header_top*/}
        {/* header_middle */}
        <HeaderMiddle></HeaderMiddle>
        {/* /header_middle */}
        {/* header_bottom */}
        <HeaderBottom></HeaderBottom>
      </header>
    );
  }
}

export default header;

import React, { Component } from "react";
import FooterTop from '../footer/footertop'
import FooterWidget from '../footer/footerwidget'
import FooterBottom from '../footer/footerbottom'
class footer extends Component {
  render() {
    return (
      <footer id="footer">
          {/* Footer Top */}
          <FooterTop></FooterTop>
          {/* Footer Top */}
          {/* Footer Widget */}
        <FooterWidget></FooterWidget>
          {/*/ Footer Widget */}
          {/* Footer bottom */}
        <FooterBottom></FooterBottom>
          {/* Footer bottom */}
      </footer>
    );
  }
}

export default footer;

import React, { Component } from "react";
import Blogcontent from "./newblog";

class blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datablog: {},
    };
  }

  render() {
    return (
      <>
        <section>
              <div className="col-sm-12">
                <Blogcontent></Blogcontent>
              </div>
     
        </section>
      </>
    );
  }
}

export default  blog;

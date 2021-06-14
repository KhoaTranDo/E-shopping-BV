import { Component } from "react";

class Listcomment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Getidcomment = (e) => {
    this.props.getReplay(parseInt(e.target.id));
  };
  Fatherender=()=>{
    let comment=this.props.data.comment
     return comment.map((value, index) => {
      if (value.id_comment === 0 || parseInt(value.id_comment) === 0)
        return (
          <>
            <li key={'m'+index} className="media">
              <a className="pull-left" href="/#">
                <img
                  className="media-object"
                  src={
                    "http://localhost:8080/laravel/public/upload/user/avatar/" +
                    value.image_user
                  }
                  alt="#"
                  height="100px"
                  width="100px"
                />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li>
                    <i className="fa fa-user"></i>
                    {value.name_user}
                  </li>
                  <li>
                    <i className="fa fa-clock-o"></i> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar"></i> DEC 5, 2013
                  </li>
                </ul>
                <p>{value.comment}</p>
                <a
                  className="btn btn-primary"
                  id={value.id}
                  onClick={this.Getidcomment}
                  href="#comment"
                >
                  <i className="fa fa-reply"></i>Replay
                </a>
              </div>
            </li>
            {this.Childrender(value.id)}
           
          </>
        );
        return('')
    })
  }
  Childrender=(data)=>{
    return this.props.data.comment.map((valuez, indexz) => {
      if (valuez.id_comment === data ||parseInt(valuez.id_comment) === data) {
        return (
          <li key={data+indexz} className="media second-media">
            <a className="pull-left" href="/#">
              <img
                className="media-object"
                src={
                  "http://localhost:8080/laravel/public/upload/user/avatar/" +valuez.image_user
                }
                alt="/#"
                height="100px"
                width="100px"
              />
            </a>
            <div className="media-body">
              <ul className="sinlge-post-meta">
                <li>
                  <i className="fa fa-user"></i>
                  {valuez.name_user}
                </li>
                <li>
                  <i className="fa fa-clock-o"></i> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar"></i> DEC 5, 2013
                </li>
              </ul>
              <p>{valuez.comment}</p>
              <a className="btn btn-primary" href="#commemt">
                <i className="fa fa-reply"></i>Replay
              </a>
            </div>
          </li>
        );
      }
      return('')
    })
  }
  render() {
    return (
      <>
        <div className="response-area">
          <h2>{this.props.data.comment.length} RESPONSES</h2>
          <ul className="media-list">
            {this.Fatherender()}
          </ul>
        </div>
      </>
    );
  }
}
export default Listcomment;

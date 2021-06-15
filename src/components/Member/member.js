import { Component } from "react";
import Register from "./register"
import Login from "./login"
class Member extends Component{
    render(){
        return(
            <div className="container">
			<div className="row">
				<div className="col-sm-3 col-sm-offset-1">
					<Login/>
				</div>
				<div className="col-sm-1">
					<h2 className="or">OR</h2>
				</div>
				<div className="col-sm-3">
					<Register/>
				</div>
			</div>
		</div>
        )
    }
}

export default Member
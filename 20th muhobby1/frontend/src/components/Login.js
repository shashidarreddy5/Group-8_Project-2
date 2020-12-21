import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions/Auth'
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    LoginHandler = (event) => {

        event.preventDefault();
        var username = event.target.elements.username.value
        var password = event.target.elements.password.value
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        let query = this.props.location.search;
        const params = new URLSearchParams(query);
        let q = params.get('next')
        if (!q) {
            q = "/"
        }
        if (pattern.test(username)) {
            this.setState({
                error: ""
            })
            this.props.onAuth(username, password, this.props.history, q);
        } else {
            this.setState({
                error: "the email you gave is not a valid email"
            })
        }
    }
    render() {
        let errorMessage = null;
        if (this.props.error) {
            if(this.props.error.type==="login"){
                errorMessage = this.props.error.message
            }
        }
        return (
            <div className="tab-pane active" id="login">
                <h3>Login</h3>
                <p className="text-muted">Log into your account</p>
                <p className="text-danger" id="login_error">{errorMessage}</p>
                <form name="Login_form" method="post" onSubmit={this.LoginHandler}>
                    <div className="row">
                        <div className="form-group col-xs-12">
                            <label htmlFor="my-email" className="sr-only">Email</label>
                            <input id="my-email" className="form-control input-group-lg" type="text" name="username" title="Enter Email" placeholder="Your Email" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-xs-12">
                            <label htmlFor="my-password" className="sr-only">Password</label>
                            <input id="my-password" className="form-control input-group-lg" type="password" name="password" title="Enter password" placeholder="Password" />
                        </div>
                    </div>
                    <p><a href="#reset" data-toggle="tab">Forgot Password?</a></p>
                    <button className="btn btn-primary">Login Now</button>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, redirect, path) => dispatch(actions.authLogin(username, password, redirect, path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login)); 

import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions/Auth'
import {withRouter} from 'react-router-dom'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentDidMount() {

    }

    RegisterHandle = (e) => {
        e.preventDefault();
        let firstname = e.target.elements.firstname.value,
            lastname = e.target.elements.lastname.value,
            email = e.target.elements.email.value,
            password1 = e.target.elements.password1.value,
            password2 = e.target.elements.password2.value
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (pattern.test(email)) {
            if (password1 === password2) {
                this.setState({
                    error: ""
                })
                this.props.authSign(email, password1, password2, firstname, lastname);
            } else {
                this.setState({
                    error: "the two password fields did not match"
                })
            }
        } else {
            this.setState({
                error: "the email you gave is not a valid email"
            })
        }
    }
    render() {
        let error = null;
        if (this.props.error) {
            if (this.props.error.type ==="signup") {
                error = this.props.error.message
            }
        }
        return (
            <div className="tab-pane" id="register">
                <h3>Register Now !!!</h3>
                <p className="text-muted">Be cool and join today. Meet millions</p>
                <p className="text-success" id="create_success">{this.props.message}</p>
                <p className="text-danger" id="signup_error">{error}</p>

                <form name="registration_form" method="post" onSubmit={this.RegisterHandle} className="form-inline">
                    <div className="row">
                        <div className="form-group col-xs-6">
                            <label htmlFor="firstname" className="sr-only">First Name</label>
                            <input id="firstname" className="form-control input-group-lg" type="text" name="firstname" required={true} title="Enter first name" placeholder="First name" />
                        </div>
                        <div className="form-group col-xs-6">
                            <label htmlFor="lastname" className="sr-only">Last Name</label>
                            <input id="lastname" className="form-control input-group-lg" type="text" name="lastname" required={true} title="Enter last name" placeholder="Last name" />
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="form-group col-xs-12">
                            <label htmlFor="email" className="sr-only">Username</label>
                            <input id="email" className="form-control input-group-lg" type="text" name="email" required={true} title="Enter Email" placeholder="Your Email" />
                        </div>
                    </div>
                    <div className="row">
                    <br/>
                        <div className="form-group col-xs-12">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" className="form-control input-group-lg" type="password" name="password1" required={true} title="Enter password" placeholder="enter password" />
                        </div>
                    </div>
                    <div className="row">
                        <br />
                        <div className="form-group col-xs-12">
                            <label htmlFor="my-password" className="sr-only">Confirm Password</label>
                            <input id="my-password2" className="form-control input-group-lg" type="password" required={true}  name="password2" title="confirm password" placeholder="confirm password" />
                        </div>
                    </div>
                    <p><a href="#login" data-toggle="tab">Already have an account?</a></p>
                    <button className="btn btn-primary" id="reg_button" type="submit">Register Now</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        message: state.auth.message
    }
};
const mapDispatchToProps = dispatch => {
    return {
        authSign: (username, password1, password2, first_name, last_name) =>
            dispatch(actions.authSignup(username, password1, password2,first_name,last_name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))

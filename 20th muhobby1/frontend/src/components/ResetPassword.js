import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { get_headers, API_URL } from '../settings';
var axios = require('axios');

class ResetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    ResetHandler = (e) => {
        e.preventDefault();
        this.setState({
            error: "",
            message: ""
        })
        var data = {
            "token": this.props.match.params.token,
            "password1": e.target.elements.password1.value,
            "password2": e.target.elements.password2.value
        }

        var config = {
            method: 'post',
            url: `${API_URL}/api/reset`,
            headers: get_headers(),
            data: data
        };

        axios(config)
            .then(response => {
                this.setState({
                    message: response.data.success
                });
            })
            .catch(error => {
                this.setState({
                    error: error.response.data
                });
            });
    }

    render() {
        return (
            <div>
                <div id="lp-register">
                    <div className="container wrapper">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="intro-texts">
                                    <h1 className="text-white">Have fun &amp; smilley</h1>
                                    <p>
                                        Set a new password for your account and continue connecting with your
                                        hobby mates and friends
            <br /> <br /></p>
                                </div>
                            </div>
                            <div className="col-sm-6 col-sm-offset-1">
                                <div className="reg-form-container">
                                    <div className="tab-content">
                                        <h3>Reset password</h3>
                                        <p className="text-muted">recover your account</p>
                                        <p class="text-success" id="reset_success">{this.state.message}</p>
                                        <p class="text-danger" id="reset_error">{this.state.error}</p>
                                        <form name="Reset_form" method="post" onSubmit={this.ResetHandler}>
                                            <div className="row">
                                                <br />
                                                <div className="form-group col-xs-12">
                                                    <label htmlFor="password" className="sr-only">Password</label>
                                                    <input id="password" className="form-control input-group-lg" type="password" name="password1" required={true} title="Enter password" placeholder="enter password" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <br />
                                                <div className="form-group col-xs-12">
                                                    <label htmlFor="my-password" className="sr-only">Confirm Password</label>
                                                    <input id="my-password2" className="form-control input-group-lg" type="password" required={true} name="password2" title="confirm password" placeholder="confirm password" />
                                                </div>
                                            </div>
                                            <p><Link to="/auth" data-toggle="tab">login</Link></p>
                                            <button class="btn btn-primary">set password</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_headers, API_URL } from '../settings';
import axios from 'axios';


class Forgot extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             message:"",
             error:""
        }
    }
    
    ResetHandler=(e)=>{
        e.preventDefault();
        var data = JSON.stringify({ "username": e.target.elements.username.value});
        var config = {
            method: 'post',
            url: `${API_URL}/api/forgot/`,
            headers: get_headers(),
            data: data
        };

        axios(config).then(response=> {
                this.setState({
                    message: response.data.success
                });
            })
            .catch(error=>{
                this.setState({
                    message: error.response.data.error
                });
            });

    }
    render() {
        return (
            <div class="tab-pane" id="reset">
                <h3>Recover account</h3>
                <p class="text-muted">Request password reset</p>
                <p class="text-success" id="reset_success">{this.state.message}</p>
                <p class="text-danger" id="reset_error">{this.state.error}</p>

                <form name="Reset_form" method="post" onSubmit={this.ResetHandler}>
                    <div class="row">
                        <div class="form-group col-xs-12">
                            <label for="my-email_reset" class="sr-only">Email</label>
                            <input id="my-email_reset" class="form-control input-group-lg" type="text" name="username" title="Enter Email" placeholder="Your Email" />
                        </div>
                    </div>
                    <p><a href="#login" data-toggle="tab">login instead ?</a></p>
                    <button class="btn btn-primary">request reset</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Forgot)

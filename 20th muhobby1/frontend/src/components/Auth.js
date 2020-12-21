import React from 'react'
import { connect } from 'react-redux'
import Forgot from './Forgot'
import Login from './Login'
import Register from './Register'

const Auth = () => {
    return (
        <div id="lp-register">
            <div className="container wrapper">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="intro-texts">
                            <h1 className="text-white">Have fun &amp; smilley</h1>
                            <p>
                                Connect with friends hommies, share your hobby activities and let other have fun too,create
                                challanges, join events, create events all brought to you in one simple visit
            <br /> <br />What are you waiting for? let's get started.</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-sm-offset-1">
                        <div className="reg-form-container">
                            <div className="reg-options">
                                <ul className="nav nav-tabs">
                                    <li><a href="#register" data-toggle="tab">Register</a></li>
                                    <li><a href="#login" className="active" data-toggle="tab">Login</a></li>
                                </ul>
                            </div>
                            <div className="tab-content">
                               <Register/>
                               <Forgot/>
                               <Login/>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from '../store/actions/Auth'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header id="header">
                <nav className="navbar navbar-default navbar-fixed-top menu">
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <Link className="navbar-brand " to="/">myHobbay</Link>
                        </div>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right main-menu">
                                <li className="dropdown">
                                    <a href="#!" role="button" aria-haspopup="true" aria-expanded="false">Activities <span /></a>
                                </li>
                            </ul>
                        </div>{/* /.navbar-collapse */}
                    </div>{/* /.container */}
                </nav><nav className="navbar navbar-default navbar-fixed-top menu">
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <Link className="navbar-brand " to="/">myHobbay</Link>
                        </div>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right main-menu">
                                <li className="dropdown">
                                    <Link to="/" role="button" aria-haspopup="true" aria-expanded="false">
                                        Activities 
                                    <span />
                                    </Link>
                                </li>
                                <li className="dropdown"><Link to="/profile">profile</Link></li>
                                {
                                    !localStorage.getItem("token") ?
                                        <li id="login_btn" className="dropdown login_check  pull-right ">
                                            <Link to="/auth" style={{
                                                fontWeight: "bold",
                                                fontSize: "18px",
                                                color: "#27aae1 !important"
                                            }}>login <i className="fa fa-sign-in" />
                                            </Link>
                                        </li> :
                                        <li id="logout_btn" className="dropdown login_check pull-right">
                                            <a href="#!" onClick={this.props.logOut}
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: "18px",
                                                    color: "#27aae1 !important"
                                                }}>logout <i className="fa fa-sign-out" /></a>
                                        </li>

                                }


                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
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
        logOut: () => dispatch(actions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header)); 

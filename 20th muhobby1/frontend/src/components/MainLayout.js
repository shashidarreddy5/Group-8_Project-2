import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'

class MainLayout extends Component {
  render() {
    const Footer = (props) => {
      return (
        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="footer-wrapper">
                <div className="col-md-4 col-sm-3">

                </div>
                <div className="col-md-4 col-sm-3">
                  last login
                   {
                     localStorage.getItem("token")?
                        <a href id="last_login">
                    {" " + props.user.last_login}
                  </a>:
                "is not available because you are logged out"
                }
                </div>
                <div className="col-md-4 col-sm-3">
                </div>
              </div>
            </div>
          </div>
        </footer>
      )
    }
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer user={this.props.user} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.global.user ? state.global.user : {}
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)

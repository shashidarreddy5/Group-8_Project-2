import React, { Component } from 'react'
import MainLayout  from './components/MainLayout';
import * as actions from './store/actions/Auth';
import * as global from './store/actions/global_settings';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import { connect } from 'react-redux';
import Auth from './components/Auth';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import UserPosts from './components/UserPosts';
import Mates from './components/Mates';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      time: 0
    }
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.loadGlobal();
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Router>
          <MainLayout {...this.props}>
            <Switch>
              <Route exact path="/"
                render={(props) => <HomePage {...props}
                />} />
              <Route exact path="/auth"
                render={(props) => <Auth {...props}
                />} />
                <Route exact path="/profile"
                render={(props) => <Profile {...props}
                />} />
                <Route exact path="/user/:id"
                render={(props) => <UserPosts {...props}
                />} />
                <Route exact path="/mates/:id"
                render={(props) => <Mates {...props}
                />} />
              <Route exact path="/auth/reset-password/:token"
                render={(props) => <ResetPassword {...props}
                />} />
            </Switch>
          </MainLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    show_side_small: state.global.show_side_small
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadGlobal: () => dispatch(global.getGlobal()),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

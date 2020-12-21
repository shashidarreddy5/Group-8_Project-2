import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { STATIC_URL } from '../settings';

class LeftSide extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        let user = this.props.user,
        profile = this.props.profile;
        console.log(profile)
        return (
            <div className="col-md-3 static">
              <div className="profile-card">
              <img src={profile.image?STATIC_URL+profile.image:"/static/images/av2.png"}alt="user" className="profile-photo" />
                <h5><Link to={`/user/${user.id}`} className="text-white">{user.first_name} {user.last_name}</Link>
                {
                   !localStorage.getItem("token")?
                    <h5><Link className="text-white" to="/auth">Hello, login to see profile</Link></h5>:null
                  }
                </h5>
              <Link to={"/mates/" + user.id} className="text-white"><i className="ion ion-android-person-add" /> {profile.mates ?profile.mates.length:0} friends</Link>
              </div>
              <ul className="nav-news-feed">
                <li><i className="icon ion-ios-paper" /><div><Link to="/">My Newsfeed</Link></div></li>
                <li><i className="icon ion-ios-people-outline" /><div><Link to={"/mates/"+user.id}>My mates</Link></div></li>
              </ul>{/*news-feed links ends*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile:state.global.profile,
    user:state.global.user?state.global.user:{}
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide)

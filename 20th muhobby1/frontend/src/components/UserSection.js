import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { STATIC_URL } from '../settings'

const NavSection = (props) => {
    return (
        <ul className={props.className ? props.className : "list-inline profile-menu"}>
            <li><Link to="/" className="active">Timeline</Link></li>
            <li><Link to={`/user/${props.user?props.user.id:""}`}>Posts</Link></li>
            <li><Link to={`/mates/${props.user ? props.user.id : ""}`}>Friends</Link></li>
        </ul>
    )
}
const UserSection = (props) => {
    return (
        <div className="timeline-cover">
            <div className="timeline-nav-bar hidden-sm hidden-xs">
                <div className="row">
                    <div className="col-md-3">
                        <div className="profile-info">
                            {
                                props.profile.image ?
                                    <img src={`${STATIC_URL + props.profile.image}`} alt="" className="img-responsive profile-photo" />
                                    :
                                    ""
                            }
                            <h3>{props.user.first_name} {props.user.last_name}</h3>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <NavSection user={props.user} />
                        <ul className="follow-me list-inline">
                            <li>{props.profile.num_friends} people following</li>
                            {
                                props.current_user.id === props.user.id ?
                                    "" :
                                    <li><button className="btn-primary">Add Friend</button></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navbar-mobile hidden-lg hidden-md">
                <div className="profile-info">
                    <img src="images/users/user-1.jpg" alt={props.user.first_name} className="img-responsive profile-photo" />
                    <h4>{props.user.first_name} {props.user.last_name}</h4>
                    <p className="text-muted">Creative Director</p>
                </div>
                <div className="mobile-menu">
                    <NavSection className={"list-inline"} />
                    <button className="btn-primary">Add Friend</button>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => ({
    current_user: state.global.user ? state.global.user : {}
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserSection)

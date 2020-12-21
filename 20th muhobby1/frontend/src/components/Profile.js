import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import EditProfile from './EditProfile'
import HobbiesView from './HobbiesView'
import MyMates from './MyMates'
import UserSection from './UserSection'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page: "edit"
        }
    }

    render() {
        let path = window.location.pathname
        if (!localStorage.getItem("token")) {
            this.props.history.push(`/auth?next=${path}`)
        }
        return (
            <div className="container">
                <div className="timeline">
                    <UserSection profile={this.props.profile} user={this.props.user} />
                    <div id="page-contents">
                        <div className="row">
                            <div className="col-md-3">
                                <ul className="edit-menu">
                                    <li><i className="icon ion-ios-information-outline" /><a href="#!">Edit profile</a></li>
                                    <li><i className="icon ion-ios-heart-outline" /><a href="#!" onClick={() =>
                                        this.setState({
                                            page: "hobbies"
                                        })
                                    }>my hobbies</a></li>
                                    <li><i className="icon ion-ios-list-outline" /><Link to={`/user/${this.props.user.id}`}>my posts</Link></li>
                                    <li><i className="icon ion-ios-navigate-outline" /><a href="#!"  onClick={() =>
                                        this.setState({
                                            page: "mates"
                                        })
                                    }>my mates</a></li>
                                </ul>
                            </div>
                            <div className="col-md-7">
                                {
                                    this.state.page === "edit" ?
                                        <EditProfile />
                                        :
                                        this.state.page === "hobbies" ?
                                            <HobbiesView />
                                            :
                                            this.state.page === "mates" ?
                                            <MyMates/>
                                            :
                                            ""

                                }

                            </div>
                            <div className="col-md-2 static">
                                <div id="sticky-sidebar">
                                    <h4 className="grey">recent login activity</h4>
                                    <div id="log_activ">
                                        {
                                            this.props.logins ?
                                                this.props.logins.map(lgoin =>
                                                    <div class="feed-item" key={lgoin.id}>
                                                        <div class="live-activity">
                                                            <p class="text-muted">{new Date(lgoin.date).toString()}</p>
                                                        </div>
                                                    </div>
                                                ) :
                                                null
                                        }
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
    profile: state.global.profile,
    user: state.global.user ? state.global.user : {},
    logins: state.global.profile.logins
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

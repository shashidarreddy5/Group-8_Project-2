import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../settings'
import * as globals from '../store/actions/global_settings'

class HobbiesView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            add: true
        }
    }
    handlePostHobby = (e) => {
        e.preventDefault()
        let name = e.target.elements.name.value,
            add = this.state.add,
            data = {
                name: name,
                add: add
            };
        axios.post(`${API_URL}/api/create-hobby/`, data).then(res => {
            let prof = {...this.props.profile}
            prof['hobbies'] = res.data
            console.log(prof)
            this.props.updateProfile(prof)
        }).catch(err=>{
            alert(err.response.data.error)
        })
    }
    render() {
        console.log(this.props.profile.hobbies)
        return (
            <div className="edit-profile-container">
                <div className="block-title">
                    <h4 className="grey"><i className="icon ion-ios-heart-outline" />My Hobbies</h4>
                    <div className="line" />
                    <p>When you add hobbies, you will get to link with other members who share the same hobbies as you</p>
                    <div className="line" />
                </div>
                <div className="edit-block">
                    <ul className="list-inline interests">
                        {
                            this.props.profile.hobbies ?
                                this.props.profile.hobbies.map(hobby =>
                                    <li><a href="#!">{hobby.name}</a></li>
                                )
                                :
                                "please add some hobbies"

                        }
                    </ul>
                    <div className="line" />
                    <form className="row" onSubmit={this.handlePostHobby}>
                        <p className="custom-label"><strong>Add your hobbies</strong></p>
                        <div className="form-group col-sm-8">
                            <input id="add-interest" required={true} name="name" className="form-control input-group-lg" 
                            type="text"
                             title="Choose Interest" placeholder="Interests. For example, swimming" />
                        </div>
                        <div className="form-group col-sm-4">
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.global.profile
})

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (data) => dispatch(globals.getProfileSuccess(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HobbiesView)

import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL, get_headers } from '../settings'
import * as globals from '../store/actions/global_settings'
class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    HandleEdirProfile = (e) => {
        e.preventDefault()
        let firstname = e.target.elements.firstname.value,
            lastname = e.target.elements.lastname.value,
            description = e.target.elements.description.value,
            country = e.target.elements.country.value,
            city = e.target.elements.city.value,
            url = `${API_URL}/api/update-profile/`,
            data = {
                description: description,
                first_name: firstname,
                last_name: lastname,
                city: city,
                country: country
            };
        axios.defaults.headers = get_headers()
        axios.post(url, data).then(res => {
            console.log(res.data)
            this.props.updateProfile(res.data)
        }).catch(err => {
            console.log(err)
            this.setState({
                error: err.response.data.response
            })
        })
    }
    render() {
        let profile = this.props.profile,
            user = this.props.user;
        return (
            <div className="edit-profile-container">
                <div className="block-title">
                    <h4 className="grey"><i className="fa fa-cog" />Personal Details</h4>
                    <p className="text-danger" id="editprof_error">{this.state.error}</p>
                    <div className="line" />
                    <p id="personal_details">{profile.description}</p>
                    <div className="line" />
                </div>
                <div className="edit-block">
                    <form name="education" method="post" onSubmit={this.HandleEdirProfile} className="form-inline">
                        <div className="row">
                            <div className="form-group col-xs-12">
                                <label htmlFor="F_username">username</label>
                                <input id="F_username" defaultValue={user.username} disabled="disabled" className="form-control input-group-lg" type="text" name="username" title="username" placeholder="username" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-xs-6">
                                <label htmlFor="F_firstname">first name</label>
                                <input id="F_firstname" defaultValue={user.first_name} className="form-control input-group-lg" type="text" name="firstname" title="first name" placeholder="first name" />
                            </div>
                            <div className="form-group col-xs-6">
                                <label htmlFor="F_lastname" className>last name</label>
                                <input id="F_lastname" defaultValue={user.last_name} className="form-control input-group-lg" type="text" name="lastname" title="last name" placeholder="last name" />
                            </div>
                            <div className="form-group col-xs-6">
                                <label htmlFor="F_country" className>Country</label>
                                <input id="F_country" defaultValue={profile.country} className="form-control input-group-lg" type="text" name="country" title="last name" placeholder="your country" />
                            </div>
                            <div className="form-group col-xs-6">
                                <label htmlFor="F_city" className>City</label>
                                <input id="F_city" defaultValue={profile.city} className="form-control input-group-lg" type="text" name="city" title="last name" placeholder="your city" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-xs-12">
                                <label htmlFor="F_description">Description</label>
                                <textarea id="F_description" defaultValue={profile.description} name="description" className="form-control" placeholder="describe yourself" rows={4} cols={400} />
                            </div>
                        </div>
                        <button className="btn btn-primary">Save Changes</button>
                    </form>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.global.profile,
    user: state.global.user ? state.global.user : {}
})
const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (data) => dispatch(globals.getProfileSuccess(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

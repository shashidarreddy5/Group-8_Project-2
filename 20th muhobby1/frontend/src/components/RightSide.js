import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { API_URL, get_headers } from '../settings';
import * as global from '../store/actions/global_settings'
import { Link } from 'react-router-dom';

class RightSide extends Component {
    constructor(props) {
        super(props)

        this.state = {
            people: []
        }
    }
    componentDidMount() {
        
        let url =`${API_URL}/api/get-users`
        axios.get(url).then(res=>{
            this.setState({
                people:res.data
            })
        }).catch(err=>{
            console.log(err)
            alert("could not fetch sitemembers")
        })
    }
    addFriend=(id)=>{
        axios.defaults.headers =get_headers()
        let url = `${API_URL}/api/add-friend`
        axios.post(url, {id:id}).then(res=>{
           this.props.updateProfile(res.data) 
        }).catch(err=>{
            console.log(err)
            alert(err.response.data)
        })
    }

    render() {
        return (
            <div className="col-md-2 static">
                <div className="suggestions" id="sticky-sidebar">
                    <h4 className="grey">Who to Follow</h4>
                    {
                        this.state.people.map(person =>
                            person.id !== this.props.profile.id?
                            <div className="follow-user">
                                <img src={person.image?person.image:"/static/images/av2.png"} alt="" className="profile-photo-sm pull-left" />
                                <div>
                                    <h5><Link to={`/user/${person.id}`}>{person.first_name} {person.last_name}</Link></h5>
                                    <a href="#!" className="text-green" onClick={()=>this.addFriend(person.id)}>Add friend</a>
                                </div>
                            </div>:
                            null
                        )
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile:state.global.profile
})

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (data) => dispatch(global.getProfileSuccess(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightSide)

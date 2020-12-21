import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL } from '../settings'
import UserSection from './UserSection'
import axios from 'axios'
import CreatePost from './CreatePost'
import SignlePost from './SignlePost'
import RightSide from './RightSide'

class UserPosts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            user:{},
            profile:{},
            id:null
        }
    }
    fetch_data =()=>{
        const id = this.props.match.params.id
        let url = `${API_URL}/api/get-user/${id}`
        axios.get(url).then(res => {
            console.log(res.data)
            this.setState({
                user: res.data.user,
                profile: res.data,
                posts: res.data.activities,
                id:id
            })
        }).catch(err => {
            console.log(err)
            alert("could not fetch the data")
        })
    }
    componentDidMount() {
        this.fetch_data()
    }
    componentWillUpdate(nextProps, nextState) {
        const id = nextProps.match.params.id
        if(id !== this.state.id){
            this.fetch_data()
        }
    }
    


    render() {
        return (
            <div className="container">
                <div className="timeline">
                    <UserSection user={this.state.user} profile={this.state.profile} />
                    <div id="page-contents">
                        <div className="row">
                            <div className="col-md-3" />
                            <div className="col-md-7">
                                <CreatePost />
                                {
                                    this.state.posts.map(post =>
                                        <SignlePost post={post} side={
                                        <div className="post-date hidden-xs hidden-sm">
                                        <h5>{this.state.user.first_name} {this.state.user.last_name}</h5>
                                        <p className="text-grey">{<>{new Date(post.post_date).toLocaleDateString()} 
                                        <br/>{new Date(post.post_date).toLocaleTimeString()}</> }</p>
                                    </div>}/>
                                    )}
                            </div>
                           <RightSide/>
                           </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.global.profile,
    user: state.global.user ? state.global.user : {}
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts)

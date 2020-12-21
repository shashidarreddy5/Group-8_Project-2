import axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL } from '../settings'
import CreatePost from './CreatePost'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

class Mates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mates: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`${API_URL}/api/mates/${id}`).then(res => {
            console.log(res.data)
            this.setState({
                mates: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <div id="page-contents">
                <div className="container">
                    <div className="row">
                        <LeftSide />
                        <div className="col-md-7">
                            <CreatePost />
                            <div className="friend-list">
                                <div className="row">
                                    {
                                        !this.state.mates.length?
                                            `
                                            You or your friend have not added any hobby mates see people to follow to add
                                            `
                                            :
                                            this.state.mates.map(mate =>
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="friend-card">
                                                        <img src="/static/images/bg/bg-3.jpg" alt="profile-cover" className="img-responsive cover" />
                                                        <div className="card-info">
                                                            <img src={mate.image? mate.image:"/static/images/av2.png"} alt="user" className="profile-photo-lg" />
                                                            <div className="friend-info">
                                                                <a href="#!" className="pull-right text-green">Friend</a>
                                                                <h5><a href="timeline.html" className="profile-link">{mate.first_name} {mate.last_name}</a></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                    }


                                </div>
                            </div>
                        </div>
                        <RightSide/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Mates)

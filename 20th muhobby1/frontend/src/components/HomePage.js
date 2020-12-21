import React, { Component } from 'react'
import { connect } from 'react-redux'
import { API_URL } from '../settings'
import axios from 'axios'
import CreatePost from './CreatePost'
import {withRouter} from 'react-router-dom'
import LeftSide from './LeftSide'
import SignlePost from './SignlePost'
import RightSide from './RightSide'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activities: []
    }
  }
  componentDidMount() {
    let url = `${API_URL}/api/get-activities/`
    axios.get(url).then(res => {
      console.log(res.data)
      this.setState({
        activities: res.data
      })
    }).catch(err => {
      alert("could not fetch the data")
    })
  }


  render() {
    return (
      <div id="page-contents">
        <div className="container">
          <div className="row">
            <LeftSide/>
            <div className="col-md-7">
            <CreatePost UpdateList={(data)=>this.setState({activities:data})}/>
              {
                this.state.activities.map(post =>
                 <SignlePost post={post} UpdateList={(data)=>this.setState({activities:data})}/>
                )
              }
            </div>
            <RightSide/>
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

const mapDispatchToProps =dispatch=> {
return {

}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage))

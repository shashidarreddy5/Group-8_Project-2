import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { API_URL, get_headers, STATIC_URL } from '../settings'
var axios = require('axios');

class SignlePost extends Component {
  addComments = (e) => {
    e.preventDefault()
    var FormData = require('form-data');
    var data = new FormData();
    data.append('comment', e.target.elements.comment.value);
    data.append('attachement', e.target.elements.image.files[0]);
    data.append('activity', this.props.post.id);

    var config = {
      method: 'post',
      url: `${API_URL}/api/add-comment`,
      headers: get_headers(),
      data: data
    };

    axios(config)
      .then(response => {
        this.props.UpdateList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleVote = (how, post) => {
    let data = {
      how: how,
      post: post,
      for_user: this.props.match.params.id
    }

    let config = {
      method: 'post',
      url: `${API_URL}/api/vote-post`,
      headers: get_headers(),
      data: data
    };
    
    axios(config)
      .then(response => {
        this.props.UpdateList(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }
  render() {
    let post = this.props.post
    let user = JSON.parse(post.user),
      comments = JSON.parse(post.comments);
    console.log(post)
    return (
      <div className="post-content">
        {this.props.side}
        {
          post.image ?
            <img src={STATIC_URL + post.image} alt="post" className="img-responsive post-image" />
            :
            ""
        }

        <div className="post-container">
          <img src={user.image ? STATIC_URL + user.image : "/static/images/av2.png"}
             alt="user" className="profile-photo-md pull-left" />
          <div className="post-detail">
            <div className="user-info">
              <h5><Link to={`/user/${post.user_id}`} className="profile-link">{user.first_name} {user.last_name} </Link>
                <span className="text-success"> -@{post.hobby_name}</span></h5>
              <p className="text-muted">Published {<>{new Date(post.post_date).toLocaleDateString()} {" "}
                                        : {new Date(post.post_date).toLocaleTimeString()}</>}</p>
            </div>
            <div className="reaction">
              <a href="#!" className="btn text-green" onClick={() => this.handleVote("up", post.id)}><i className="fa fa-thumbs-up" /> {post.votes_up}</a>
              <a href="#!" className="btn text-red" onClick={() => this.handleVote("down", post.id)}><i className="fa fa-thumbs-down" /> {post.votes_down}</a>
            </div>
            <div className="line-divider" />
            <div className="post-text">
              <p>
                {post.caption}
                <i className="em em-anguished" />
                <i className="em em-anguished" />
                <i className="em em-anguished" />
              </p>
            </div>
            <div className="line-divider" />
            {
              comments.length ?
                comments.map(comment =>
                  comment.id ?
                    <div className="post-comment">
                      <img src={comment.profile ? STATIC_URL + comment.profile : "/static/images/av2.png"}alt="user" className="profile-photo-sm" />
                      <p><a href="timeline.html" className="profile-link">{comment.first_name} {comment.last_name} </a><i className="em em-laughing" />
                        {comment.comment}</p>
                    </div>
                    : null
                )
                : null
            }

            <form className="post-comment" method="post" onSubmit={this.addComments}>
              <img src={this.props.profile.image ? STATIC_URL + this.props.profile.image : "/static/images/av2.png"} alt="user" className="profile-photo-sm" />
              <textarea required={true} type="text" name="comment" className="form-control" placeholder="Post a comment"></textarea>
              <input type="file" name="image" className="form-control" />
              <button className="btn-success btn-sm">
                send
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.global.profile
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignlePost))

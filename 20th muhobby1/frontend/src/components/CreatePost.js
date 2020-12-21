import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import { API_URL, get_headers } from '../settings';

class CreatePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    HandleCreatePost=(e)=>{
      e.preventDefault();
        var data = new FormData();
        data.append('attachement', e.target.elements.attachment.files[0]);
        data.append('caption', e.target.elements.caption.value);
        data.append('hobby', e.target.elements.hobby.value);

        var config = {
        method: 'post',
        url:`${API_URL}/api/post-activity/`,
        headers: get_headers(),
        data : data
        };

        axios(config).then(response=> {
          console.log(response)
          this.props.UpdateList(response.data);
        })
        .catch(error=>{
        console.log(error);
        });
    }
    
    render() {
        return (
            <div className="create-post">
            {
              localStorage.getItem("token")?
                <form className="row" onSubmit={this.HandleCreatePost}>
                  {
                    !this.props.hobbies.length ?
                      <p>You have not created any hobbay yet <Link to="/profile">create hobby</Link> to post an activity</p> :
                      null
                  }
                  <div className="col-md-8 col-sm-7">
                    <div className="form-group">
                      <select name="hobby">
                        {
                          this.props.hobbies.map(hobby =>
                            <option value={hobby.id}>{hobby.name}</option>
                          )
                        }

                      </select>
                      <textarea name="caption" id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Write what you wish" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-5">
                    <div className="tools">
                      <ul className="publishing-tools list-inline">
                        <input type="file" id="attach" name="attachment" />
                        <li><label for="attach"><b className="ion-ios-folder-outline bold" />select attach</label></li>
                      </ul>
                      <button className="btn btn-primary pull-right">Publish</button>
                    </div>
                  </div>
                </form>
:null
            }
           
               </div>     
        )
    }
}

const mapStateToProps = (state) => ({
    profile:state.global.profile,
    hobbies:state.global.hobbies
})

const mapDispatchToProps = dispatch=>{
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePost))

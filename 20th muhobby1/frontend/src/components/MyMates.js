import React, { Component } from 'react'
import { connect } from 'react-redux'

class MyMates extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        let mates = this.props.mates
        console.log(mates)
        return (


            <div className="friend-list">
                <div className="row">
                    {
                        !mates.length ?
                            `
                            You or your friend have not added any hobby mates see people to follow to add
                            `
                            :
                            mates.map(mate =>
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

        )
    }
}

const mapStateToProps = (state) => ({
    mates: state.global.mates
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyMates)

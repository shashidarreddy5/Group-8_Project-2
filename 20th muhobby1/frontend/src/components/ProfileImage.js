import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
class ProfileImage extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    uploadImage = (e) => {
        var data = new FormData();
        data.append('image', e.target.images[1]);

        var config = {
            method: 'get',
            url: 'http://localhost/api/upload-pic/',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA3MDI4MDkzLCJleHAiOjE2MDc2MzI4OTN9.TqvWxbWJLOU-YU14end02DtE7RDmTfcUrOxtjxSgbKI',
                ...data.getHeaders()
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage)

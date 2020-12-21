const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./auth');
const profile = require('./profile');
const hobbies = require('./hobbies');
const activity = require('./activity');
const database = require("./database")
const general = require("./general")
var cors = require('cors');
app.use(bodyParser.json());

app.use(cors())
const fileupload = require('express-fileupload')
app.use(
    fileupload())
const conn = database.connect()
var fs = require('fs');

app.use(express.static("public"))

const saveFile = (fileName, file, req, res, next, args) => {
    const path = __dirname + '/public/upload-images/' + fileName
    if (!fileName) {
        file_path = ""
        if (args) {
            args['image'] = file_path
            next(res, conn, args)
        } else {
            next(conn, res, file_path, req.user, args)
        }
        return
    }
    file.mv(path, (error) => {
        if (fileName) {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'application/json'
                })
                res.send(JSON.stringify({
                    status: 'error',
                    message: error
                }))
                return false
            }
        }

        file_path = "/upload-images/" + fileName
        if (!fileName) {
            file_path = ""
        }
        if (args) {
            args['image'] = file_path
            next(res, conn, args)
        } else {
            next(conn, res, file_path, req.user, args)

        }

    })

}

app.get("/api/get-global/", auth.authOrNot, (req, res) => {
    
    general.getGlobal(conn, req, res)
})

app.post("/api/upload-pic/", auth.authenticateToken, (req, res) => {
    
    const fileName = req.files.myFile.name
    saveFile(fileName, req.files.myFile, req, res, profile.upload_image)
})
app.post("/api/login/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    data = {
        username: req.body.username,
        password: req.body.password
    }
    if (data.username) {
        if (data.password) {
            auth.login(conn, data, res)
        } else {
            res.status(403).send(JSON.stringify({
                "response": "please fill all the required fields [password] missing"
            }));
        }
    } else {
        res.status(403).send(JSON.stringify({
            "response": "please fill all the required fields [username] missing"
        }));
    }

});
app.post("/api/update-profile/", auth.authenticateToken, (req, res) => {
    
    user_id = req.user
    data = req.body
    data.user = user_id
    profile.update_profile(conn, data, res)
})


app.post("/api/signup", (req, res) => {
    
    data = req.body
    if (data.password1 === data.password2) {
        if (data.password2) {
            if (data.username) {
                state = auth.signup(conn, {
                    username: data.username,
                    password: data.password1,
                    first_name: data.first_name,
                    last_name: data.last_name,
                }, res)
            }
        } else {
            res.status(403).send(JSON.stringify({
                "response": "please fill all the required fields"
            }));
        }
    } else {
        res.status(403).send(JSON.stringify({
            "response": "the two password fields did not match"
        }));
    }

})

app.post('/api/forgot/', (req, res) => {
    

    auth.rest_password(conn, req, res)
});


app.post("/api/reset/", (req, res) => {
    

    data = req.body
    if (!data.password1 || !data.password2 || !data.token) {
        res.status(403).send(JSON.stringify({
            "response": "please supply all required fields"
        }));
    } else {
        if (data.password1 !== data.password2) {
            res.status(403).send("the two password fields did not match");
        } else {
            auth.setNewPassword(conn, req, res, data)
        }
    }

})

app.get("/api/get-profile/", auth.authenticateToken, (req, res) => {
    
    user_id = req.user
    profile.get_profile(conn, user_id, res)
})

app.get("/api/get-user/:id", (req, res) => {
    id = req.params.id
    profile.get_user(conn, res, id)
})


app.get("/api/mates/:id", (req, res) => {
    id = req.params.id
    profile.get_mates(conn, res, id)
})
app.post("/api/create-hobby/", auth.authenticateToken, (req, res) => {
    

    data = req.body
    data.user = req.user
    hobbies.create_hobby(res, conn, data)
})
app.get("/api/get-hobbies", (req, res) => {
    
    hobbies.get_hobbies(res, conn)
})
app.post("/api/add-my-hobby/", auth.authenticateToken, (req, res) => {
    

    data = req.body
    data.user = req.user
    hobbies.add_my_hobby(res, conn, data)
})
app.post("/api/vote-post", auth.authenticateToken, (req, res) => {
    data = req.body
    activity.votes_post(res, conn, data)
})
app.get("/api/get-my-hobbies/", auth.authenticateToken, (req, res) => {
    
    user = req.user
    hobbies.get_my_hobbies(res, conn, user)
})

app.post("/api/post-activity", auth.authenticateToken, (req, res) => {
    

    const fileName = req.files ? req.files.attachement.name : null
    data = req.body
    console.log(data)
    data.user = req.user
    saveFile(fileName, req.files ? req.files.attachement : null, req, res, activity.create_activity, data)

})

app.get("/api/get-activities/", (req, res) => {
    

    activity.get_activities(res, conn, [])
})

app.post("/api/add-comment", auth.authenticateToken, (req, res) => {
    
    const fileName = req.files ? req.files.attachement.name : null
    data = req.body
    data.user = req.user
    saveFile(fileName, req.files ? req.files.attachement : null, req, res, activity.comment_activity, data)

})

app.get("/api/get-users", (req, res) => {
    console.log("[LOGS]=> fetching users")
    profile.get_profiles(conn, res)
})

app.post("/api/add-friend", auth.authenticateToken, (req, res) => {
    data = req.body
    data.user = req.user
    profile.add_mate(conn, res, data)
})

app.listen(8000, () => {
    console.log('Server started on port 8000...');
});
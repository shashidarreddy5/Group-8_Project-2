const jwt = require('jsonwebtoken');
var async = require('async');
var crypto = require('crypto');
const {secret} = require('./config.json');
const bcrypt = require('bcrypt');
const error_categ = (err) => {
    return err.sqlMessage
}

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}


Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        if (!user) return res.sendStatus(403);
        req.user = user.id
        next()
    })
}
const authOrNot = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        req.user = null
        next()
    }else{
        jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        if (!user) return res.sendStatus(403);
        req.user = user.id
        next()
    })
    }
}


const create_profile = (conn, data) => {
    let sql = `INSERT INTO \`profile\` (user_id, image, description) VALUES ("${data.user_id}", "", "${data.description}");`
     conn.query(sql, (err, results) => {
        var state = ""
        if (err) {
            err_mess = error_categ(err)
            state = [false, err_mess]
        } else {
            state = [true, results]
        }
        console.log(`[LOGS] > create profile > ${state}`)
    });
}

const login = (conn, data, res) => {
    let sql = `SELECT id,username,password,first_name,last_name, last_login FROM user WHERE username="${data.username}";`;
    conn.query(sql, (err, results) => {
        if (err) {
            res.status(403).send({ "error": "server error tring to log in" })
            return
        }
        if (results.length) {
            results = results[0]
            if (bcrypt.compareSync(data['password'], results['password'])) {
                const token = jwt.sign({
                    id: results.id
                }, secret, {
                    expiresIn: '7d'
                });
                results.token = token
                results.password = null
                time = new Date().toMysqlFormat()
                res.send(JSON.stringify({
                    "response": results
                }));
                sql = `UPDATE \`user\` SET last_login="${time}";`
                conn.query(sql, (err, results2) => {
                    if (err) throw err;
                    sql = `INSERT INTO \`login_record\` (user_id, time) VALUES ("${results.id}", "${time}");`
                    conn.query(sql, (err, results3) => {
                        if (err) throw err;
                    })
                })
            } else {
                res.status(401).send(JSON.stringify({
                    "response": "cannot login with provided credentials"
                }));
            }

        } else {
            res.status(401).send(JSON.stringify({
                "response": "A USER WITH THE NAME YOU GAVE DOES NOT EXIST"
            }));
        }

    });
}

const signup = (conn, data, res) => {
    data["password"] = bcrypt.hashSync(data.password, 10);
    let sql = `INSERT INTO \`user\` (username, password, first_name, last_name, created_date) VALUES ("${data.username}", "${data.password}", "${data.first_name}", "${data.last_name}", "${new Date().toMysqlFormat()}");`
    let query = conn.query(sql, (err, results) => {
        var state = ""
        if (err) {
            err_mess = error_categ(err).toLowerCase().includes("duplicate")?"a user with the email already exist":"server error creating theuser"
            state = [false, err_mess]
        } else {
            state = [true, results]
        }
        if (state[0]) {
            create_profile(conn, {
                user_id: results.insertId,
                image: null,
                description: null
            })
        }
        console.log(`[LOGS] > create user > ${state}`)
        if (!state[0]) {
            res.status(401).send(JSON.stringify({
                "response": err_mess
            }));
        } else {
            res.send(JSON.stringify({
                "response": "your account has been created you can now login with the credentials"
            }));
        }
    });
}

const rest_password = (conn, req, res) => {
    data = req.body
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },

        function(token, done) {
            let sql = `SELECT id,username,password,first_name,last_name, last_login FROM user WHERE username="${data.username}";`;
            conn.query(sql, (err, user) => {

                if (!user.length) {
                    res.status(401).send(JSON.stringify({
                        'error': 'No account with that email address exists.'
                    }));
                    return 0
                }
                user = user[0]
                sql = `UPDATE \`user\` SET reset_token="${token}"  WHERE id=${user.id};`
                conn.query(sql, (err, results2) => {
                    if (err) {
                        res.status(403).send({ "error": "server error getting account for the email" })
                        return
                    }
                    var mailOptions = {
                        to: user.username,
                        from: 'passwordreset@demo.com',
                        subject: 'myhobbay password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            req.headers.origin + '/auth/reset-password/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };
                    console.log(mailOptions)
                    res.send(JSON.stringify({
                        'success': 'email has been sent please check console logs for reset instructions'
                    }));
                })
            });
        },
        function(token, user, done) {
            // var smtpTransport = nodemailer.createTransport('SMTP', {
            //     service: 'SendGrid',
            //     auth: {
            //         user: '!!! YOUR SENDGRID USERNAME !!!',
            //         pass: '!!! YOUR SENDGRID PASSWORD !!!'
            //     }
            // });
            var mailOptions = {
                to: user.username,
                from: 'passwordreset@demo.com',
                subject: 'myhobbay password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    req.headers.origin + '/auth/reset-password/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            // smtpTransport.sendMail(mailOptions, function(err) {
            //     req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            //     done(err, 'done');
            // });

            res.send(JSON.stringify({
                'success': 'email has been sent please check for reset instructions'
            }));
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
}

const setNewPassword = (conn, req, res, data) => {
    let sql = `SELECT id FROM user WHERE reset_token="${data.token}";`
    let query = conn.query(sql, (err, results) => {
        if (err) {
            res.status(403).send({ "error": "server error setting your password" })
            return
        }
        if (!results.length) {
            res.status(401).send("could not validate the token, it has either expired or is invalid")
        } else {
            results = results[0]
            data["password1"] = bcrypt.hashSync(data.password1, 10);
            sql = `UPDATE \`user\` SET  reset_token="", password="${data.password1}" WHERE id=${results.id};`
            conn.query(sql, (err, results2) => {
                if (err){
                    res.status(403).send({"error":"server error setting your password"})
                    return 
                }
                res.send(JSON.stringify({"success":"your password has been set, you can now login with the new password"}))
            })
        }
    })


}
module.exports = {
    login,
    signup,
    authenticateToken,
    rest_password,
    setNewPassword,
    authOrNot
}
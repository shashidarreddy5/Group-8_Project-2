const getGlobal = (conn, req, res) => {
    user = req.user;
    console.log(user)
    sql = `SELECT * FROM \`hobby\`;`
    conn.query(sql, (err, hobbies) => {
        if (err) {
            console.log(err)
            res.status(405).send("server error")
            return;
        }
        if (user) {
            sql = `select p.*,
            json_object("id",u.id,"username",u.username, "first_name",u.first_name,"last_name", u.last_name, 'last_login', u.last_login) as user,
            json_arrayagg(json_object('id', l.id, 'date', l.time)) as logins
            from user u 
            inner join profile p on u.id = p.user_id
            inner JOIN login_record l on u.id = l.user_id
            WHERE p.user_id=${user}`
            conn.query(sql, (err, results) => {
                if (err) {
                    console.log(err)
                    state = [false, err]
                    res.status(402).send(JSON.stringify({
                        "response": "server error fetching"
                    })); 
                } else {
                    sql = `SELECT uh.*, h.name FROM user_hobbies uh
                    inner JOIN hobby h on uh.hobby_id=h.id WHERE uh.user_id=${user}`
                    conn.query(sql, (err, response) => {
                        if (err) {
                            console.log(err)
                        } else {
                            sql = `SELECT m.*, u.first_name ,u.last_name, p.image FROM mates m INNER JOIN user u on m.mate=u.id INNER JOIN profile p on u.id=p.user_id WHERE m.me=${user}`
                            conn.query(sql, (err, mates) => {
                                if (err) {
                                    console.log(err)
                                    res.status(404).send("error fetching mates")
                                    return
                                } else {
                                    results = results[0]
                                    results.user = JSON.parse(results.user)
                                    results.logins = JSON.parse(results.logins)
                                    results.hobbies = response
                                    results.mates = mates
                                    res.send(JSON.stringify({
                                        hobbies: hobbies,
                                        profile: results
                                    }))
                                }
                            })

                        }
                    })

                }
            })
        } else {
            console.log("no user")
            res.send(JSON.stringify({
                hobbies: hobbies,
                profile: {}
            }))
        }
    })
}

module.exports = {
    getGlobal
}
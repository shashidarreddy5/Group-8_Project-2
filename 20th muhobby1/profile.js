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
const upload_image = (conn, res, path_, user) => {
    sql = `UPDATE \`profile\` SET image="${path_}" WHERE user_id=${user};`
    conn.query(sql, (err, results) => {
        if (err) {
            err_mess = error_categ(err)
            state = [false, err_mess]
            res.status(401).send(JSON.stringify({
                "response": err_mess
            }));
        } else {
            get_profile(conn, user, res)
        }
    })

}
const get_profiles=(conn, res)=>{
    sql =`SELECT profile.*, u.first_name, u.last_name FROM profile 
    INNER JOIN user u ON u.id=profile.user_id`
    conn.query(sql,(err, response)=>{
        if(err){
            console.log(err)
        }
        res.send(JSON.stringify(response))
    })
}
const update_profile = (conn, data, res) => {
    sql = `UPDATE \`profile\` SET description="${data.description}", country="${data.country}", city="${data.city}" WHERE user_id=${data.user};`
    conn.query(sql, (err, results) => {
        if (err) {
            err_mess = error_categ(err)
            state = [false, err_mess]
            res.status(401).send(JSON.stringify({
                "response": err_mess
            }));
        } else {
            sql = `UPDATE \`user\` SET first_name="${data.first_name}", last_name="${data.last_name}" WHERE id=${data.user};`
            conn.query(sql, (err, results) => {
                if (err) {
                    err_mess = error_categ(err)
                    state = [false, err_mess]
                    res.status(401).send(JSON.stringify({
                        "response": err_mess
                    }));
                } else {
                    get_profile(conn, data.user, res)
                }
            })
        }
    })
}
const get_mates = (conn, res, id) => {
    sql = `SELECT m.*, u.first_name first_name,last_name, p.image FROM mates m INNER JOIN user u on m.mate=u.id INNER JOIN profile p on u.id=p.user_id WHERE m.me=${id}`;
    conn.query(sql, (err, response) => {
        if (err) {
            console.log(err)
            res.status(405).send("server error fetching data")
            return
        } else {
            res.send(JSON.stringify(response))
        }
    })
}
const add_mate=(conn,res,data)=>{
    sql = `SELECT * from mates where me=${data.user} && mate=${data.id}`
    conn.query(sql, (err,mate)=>{
        if(err){
            console.log(err)
            res.status(405).send("server error checking mates")
            return
        }
        if(mate.length){
            console.log("duplicate")
            res.status(402).send("could not add user, already folowing")
            return
        }else{
            time = new Date().toMysqlFormat()
            sql = `INSERT INTO mates (me,mate, date) VALUES (${data.user}, ${data.id}, "${time}")`
            conn.query(sql, (err,results)=>{
                if(err){
                    console.log(err)
                    res.status(401).send(JSON.stringify(err))
                    return
                }
                get_mates(conn,res,data.user)
            })
        }
    })
}
const get_user = (conn, res, user_id) => {
    if (!user_id) {
        return
    }
    sql = `SELECT id,image, description, city, country FROM \`profile\` WHERE user_id=${user_id};`
    conn.query(sql, (err, results) => {
        if (err) {
            err_mess = error_categ(err)
            state = [false, err_mess]
            res.status(401).send(JSON.stringify({
                "response": err_mess
            }));
        } else {
            if (!results.length) {
                res.status(404).send(JSON.stringify({
                    "response": "profile not found"
                }));
                return
            }
            results = results[0]
            sql = `SELECT id,username,first_name,last_name, last_login FROM user WHERE id=${user_id};`;
            conn.query(sql, (err, results2) => {
                if (err) {
                    err_mess = error_categ(err)
                    state = [false, err_mess]
                    res.status(401).send(JSON.stringify({
                        "response": err_mess
                    }));
                } else {
                    if (!results2.length) {
                        res.status(401).send(JSON.stringify({
                            "response": "no user found"
                        }));
                        return
                    }
                    results['user'] = results2[0]
                    sql = `SELECT a.*, u.id, h.name hobby_name,
                    json_object('id', u.id, 'first_name', u.first_name,
                    'last_name', u.last_name, 'image',p.image) as user,
                    json_arrayagg(json_object('id', c.id, 'comment', c.comment,
                    'post_date', c.post_date, 'image',c.image, 'first_name',cu.first_name, 'last_name',cu.last_name,"profile",cp.image)) as comments
                        FROM activity a
                        INNER JOIN user u on a.user_id = u.id 
                        LEFT JOIN comment c on a.id=c.activity_id
                        LEFT JOIN user cu on u.id=c.user_id
                        LEFT JOIN profile cp on u.id=cp.user_id
                        INNER JOIN hobby h on a.hobby_id=h.id 
                        INNER JOIN profile p on u.id=p.user_id WHERE a.user_id=${user_id} group by a.id ORDER BY a.id desc`;
                    conn.query(sql, (err, results3) => {
                        if (err) {
                            err_mess = error_categ(err)
                            state = [false, err_mess]
                            res.status(401).send(JSON.stringify({
                                "response": err_mess
                            }));
                        } else {
                            results['activities'] = results3
                            state = [true, results]
                            res.send(JSON.stringify(results));
                        }
                    })
                }
            })

        }
    })
}
const get_profile = (conn, user_id, res) => {
    sql = `select p.*,
    json_object("id",u.id,"username",u.username, "first_name",u.first_name,"last_name", u.last_name, "last_login",u.last_login) as user,
    json_arrayagg(json_object('id', h.id, 'name', h.name)) as hobbies,
    json_arrayagg(json_object('id', l.id, 'date', l.time)) as logins
    from user u 
    LEFT join user_hobbies uh on uh.user_id = u.id
    inner join profile p on u.id = p.user_id
    LEFT JOIN hobby h on h.id = uh.hobby_id
    inner JOIN login_record l on u.id = l.user_id
    WHERE p.user_id=${user_id}; `
    conn.query(sql, (err, results) => {
        results = results[0]
        if (err) {
            err_mess = error_categ(err)
            state = [false, err_mess]
            res.status(401).send(JSON.stringify({
                "response": err_mess
            }));
        } else {
            sql = `SELECT m.*, u.first_name first_name, last_name, p.image FROM mates m INNER JOIN user u on m.mate = u.id INNER JOIN profile p on u.id = p.user_id WHERE m.me = ${user_id }`
            conn.query(sql, (err,mates)=>{
                if (err) {
                    err_mess = error_categ(err)
                    state = [false, err_mess]
                    res.status(401).send(JSON.stringify({
                        "response": err_mess
                    }));
                }else{
                    results.user = JSON.parse(results.user)
                    results.logins = JSON.parse(results.logins)
                    results.hobbies = JSON.parse(results.hobbies)
                    results.mates = mates
                    res.send(JSON.stringify(results))
                    return
                }
            })
            
            }
    })
}
module.exports = {
    update_profile,
    get_profile,
    upload_image,
    get_user,
    get_mates,
    get_profiles,
    add_mate
}
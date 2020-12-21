function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}


const create_activity = (res, conn, data) => {
    time = new Date().toMysqlFormat()
    user = data.user;
    hobby = data.hobby
    sql = `SELECT id FROM user WHERE id=${user};`
    conn.query(sql, (err, user_) => {
        if (err) {
            res.status(401).send(JSON.stringify({
                "error": err.sqlMessage
            }))
            return
        }
        if (!user_.length) {
            res.status(401).send(JSON.stringify({
                "error": "user does not exist in database"
            }))
            return
        } else {
            sql = `SELECT id FROM hobby WHERE id=${hobby};`
            conn.query(sql, (err, hobby_) => {
                if (err) throw err;
                if (hobby_.length) {
                    sql = `INSERT INTO \`activity\` (user_id,hobby_id, image, caption, votes_up, votes_down, post_date) VALUES \
                	(${user}, ${hobby}, "${data.image}", "${data.caption}",0,0,"${time}");`;
                    conn.query(sql, (err, activity) => {
                        if (err) {
                            res.status(401).send(JSON.stringify({
                                "error": err.sqlMessage
                            }))
                            return
                        }
                        get_activities(res, conn, [])
                    })
                }
            })
        }
    })
}


const votes_post = (res, conn, data) => {
    console.log(data)
    how = data.how
    post = data.post
    sql = `SELECT * FROM activity WHERE id=${post}`;
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err)
            res.status(401).send("could not count your vote for some reason try again some other time")
            return
        }
        if(results.length){
            results = results[0]
            if (how === "up") {
                votes = results.votes_up + 1
                sql = `UPDATE activity SET votes_up=${votes} WHERE id=${post}`
            }
            else if (how === "down") {
                votes = results.votes_down + 1
                sql = `UPDATE activity SET votes_down=${votes} WHERE id=${post}`
                
            } else {
                res.status(401).send("invalid vote choice!")
                return
            }
        }else{
            res.status(404).send("the post you requested is not found!")
                return
        }
        
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err)
                res.status(401).send("could not count your vote for some reason try again some other time")
                return
            } else {
                console.log(results)
                qrs = []
                if (data.for_user) {
                    qrs.push({ name: user_id, value: data.for_user })
                }
                get_activities(res, conn, qrs)
            }
        })

    })

}
const update_activity = (res, conn, data) => {
    sql = `SELECT id FROM  \`activity\` WHERE id=${data.id} && user_id=${data.user};`
    conn.query(sql, (err, activity) => {
        if (err) {
            res.status(401).send(JSON.stringify({
                "error": err.sqlMessage
            }))
            return
        }
        if (!activity.length) {
            res.status(401).send(JSON.stringify({
                "error": "you dont have enough permissons to edit this activity"
            }))
            return
        } else {
            sql = `UPDATE \`activity\` SET caption=${data.caption}`
            conn.query(sql, (err, activity_edites) => {
                if (err) {
                    res.status(401).send(JSON.stringify({
                        "error": err.sqlMessage
                    }))
                    return
                }
                get_activget_one_activityity(res, conn, id)
                return
            })
        }
    })
}
const get_activities = (res, conn, qrs) => {
    sql = `SELECT a.*, h.name hobby_name,
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
        INNER JOIN profile p on u.id=p.user_id
        group by a.id 
    `;
    ln = qrs.length - 1
    if (qrs.length) {
        for (q in qrs) {
            if (q === 0) {
                sql += " WHERE " + qrs[q].name + "=" + qrs[q].value
            } else {
                sql += " && " + qrs[q].name + "=" + qrs[q].value
            }

        }
    }
    sql += "  ORDER BY  a.id desc"

    conn.query(sql, (err, activities) => {
        if (err) throw err;
        res.send(JSON.stringify(activities))
        return
    })
}
const get_one_activity = (res, conn, id) => {
    sql = `SELECT a.*, u.id, u.first_name firstname, u.last_name, h.name hobby_name, p.image profile_image
    FROM activity a
    INNER JOIN user u on a.user_id = u.id INNER JOIN hobby h on a.hobby_id=h.id INNER JOIN profile p on u.id=p.user_id WHERE a.id=${id}`
    conn.query(sql, (err, activity) => {
        if (err) {
            res.status(401).send(JSON.stringify({
                "error": err.sqlMessage
            }))
            return
        }
        if (!activity.length) {
            res.status(401).send(JSON.stringify({
                "error": "activity not found or deleted"
            }))
            return
        } else {
            sql = `SELECT * FROM \`comment\` WHERE activity_id=${id};`
            conn.query(sql, (err, comments) => {
                if (err) {
                    res.status(401).send(JSON.stringify({
                        "error": err.sqlMessage
                    }))
                    return
                }
                activity.comments = comments
                res.send(JSON.stringify(activity[0]))
                return
            })

        }
    })
}

const comment_activity = (res, conn, data) => {
    console.log(data)
    user = data.user
    comment = data.comment
    image = data.image
    activity = data.activity
    sql = `INSERT INTO comment (user_id, comment,image,activity_id) VALUES (${user},"${comment}","${image ? image : " "}",${activity})`
    conn.query(sql, (err, response) => {
        if (err) {
            console.log(err)
            res.status(401).send("server could not add comment checkh that you supply all reaquired fields")
        } else {
            get_activities(res, conn, [])
        }
    })
}
module.exports = {
    create_activity,
    get_activities,
    get_one_activity,
    comment_activity,
    votes_post
}
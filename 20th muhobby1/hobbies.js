const { compareSync } = require("bcrypt");

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

const create_hobby = (res, conn, data) => {
    time = new Date().toMysqlFormat()
    add = data.add
    sql = `INSERT INTO \`hobby\` (name, created_date) VALUES ("${data.name}", "${time}" )`
    conn.query(sql, (err, results) => {
        if (err) {
            if (err.sqlMessage.toLowerCase().includes("duplicate")) {
                if (add) {
                    
                    sql = `SELECT id FROM hobby WHERE name="${data.name}";`
                    conn.query(sql, (err2, hobby) => {
                        if (err2) {
                            console.log(err2)
                            res.status(405).send("server error")
                            return;
                        }
                        console.log(hobby)
                        if (hobby.length) {
                            data.hobby = hobby[0].id
                            add_my_hobby(res, conn, data)
                            return
                        } else {
                            res.status(404).send(JSON.stringify({
                                "error": "hobby you are looking for does not exist"
                            }))
                            return
                        }

                    })
                } else {
                    console.log(err)
                    res.status(401).send(JSON.stringify({
                        "error": err.sqlMessage
                    }))
                    return
                }
            } else {
                console.log(err.sqlMessage)
                res.status(401).send(JSON.stringify({
                    "error": err.sqlMessage
                }))
                return

            }

        }else{
            id = results.insertId
            if (add) {
                console.log("[ADD]=>add my hobby")
                data.hobby = id
                add_my_hobby(res, conn, data)
                return
            }
            get_one_hobby(res, conn, id)
        }
        
    })
}
const get_one_hobby = (res, conn, id) => {
    sql = `SELECT * FROM hobby WHERE id=${id};`
    conn.query(sql, (err, hobby) => {
        if (err) {
            console.log(err)
            res.status(405).send("server error")
            return;
        }
        if (hobby.length) {
            console.log("hobby adding now..")
            res.send(JSON.stringify(hobby[0]));
        } else {
            res.status(404).send(JSON.stringify({
                "error": "hobby you are looking for does not exist"
            }))
        }

    })
}
const get_hobbies = (res, conn) => {
    sql = `SELECT * FROM hobby;`
    conn.query(sql, (err, hobby) => {
        if (err) {
            console.log(err)
            res.status(405).send("server error")
            return;
        }
        res.send(JSON.stringify(hobby))
    })
}

const add_my_hobby = (res, conn, data) => {
    user_id = data.user
    hobby_id = data.hobby
    time = new Date().toMysqlFormat()
    sql = `SELECT id FROM hobby WHERE id=${hobby_id};`
    conn.query(sql, (err, hobby) => {
        if (err) {
            res.status(401).send(JSON.stringify({
                "error": "server error getting hobby to add your account"
            }))
            return
        }
        if (hobby.length) {
            let sql = `SELECT id FROM user WHERE id="${user_id}";`;
            conn.query(sql, (err, user) => {
                if (err) {
                    res.status(401).send(JSON.stringify({
                        "error": "server error getting your account"
                    }))
                    return
                }
                if (user.length) {
                    sql = `INSERT INTO \`user_hobbies\` (user_id,hobby_id,date) VALUES ("${user_id}", "${hobby_id}", "${time}");`
                    conn.query(sql, (err, results) => {
                        if (err) {
                            error = err.sqlMessage.toLowerCase().includes("duplicate") ? "you already have this hobby linked to your account" : err.sqlMessage.toLowerCase()
                            res.status(401).send(JSON.stringify({
                                "error": err.sqlMessage
                            }))
                            return
                        }
                        get_my_hobbies(res, conn, user_id)
                    })
                } else {
                    console.log("no user found")
                    res.status(404).send(JSON.stringify({
                        "error": "user" + user_id + " does not exist"
                    }))
                }
            })
        } else {
            res.status(404).send(JSON.stringify({
                "error": "hobby" + hobby_id + " does not exist"
            }))
        }

    })
}

const get_my_hobbies = (res, conn, user) => {
    sql = `SELECT user_hobbies.*, hobby.name from user_hobbies  inner join hobby on user_hobbies.hobby_id=hobby.id WHERE  user_id=${user};`
    conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify(results))
        return
    })
}

module.exports = {
    create_hobby,
    get_one_hobby,
    get_hobbies,
    add_my_hobby,
    get_my_hobbies
}
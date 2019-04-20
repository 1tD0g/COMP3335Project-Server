require("dotenv").config();
const mysql = require("mysql2/promise");

const Setting = {
    USER: process.env.MYSQLUSER,
    PASS: process.env.MYSQLPASS,
    DB: process.env.MYSQLDB,
    HOST: process.env.MYSQLHOST
};

new Promise(async (resolve, reject) => {
    try{
        return resolve(await mysql.createConnection({
            host: Setting.HOST,
            user: Setting.USER,
            database: Setting.DB,
            password: Setting.PASS
        }))
    }catch(e){
        return reject(e);
    }
})
.then(conn => {
    this.inited = true;

    this.insertNewUser = (email, password, code) => new Promise((resolve, reject) => conn.execute(`INSERT INTO User (email, password, activationCode) VALUES (?, ?, ?)`, [email, password, code])
    .then(r => resolve({
        affectedRows: r[0].affectedRows,
        userID: r[0].insertId 
    }))
    .catch(e => reject(e)));

    this.emailExists = email => new Promise((resolve, reject) => conn.execute(`Select * From User Where email = ?`, [email])
    .then(v => resolve(v[0].length > 0))
    .catch(e => reject(e)));

    this.getUserByID = id => new Promise((resolve, reject) => conn.execute(`Select * From User Where id = ?`, [id])
    .then(v => resolve(v[0][0]))
    .catch(e => reject(e)));

    this.getUserByEmail = email =>new Promise((resolve, reject) => conn.execute(`Select * From User Where email = ?`, [email])
    .then(v => resolve(v[0][0]))
    .catch(e => reject(e)));

    this.activateUserByID = id => new Promise((resolve, reject) => conn.execute(`UPDATE User SET activated = 1 Where id = ?`, [id])
    .then(v => resolve(v[0].affectedRows))
    .catch(e => reject(e)));

    this.updateUserPasswordByID = (password, id) => new Promise((resolve, reject) => conn.execute(`UPDATE User SET password = ? Where id = ?`, [password, id])
    .then(v => resolve(v[0].affectedRows))
    .catch(e => reject(e)));

    this.addFile = (id, iv, time, mimeType) => new Promise((resolve, reject) => conn.execute(`INSERT INTO File (ownerID, iv, createTime, mimeType) VALUES (?, ?, FROM_UNIXTIME(?), ?)`, [id, iv, time, mimeType])
    .then(r => resolve({
        affectedRows: r[0].affectedRows,
        id: r[0].insertId 
    }))
    .catch(e => reject(e)));

    this.uploadedFile = (id, hash, time) => new Promise((resolve, reject) => conn.execute(`UPDATE File SET hash = ?, uploadTime = FROM_UNIXTIME(?) WHERE id = ?`, [hash, time, id])
    .then(v => resolve(v[0].affectedRows))
    .catch(e => reject(e)));
})
.catch(e => {
    this.error = e;
})
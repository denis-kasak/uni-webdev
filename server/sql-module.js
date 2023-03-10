const { query } = require('express');
let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'Vergleich24'
});

function getFavorite(favId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Favoriten WHERE id=" + favId + ";";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);

                resolve(results);
            });
        });
    });
}

//User = UserCoockie
function setFavorite(userid, beschreibung, favoritenquery) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Favoriten(userid, beschreibung, query)VALUES('" + userid + "', '" + beschreibung + "', '" + favoritenquery + "');";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);

                resolve(results);
            });
        });
    });
}

function getUsername(userid) {
    return new Promise((resolve, reject) => {
        const query = "SELECT username FROM User WHERE id= '"+userid+"';";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query , function (err, results, _) {
                if (err) reject(err);

                resolve(results[0]);
            });
        });
    });
}

function getUserdbid(userid) {
    return new Promise((resolve, reject) => {
        let query = "Select dbid from User WHERE id = ";
        query += "'"+userid+"'";
        query += ";";
        console.log(query);
        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);
                let obj = results[0];
                console.log(obj);
                resolve(results[0]);
            });
        });
    });
}

function addUser(userid) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO User(id) VALUES('" + userid + "');";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);

                resolve(results);
            });
        });
    });
}

function updateUsername(userid, username) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE User SET username = '" + username + "' WHERE id = '" + userid + "';";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);

                resolve(results);
            });
        });
    });
}

function getKommentare() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Kommentare;";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);
                console.log(results);
                resolve(results);
            });
        });
    });

}

function addKommentar(userid, kommentar) {
       return new Promise((resolve, reject) => {
        const sql = "INSERT INTO Kommentare(userid, kommentar) VALUES('" +userid+ "','" +kommentar+ "');";
        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(sql, function (err, results, _) {
                if (err) reject(err);

                resolve(results);
            });
        });
    });
}

function getAllFavoriten(userid) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Favoriten WHERE userid='" + userid + "';";

        connection.connect(function (err) {
            if (err) reject(err);

            connection.query(query, function (err, results, _) {
                if (err) reject(err);

                resolve(results);
            });
        });
    });
}

function getAllUserkommentare(userid){
    return new Promise((resolve, reject) => {
        const query = "SELECT kommentar FROM Kommentare WHERE userid='" + userid + "';";
        connection.connect(function (err){
            if(err) reject(err);
            connection.query(query, function (err, results, _){
                if(err) reject(err);
                resolve(results);
            });
        });
    });
}

function addVisitedPage(userid, page){
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Pages(pagename, userid) VALUES('" +page+ "','" +userid+ "');";
        connection.connect(function (err) {
            if(err) reject(err);
            connection.query(query, function (err, results, _){
                if(err) reject(err);
                resolve(results);
            });
        });
    });
}

function getVisitedPages(userid){
    return new Promise((resolve, reject) => {
        const query = "SELECT pagename, COUNT(*) as page_visits_count FROM Page WHERE userid = '"+userid+"' GROUP BY pagename RDER BY page_visits_count DESC;";
        connection.connect(function (err){
            if(err) reject(err);
            connection.query(query, function(err, results, _ ){
                if(err) reject(err);
                resolve(results);
            });
        });

        
    })
}




module.exports = { getFavorite, setFavorite, getUsername, addUser, updateUsername, getKommentare, addKommentar, getAllFavoriten, getUserdbid, getAllUserkommentare, addVisitedPage, getVisitedPages }
let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'vergleich24'
});

getFavorite = function getFavorite(favId) {
    let sql = "SELECT * FROM Favoriten WHERE id=" + favId + ";";

    connection.connect(sql, function (err) {
        if (err) {
            console.log(err.message);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err.message);
            }

            return results;
        });
    });
}

//User = UserCoockie
setFavorite = function setFavorite(user, beschreibung, favoritenquery) {
    let sql = "INSERT INTO Favoriten(user, Favouritenbeschreibung, Favoritenquery)VALUES('" + user + "', '" + beschreibung + "', '" + favoritenquery + "');";

    connection.connect(function (err) {
        if (err) {
            console.log(err.message);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err.message);
            }

            return results;
        });
    });
}

getUsername = function getUsername(userid) {
    let sql = "SELECT user FROM User WHERE id=" + userid + ";";

    connection.connect(function (err) {
        if (err) {
            console.log(err.message);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err);
            }

            return results;

        });

    });
}

//Random Username wird gespeichert
addUser = function addUser(username) {
    let sql = "INSERT INTO User(user) VALUES('" + username + "');";
    connection.connect(function (err) {
        if (err) {
            console.log(err.message);
        }
        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err.message);
            }
        });
    });
}

updateAnzeigename = function updateAnzeigename(usercookie, anzeigename) {
    let sql = "Update User set anzeigename = '" + anzeigename + "' where user = '" + usercookie + "';";
    connection.connect(function (err) {
        if (err) {
            console.log(err.message);
        }
        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err.message);
            }
        });
    });
}

getKommentare = function getKommentare() {
    let sql = "SELECT * FROM Kommentare;";

    connection.connect(function (err) {
        if (err) {
            console.log(err.message);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err.message);
            }

            return results;
        });
    });
}

setKommentar = function setKommentar(user, kommentar) {
    let sql = "INSERT INTO Kommentare(user, Kommentar) VALUES('" + user + "','" + kommentar + "');";
    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err);
            }
            return results;
        });

    });
}

//Eigene Table
getBeschreibung = function getBeschreibung(name) {
    let sql = "SELECT Beschreibung FROM Portale WHERE name = '" + name + "'";

    connection.connect(function (err) {
        if (err) {
            console.log(err.message);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err.message);
            }

            return results;
        });
    });
}

getAllFavoriten = function getAllFavoriten(user) {
    let sql = "SELECT * FROM Favoriten WHERE user='" + user + "';";

    connection.connect(function (err) {
        if (err) {
            console.log(err);
        }

        connection.query(sql, function (err, results, _) {
            if (err) {
                console.log(err);
            }

            return results;
        });
    });
}




module.exports = { generateDatabase, getFavorite, setFavorite, getUsername, addUser, updateAnzeigename, getKommentare, setKommentar, getBeschreibung, getAllFavoriten }
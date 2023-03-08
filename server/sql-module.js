let mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'vergleich24'
});

async function getUserid(usercookie) {//return userid als integer
    return new Promise((resolve, reject) => {
        let query = "SELECT id FROM User WHERE user='" + usercookie + "';";

        connection.connect(function (err) {
            if (err) {
                reject(err.message);
            }

            connection.query(query, function (err, results, _) {
                if (err) {
                    reject(err.message);
                }

                resolve(results[0].id);
            });
        });
    });
}


function getFavorite(favId) {
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
function setFavorite(user, beschreibung, favoritenquery) {
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

function getUsername(userid) {
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
function addUser(username) {
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

function updateAnzeigename(usercookie, anzeigename) {
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

function getKommentare() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM Kommentare;";

        connection.connect(function (err) {
            if (err) {
                reject(err.message);
            }

            connection.query(sql, function (err, results, _) {
                if (err) {
                    reject(err.message);
                }

                resolve(results);
            });
        });
    });

}

function addKommentar(user, kommentar) {
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
function getBeschreibung(name) {
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

function getAllFavoriten(user) {
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




module.exports = { getFavorite, setFavorite, getUsername, addUser, updateAnzeigename, getKommentare, addKommentar, getBeschreibung, getAllFavoriten, getUserid }
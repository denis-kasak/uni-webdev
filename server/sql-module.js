var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'vergleich24'
});

var mysql = require('mysql');

let createKommentare = "Create Table Kommentare  ( user varchar(3000), Kommentar varchar(2000));";
let createFavoriten= "Create Table Favoriten(user varchar(3000),Favouritenbeschreibung varchar(1000) ,Favoritenquery varchar(2000));";
let createUser="Create table User (id int auto_increment primary key,user varchar(3000) );";




function generateDatabase(){

    connection.connect(function(err){
        if(err){
            return console.error('error '+err.message);
        }
    
        console.log("connected to the mysql server.");
    
        connection.query(createKommentare, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
          });
          connection.query(createFavoriten, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
          });
          connection.query(createUser, function(err, results, fields) {
            if (err) {
              console.log(err.message);
            }
          });
    });
}

function getFavorite(){
    let sql = "SELECT * FROM Favoriten WHERE"

    connection.connect(sql,function(err){
        if(err){
            console.log(err.message);
        }
    });
}

//User = UserCoockie
function setFavorite(user, beschreibung, favoritenquery){
    let sql = "INSERT INTO Favoriten(user, Favouritenbeschreibung, Favoritenquery)VALUES('"+user+"', '"+beschreibung+"', '"+favoritenquery+"');";

    connection.connect(function(err){
        if(err){
            console.log(err.message);
        }

        connection.query(sql, function(err, results, _){
            if(err){
                console.log(err.message);
            }

            return results;
        });
    });
}

function getUsername(userid){
    let sql = "SELECT user FROM User WHERE id="+userid+";";

    connection.connect(function(err){
        if(err){
            console.log(err.message);
        }

        connection.query(sql, function(err, results, _){
            if(err){
                console.log(err);
            }

            return results;

        });

    });
}

//Random Username wird gespeichert
function createUser(username){
let sql = "INSERT INTO User(user) VALUES('"+username+"');";
connection.connect(function(err){
    if(err){
        console.log(err.message);
    }
    connection.query(sql, function(err, results, _){
        if(err){
            console.log(err.message);
        }
    });
});
}

function getKommentare(){
    let sql = "SELECT * FROM Kommentare;";

    connection.connect(function(err){
        if(err){
            console.log(err.message);
        }

        connection.query(sql, function(err, results, _){
            if(err){
                console.log(err.message);
            }

            return results;
        });
    });
}

function setKommentar(user, kommentar){
    let sql = "INSERT INTO Kommentare(user, Kommentar) VALUES('"+user+"','"+kommentar+"');";
    connection.connect(function(err){
        if(err){
            console.log(err);
        }

        connection.query(sql, function(err, results, _){
            if(err){
                console.log(err);
            }
            return results;
        });
        
    });
}

//Eigene Table
function getBeschreibung(user){
let sql = "SELECT * FROM Favoriten"
}


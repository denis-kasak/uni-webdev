let mysql = require('mysql2');

generateDatabase();

function generateDatabase() {

    let createDatabase = "Create Database vergleich24;";
    let createKommentare = "Create Table Kommentare  ( user varchar(3000), Kommentar varchar(2000));";
    let createFavoriten = "Create Table Favoriten(id int auto_increment primary key, user varchar(3000),Favouritenbeschreibung varchar(1000) ,Favoritenquery varchar(2000));";
    let createUser = "Create table User (id int auto_increment primary key,user varchar(3000), anzeigename varchar(3000) );";
    let createPortal = "Create table Portale (name varchar(3000), Beschreibung varchar(3000));";

    let connection1 = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'passwort'
    });

    connection1.connect(function (err) {
        if (err) {
            return console.error('error ' + err.message);
        }
        console.log("Connected to the mysql server.");

        

        connection1.query(createDatabase, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.log("Database created");

            let connection2 = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'passwort',
                database: 'vergleich24'
            });

            connection2.query(createKommentare, function (err, results, fields) {
                if (err) {
                    console.log(err.message);
                }
            });
            console.log("Kommentare created");

            connection2.query(createFavoriten, function (err, results, fields) {
                if (err) {
                    console.log(err.message);
                }
            });
            console.log("Favoriten created");

            connection2.query(createUser, function (err, results, fields) {
                if (err) {
                    console.log(err.message);
                }
            });
            console.log("User created");

            connection2.query(createPortal, function (err, results, fields) {
                if (err) {
                    console.log(err.message);
                }
            });
            console.log("Portale created");
        });
    });
}
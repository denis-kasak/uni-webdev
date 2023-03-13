let mysql = require('mysql2');

generateDatabase();

function generateDatabase() {

    const createDatabase = "CREATE DATABASE Vergleich24;";
    const createKommentare = "CREATE TABLE Kommentare ( userid VARCHAR(100), kommentar VARCHAR(2000));";
    const createFavoriten = "CREATE TABLE Favoriten (id INT AUTO_INCREMENT PRIMARY KEY, userid VARCHAR(100), beschreibung VARCHAR(1000), query VARCHAR(2000));";
    const createUser = "CREATE TABLE User (dbid INT AUTO_INCREMENT PRIMARY KEY, id VARCHAR(100) , username VARCHAR(3000));";
    const createPages = "CREATE TABLE Pages (pagename VARCHAR(300), userid VARCHAR(100));";

    let connection1 = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'passwort'
    });

    connection1.connect(function (err) {
        console.log("Connecting to the mysql server...");
        if (err) {
            return console.error('error ' + err.message);
        }
        console.log("Connected to the mysql server.");



        connection1.query(createDatabase, function (err, results, fields) {
            console.log("Creating database...")
            if (err) {
                console.log(err.message);
            }
            console.log("Database created");

            let connection2 = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'passwort',
                database: 'Vergleich24'
            });

            connection2.query(createKommentare, function (err, results, fields) {
                console.log("Creating Kommentare...")
                if (err) {
                    console.log(err.message);
                }
                console.log("Kommentare created");
            });


            connection2.query(createFavoriten, function (err, results, fields) {
                console.log("Creating Favoriten...")
                if (err) {
                    console.log(err.message);
                }
                console.log("Favoriten created");
            });


            connection2.query(createUser, function (err, results, fields) {
                console.log("Creating User...")
                if (err) {
                    console.log(err.message);
                }
                console.log("User created");
            });

            connection2.query(createPages, function(err, results, fields){
                console.log("Creating Pages...");
                if(err){
                    console.log(err.message);
                }
                console.log("Pages created.");
            });

        });
    });
}
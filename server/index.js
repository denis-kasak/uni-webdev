//import {connectToDatabase} from './connection';


const express = require("express");
var mysql = require('mysql');
const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'passwort',
    database: 'vergleich24'
});

let createKommentare = "Create Table Kommentare  ( user varchar(3000), Kommentar varchar(2000));"
let createFavoriten= "Create Table Favoriten(user varchar(3000),Favouritenbeschreibung varchar(1000) ,Favoritenquery varchar(2000));";
let createUser="Create table User (id int auto_increment primary key,user varchar(3000) );";


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

app.use(express.static("Webentwicklung"));
app.get('/', (req, res) => {
	    res.sendFile('/index.html', {root: __dirname });
});

app.get('/Impressum', (req, res) => {
	res.sendFile('/Impressum.html', {root: __dirname });
});

app.listen(8081);
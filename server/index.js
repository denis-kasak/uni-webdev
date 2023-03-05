//import {connectToDatabase} from './connection';


const express = require("express");
var mysql = require('mysql');
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const app = express();
import * as sqlmodule from "./sql-module.js";
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
	if(req.cookies.user == undefined){
		res.cookie("user", Date.now().toString, {expires = Number.MAX_SAFE_INTEGER});
	}
	if(req.cookies.session == undefined){
		res.cookie("session", "active session by" + req.cookies.user.toString());
	}
	    res.sendFile('/index.html', {root: __dirname });
});

app.get('/Impressum', (req, res) => {
	if(req.cookies.user == undefined){
		res.redirect('/');
	}else{
		res.sendFile('/Impressum.html', {root: __dirname });
	}
});

app.listen(8081);
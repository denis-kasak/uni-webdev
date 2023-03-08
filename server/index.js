//import {connectToDatabase} from './connection';
const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const { v4: uuid } = require("uuid");
const app = express();
const sqlmodule = require("./sql-module");
var basepath = __dirname.replace("\server","\html");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uni-webdev'));

app.use(express.static("Webentwicklung"));
app.get('/', (req, res) => {
	if(req.cookies.user === undefined){
		const d = new Date();
    	d.setTime(d.getTime() + (20*365*24*60*60*1000));
		var userid = uuid()
		res.cookie("user", userid , { expires: d, httpOnly: true });
		sqlmodule.addUser(userid);
	}
	/*if(req.cookies.session === undefined){
		res.cookie("session", "active session by" + req.cookies.user);
	}*/	
		console.log(basepath);
		console.log(__dirname);
	    res.sendFile('/index.html', {root: basepath });
});

app.get('/impressum', (req, res) => {
	if(req.cookies.user === undefined){
		res.redirect('/');
	}else{
		res.sendFile('/impressum.html', {root: basepath });
	}
});

app.listen(8081);
/*var users = [];
var Kommentare = [];
var Favouriten = [];
let Names = ["AnonymesZebra", "AnonymerGorilla", "AnonymesKänguru", "AnonymesChinchilla"];
function createUser(){
	var Name = Names[Math.floor(Math.random()*Names.length)];
	var id = uuid();
	var Username = Name + id;
	const newUser = { id: id, Username: Username};	
	users.push(newUser);
}
function createKommentar(usercookie,paramKommentar){
	var usera = users.find((user) => user.id === paramuser);
	var user = usera.Username;
	const newKommentar = {id: id, Username: user,userid: usercookie, Kommentar: paramKommentar,Zeit:  Zeitstempel() }
	Kommentare.push(newKommentar);
}
function Zeitstempel(){
  var heute = new Date();
  var Datum = heute.getDate();
  var StundenZahl = heute.getHours();
  var MinutenZahl = heute.getMinutes();
  var SekundenZahl = heute.getSeconds();
  return Datum.toString() + " " + StundenZahl.toString()+ ":" + MinutenZahl.toString() + ":" + SekundenZahl.toString;
}
function getKommentar(id){
	return Kommentare.find((Kommentar) => Kommentar.id === id)
}

function getallKommentarebyUser(usercookie){
	return Kommentare.find((Kommentar) => Kommentar.id === usercookie)
}
*/


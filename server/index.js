//import {connectToDatabase} from './connection';


const express = require("express");

const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const app = express();
import * as sqlmodule from "./sql-module.js";


sqlmodule.generateDatabase();

app.use(express.static("Webentwicklung"));
app.get('/', (req, res) => {
	if(req.cookies.user == undefined){
		res.cookie("user", Date.now().toString, {expires : Number.MAX_SAFE_INTEGER});
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
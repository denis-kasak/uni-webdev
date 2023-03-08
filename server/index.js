const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const { v4: uuid } = require("uuid");
const app = express();
const sqlmodule = require("./sql-module");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res = initUser(req, res);
	res.sendFile('/html/index.html', { root: 'static' });
});

app.get('/index.html', (req, res) => {
	initUser(req);
	res.sendFile('/html/index.html', { root: 'static' });
});

app.get('/impressum', (req, res) => {
	initUser(req);
	res.sendFile('/html/impressum.html', { root: 'static' });
});

app.use(express.static('static'));

app.listen(8081, ()=>{
	console.log("Server started on port 8081");
});

function initUser(req, res) {
	if (req.cookies.user === undefined) {
		const d = new Date();
		d.setTime(d.getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
		var userid = uuid()
		res.cookie("user", userid, { expires: d, httpOnly: true });
		sqlmodule.addUser(userid);
	}
	return res;
}
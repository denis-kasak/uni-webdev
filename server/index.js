const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const { v4: uuid } = require("uuid");
const app = express();
const sqlmodule = require("./sql-module");

app.use(cookieParser());
app.use(bodyParser.json());

const initUser = async function initUser(req, res, next) {
	//setzt die userid in req.userid. Falls es keine gibt, dann wird eine erstellt
	if (req.cookies.userid === undefined) {
		const d = new Date();
		d.setTime(d.getTime() + (20 * 365 * 24 * 60 * 60 * 1000));
		const userid = uuid()
		res.cookie("userid", userid, { expires: d, httpOnly: true });
		await sqlmodule.addUser(userid);
		req.userid = userid;
	}else{
		req.userid = req.cookies.userid;
	}
	next();
}

app.use(initUser);

app.post('/api/comments', async (req, res) => {
	try {
		await sqlmodule.addKommentar(req.userid, req.body.comment);
		res.status(200).send("OK");
	} catch (error) {
		console.log(error);
		res.status(400).send("Error");
	}

});

app.get('/api/comments', async (req, res) => {
	try {
		const comments = await sqlmodule.getKommentare(req.userid);
		res.status(200).send(comments);
	} catch (error) {
		console.log(error);
		res.status(400).send("Error");
	}
});

app.get('/', (req, res) => {
	res.sendFile('/html/index.html', { root: 'static' });
});

app.get('/index.html', (req, res) => {
	res.sendFile('/html/index.html', { root: 'static' });
});

app.get('/impressum', (req, res) => {
	res.sendFile('/html/impressum.html', { root: 'static' });
});

app.use(express.static('static'));

app.listen(8081, () => {
	console.log("Server started on port 8081");
});


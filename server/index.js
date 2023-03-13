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

app.post('/api/mostvisited', async (req, res) => {
	try{
		console.log(req.cookies.lastvisited);
		await sqlmodule.addVisitedPage(req.cookies.userid, req.cookies.lastvisited);
		res.clearCookie('lastvisited');
		res.status(200).send("OK");
	} catch (error){
		console.log(error);
		res.status(400).send("Error");
	}
});

app.get('/api/comments', async (req, res) => {
	try {
		let comments = await sqlmodule.getKommentare();
		console.log(comments);
		for (var comment of comments){ 
			if(comment.userid !== req.cookies.userid){
				var user = await sqlmodule.getUsername(comment.userid);
				console.log(user);
				if ( user.username !== null ){
					console.log(user.username);
					comment.userid = user.username;
				}else{
					let userid = await sqlmodule.getUserdbid(comment.userid);
					comment.userid = "Anonymer Nutzer " + userid.dbid;	
				}
			}else{
				
				comment.userid = "Ich";
			}
			console.log(comment);
		}
		res.status(200).send(comments);
	} catch (error) {
		console.log(error);
		res.status(400).send("Error");
	}
});
app.get('/api/mostvisited' , async(req, res) => {
	try{
		let mostvisited = await sqlmodule.getVisitedPages(req.userid);
		console.log(mostvisited);
		for (var site in mostvisited){}
		res.status(200).send(mostvisited);
	}catch(error){
		console.log(error);
		res.status(400).send("Meist besuchte Seiten können nicht geladen werden.");	
	}
});
app.get('/', (req, res) => {
	res.cookie("lastvisited","/index.html",{httpOnly: true, SameSite: "None"});
	res.sendFile('/html/index.html', { root: 'static' });
});

app.get('/index.html', (req, res) => {
	res.cookie("lastvisited","/index.html");
	res.sendFile('/html/index.html', { root: 'static' });
});

app.get('/impressum', (req, res) => {
	res.cookie("lastvisited","/impressum");
	res.sendFile('/html/impressum.html', { root: 'static' });
});

app.use(express.static('static'));

app.listen(8081, () => {
	console.log("Server started on port 8081");
});


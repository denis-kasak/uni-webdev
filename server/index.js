const express = require("express")
const app = express();

app.use(express.static("Webentwicklung"));
app.get('/', (req, res) => {
	    res.sendFile('/index.html', {root: __dirname });
});

app.get('/Impressum', (req, res) => {
	res.sendFile('/Impressum.html', {root: __dirname });
});

app.listen(8081);
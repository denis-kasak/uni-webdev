function onload() {
    const commentBtn = document.getElementById("commentBtn");
    commentBtn.addEventListener("click", createComment);

    updateComments()
    createmeistbesuchte()
    updatemeistbesuchte()
}

async function updatemeistbesuchte(){ // TODO Logik prüfen.
    let meistbesuchteContainer = document.getElementById("meistbesuchteContainer");
    console.log(meistbesuchteContainer);
    const meistbesuchte = await getMeistbesuchte();
    meistbesuchteContainer.innerHTML = "";
    let i = 1;
    meistbesuchte.forEach(Seite => { 
        console.log(Seite)
        let Ranking = document.createElement("h3")
        Ranking.innerHTML = i.toString() + ". meist besuchte Seite";
        let Seitenname = document.createElement("h4");
        Seitenname.innerHTML = "Ihr habt folgende Seite bereits " + Seite.page_visits_count + " mal besucht.";
        let Seitenlink = document.createElement("p");
        let str = "<a href= "+Seite.pagename+"> '"+Seite.pagename+"'</a>";
        Seitenlink.innerHTML = str;
        meistbesuchteContainer.appendChild(Ranking);
        meistbesuchteContainer.appendChild(Seitenname);
        meistbesuchteContainer.appendChild(Seitenlink);
        i++;
    }) 
}

async function getMeistbesuchte() {
    return new Promise((resolve, reject) => {
        //get request to server to get comments
        fetch("/api/mostvisited")
            .then(res => res.json())
            .then(visited => {
                resolve(visited);
            })
            .catch(err => {
                reject(err);
            })
    });

}



function createComment() {
    //create comment div and append to comment container
    let comment = document.getElementById("commentTextarea").value;

    //post request to server to send comment
    fetch("/api/comments", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    })
        .then(()=>{
            updateComments();
        })
        .catch(err => {
            console.log(err);
        })
    
}

function createmeistbesuchte() { //Diese Funktion muss von jeder Seite per Onload gecallt werden.
    fetch("/api/mostvisited", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(()=>{
            updatemeistbesuchte();
        })
        .catch(err => {
            console.log(err);
        })
}

async function getComments() {
    return new Promise((resolve, reject) => {
        //get request to server to get comments
        fetch("/api/comments")
            .then(res => res.json())
            .then(comments => {
                resolve(comments);
            })
            .catch(err => {
                reject(err);
            })
    });

}

async function updateComments() {
    const comments = await getComments();

    //clear comment container
    let commentContainer = document.getElementById("commentContainer");
    commentContainer.innerHTML = "";
    //insert comments in comment container
    comments.forEach(comment => {
        console.log(comment)
        let commentUser = document.createElement("h3");
        commentUser.innerHTML = comment.userid;
        let commentDiv = document.createElement("p");
        commentDiv.innerHTML = comment.kommentar;
        commentContainer.appendChild(commentUser);
        commentContainer.appendChild(commentDiv);
    })
}
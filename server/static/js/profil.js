function onload() {
    createmeistbesuchte()
    updatemyComments()
}
function createmeistbesuchte() { //Diese Funktion muss von jeder Seite per Onload gecallt werden.
    fetch("/api/mostvisited", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(err => {
            console.log(err);
        })
}

async function getmyComments() {
    return new Promise((resolve, reject) => {
        //get request to server to get comments
        fetch("/api/mycomments")
            .then(res => res.json())
            .then(comments => {
                resolve(comments);
            })
            .catch(err => {
                reject(err);
            })
    });
}
async function updatemyComments() {
    const comments = await getmyComments();

    //clear comment container
    let commentContainer = document.getElementById("Kommentarcontainer");
    commentContainer.innerHTML = "";
    //insert comments in comment container
    let i = 1;
    comments.forEach(comment => {
        console.log(comment)
        let commentUser = document.createElement("h3");
        commentUser.innerHTML = i + ".Kommentar";
        let commentDiv = document.createElement("p");
        commentDiv.innerHTML = comment.kommentar;
        commentContainer.appendChild(commentUser);
        commentContainer.appendChild(commentDiv);
        i++;
    })
}
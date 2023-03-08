function onload() {
    const commentBtn = document.getElementById("commentBtn");
    commentBtn.addEventListener("click", createComment);

    updateComments()
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
        commentUser.innerHTML = comment.user;
        let commentDiv = document.createElement("p");
        commentDiv.innerHTML = comment.Kommentar;
        commentContainer.appendChild(commentUser);
        commentContainer.appendChild(commentDiv);
    })
}
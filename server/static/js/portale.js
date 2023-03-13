function onload() {
    createmeistbesuchte()
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
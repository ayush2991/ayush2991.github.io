function firstRiddle() {
    let guess = document.getElementById("guess").value;
    let key = document.getElementById("code").textContent;
    if (guess === key) {
        window.open("second-riddle.html");

    } else {
        document.getElementById("guess").value = ""
        alert("Try Again!")
    }
}
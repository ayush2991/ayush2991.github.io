function saveUserName() {
    let username = document.getElementById('input_username').value;
    localStorage.setItem('username', username);
    window.open('first-riddle.html');
}
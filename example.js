// Sample array of username and password pairs
const users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    // Add more users as needed
];

function validateLogin() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    // Check if the entered username and password match any user in the array
    const isValid = users.some(user => user.username === usernameInput && user.password === passwordInput);

    if (isValid) {
        // Redirect to another HTML page (replace 'dashboard.html' with the actual page)
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

let usernameIndex;
let loginSection = document.getElementById('inputFieldsOfLogin');
let loginHead = document.getElementById('loginHead');
let usersData = [];
if(localStorage.getItem('usersData')){
    usersData = JSON.parse(localStorage.getItem('usersData'));
}
//                          login section                           //
let userNameLogin = document.getElementById('userNameLogin');
let passwordLogin = document.getElementById('passwordLogin');
let isValid = false;
function validateLogin() {
    // Check if the entered username and password match any user in the array
    for(let i=0;i<usersData.length;i++){
        console.log("username ",userNameLogin.value, " username in array ",usersData[i]['username']);
        console.log("pass ",passwordLogin.value, " pass in array ",usersData[i]['password']);
        if(userNameLogin.value == usersData[i]['username'] && passwordLogin.value == usersData[i]['password']){
            isValid = true;
            console.log('user name ', userNameLogin.value);
        }
    }
    validLogin(userNameLogin.value);
}
let UserNameHead = document.getElementById('UserNameHead');
function validLogin(username){
    if(isValid){
        console.log('username', username);
        localStorage.setItem('presentUsername',username);
        window.location.href = 'index.html';
    }
}

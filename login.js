let usernameIndex;
let loginSection = document.getElementById('inputFieldsOfLogin');
let loginHead = document.getElementById('loginHead');
let usersData = [];
if(localStorage.getItem('usersData')){
    usersData = JSON.parse(localStorage.getItem('usersData'));
    console.log(usersData);
}
//                          login section                           //
let userNameLogin = document.getElementById('userNameLogin');
let passwordLogin = document.getElementById('passwordLogin');
let isValid = false;
function validateLogin() {
    // Check if the entered username and password match any user in the array
    for(let i=0;i<usersData.length;i++){
        console.log("username ",userNameLogin.value, " username in array ",usersData[i]['username']);
        console.log("pass ",passwordLogin.value, " pass in array ",decrypt(usersData[i]['password'],3));
        if(userNameLogin.value == usersData[i]['username'] && passwordLogin.value == decrypt(usersData[i]['password'],3)){
            isValid = true;
            localStorage.setItem('indexOfUserData',i);
            console.log('user name ', userNameLogin.value);
            console.log(passwordLogin);
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
    else{
        alert("invalid Login");
        userNameLogin.value = "";
        passwordLogin.value = "";
    }
}
  // Custom decryption function
  function decrypt(encryptedText, key) {
    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
      let charCode = encryptedText.charCodeAt(i);
      decryptedText += String.fromCharCode(charCode - key);
    }
    console.log('decryptedText ',decryptedText);
    return decryptedText;
  }
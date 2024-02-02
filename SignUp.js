let userNameSignup = document.getElementById('userNameSignup');
let nameSignup = document.getElementById('nameSignup');
let passwordSignup = document.getElementById('passwordSignup');
let confirmPasswordSignup = document.getElementById('confirmPasswordSignup');
let budgetInput = document.getElementById('budgetInput');
userNameSignup.addEventListener('input',()=>{
    userNameSignup.value = userNameSignup.value.replace(/[^a-zA-Z\s]/g,'');
})
let valid = true;
let usersData =[];
if(localStorage.getItem('usersData')){
    usersData = JSON.parse(localStorage.getItem('usersData'));
}
function validateSignup() {
    // Check if the entered username doesn't match any user in the array
    if(passwordSignup.value != confirmPasswordSignup.value){
        valid=false;
        alert("password doesnt match with confirm password");
        return;
    }
    for(let i=0;i<usersData.length;i++){
        console.log("username ",userNameSignup.value, " username in array ",usersData[i]['username']);
        console.log("pass ",passwordSignup.value, " pass in array ",usersData[i]['password']);
        if(userNameSignup.value == usersData[i]['username']){
            valid = false;
            alert("user already exists");
            return;
        }
    }
    if(valid){
        let tempObject = {'name':nameSignup.value,'username':userNameSignup.value,'password':encrypt(passwordSignup.value,3)}
        usersData.push(tempObject);
        localStorage.setItem('usersData',JSON.stringify(usersData));
        window.location.href = "Login.html";
    }
}




// Custom encryption function
function encrypt(text, key) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      encryptedText += String.fromCharCode(charCode + key);
    }
    return encryptedText;
  }

let loginShowElement = document.getElementById('');
let signUpSection = document.getElementById('inputFieldsOfSignup');
let loginSection = document.getElementById('inputFieldsOfLogin');
let loginHead = document.getElementById('loginHead');
let signupHead = document.getElementById('signupHead');
// localStorage.clear();
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
        if(userNameLogin.value == usersData[i]['username'] && passwordLogin.value == usersData[i]['password']){
            isValid = true;
        }
    }
    
    if (isValid) {
        // Redirect to another HTML page
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}
signUpSection.style.display = 'none';
loginSection.style.display = 'block';
signupHead.style.backgroundColor= 'white';
signupHead.style.color= 'black';
loginHead.style.backgroundColor= 'grey';
loginHead.style.color= 'white';
function displayForm(val){
    if(val=='signup'){
        signUpSection.style.display = 'block';
        loginSection.style.display = 'none';
        loginHead.style.backgroundColor= 'white';
        loginHead.style.color= 'black';
        signupHead.style.backgroundColor= 'grey';
        signupHead.style.color= 'white';
    }
    else if (val == 'login'){
        signUpSection.style.display = 'none';
        loginSection.style.display = 'block';
        signupHead.style.backgroundColor= 'white';
        signupHead.style.color= 'black';
        loginHead.style.backgroundColor= 'grey';
        loginHead.style.color= 'white';
    }
}


//                                          sign up section                                         //


const nameSignup = document.getElementById('nameSignup');
const passwordSignup = document.getElementById('passwordSignup');
const confirmPasswordSignup = document.getElementById('confirmPasswordSignup');
const userNameSignup = document.getElementById('userNameSignup');
// making that in phone input field to enter only digits
// phoneElement.addEventListener('input',() =>{
//     phoneElement.value = phoneElement.value.replace(/\D/g,'');
// })
// making that in name input field to enter only characters and spaces
nameSignup.addEventListener('input',()=>{
    nameSignup.value = nameSignup.value.replace(/[^a-zA-Z\s]/g,'');
});
let addData = false;
function validateSignup(){
    
    if(nameSignup.value.trim() == ""){
        alert('name should not be empty');
        return;
    }
    if(passwordSignup.value!=confirmPasswordSignup.value){
        console.log('pass',passwordSignup,"  pass confrm ",confirmPasswordSignup );
        alert('password and confirm password mismatch');
    }else{
        console.log("sign up complete");
    }
    const isValidData = usersData.some(usersData => usersData.username === userNameLogin);
    if(!isValidData){
        let tempObject = {'username':userNameSignup.value,'name':nameSignup.value,'password':passwordSignup.value};
        usersData.push(tempObject);
        console.log(usersData);
        localStorage.setItem('usersData',JSON.stringify(usersData));
    }

}
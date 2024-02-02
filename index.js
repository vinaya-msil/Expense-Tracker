let username = 'none';
let budget="";
let usersData = [];
if(localStorage.getItem('usersData')){
    usersData = JSON.parse(localStorage.getItem('usersData'));
}
if(localStorage.getItem('presentUsername')){
    username = localStorage.getItem('presentUsername');
}
let indexOfUserData=undefined;
if(localStorage.getItem('indexOfUserData')){
    indexOfUserData = localStorage.getItem('indexOfUserData');
}
document.getElementById('UserNameHead').textContent = username;
budget = usersData[indexOfUserData]["budget"];
document.getElementById('budget').textContent = budget;
console.log(usersData," data "," index ",indexOfUserData, " budget ",budget);
function displayAddTransactionForm(){

}
// pop up section
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
let transactionName = document.getElementById('transactionName');
transactionName.addEventListener('input',()=>{
    transactionName.value = userNameSignup.value.replace(/[^a-zA-Z\s]/g,'');
})
function confirmDelete(){
    let result = window.confirm("really want to delete");
    if(result){
        console.log("deleted");
    }else{
        console.log("delete cancelled");
    }
}
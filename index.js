let username = 'none';
let budget="";
let pageStart = 0;
let table = document.getElementById('tableBody');
let usersData = [];
let userTransactions = [];
let pageLimit = 5;
let indexOfUserData=undefined;
let totalInTable = document.getElementById('totalInTable');
let totalInTableValue = 0

if(localStorage.getItem('usersData')){
    usersData = JSON.parse(localStorage.getItem('usersData'));
}
if(localStorage.getItem('presentUsername')){
    username = localStorage.getItem('presentUsername');
    if(localStorage.getItem(username+'Transactions')){
        console.log("user is present with some data");
        userTransactions = JSON.parse(localStorage.getItem(username+"Transactions"));
        console.log(username+"Transactions");
        console.log(userTransactions);
    }
}
document.getElementById('noOfEntries').addEventListener('input',()=>{
    pageLimit = document.getElementById('noOfEntries').value;
    createTable(userTransactions, pageLimit, pageStart);
});
if(localStorage.getItem('indexOfUserData')){
    indexOfUserData = localStorage.getItem('indexOfUserData');
    if(usersData[indexOfUserData]["budget"]){
        budget = usersData[indexOfUserData]["budget"];
    }
}
document.getElementById('UserNameHead').textContent = username;

document.getElementById('budget').textContent = budget;
console.log(usersData," data "," index ",indexOfUserData);

let transactionName = document.getElementById('transactionName');
transactionName.addEventListener('input',()=>{
    transactionName.value = transactionName.value.replace(/[^a-zA-Z\s]/g,'');
})
function confirmDelete(){
    let result = window.confirm("really want to delete");
    if(result){
        console.log("deleted");
    }else{
        console.log("delete cancelled");
    }
}

let categoryInputInForm = document.getElementById('categoryInput');
transactionName = document.getElementById('transactionName');
let transactionAmount = document.getElementById('transactionAmount');
let dateInputInTransactionForm = document.getElementById('dateInputInTransactionForm');
let budgetInput = document.getElementById('budgetInput');
function validateAndAddTransaction(){
    if (transactionName.value == "") {
        alert("transaction name cannot be null");
        return;
    }
    if (transactionAmount.value == null || transactionAmount.value == 0 || transactionAmount.value == undefined) {
        alert('invalid amount');
        return;
    }
    let tempObjectOfTransaction = {
        'name': transactionName.value,
        'amount': transactionAmount.value,
        'category':categoryInputInForm.value,
        'date': dateInputInTransactionForm.value
    };
    // Retrieve userTransactions from localStorage and parse it to an array
    userTransactions = JSON.parse(localStorage.getItem(username + "Transactions")) || [];
    // Push the new transaction to the array
    userTransactions.push(tempObjectOfTransaction);
    // Update localStorage immediately
    localStorage.setItem(username + "Transactions", JSON.stringify(userTransactions));
}

let dateFilterValue="0001-01-01";
console.log(document.getElementById('dateFilter').value);
document.getElementById('dateFilter').addEventListener('input',()=>{
    createTable(userTransactions, pageLimit, pageStart);
});
//creating the table based on the data array
let detailsTable = [];
// table creation
function createTable(userTransactions, pageLimit, pageStart) {
    if (pageStart > userTransactions.length) {
        return;
    }
    table.innerHTML = "";
    totalInTableValue = 0;
    if(document.getElementById('dateFilter').value){
        dateFilterValue = document.getElementById('dateFilter').value;
    }
    
    
    for (let i = pageStart; i < pageStart + pageLimit && i < userTransactions.length; i++) {
        if (userTransactions[i] && userTransactions[i]['date'] >= dateFilterValue) {
            console.log("dateFilterValue",dateFilterValue);
            let tempRow = document.createElement('tr');
            let tempName = document.createElement('td');
            tempName.textContent = userTransactions[i]['name'];
            let tempAmount = document.createElement('td');
            tempAmount.textContent = userTransactions[i]['amount'];
            let tempCategory = document.createElement('td');
            totalInTableValue = totalInTableValue + parseFloat(userTransactions[i]['amount']);
            
            tempCategory.textContent = userTransactions[i]['category'];
            let tempDate = document.createElement('td');
            tempDate.textContent = userTransactions[i]['date'];
            //buttons
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');
            editButton.textContent = 'edit';
            deleteButton.textContent = 'delete';
            tempRow.appendChild(tempName);
            tempRow.appendChild(tempAmount);
            tempRow.appendChild(tempCategory);
            tempRow.appendChild(tempDate);
            tempRow.appendChild(editButton);
            tempRow.appendChild(deleteButton);
            table.appendChild(tempRow);
        }
    }
    totalInTable.textContent = totalInTableValue;
}

createTable(userTransactions, pageLimit, pageStart);

// next entries
function nextEntries() {
    pageStart = pageStart + pageLimit;
    console.log("prev start", "page start", pageStart, "page limit", pageLimit);
    if(pageStart>pageLimit){
        document.getElementById('prevButton').style.display = 'block';
    }
    if (pageStart >= userTransactions.length) {
        document.getElementById('nextButton').style.display = 'none';
        pageStart = 0;  // Reset pageStart to 0 when reaching the end
        createTable(userTransactions, pageLimit, pageStart);
        return;
    }
    console.log('pageStart', pageStart);
    createTable(userTransactions, pageLimit, pageStart);
}
// prev entries
function prevEntries() {
    pageStart = 0;
    console.log("prev start", "page start",pageStart,"page limit",pageLimit);
    if(pageStart<=pageLimit){
        document.getElementById('prevButton').style.display = 'none';
    }
    if (pageStart+pageLimit< userTransactions.length) {
        document.getElementById('nextButton').style.display = 'block';
    }
    if(pageStart<1){
        pageStart = 0;
        createTable(userTransactions,pageLimit,pageStart);
        console.log("prev ended");
        return;
    }
    createTable(userTransactions,pageLimit,pageStart);
}
// Add an event listener for the 'input' event on the search input
let searchInputAtColumn1 = document.getElementById('nameSearch');
searchInputAtColumn1.addEventListener('input', function () {
    searchColumn('name',searchInputAtColumn1);
});
let searchInputAtColumn2 = document.getElementById('amountSearch');
searchInputAtColumn2.addEventListener('input', function () {
    searchColumn('amount',searchInputAtColumn2);
});
let searchInputAtColumn3 = document.getElementById('categorySearch');
searchInputAtColumn3.addEventListener('input', function () {
    searchColumn('category',searchInputAtColumn3);
});
let categoryFilter = document.getElementById('categoryFilter');
let searchInputAtColumn4 = document.getElementById('dateSearch');
searchInputAtColumn4.addEventListener('input', function () {
    searchColumn('date',searchInputAtColumn4);
});
// search columns 
function searchColumn(columnName,searchInputAtColumn) {
    console.log(columnName,searchInputAtColumn);
    let searchTerm = searchInputAtColumn.value.toLowerCase();
    let filteredArray = userTransactions.filter(entry => {
        // Check if the specified column name exists in the entry
        if (entry.hasOwnProperty(columnName)) {
            // Check if the specified column contains the search term
            return entry[columnName].toString().toLowerCase().includes(searchTerm);
        } else {
            console.error("Invalid column name.");
            return false;
        }
    });

    createTable(filteredArray, pageLimit, 0); // Display the filtered data starting from the first page
}

// category filter
categoryFilter.addEventListener('input', function () {
    searchTable(categoryFilter.value);
});

function searchTable(searchTerm) {
    if(searchTerm=="All"){
        createTable(userTransactions,pageLimit,pageStart);
        return;
    }

    if(searchTerm+1 instanceof number){

    }

    searchTerm = searchTerm.toLowerCase(); // Convert the search term to lowercase for case-insensitive search
    let tableRows = document.getElementById('tableBody').getElementsByTagName('tr');

    for (let i = 0; i < tableRows.length; i++) {
        let thirdColumnValue = tableRows[i].getElementsByTagName('td')[2].textContent.toLowerCase(); // Assuming the 3rd column is the index 2
        let row = tableRows[i];

        if (thirdColumnValue.includes(searchTerm)) {
            row.style.display = ''; // Display the row if it matches the search term
        } else {
            row.style.display = 'none'; // Hide the row if it doesn't match the search term
        }
    }
}


// month filter
let months = document.getElementById('months');
months.addEventListener('input', function () {
    let monthNumber = months.value;
    if(monthNumber == 'All'){
        createTable(userTransactions,pageLimit,pageStart);
        return;
        
    }
    else{
        searchTableByMonth(monthNumber);
        console.log("month is ",monthNumber);
    }

});


function searchTableByMonth(monthNumber) {
    if(monthNumber == 'All'){
        createTable(userTransactions,pageLimit,pageStart);
        return;
    }

    // Assuming the date is in the 4th column
    let tableRows = document.getElementById('tableBody').getElementsByTagName('tr');

    for (let i = 0; i < tableRows.length; i++) {
        let dateCell = tableRows[i].getElementsByTagName('td')[3]; // Assuming the date is in the 4th column

        if (dateCell) {
            let cellDate = new Date(dateCell.textContent);
            let cellMonth = cellDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based months

            // Check if the month matches the specified month
            if (cellMonth === parseInt(monthNumber)) {
                tableRows[i].style.display = ''; // Display the row if it matches the specified month
            } else {
                tableRows[i].style.display = 'none'; // Hide the row if it doesn't match the specified month
            }
        }
    }
}


// pop up section
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}


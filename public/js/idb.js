// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'new_chart' and set it to version 1
const request = indexedDB.open('new_chart', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_chart`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_chart', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function (event) {
    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadchart() function to send all local db data to api
    if (navigator.onLine) {
        // we haven't created this yet, but we will soon, so let's comment it out for now
        // uploadchart();
    }
};

request.onerror = function (event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new chart and there's no internet connection
function saveRecord(transaction) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_chart'], 'readwrite');

    // access the object store for `new_chart`
    const transactionObjectStore = transaction.objectStore('new_chart');

    // add record to your store with add method
    transactionObjectStore.add(transaction);
}

function uploadPizza() {
    // open a transaction on your db
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // access your object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // get all records from store and set to a variable
    const getAll = pizzaObjectStore.getAll();

    // more to come...
}


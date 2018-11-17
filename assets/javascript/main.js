$(document).ready(function() {

// variable definitions
let userInputDiv = $("#search");
let userInput = "";
let userButtonInput = "";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDqJ3VgayN_s8weHtA_Ezr8CdXx96aRw4w",
    authDomain: "tour-f4cd2.firebaseapp.com",
    databaseURL: "https://tour-f4cd2.firebaseio.com",
    projectId: "tour-f4cd2",
    storageBucket: "",
    messagingSenderId: "1019598312395"
};
firebase.initializeApp(config);

database = firebase.database();

database.ref().set({
    testData: "hello"
})
// User input 
$("#search-button").on("click", function(event) {
    event.preventDefault();
    userInput = userInputDiv.val();
    console.log(userInput);
});

$(".user-button").on("click", function() {
    userButtonInput = $(this).attr("data-value");
    console.log(userButtonInput);
})


});

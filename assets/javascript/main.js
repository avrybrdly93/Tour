$(document).ready(function() {

    // variable definitions
    let userInputDiv = $("#search");
    let userInput = "";
    let userButtonInput = "";

    var userButtonInput = null;
    var locations = [];
    let userCity = null;
    let eventLatSum = 0;
    let eventLongSum = 0;
    let googleKey = "AIzaSyAixJZDNOWf_nIxhnt6TRV3elr2ybHn_cc";

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
    
    function pushToFirebase() {
        database.ref().set({
            testData: "hello"
        });
    }
    function readFromFirebase() {
        database.ref().on("child_added", function(snapshot) {
            sv = snapshot.val();
            console.log(sv);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    }
    function search(event) {
        event.preventDefault();
        userInput = userInputDiv.val();
        console.log(userInput);
    }
    function searchButton() {
        userButtonInput = $(this).attr("data-value");
        console.log(userButtonInput);
    }
    function ajaxCall(APIURL, APIKey) {
        let queryURL = APIURL + userInput + "&api_key=" + APIKey;
        console.log(userInput);
        console.log(queryURL);
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response.data);
        })
    }
    // User input 
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        userInput = userInputDiv.val();
        console.log(userInput);
    });
    
    $(".user-button").on("click", function() {
        userButtonInput = $(this).attr("data-value");
        console.log(userButtonInput);
        console.log("asdf");
    });
    
    
    });

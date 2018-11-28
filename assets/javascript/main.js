$(document).ready(function() {
    // To Do
    // Connect user search feedback with DOM, consult with Charles about this
    // Look into hotels, restaurants, coffee shops, barber shops, etc. APIs
    // Look into working with filters: specific dates, budget (might not be possible), distance from user (also might not be possible)
    //      Specific categories: Restaurants, barber shops, coffee shops, outdoor activities, concerts, etc.
    // Work on full-page map if possible
    // Include moment.js to convert event date info to a more user-friendly way and to be able to sort by date



    // variable definitions
    let userInputDiv = $("#search");
    let eventDivContainer = [];
    let userInput = null;
    let userButtonInput = null;
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
    let database = firebase.database();

    // Declaring fuctions

    // Find user location based on IP address
    function userLocation() {
        let geoLocation = "http://api.ipstack.com/check?access_key=de4f20df5ebec67a529407756403c69f&format=1";
        $.ajax({
            url:geoLocation,
            type: 'GET',
            crossOrigin: null,
        })
            .done(function(response) {
                userCity = response.city;
            })
            .fail( function(xhr, textStatus, errorThrown) {
                alert(xhr.responseText);
            });
    }
    //DOM manipulation to list events that the user searches
    function DOMManipEventsPage(resp, i) {
        eventTitle = resp.events.event[i].title;
        eventDescription = resp.events.event[i].description;
        console.log(resp.events.event[i].image);

        
        eventDiv = $("<div>");
        eventDiv.appendTo(eventDivContainer);
        eventImageDiv = $("<img>");
        if(resp.events.event[i].image) {
            eventImageDiv.attr("src", "http://" + resp.events.event[i].image.medium.url);
        }
        eventImageDiv.appendTo(eventDiv);
        eventTitleDiv = $("<h3>");
        eventTitleDiv.appendTo(eventDiv);
        eventTitleDiv.text(eventTitle);
        descriptionDiv = $("<p>");
        descriptionDiv.appendTo(eventDiv);
        descriptionDiv.html(resp.events.event[i].description);
        eventDiv.append(resp.events.event[i].venue_address);
        eventDiv.append($("<br>"));
        eventDiv.append(resp.events.event[i].city_name);
        eventDiv.append(", " + resp.events.event[i].region_abbr);
        eventDiv.append(" " + resp.events.event[i].postal_code);
        eventDiv.append($("<br>"));
        eventDiv.append(resp.events.event[i].start_time);
        eventDiv.append($("<br>"));
        eventDiv.append($("<br>"));

        console.log(eventTitle);
        //console.log(urlVariable);
        console.log(" ");
    }

    // getting latitude and longitude, finding their sum, and pushing information onto locations array for map use
    function latLong(resp, i) {
        eventLat = resp.events.event[i].latitude;
        eventLong = resp.events.event[i].longitude;
        eventLatSum = eventLatSum + parseFloat(eventLat);
        eventLongSum = eventLongSum + parseFloat(eventLong);
        locations.push([eventTitle, eventLat, eventLong, i]);

        console.log(eventLat);
        console.log(eventLong);
    }

    function DOMStuff() {
        eventDivContainer = $("<div>");
        eventDivContainer.attr("class", "container");
        eventDivContainer.appendTo("#results");
        //eventDivContainer.empty();
    }

    // Creates map, this code was copied and pasted from the interwebz
    function createMap() {
        let mapDiv = $("<div>");
        mapDiv.attr("id", "map");
        mapDiv.css("width", "500px");
        mapDiv.css("height", "400px");
        mapDiv.appendTo(eventDivContainer);
        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(eventLatAverage, eventLongAverage),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
      
          var infowindow = new google.maps.InfoWindow();
      
          var marker, i;
          var bounds = new google.maps.LatLngBounds();

          for (i = 0; i < locations.length; i++) {  
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map
            });

            bounds.extend(marker.getPosition());
      
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }
          map.fitBounds(bounds);
    }
    // Calculates average lat/long to center map
    function latLongAvgCalc() {
        eventLatAverage = eventLatSum / totalItems;
        eventLongAverage = eventLongSum / totalItems;
    }
    // Main AJAX call for searching events based on users location
    function searchUserChoice(userKeyWordSelect, userCategorySelect) {

        let keyWordURL = "https://api.eventful.com/json/events/search?location="+ userCity + "&keywords=" + userKeyWordSelect + "&app_key=SGgPCPhjx34hgXV2";
        let categoryURL = "https://api.eventful.com/json/events/search?location=" + userCity + "&categories=" + userCategorySelect + "&app_key=SGgPCPhjx34hgXV2";

        if(userCategorySelect != null) {
            urlVariable = categoryURL;
        }
        else if(userKeyWordSelect) {
            urlVariable = keyWordURL;
        }
        $.ajax({
                url: urlVariable,
                type: 'GET',
                crossOrigin: null
            })
            .done(function(response) {
                var resp = JSON.parse(response);
                console.log(resp);
                console.log(urlVariable);
                totalItems = parseInt(resp.total_items);
                if (totalItems > 10) {
                    totalItems = 10;
                }
                for(let i = 0; i < totalItems ; i++) {
                    DOMManipEventsPage(resp, i);
                    latLong(resp, i);          
                }
                latLongAvgCalc();
                createMap();
            })
        }
    // Push data to firebase database, expand on this later.
    function pushToFirebase() {
        database.ref().set({
            testData: "hello"
        });
    }
    // Read data from firebase database, expand on this later.
    function readFromFirebase() {
        database.ref().on("child_added", function(snapshot) {
            sv = snapshot.val();
            console.log(sv);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    }

    // Search function that grabs user input.  Unused for now but expand on it more later.
    function search(event) {
        event.preventDefault();
        userInput = userInputDiv.val();
        console.log(userInput);
    }

    // Grabs info to search when user selects a button on page
    function searchButton() {
        userButtonInput = $(this).attr("data-value");
        console.log(userButtonInput);
    }

    // Look into this for more generic AJAX calls.
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
    userLocation();

    // User input 
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        userInput = userInputDiv.val();
        console.log(userInput);
        DOMStuff();
        searchUserChoice(userInput, null);
        $("#search").val("");
    });
    // button user clicks
    $(".user-button").on("click", function() {
        userButtonInput = $(this).attr("data-value");
        console.log(userButtonInput);
        DOMStuff();
        searchUserChoice(null, userButtonInput);
    });
    console.log(userCity);
});
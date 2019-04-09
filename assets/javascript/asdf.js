// This should send out a call from the eventful api
var moodsArray = [];
var userButtonInput = null;
var locations = [];
let userCity = null;
let eventLat = 0;
let eventLong = 0;
let eventLatSum = 0;
let eventLongSum = 0;
let googleKey = "AIzaSyAixJZDNOWf_nIxhnt6TRV3elr2ybHn_cc";
let eventDivContainer = null;
$(document).ready(function() {
    for (var i = 0; i < moodsArray.length; i++) {
        $("#mood-buttons").append("<button type='button' (\"" + moodsArray[i] + "\")' class='btn btn-primary' data-value='" + moodsArray[i] + "'>" 
        + moodsArray[i] + " </button>");
    }
});

let geoLocation = "http://api.ipstack.com/check?access_key=de4f20df5ebec67a529407756403c69f&format=1";
$.ajax({
    url:geoLocation,
    type: 'GET',
    crossOrigin: null,
})
    .done(function(response) {
        console.log(response.city);
        userCity = response.city;
    })

$("#input-submit").on("click", function(event) {
    event.preventDefault();
    userInput = $("#user-input").val();
    DOMStuff();
    searchMood(userInput);
});

function searchMood(searchParam) {

    let urlVariable = "http://api.eventful.com/json/events/search?location="+ userCity + "&keywords=" + searchParam + "&app_key=SGgPCPhjx34hgXV2";

    $.ajax({
            url: urlVariable,
            type: 'GET',
            crossOrigin: null
        })
        .done(function(response) {
            var resp = JSON.parse(response);
            totalItems = parseInt(resp.total_items);
            if (totalItems > 10) {
                totalItems = 10;
            }
            for(let i = 0; i < totalItems ; i++) {
                eventTitle = resp.events.event[i].title;
                eventDescription = resp.events.event[i].description;
                console.log(resp.events.event[i].image);

                
                eventDiv = $("<div>");
                eventDiv.appendTo(eventDivContainer);
                eventImageDiv = $("<img>");
                if(resp.events.event[i].image) {
                    eventImageDiv.attr("src", resp.events.event[i].image.medium.url);
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
                eventLat = resp.events.event[i].latitude;
                eventLong = resp.events.event[i].longitude;
                eventLatSum = eventLatSum + parseFloat(eventLat);
                eventLongSum = eventLongSum + parseFloat(eventLong);
                console.log(eventTitle);
                console.log(eventLat);
                console.log(eventLong);
                console.log(urlVariable);
                console.log(" ");
                locations.push([eventTitle, eventLat, eventLong, i]);  
            }
            console.log(eventLat);
            console.log(eventLong);
            console.log(urlVariable);
            console.log(locations);
            console.log(eventLatSum);
            console.log(eventLongSum);
            eventLatAverage = eventLatSum / totalItems;
            eventLongAverage = eventLongSum / totalItems;
            console.log(eventLatAverage, eventLongAverage);

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
})
}

function DOMStuff() {
    eventDivContainer = $("<div>");
    eventDivContainer.attr("class", "container");
    eventDivContainer.appendTo("body");
    //eventDivContainer.empty();
}
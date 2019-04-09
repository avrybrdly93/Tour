$(document).ready(function() {
  // variable definitions
  let userInputDiv = $("#search");
  let eventDivContainer = [];
  let userInput = null;
  let userButtonInput = null;
  var locations = [];
  let userCity = null;
  let eventLatSum = 0;
  let eventLongSum = 0;
  let eventAddress = [];
  let googleKey = "AIzaSyAixJZDNOWf_nIxhnt6TRV3elr2ybHn_cc";

  function userLocation() {
    let geoLocation = "https://api.ipdata.co/?api-key=test";
    $.ajax({
      url: geoLocation,
      type: "GET",
      crossOrigin: null
    })
      .done(function(response) {
        // Add .split(" ").join("+"); after response city
        userCity = response.city.split(" ").join("+");
        console.log(userCity);
      })
      .fail(function(xhr, textStatus, errorThrown) {
        //console.log(xhr.responseText);
      });
  }

  //DOM manipulation to list events that the user searches
  function DOMManipEventsPage(resp, i) {
    eventTitle = resp.events.event[i].title;
    eventDescription = resp.events.event[i].description;
    eventAddress[i] =
      resp.events.event[i].venue_address +
      ", " +
      resp.events.event[i].city_name +
      ", " +
      resp.events.event[i].region_abbr +
      " " +
      resp.events.event[i].postal_code;
    eventTime = "― " + resp.events.event[i].start_time;

    eventDiv = $("<div>").attr("class", "results-info");
    eventDiv.appendTo(eventDivContainer);
    scrollAni = $("<div>").attr({
      "data-aos": "fade-left",
      "data-aos-easing": "linear",
      "data-aos-duration": "600"
    });
    eventImageDiv = $("<img>")
      .attr({
        id: "results-img",
        class: "img-fluid",
        alt: "Responsive image",
        href: resp.events.event[i].url
      })
      .appendTo(
        $("<a>").attr({
          href: resp.events.event[i].url
        })
      );
    if (resp.events.event[i].image) {
      eventImageDiv.attr("src", resp.events.event[i].image.medium.url);
    } else {
      // This else is what is added here.  If there is no photo, it will use the image in the determined location.  Just replace the name with the image you want to use.
      eventImageDiv.attr("src", "assets/images/no_image_to_show.jpg");
    }
    eventImageDiv.appendTo(scrollAni);
    eventTitleDiv = $("<h3>").attr("id", "results-title");
    eventTitleDiv.appendTo(scrollAni).append($("<hr>"));
    eventTitleDiv.text(eventTitle);
    scrollAni.append($("<hr>"));
    eventLocationDiv = $("<p>").attr("id", "results-address");
    eventLocationDiv.appendTo(scrollAni);
    eventLocationDiv.text(eventAddress[i]);
    descriptionDiv = $("<p>").attr({ id: "results-desc", class: "lead" });
    descriptionDiv.appendTo(scrollAni);
    descriptionDiv.html(resp.events.event[i].description);
    eventTimeDiv = $("<p>").attr("id", "results-time");
    eventTimeDiv.appendTo(scrollAni);
    eventTimeDiv.text(eventTime);
    scrollAni.appendTo(eventDiv);
    eventDiv.append($("<br>"));
    eventDiv.append($("<br>"));

    //console.log(eventTitle);
    //console.log(urlVariable);
    //console.log(" ");
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
    $("#results").empty();
    eventDivContainer = $("<div>");
    eventDivContainer.attr("class", "container");
    eventDivContainer.appendTo("#results");
  }

  // Creates map, this code was copied and pasted from the interwebz
  function createMap() {
    let mapDiv = $("<div>");
    $(".modal-body").empty();
    mapDiv.attr("id", "map");
    mapDiv.css("width", "465px");
    mapDiv.css("height", "400px");
    mapDiv.appendTo(".modal-body");
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 11,
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

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            infowindow.setContent(
              "<h4>" +
                locations[i][0] +
                "</h4><br>" +
                eventAddress[i] +
                "<br>" +
                '<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=' +
                eventAddress[i] +
                '">View on Google Maps</a>'
            );
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
    //console.log(locations);
    //   map.fitBounds(bounds);
  }
  // Calculates average lat/long to center map
  function latLongAvgCalc(totalItems) {
    eventLatAverage = eventLatSum / totalItems;
    eventLongAverage = eventLongSum / totalItems;
    console.log(
      "lat average: ",
      eventLatAverage,
      "long average:",
      eventLongAverage
    );
  }
  function ajaxCall(urlVariable) {
    $.ajax({
      url: urlVariable,
      type: "GET",
      crossOrigin: null
    }).done(function(response) {
      var resp = JSON.parse(response);
      //console.log(resp);
      console.log(urlVariable);
      totalItems = parseInt(resp.total_items);
      eventLatSum = 0;
      eventLongSum = 0;
      if (totalItems != 0) {
        if (totalItems > 10) {
          totalItems = 10;
        }
        for (let i = 0; i < totalItems; i++) {
          DOMManipEventsPage(resp, i);
          latLong(resp, i);
        }
        latLongAvgCalc();
        createMap();
      } else {
        //console.log("No results found");
        //create div for alert class
        let alertDiv = $("<div>");
        alertDiv.attr({
          class: "alert alert-light alert-dismissible fade show",
          role: "alert"
        });
        //append text to be displayed to notify user
        let alertText = $("<p>");
        alertText.html("<strong>Holy guacamole!</strong> No search results!😫");
        alertText.appendTo(alertDiv);
        //button
        let alertBtn = $("<button>");
        alertBtn.attr({
          type: "button",
          class: "close",
          "data-dismiss": "alert",
          "aria-label": "close"
        });
        let alertSpan = $("<span>");
        alertSpan.attr({
          "aria-hidden": "true"
        });
        alertSpan.text("x");
        alertSpan.appendTo(alertBtn);
        alertBtn.appendTo(alertDiv);
        //button to retry search
        let retrySearchBtn = $("<button>");
        retrySearchBtn.attr({
          type: "input",
          id: "retryBtn",
          class: "btn btn-dark",
          onclick: "location.href='#'"
        });
        retrySearchBtn.text("Retry search!");
        let retrySearchBtnDiv = $("<div>");
        retrySearchBtn.appendTo(retrySearchBtnDiv);
        alertDiv.appendTo("#results");
        retrySearchBtnDiv.appendTo("#results");
      }
    });
  }

  function searchUserChoice(userKeyWordSelect, userCategorySelect) {
    var oArgs = {
      app_key: "SGgPCPhjx34hgXV2",

      q: userKeyWordSelect,

      where: userCity,

      date: "",

      page_size: 10,

      categories: userCategorySelect,

      sort_order: "popularity"
    };

    EVDB.API.call("/events/search", oArgs, function(oData) {
      console.log(oData.total_items);
      let totalItems = oData.total_items;
      eventLatSum = 0;
      eventLongSum = 0;
      if (totalItems != 0) {
        if (totalItems > 10) {
          totalItems = 10;
        }
        for (let i = 0; i < totalItems; i++) {
          DOMManipEventsPage(oData, i);
          latLong(oData, i);
        }
        latLongAvgCalc(totalItems);
        createMap();
      } else {
        //console.log("No results found");
        //create div for alert class
        let alertDiv = $("<div>");
        alertDiv.attr({
          class: "alert alert-light alert-dismissible fade show",
          role: "alert"
        });
        //append text to be displayed to notify user
        let alertText = $("<p>");
        alertText.html("<strong>Holy guacamole!</strong> No search results!😫");
        alertText.appendTo(alertDiv);
        //button
        let alertBtn = $("<button>");
        alertBtn.attr({
          type: "button",
          class: "close",
          "data-dismiss": "alert",
          "aria-label": "close"
        });
        let alertSpan = $("<span>");
        alertSpan.attr({
          "aria-hidden": "true"
        });
        alertSpan.text("x");
        alertSpan.appendTo(alertBtn);
        alertBtn.appendTo(alertDiv);
        //button to retry search
        let retrySearchBtn = $("<button>");
        retrySearchBtn.attr({
          type: "input",
          id: "retryBtn",
          class: "btn btn-dark",
          onclick: "location.href='#'"
        });
        retrySearchBtn.text("Retry search!");
        let retrySearchBtnDiv = $("<div>");
        retrySearchBtn.appendTo(retrySearchBtnDiv);
        alertDiv.appendTo("#results");
        retrySearchBtnDiv.appendTo("#results");
      }
    });
  }

  userLocation();

  $("#explore-btn").on("click", function(event) {
    event.preventDefault();
    location.replace("#");
  });
  // User input for main search button
  $(".main-search-btn").on("click", function(event) {
    event.preventDefault();
    userInput = userInputDiv.val();
    //console.log(userInput);
    location.replace("#resultspage");
    DOMStuff();
    searchUserChoice(userInput, null);
    $("#search").val("");
  });
  // button user clicks
  $(".user-button").on("click", function() {
    userButtonInput = $(this).attr("data-value");
    //console.log(userButtonInput);
    DOMStuff();
    searchUserChoice(null, userButtonInput);
    location.replace("#resultspage");
    console.log(eventLatAverage);
    console.log(totalItems);
  });
});

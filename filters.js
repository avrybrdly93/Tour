tail.DateTime("#demo");
tail.DateTime("#demo", {
  position: "#datetime-demo-holder",
  startOpen: true,
  stayOpen: true
});
tail.DateTime("#demo", {
  dateFormat: "YYYY-mm-dd"
});
tail.DateTime("#demo", {
  dateRanges: [
    // Will Disable 05-JAN -> 07-JAN completely
    {
      start: new Date(2018, 0, 5),
      end: new Date(2018, 0, 7)
      /* days: true */ // This is the default
    },

    // Will Disable Each Sunday and Saturday in FEB
    {
      start: new Date(2018, 1, 1),
      end: new Date(2018, 1, 28),
      days: ["SUN", "SAT"]
    },

    // Will Disable Each Sunday and Saturday in General
    {
      days: ["SUN", "SAT"]
    }
  ]
});
tail.DateTime("#demo", {
  // "top", "left", "right" or "bottom"
  position: "bottom"
});
tail.DateTime("#demo", {
  dateFormat: "YYYY-mm-dd",
  timeFormat: "HH:ii:ss"
});
tail.DateTime("#demo", {
  weekStart: 0 // Sunday
});
tail.DateTime("#demo", {
  zeroSeconds: false
});
tail.DateTime("#demo", {
  // string, new Date() or integer
  dateStart: false,
  dateEnd: false
});
tail.DateTime("#demo", {
  tooltips: [
    {
      date: "2018-01-01",
      text: "New Year",
      color: "#ff0000"
    }
  ]
});
tail.DateTime("#demo", {
  // "days" (default), "months", "years" or "decades"
  viewDefault: "days",

  // allows decade/year/month/day view
  viewDecades: true,
  viewYears: true,
  viewMonths: true,
  viewDays: true
});
tail.DateTime("#demo", {
  // use false to use dateRanges as Whitelist:
  dateBlacklist: true,

  // local
  locale: "en",

  // define default hours, minutes, and seconds
  timeHours: null,
  timeMinutes: null,
  timeSeconds: 0,

  // show a small tick (circle) above the current day, month, year and decade
  today: true
});
// switch calendar views
// "days", "months", "years" or "decades"
tail.switchView(view);

// switch dates
tail.switchDate(year, month, day, none);

// switch months
tail.switchMonth(month, year);

// switch years
tail.switchYear(year);

// pass "prev" (or previous) or "next" to load the "next" or "previous" page of the current view.
tail.browseView(type);

// fetch the current available / selectable date and time within the respective interface
tail.fetchDate(date);

// select a datetime
tail.selectDate(year, month, date, hours, minutes, seconds);

// select a time
tail.selectTime(hours, minutes, seconds);

// open the datetime picker
tail.open();

// close the datetime picker
tail.close();

// toggle the datetime picker
tail.toggle();

// event
tail.on(event, callback, args);

// remove the instance
tail.remove();

// reload the datetime picker
tail.reload();

tail.on("open", function() {
  // on open
});

tail.on("close", function() {
  // on close
});

tail.on("change", function() {
  // on change
});

var slider = document.getElementById("myRange");
var output = document.getElementById("dollars");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
};

$(document).ready(function() {
  var lastChecked = null;
  var $chkboxes = $(".chkbox");
  $chkboxes.on("click", function(e) {
    if (!lastChecked) {
      lastChecked = this;
      return;
    }

    if (e.shiftKey) {
      var start = $chkboxes.index(this);
      var end = $chkboxes.index(lastChecked);

      $chkboxes
        .slice(Math.min(start, end), Math.max(start, end) + 1)
        .prop("checked", lastChecked.checked);
    }

    lastChecked = this;
  });
});

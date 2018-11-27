$(document).ready(function() {
  // User input
  $("#main-search-btn").on("click", function() {
    event.preventDefault();
    //console.log("Button Clicked!");
    let userInput = $("#search")
      .val()
      .trim();
    // Hide the first Div Container on Click
    $("#firstPageContainer").hide();
  });

  $(".user-button").on("click", function() {
    userButtonInput = $(this).attr("data-value");
    console.log(userButtonInput);
    // awdk;jf;asdljf;lasdjfasd;flj
    //asdfasdfasdfasdfasdfa
    //asdfasdfasdfasdf
    //asdfasdfasdfasdf
  });

  var state = $("#opt").attr("data-state");

  if (state === "hide") {
    $("#opt").click(function() {
      $(".text").hide();
      console.log("hide");
      $("#opt").attr("state", "show");
    });
  }
  if (state === "show") {
    $("#opt").click(function() {
      $(".text").show();
      console.log("show");
      $("#opt").attr((this, "hide"));
      console.log($("#opt").attr("data-state"));
    });
  }
});

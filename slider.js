var slider = document.getElementById("myRange");
var output = document.getElementById("dollars");
output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
};
var slider2 = document.getElementById("milesRange");
var output2 = document.getElementById("miles");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
  output2.innerHTML = this.value;
};

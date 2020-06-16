$(document).ready(function() {
  // bind event handler to textbox
  $("#tweet-text").on("keyup", function(event) {
    const textLength = $(this).val().length;
    const charLeft = 140 - textLength;

    // get counter to update count and color
    const counter = $(this).closest("form").find(".counter");
    counter.html(charLeft);
    charLeft < 0 ? counter.addClass("red") : counter.removeClass("red");

    });
});

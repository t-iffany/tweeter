// $(document).ready runs a callback when the DOM is ready to be manipulated with jQuery. Without it we might accidentally try to access HTML elements that the browser hasn't had the chance to load, causing errors.
// $('textarea').val().length will find length of the string

$(document).ready(function() {

  // counts characters of input in textarea#tweet-text
  $('#tweet-text').on('input', function() {
    let remainingChars = 140 - $(this).val().length;

    // render the result by updating the counter
    let counter = $(this).siblings('.tweet-footer').children('.counter');
    counter.val(remainingChars);

    // counter turns red when 140 character limit exceeded
    counter.toggleClass('red-counter', remainingChars < 0);
  });

});
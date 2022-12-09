/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // Hide new-tweet container and slide down when you click the arrow
  $("nav i").click(function() {
    $(".new-tweet").slideDown();
  })

  // Use jQuery to add an event listener to handle the form submission
  $("form").on("submit", function(event) {
    // Prevent the default form submission behaviour (data submission and page refresh)
    event.preventDefault();  
    
    $(".error-msg").slideUp();

    // Validation
    if($("#tweet-text").val().length > 140) {
      $(".error-msg").empty().append(`<i class="fa-solid fa-triangle-exclamation"></i>  Character limit exceeded  <i class="fa-solid fa-triangle-exclamation"></i>`).slideDown("slow");
      return $(".error-msg").hide().slideDown("slow");
    }

    if($("#tweet-text").val().length === 0) {
      $(".error-msg").empty().append(`<i class="fa-solid fa-triangle-exclamation"></i>  Your tweet is empty  <i class="fa-solid fa-triangle-exclamation"></i>`);
      return $(".error-msg").hide().slideDown("slow");
    }
      
    // Create an AJAX POST request that sends the serialized form data to the server
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: $(this).serialize(),  // Serialize the form data to send to server as a query string
    })
    .then(function() {  // Refetch tweets on submission without refreshing page
      loadTweets();
      $('#tweet-text').val('');  // Reset #tweet-text input field blank
      $(`.counter`).val(140);  // Reset counter back to 140
    })
  });

  // Implement function that will use jQuery to make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: 'JSON',
    })
    .then(function(data) {
      renderTweets(data);
    })
  }

loadTweets();
  
}) 

// Fake data taken from initial-tweets.json
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// Define a function that takes in an array of tweet objects and appends each one to 'list-of-tweets'

const renderTweets = function (tweets) {
  $('.list-of-tweets').empty();
  // loops through tweets
  for (let tweet of tweets) {
  // calls createTweetElement for each tweet    
    const $newTweet = createTweetElement(tweet);
  // takes return value and appends it to the tweets container
  // change .append to .prepend, so tweets show up in chronological order
  $('.list-of-tweets').prepend($newTweet);  
  }
};


// Define a function that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
 
const createTweetElement = function(tweetData) {
  let $header = createTweetHeader(tweetData.user);
  let $tweetBody = createTweetBody(tweetData.content);
  let $footer = createTweetFooter(tweetData);

  let $tweet = $(`<article class="tweet">`);
  $tweet.append($header, $tweetBody, $footer);
    
  return $tweet;
};


// Create HTML markup using template literals
// Function that creates the tweet header
const createTweetHeader = function(user) {
  let $header = $(`<header>`);

  let $avatar = $(`<img src="${user.avatars}">`);
  let $name = $(`<h3>${user.name}</h3>`);
  let $handle = $(`<h4>${user.handle}</h4>`);

  $header.append($avatar, $name, $handle);

  return $header;
}

// Prevent XSS with Escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function that creates the tweet content/body
const createTweetBody = function(content) {
  let $tweetBody = $(`<content>${escape(content.text)}</content>`);

  return $tweetBody;
}

// Function that creates the tweet footer
const createTweetFooter = function(object) {
  let $footer = $(`<footer>`);

  let $footerTime = $(`<div class="days-posted">${timeago.format(object.created_at)}</div>`);
  let $footerIcons = $(`<div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-sharp fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>`);
  
  $footer.append($footerTime, $footerIcons);

  return $footer;
}
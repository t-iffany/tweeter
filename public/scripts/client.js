/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // Use jQuery to add an event listener to handle the form submission

  $("form").on("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission behaviour (data submission and page refresh)
  
    // Create an AJAX POST request that sends the serialized form data to the server
    $.ajax({
      method: "POST",
      url: "/tweets/",
      data: $(this).serialize()  // Serialize the form data to send to server as a query string
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
const createTweetHeader = function(user) {
  let $header = $(`<header>`);

  let $avatar = $(`<img src="${user.avatars}">`);
  let $name = $(`<h3>${user.name}</h3>`);
  let $handle = $(`<h4>${user.handle}</h4>`);

  $header.append($avatar, $name, $handle);

  return $header;
}

const createTweetBody = function(content) {
  let $tweetBody = $(`<content>${content.text}</content>`);

  return $tweetBody;
}

const createTweetFooter = function(object) {
  let $footer = $(`<footer>`);

  let $footerTime = $(`<div class="days-posted">${timeago.format(object.created_at)}</div>`);
  let $footerIcons = $(`<div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-sharp fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>`);
  
  $footer.append($footerTime, $footerIcons);

  return $footer;
}
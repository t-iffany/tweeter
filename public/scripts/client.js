/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Define a function that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
// Create HTML markup using template literals
  const createTweetHeader = function (user) {
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

  const createTweetFooter = function (object) {
    let $footer = $(`<footer>`);

    let $footerTime = $(`<div class="days-posted">${object.created_at}</div>`);
    let $footerIcons = $(`<div class="icons"><i class="icons fa-solid fa-flag"><i class="icons fa-sharp fa-solid fa-retweet"><i class="icons fa-solid fa-heart"></div>`);
   
    $footer.append($footerTime, $footerIcons);

    return $footer;
  }

  const createTweetElement = function(tweetData) {
    let $header = createTweetHeader(tweetData.user);
    let $tweetBody = createTweetBody(tweetData.content);
    let $footer = createTweetFooter(tweetData);

    let $tweet = $(`<article class="tweet">`);
    $tweet.append($header, $tweetBody, $footer);
    
    return $tweet;
  };


// The tweet data object that the function will take will have all the necessary tweet data:
// taken from initial-tweets.json file in the data-files directory
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = 
  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
  }

$(document).ready(() => {
  
const $tweet = createTweetElement(tweetData);
  // Test / driver code (temporary)
console.log('test this is the tweet:', $tweet); // to see what it looks like
$('.list-of-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

}) 


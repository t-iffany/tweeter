/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  renderTweets(tweetData);
  
}) 

// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Define a function that takes in an array of tweet objects and appends each one to 'list-of-tweets'

const renderTweets = function (tweets) {
  // loops through tweets
  for (let tweet of tweets) {
  // calls createTweetElement for each tweet    
    const $newTweet = createTweetElement(tweet);
  // takes return value and appends it to the tweets container
  $('.list-of-tweets').append($newTweet); 
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

  let $footerTime = $(`<div class="days-posted">${object.created_at}</div>`);
  let $footerIcons = $(`<div class="icons"><i class="fa-solid fa-flag"></i><i class="fa-sharp fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>`);
   
  $footer.append($footerTime, $footerIcons);

  return $footer;
}
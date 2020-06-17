/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("form").on("submit", function(event) {
    event.preventDefault();
    // console.log(event.target);
    // console.log($(this).serialize());
    // data type is what we expect to receive from response
    $.ajax({url: '/tweets', method: 'POST', data: $(this).serialize(), dataType: 'text'}).then(function(response) {
      console.log(response);
      // console.log("Finished");
    })
  });

  const loadTweets = function() {
    $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'}).then(function(response) {
      renderTweets(response);
    });
  };

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => 
      $('.old-tweets').append(createTweetElement(tweet)));
  };

  const createTweetElement = function(tweetObj) {
    const $tweet = $(`<article>
      <header class="tweet-header">
        <div class="avatar-name">
            <i class="fas fa-user"></i>
            <p>${tweetObj.user.name}</p>
          </div>
          <p class="username">${tweetObj.user.handle}</p>
        </header>
        <p class="text">${tweetObj.content.text}</p>
        <footer class="tweet-footer">
          <p>${tweetObj.created_at}</p>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
    </article>`);
    return $tweet;
  };

  loadTweets();
});




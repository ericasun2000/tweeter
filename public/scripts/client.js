/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // ajax request triggered by submit event 
  $('form').on('submit', function(event) {
    event.preventDefault();
    $('#empty').slideUp().delay(300);
    $('#long').slideUp().delay(300);
    // validate form
    if (!$('#tweet-text').val() || $('#tweet-text').val().trim().length === 0) {
      $('#empty').slideDown();
    } else if ($('.counter').val() < 0) {
      $('#long').slideDown();
    } else {
      $.ajax({url: '/tweets', method: 'POST', data: $(this).serialize(), dataType: 'text'}).then(function(response) {
        console.log("Finished");
        // trigger ajax response
        loadTweets();
        // clear textbox and reset counter
        $('#tweet-text').val('');
        $('.counter').val(140);
      });
    }
  });

  // ajax response triggered by ajax request and on page load
  const loadTweets = function() {
    $.ajax({url: '/tweets', method: 'GET', dataType: 'JSON'}).then(function(response) {
      renderTweets(response);
    });
  };

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('.old-tweets').prepend(createTweetElement(tweet));
    });
  };

  const createTweetElement = function(tweetObj) {
    const $tweet = $(`<article>
      <header class="tweet-header">
        <div class="avatar-name">
            <img src=${tweetObj.user.avatars}>
            <p>${tweetObj.user.name}</p>
          </div>
          <p class="username">${tweetObj.user.handle}</p>
        </header>
        <p class="text">${escape(tweetObj.content.text)}</p>
        <footer class="tweet-footer">
          <p>${moment(tweetObj.created_at, "").fromNow()}</p>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
    </article>`);
    return $tweet;
  };

  // helper function to convert unix time into relative time from now
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // load tweets and hide error messages on page load
  loadTweets();
  $('#empty').hide();
  $('#long').hide();
  
});




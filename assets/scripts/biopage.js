

// so need to set up API call
// triger modals 
// identify what data is needed from call
// thumbnail video id link
// const videoId = 'abc123'; // Replace with actual video ID
// const videoLink = `https://www.youtube.com/watch?v=${videoId}`;
// const a = document.createElement('a');
// a.href = videoLink;
// a.textContent = 'Watch on Youtube';
// document.body.appendChild(a);
// Using template literals (backticks) and the ${expression} syntax. This is the most modern and recommended way to use string interpolation in JavaScript.

const API_KEY = 'AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA'
var query = "Katie Porter"
const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;


axios.get(requestUrl, {
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  

    
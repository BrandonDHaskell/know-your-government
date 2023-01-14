// Api call to YT - Renders embeded YT links to the bioPage
const API_KEY = 'AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA'
var query = "...//"
const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;
const ytEl = document.getElementById('portland');

//api call to perigon API to find aarticles about reps
const apiKey = 'a654c191-aae9-4b05-95d8-d13ad6c72fa0';
var queryStr = "Kamala D. Harris";
const reqUrl = `https://api.goperigon.com/v1/all?q=${queryStr}&apiKey=${apiKey}`;
const newsEl = document.getElementById('news');

// Api call to YT - Renders embeded YT links to the bioPage
axios.get(requestUrl, {
    })
    .then(response => {
      console.log(response.data); 
      if (response.data.items.length === 0) {
        emptyEl = document.createElement('p')
        emptyEl.textContent = "Sorry, there don't seem to be any videos available."
        ytEl.append(emptyEl)
      } 
      else {

        for(i = 0; i < response.data.items.length; i++) {
              var videoId = response.data.items[i].id.videoId;
              var ytLink = `https://www.youtube.com/embed/${videoId}`;
            
              var ytEmbed = document.createElement('iframe');

              ytEmbed.setAttribute('src', ytLink);
              ytEmbed.setAttribute('frameborder', '0');
              ytEmbed.setAttribute('allowfullscreen', 'true');
            
              ytEl.append(ytEmbed)
            
        }  
      }
    })     
    .catch(error => {
      console.log(error);
    });
    


    //api call to retrieve news articles
    axios.get(reqUrl, {
    })
    .then(response => {
      console.log(response.data); 
      var i = 0;
      while (i<5) {
        if(response.data.articles[i].country = "us") {

          var newsUrl = response.data.articles[i].url;
          var newsLink = document.createElement('a');
          newsLink.setAttribute('href',newsUrl);
          newsEl.append(newsLink);

        }
      }
            
       
      
    })     
    .catch(error => {
      console.log(error);
    });
    

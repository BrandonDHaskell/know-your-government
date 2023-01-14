// Api call to YT - Renders embeded YT links to the bioPage
const API_KEY = 'AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA'
var query = "Katie Porter"
const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;


axios.get(requestUrl, {
    })
    .then(response => {
      console.log(response.data); 
      for(i = 0; i < response.data.items.length; i++) {
            var videoId = response.data.items[i].id.videoId;
            var ytLink = `https://www.youtube.com/embed/${videoId}`;
            
            var ytEl = document.getElementById('portland');
            var ytEmbed = document.createElement('iframe');
            ytEmbed.setAttribute('src', ytLink);
            ytEmbed.setAttribute('frameborder', '0');
            ytEmbed.setAttribute('allowfullscreen', 'true');
            
            ytEl.append(ytEmbed)
            

            
        }  
    })
        
    .catch(error => {
      console.log(error);
    });
    
  

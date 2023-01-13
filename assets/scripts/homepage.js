function onSearchButtonClick(addr){
    var test = "481 mission Street, San Francisco, Ca 94103";
    let urlStr = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + addr;

    fetch(urlStr, { headers : { "x-goog-api-key" : "AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA" } } )
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                localStorage.setItem("civicRepDataObj" , JSON.stringify(data) );
                return true;
            });
        } else {
            // TODO: Address Response error handling checks here
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to the Internet');
        console.log(error);
  });
}

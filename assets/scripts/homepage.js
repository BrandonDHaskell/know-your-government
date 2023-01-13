var addrEL = document.getElementById('user-input');
var searchEl = document.getElementById('user-click');
var addrText = addrEL.value.trim();

// Gets civiv representatives data from civicinfo API
function onSearchButtonClick(addr){
    let urlStr = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + addr;

    fetch(urlStr, { headers : { "x-goog-api-key" : "AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA" } } )
    .then( (response) => {
        if (response.ok) {
            response.json().then( (data) => {
                localStorage.setItem("civicRepDataObj" , JSON.stringify(data) );
                loadFamilyTreePage("");
                return true;
            });
        } else {
            // TODO: Address Response error handling checks here
            // "404 : Bad request" - if address is bad
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to the Internet');
        console.log(error);
  });
}

function loadFamilyTreePage(paramsStr){
    if( paramsStr ){
        location.assign('org-tree.html?' + paramsStr );
    } else {
        location.assign('org-tree.html');
    }
}

//function to validate address and make a call to google civic information api
function validateInputAddr() {
    
    var addrRegex = /[#\/\!\@\$.;:{}%^&*()+`~]/gi; // invalid characters for address

    if (!addrText || addrRegex.test(addrText)) {
      console.log(addrText);
      addrEL.value = "";
      addrEL.focus();
      document.getElementById('modalText').textContent = "Please enter valid address";
      openModal();
      return 
    }
    //api call
    onSearchButtonClick(addrText);
  }


function init() {
    searchEl.addEventListener("click",validateInputAddr);
}
  
init();
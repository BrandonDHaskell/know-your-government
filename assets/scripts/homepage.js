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
            //alert('Error: ' + response.statusText);
            document.getElementById('modalText').textContent = "Error: Bad Request";
            openModal();
        }
    })
    .catch(function (error) {
        //alert('Unable to connect to the Internet');
        document.getElementById('modalText').textContent = "Unable to connect to the Internet";
        openModal();
        console.log(error);
  });
}



function testCall() {
    // , { headers: { "X-API-Key" : "6JvLrrURJvWmH0YqmJYnsLYpwLkz3NKD2ipjRLod" }} //responseText = "ok"
    var urlStr = "https://www.googleapis.com/civicinfo/v2/representatives?address=5905 Marymac Dr SW, Port Orchard, WA";

    axios.get(urlStr, { headers : { "x-goog-api-key" : "AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA" }} )
        .then( (response) => {
            if( response.statusText === "OK" ){ 
                console.log(response);
                response.json().then( (data) => {
                    localStorage.setItem("civicRepDataObj" , JSON.stringify(data) );
                loadFamilyTreePage("");
                return true;
                });
            }
        })
        .catch( (error) => {
            document.getElementById('modalText').textContent = "Unable to connect to the Internet";
            openModal();
            console.log(error);
        })
}

function loadFamilyTreePage(paramsStr){
    if( paramsStr ){
        location.assign('org-tree.html?' + paramsStr );
    } else {
        location.assign('org-tree.html');
    }
}
function openModal() {
    // Add is-active class on the modal
    document.getElementById("modal1")
    .classList.add("is-active");
}
  
function closeModal() {
    document.getElementById("modal1")
    .classList.remove("is-active"); 
}

// Add event listeners to close the modal
// whenever user click outside modal
document.querySelectorAll(
    ".modal-background, .modal-close,.modal-card-head .delete, .modal-card-foot .button"
    ).forEach(($el) => {
      const $modal = $el.closest(".modal");
      $el.addEventListener("click", () => {     
        // Remove the is-active class from the modal
        $modal.classList.remove("is-active");
      });
    });
    
    // Adding keyboard event listeners to close the modal
document.addEventListener("keydown", (event) => {
    const e = event || window.event;
    if (e.keyCode === 27) {   
            // Using escape key
    closeModal();
    }
});

//function to validate address and make a call to google civic information api
function validateInputAddr() {
    //console.log("in");
    var addrText = document.getElementById('user-input').value.trim();
    var addrRegex = /[#\/\!\@\$.;:{}%^&*()+`~]/gi; // invalid characters for address

    if (!addrText || addrRegex.test(addrText)) {
      console.log(addrText);
      //addrEL.value = "";
      //addrEL.focus();
      document.getElementById('modalText').textContent = "Please enter valid address";
      openModal();
      return 
    }
    //api call
    onSearchButtonClick(addrText);
  }


function init() {
    //console.log("in");
    document.getElementById('user-click').addEventListener("click",validateInputAddr);
}
  
init();
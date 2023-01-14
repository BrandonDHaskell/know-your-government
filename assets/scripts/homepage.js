// Gets civiv representatives data from civicinfo API
function onSearchButtonClick(addr){
    let urlStr = "https://www.googleapis.com/civicinfo/v2/representatives?address=" + addr;    
    axios.get(urlStr, { headers : { "x-goog-api-key" : "AIzaSyBz6RBLJ5i8mG7CLpH6SWfYcUTiRVa7FxA" }} )
    .then( (response) => {
        // this if statement might be redundnt for axios
        if( response.status >= 200 && response.status < 300 ){ 
            console.log(response);
            localStorage.setItem("civicRepDataObj" , JSON.stringify(response.data) );
            loadFamilyTreePage("");
            return true;
        }
    })
    .catch( (error) => {
        // "404 : Not found" - if address is legit but not available 
        console.log(error);
        if ( error.response.status == 404 ) {

            document.getElementById('modalText').textContent = "We don't have any data for that address";
            openModal();

        // "400 : Bad request" - if civic API can't resolve/normalize the address
        } else if ( error.response.status == 400 ) {
            
            document.getElementById('modalText').textContent = "We can't find that address.";
            openModal();
        
        //  other error are unknown
        } else {
        
            document.getElementById('modalText').textContent = "🤔 Oops! Something went wrong. Please try your search again.";
            openModal();
        }
    });

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
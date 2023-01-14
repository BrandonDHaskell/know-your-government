
  //function to create representative cards and display them  
  function createReps(repObj) {
    var card = `<div class="column rep-card"  data-name=${repObj.repName}>
            <h1><strong>${repObj.repName}</strong><h1>
             <p><strong>Office: </strong>${repObj.office} <p>
             <p><strong>Role: </strong>${repObj.officeRole}</p>
             <p><strong>Party Name: </strong>${repObj.partyName}</p>
             
    </div>`;
    document.getElementById('federal').innerHTML += card;
  }

  function displayReps(kygDataArr) {
    for (var i = 0 ; i< kygDataArr.length ; i++) {
        createReps(kygDataArr[i]); 
    }
  }

function getKygDataObjs(){
  if( localStorage.getItem("civicRepDataObj") ){
    var googObj = JSON.parse(localStorage.getItem("civicRepDataObj"));
    var divisions = googObj.divisions;        //  API data object
    var offices = googObj.offices;            //  Array of civic offices
    var officials = googObj.officials;        //  Array of civic officials
    var kygDataObjs = [];                     //  Array of KYG data objects

    // console.log(googObj);
    // console.log(divisions);
    // console.log(offices);
    // console.log(officials);

    for( var i = 0; i < officials.length; ++i ){
      var kygDataObj = {};

      kygDataObj["repName"] = officials[i].name;
      kygDataObj["partyName"] = officials[i].party;

      // Somethimes address is not present
      if( (officials[i].address in officials[i]) ){
        kygDataObj["addressStreet1"] = officials[i].address[0].line1;
        kygDataObj["addressStreet2"] = officials[i].address[0].line2;
        kygDataObj["addressCity"] = officials[i].address[0].city;
        kygDataObj["addressState"] = officials[i].address[0].state;
        kygDataObj["addressZip"] = officials[i].address[0].zip;
      }

      // Somtimes phone is not present
      kygDataObj["phoneNum"] = (officials[i].phones in officials[i]) ? officials[i].phones[0] : "";
      kygDataObj["photoUrl"] = officials[i].photoUrl;
      kygDataObj["relatedLinks"] = officials[i].urls;

      // Get divisions of offices of the officials
      for( var j = 0; j < offices.length; ++j ){
        if( offices[j].officialIndices.includes(i) ){

          // set office data
          kygDataObj["office"] = offices[j].name;
          kygDataObj["officeRole"] = offices[j].roles[0];
          
          // set division data
          kygDataObj["division"] = divisions[offices[j].divisionId];
          kygDataObj["divisionName"] = divisions[offices[j].divisionId].name;
        }
      }
      // Push to array
      kygDataObjs.push(kygDataObj);
    }
    return kygDataObjs;

  } else {
    // There is an error and data is missing!
    return "Page load failed! Data missing!"
  }
}

function displayOrgTree(){
  if( localStorage.getItem("civicRepDataObj") ){
    var googObj = JSON.parse(localStorage.getItem("civicRepDataObj"));
  
    console.log(googObj);
  
  } else {
    // There is an error and data is missing!
    return "Page load failed! Data missing!"
  }

}

function addCardClicks(){
  var cards = document.getElementsByClassName('rep-card');

  Array.from(cards).forEach( (card) => {
    card.addEventListener('click', (event) => {
      // encoding URI to prevent clipping when name has spaces
      location.assign("biopage.html" + "?civicName=" + encodeURI(event.currentTarget.childNodes[1].childNodes[0].innerText));
    });
  });

}
  
function loadReps(){
  kygDataArr = getKygDataObjs();
  console.log("obj value");
  console.log(kygDataArr);
  displayReps(kygDataArr);
  addCardClicks();
}

loadReps();
  
  
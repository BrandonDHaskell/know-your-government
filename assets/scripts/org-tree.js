
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

function addCardClicks(){
  var cards = document.getElementsByClassName('rep-card');

  Array.from(cards).forEach( (card) => {
    card.addEventListener('click', (event) => {
      // encoding URI to prevent clipping when name has spaces
      location.assign("biopage.html" + "?civicName=" + encodeURI(event.currentTarget.childNodes[1].childNodes[0].innerText));
    });
  });

}

function buildOrgPageDisplay(){
  if( localStorage.getItem("civicRepDataObj") ){
    let civicApiData = JSON.parse(localStorage.getItem("civicRepDataObj"));
    
    var divisions = civicApiData.divisions;                   //  API data object
    var offices = civicApiData.offices;                       //  Array of civic offices
    var officials = civicApiData.officials;                   //  Array of civic officials
    var civicDataEl = document.getElementById("civic-data");

    let orderedDivisionKeys = Object.keys(divisions);         //  Orderd OCD divisions  

    console.log(divisions);
    console.log(offices);
    console.log(officials);

    // OCD keys build in length based on the OCD level (shortest on top)
    // sorting here to rank order: National, State, district, etc.
    orderedDivisionKeys.join();
    orderedDivisionKeys.sort();

    // Update page title
    displayNormalizedResults(civicApiData.normalizedInput);
  
    // Clear existing page data if it exists
    civicDataEl.innerHTML = "";

    // Begin building HTML elements
    for( var i = 0; i < orderedDivisionKeys.length; ++i ){
      var ocdEl = document.createElement('div');
      var ocdHeaderEl = document.createElement("h2");
    
      ocdEl.classList.add("columns", "is-desktop", "is-widescreen");
      ocdHeaderEl.classList.add("title", "is-2", "is-centered", "is-vcentered", "has-text-centered");
      ocdHeaderEl.innerText = divisions[orderedDivisionKeys[i]].name;

      ocdEl.append(ocdHeaderEl);

      // Sometimes there are no offices to reference
      // in that case skip creating them
      if( divisions[orderedDivisionKeys[i]].officeIndices ){
        for( var j = 0; j < divisions[orderedDivisionKeys[i]].officeIndices.length; ++j ){
          var officeObjRef = divisions[orderedDivisionKeys[i]].officeIndices[j];
          var officeEl = document.createElement('div');
          var officeHeaderEl = document.createElement("h2");

          officeEl.classList.add("columns", "is-desktop", "is-widescreen");
          officeHeaderEl.classList.add("title", "is-4", "is-centered", "is-vcentered", "has-text-centered");
          officeHeaderEl.innerText = offices[officeObjRef].name;

          officeEl.append(officeHeaderEl);
          ocdEl.append(officeEl);

          for( var k = 0; k < offices[officeObjRef].officialIndices.length; ++k ){
            var officialObjRef = offices[officeObjRef].officialIndices[k];
            var officialEl = document.createElement('div');
            var officialHeaderEl = document.createElement("h2");

            officialEl.classList.add("columns", "is-desktop", "is-widescreen");
            officialHeaderEl.classList.add("title", "is-6", "is-centered", "is-vcentered", "has-text-centered");
            officialHeaderEl.innerText = officials[officialObjRef].name;

            officialEl.append(officialHeaderEl);
            officeEl.append(officialEl);
            console.log(officials[officialObjRef].name);

            
          }

        }
      } else {
        var noOfficeData = document.createElement("p");

        noOfficeData.classList.add("is-centered", "has-text-centered");
        noOfficeData.textContent = "No office data"
        ocdEl.append(noOfficeData)
      }






      document.getElementById("civic-data").append(ocdEl);
      console.log(ocdEl);

  
      
    }
    return true;
  }
}

function getDivisonElement(){

}

// The search is robust and a full address search is not required
// this function formats the text to display as the page header based on 
// any part of the address being normalized
function displayNormalizedResults(normalizedObj){
  var addrStr = "";

  // Handle stree part
  addrStr += normalizedObj.line1;
  addrStr += (normalizedObj.line2 in normalizedObj) ? ", " + normalizedObj.line2 : "" ;  // uncertain on this scenario, but can handle it if it exists

  // if street part is empty at this point, no street address was returned
  // ignore comma separation
  (addrStr !== "") ? addrStr += ", " + normalizedObj.city : addrStr += normalizedObj.city;

  // if addrStr is still empty, then ignore comma
  (addrStr !== "") ? addrStr += ", " + normalizedObj.state : addrStr += normalizedObj.state;

  addrStr += " " + normalizedObj.zip;

  document.getElementById("normalized-search-results").textContent = addrStr;
}


function loadReps(){
  kygDataArr = getKygDataObjs();
  displayReps(kygDataArr);
  addCardClicks();
}

// loadReps();
  
  
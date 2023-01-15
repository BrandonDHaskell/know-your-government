function addCardClicks(){
  var cards = document.getElementsByClassName('rep-card');

  Array.from(cards).forEach( (card) => {
    card.addEventListener('click', (event) => {
      // encoding URI to prevent clipping when name has spaces
      location.assign("biopage.html" + "?civicName=" + event.currentTarget.dataset.name);
    });
  });

  return true;
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
      var divisionEl = getDivisonElement( divisions[orderedDivisionKeys[i]] );

      // Sometimes there are no offices to reference
      // in that case skip creating them
      if( divisions[orderedDivisionKeys[i]].officeIndices ){
        for( var j = 0; j < divisions[orderedDivisionKeys[i]].officeIndices.length; ++j ){
          
          var officeObj = getOfficeElement(offices[divisions[orderedDivisionKeys[i]].officeIndices[j]]);

          for( var k = 0; k < offices[divisions[orderedDivisionKeys[i]].officeIndices[j]].officialIndices.length; ++k ){
            var officialCard = getOfficialCard( officials[offices[divisions[orderedDivisionKeys[i]].officeIndices[j]].officialIndices[k]] );
            var officialsContainer = officeObj.getElementsByClassName('officials-container');

            officialsContainer[0].append(officialCard);

          }
          var officeContainer = divisionEl.getElementsByClassName('offices-container');
          officeContainer[0].append(officeObj);
        }
      } else {
        var noOfficeData = document.createElement("p");

        noOfficeData.classList.add("is-centered", "has-text-centered");
        noOfficeData.textContent = "No office data"
        divisionEl.append(noOfficeData)
      }
      var appendToEl = document.getElementById('civic-data');
      appendToEl.append(divisionEl);
    }
    return true;
  }
}

function getDivisonElement(divisionObj){
  var ocdEl = document.createElement('div');
  var ocdColEl = document.createElement('div');
  var ocdHeaderEl = document.createElement("h2");
    
  ocdEl.classList.add("columns", "is-desktop", "is-widescreen");
  ocdColEl.classList.add("column", "offices-container");
  ocdHeaderEl.classList.add("title", "is-2", "is-centered", "is-vcentered", "has-text-centered");
  ocdHeaderEl.innerText = divisionObj.name;

  ocdColEl.append(ocdHeaderEl);
  ocdEl.append(ocdColEl);

  return ocdEl;
}

function getOfficeElement(officeObj){
  var officeEl = document.createElement('div');
  var officeColEl = document.createElement('div');
  var officeHeaderEl = document.createElement("h4");

  officeEl.classList.add("columns", "is-desktop", "is-widescreen");
  officeColEl.classList.add("column", "officials-container");
  officeHeaderEl.classList.add("title", "is-4", "is-centered", "is-vcentered", "has-text-centered");
  officeHeaderEl.innerText = officeObj.name;

  officeColEl.append(officeHeaderEl);
  officeEl.append(officeColEl);

  return officeEl;
}

function getOfficialCard(officialObj){
  var officialEl = document.createElement('div');
  var officialColEl = document.createElement('div');
  var officialHeaderEl = document.createElement("h6");

  officialEl.classList.add("column", "is-desktop", "is-widescreen");
  officialColEl.classList.add("column", "rep-card", "button");
  officialColEl.dataset.name = encodeURI(officialObj.name);
  officialHeaderEl.classList.add("title", "is-6", "is-centered", "is-vcentered", "has-text-centered");
  officialHeaderEl.innerText = officialObj.name;

  officialColEl.append(officialHeaderEl);
  officialEl.append(officialColEl);

  return officialEl;
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
  buildOrgPageDisplay();
  addCardClicks();
}

loadReps();

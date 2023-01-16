
  // //function to create representative cards and display them  
  // function createReps(repObj) {
  //   var card = `<div class="column rep-card"  data-name=${repObj.repName}>
  //           <h1><strong>${repObj.repName}</strong><h1>
  //            <p><strong>Office: </strong>${repObj.office} <p>
  //            <p><strong>Role: </strong>${repObj.officeRole}</p>
  //            <p><strong>Party Name: </strong>${repObj.partyName}</p>
             
  //   </div>`;
  //   document.getElementById('federal').innerHTML += card;
  // }

  // function displayReps(kygDataArr) {
  //   for (var i = 0 ; i< kygDataArr.length ; i++) {
  //       createReps(kygDataArr[i]); 
  //   }
  // }

function getKygDataObjs(){
  if( localStorage.getItem("civicRepDataObj") ){
    var googObj = JSON.parse(localStorage.getItem("civicRepDataObj"));
    var divisions = googObj.divisions;        //  API data object
    var offices = googObj.offices;            //  Array of civic offices
    var officials = googObj.officials;        //  Array of civic officials
    var kygDataObjs = [];                     //  Array of KYG data objects
    var addr = getNormalizedAddrStr(googObj.normalizedInput);    //  normalized address input

    console.log(googObj);
    for( var i = 0; i < officials.length; ++i ){
      var kygDataObj = {};
      

      kygDataObj["normalizedAddr"] = addr;
      kygDataObj["repName"] = officials[i].name;
      kygDataObj["partyName"] = officials[i].party;

      // Sometimes address is not present
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
      console.log(event.currentTarget);
      location.assign("biopage.html" + "?civicName=" + event.currentTarget.dataset.name);
    });
  });

}


function getTreeChart(){
  var data = getKygDataObjs();
  
  var nestedData = d3.nest()
    .key(d => d.normalizedAddr)
    .key(d => d.divisionName)
    .key(d => d.office)
    .entries(data);

  var fData = d3.hierarchy(nestedData[0], d => d.values);

  console.log(fData);

  var treeLayout = d3.tree().size( [900, 800] )
  treeLayout(fData);

  var parentNumber = 27;
  var nodes = d3.select("svg g.nodes");

  // Parent node formatting
  console.log(nodes.selectAll("cirlce").data(fData.descendants().slice(0, parentNumber)));
  nodes.selectAll("cirlce")
    .data(fData.descendants().slice(0, parentNumber))
    .enter()
    .append("cirlce")
    .attr("class", "circle")
    .attr("transform", d => 'translate(${d.x},${d.y})')
    .attr("r", 8);

  // Children node formatting
  nodes.selectAll("rect")
    .data(fData.descendants().slice(parentNumber))
    .enter()
    .append("rect")
    .attr("class", "rect")
    .attr("transform", d => ('translate(${d.x},${d.y})'))
    .attr("transform", d => ((d.data.repName + " ").length + 4 ) * 9 )
    .attr("height", 25)
    .attr("y", -25 / 2 );
}

// The search is robust and a full address search is not required
// this function formats the text to display as the page header based on 
// any part of the address being normalized
function getNormalizedAddrStr( normalizedObj ){
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

  return addrStr;
}

function loadReps(){
  kygDataArr = getKygDataObjs();
  console.log("obj value");
  console.log(kygDataArr);
  // displayReps(kygDataArr);
  // addCardClicks();
}

loadReps();
  
  
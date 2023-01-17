
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
      // encoding URI to prevent clipping when name has spaces
      location.assign("biopage.html" + "?civicName=" + encodeURI(event.currentTarget.childNodes[1].childNodes[0].innerText));
    });
  });

}


function orgChartRenderV2(){
  var data = getKygDataObjs();
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

  var treeLayout = d3.tree().size( [1200, 600] );  //
  treeLayout(fData);

  var parentNodes = getParentCount(fData);
  var nodes = d3.select("#chart-svg g.nodes");

  // Parent node formatting
  nodes.selectAll("circle")
    .data(fData.descendants().slice(0, parentNodes))
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("transform", (d) => `translate(${d.y},${d.x})`)
    .attr("r", 8);

  // Children node formatting
  nodes.selectAll("rect")
    .data(fData.descendants().slice(parentNodes))
    .enter()
    .append("rect")
    .attr("class", "rect")
    .attr("transform", (d) => `translate(${d.y},${d.x})` )
    .attr("width", (d) => ((d.data.repName + " ").length + 4 ) * 10 )
    .attr("height", 25)
    .attr("y", -25 / 2 );

  // Build links using cubic Bezier curve
  d3.selectAll("#chart-svg g.links")
    .selectAll("line")
    .data(fData.links())
    .enter()
    .append("path")
    .classed("link", true)
    .attr("d", function (d) {
      return "M" + d.target.y + "," + d.target.x
        + "C" + (d.source.y + 100) + "," + d.target.x
        + " " + (d.source.y + 100) + "," + d.target.x
        + " " + d.source.y + "," + d.source.x;
    });

  // Add text to parent nodes
  nodes.selectAll("text.nodes")
    .data(fData.descendants().slice(0, parentNodes))
    .enter()
    .append("text")
    .attr("class", "text-p")
    .attr("transform", (d) => `translate(${d.y-60},${d.x+50}) rotate(-45)`)
    .text( (d => d.data.key) );

  // Add text to children
  nodes.selectAll("text.nodes")
    .data(fData.descendants().slice(parentNodes))
    .enter()
    .append("a")
    .attr("xlink:href", (d) => "biopage.html?civicName=" + encodeURI( d.data.repName ) )
    //.attr("target", "_blank")
    .append("text")
    .attr("class", "text-c")
    .attr("transform", (d) => `translate(${d.y+10},${d.x+5})` )
    .text( ( (d) => d.data.repName ))
    .on("mouseover", mouseOverText)
    .on("mouseout", mouseOutText);
}

function mouseOverText(d) {
  d3.select(this)
    .transition()
    .duration(200)
    .style("fill", "#F8E473" )
    .style("storke-width", "1px" )
    .style("text-decoration", "underline");

}

function mouseOutText(d) {
  d3.select(this)
    .transition()
    .duration(200)
    .style("fill", "#030303")
    .style("storke-width", "1px" )
    .style("text-decoration", "none");
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

// Need to know how many parent nodes there are
// i.e. How many divisions and offices to display
function getParentCount(fData){
  var count = 0;
  
  if( fData ){
    count += fData.data.values.length + 1; // 1 for the root node

    for( var i = 0; i < fData.data.values.length; ++i ){
      count += fData.data.values[i].values.length;
    }
    return count ;
  }
  return 0;
}

function loadReps(){
  // kygDataArr = getKygDataObjs();
  // displayReps(kygDataArr);
  // addCardClicks();
  getTreeChart();
}

loadReps();
  
  
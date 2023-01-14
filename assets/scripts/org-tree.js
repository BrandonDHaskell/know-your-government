var kygDataArr = [
    {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'Biden',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'federal',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  },

  {
    division: 'local',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'Biden',
    relatedLinks: ['www.google.com','www.wiki.org']
  },
  {
    division: 'state',
    divisionName: 'dName',
    officeRole: 'role',
    repName: 'newsmom',
    relatedLinks: ['www.google.com','www.wiki.org']
  }
  ];
 
  //function to create representative cards and display them  
  function createReps(repObj) {
    var card = `<div class="column"  data-name=repObj.repName>
              <p>Name: ${repObj.repName}<p>
             <p>Division: ${repObj.divisionName} <p>
             <p>Role: ${repObj.officeRole}</p>
             
    </div>`;

    //add reps based on the division
    if (repObj.division == "federal") {
      document.getElementById('federal').innerHTML += card;
    } else if (repObj.division == "local") {
        document.getElementById('local').innerHTML += card;
    } else if (repObj.division == "state") {
      document.getElementById('state').innerHTML += card
    }
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

    console.log(googObj);
    console.log(divisions);
    console.log(offices);
    console.log(officials);

    
    var kygDataObject = {};

    Object.assign(kygDataObject, { [repName] : officials[0].name } );
    Object.assign(kygDataObject, { [partyName] : officials[0].party } );
    Object.assign(kygDataObject, { [addressStreet1] : officials[0].line1 } );
    Object.assign(kygDataObject, { [addressStreet2] : officials[0].line2 } );
    Object.assign(kygDataObject, { [addressCity] : officials[0].city } );
    Object.assign(kygDataObject, { [addressState] : officials[0].state } );
    Object.assign(kygDataObject, { [addressZip] : officials[0].zip } );
    Object.assign(kygDataObject, { [phoneNum] : officials[0].phones[0] } );
    Object.assign(kygDataObject, { [photoUrl] : officials[0].photoUrl } );
    Object.assign(kygDataObject, { [relatedLinks] : officials[0].urls } );

    // Get divisions of offices of the officials
    for( var j = 0; j < offices.length; ++j ){
      if( offices[j].officialIndices.includes(0) ){
        // office data
        Object.assign( kygDataObject, { [office] : offices[j].name } );
        Object.assign( kygDataObject, { [officeRole] : offices.roles[0] } );
        Object.assign( kygDataObject, { [division] : divisions[offices[j].divisionId] } );
        Object.assign( kygDataObject, { [divisionName] : divisions[offices[j].divisionId] } );
      }
    }
    //  There is an error and data is missing!
  } else {
    return "Page load failed! Data missing!"
  }
}

  displayReps(kygDataArr);
  
  
  
  
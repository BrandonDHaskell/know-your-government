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
    
  displayReps(kygDataArr);
  
  
  
  
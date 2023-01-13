var kygDataObj = [
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
  
  function displayReps(kygDataObj) {
    for (var i = 0 ; i< kygDataObj.length ; i++) {
      
      if (kygDataObj[i].division == "federal") {
        console.log("in federal");
        document.getElementById('federal').innerHTML += 
       // $('.federal').html(
        `<div id="localbox">
               <p>Name: ${kygDataObj[i].repName}<p>
               <p>Division: ${kygDataObj[i].divisionName} <p>
               <p>Role: ${kygDataObj[i].officeRole}</p>
               
          </div>`;
          //);
  
          document.getElementById("localbox").classList.add('column');
          document.getElementById("localbox").classList.add("is-centered");
  
      }
      if (kygDataObj[i].division == "local") {
        console.log("in federal");
        document.getElementById('local').innerHTML += 
       // $('.federal').html(
        `<div id="localbox">
               <p>Name: ${kygDataObj[i].repName}<p>
               <p>Division: ${kygDataObj[i].divisionName} <p>
               <p>Role: ${kygDataObj[i].officeRole}</p>
               
          </div>`;
          //);
  
          document.getElementById("localbox").classList.add('column');
          document.getElementById("localbox").classList.add("is-centered");
  
      }
      if (kygDataObj[i].division == "state") {
        console.log("in federal");
        document.getElementById('state').innerHTML += 
       // $('.federal').html(
        `<div id="localbox">
               <p>Name: ${kygDataObj[i].repName}<p>
               <p>Division: ${kygDataObj[i].divisionName} <p>
               <p>Role: ${kygDataObj[i].officeRole}</p>
               
          </div>`;
          //);
  
          document.getElementById("localbox").classList.add('column');
          document.getElementById("localbox").classList.add("is-centered");
      }
      
  
  
  
    }
    
    
  
  }
  
  displayReps(kygDataObj);
  
  
  
  
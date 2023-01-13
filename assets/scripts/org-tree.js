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
 
  function createReps(repObj) {
    var card = `<div class="column"  data-name=kygDataArr[i].repName>
              <p>Name: ${kygDataArr[i].repName}<p>
             <p>Division: ${kygDataArr[i].divisionName} <p>
             <p>Role: ${kygDataArr[i].officeRole}</p>
             
    </div>`;

    if (kygDataArr[i].division == "federal") {
      document.getElementById('federal').innerHTML += card;
    } else if (kygDataArr[i].division == "local") {
        document.getElementById('local').innerHTML += card;
    } else if (kygDataArr[i].division == "state") {
      document.getElementById('local').innerHTML += card
    }



  }
  function displayReps(kygDataArr) {
    for (var i = 0 ; i< kygDataArr.length ; i++) {
      
      if (kygDataArr[i].division == "federal") {
        console.log("in federal");

        createRep(kygDataArr[i]);
      //   document.getElementById('federal').innerHTML += 
      //  // $('.federal').html(
      //   `<div class="column"  data-name=kygDataArr[i].repName>
      //          <p>Name: ${kygDataArr[i].repName}<p>
      //          <p>Division: ${kygDataArr[i].divisionName} <p>
      //          <p>Role: ${kygDataArr[i].officeRole}</p>
               
      //     </div>`;

  
      }
      if (kygDataObj[i].division == "local") {
        console.log("in federal");
        document.getElementById('local').innerHTML += 
       // $('.federal').html(
        `<div class="column" id="localbox">
               <p>Name: ${kygDataObj[i].repName}<p>
               <p>Division: ${kygDataObj[i].divisionName} <p>
               <p>Role: ${kygDataObj[i].officeRole}</p>
               
          </div>`;
          
  
      }
      if (kygDataObj[i].division == "state") {
        console.log("in federal");
        document.getElementById('state').innerHTML += 
       // $('.federal').html(
        `<div class="column" id="localbox">
               <p>Name: ${kygDataObj[i].repName}<p>
               <p>Division: ${kygDataObj[i].divisionName} <p>
               <p>Role: ${kygDataObj[i].officeRole}</p>
               
          </div>`;
          //);
  
          //document.getElementById("localbox").classList.add('column');
          //document.getElementById("localbox").classList.add("is-centered");
      }
      
  
  
  
    }
    
    
  
  }
  
  displayReps(kygDataObj);
  
  
  
  
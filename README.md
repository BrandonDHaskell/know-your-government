# Know Your Government

Welcome to Know Your Government!  An app that lets you see how your governement is organized, who can support you best, and what your government official has been doing while holding their office.

See what's happening by clicking the link below.

See the [Deployed Site](https://bhaskell7901.github.io/know-your-government/)


## Table of Contents

1. [Technology Used](#technology-used)
2. [Overview and Strategies](#overview-and-strategies)
3. [Landing Page](#landing-page)
4. [Org Chart Page](#org-chart-page)
5. [Bio Page](#bio-page)
6. [Google Civic API and Data](#google-civic-api-and-data)
7. [YouTube API and Data](#youtube-api-and-data)
8. [Perigon API and Data](#perigon-api-and-data)
9. [Data Conversions for APIs and D3.js](#data-conversions-for-apis-and-d3js)
10. [CSS Implementations](#css-implementations)
11 [Bonus Features](#bonus-features)
12. [Learning Points](#learning-points)
13. [Author Info](#author-info)
14. [License](#license)


## Technology Used 

| Technology | Resource URL | 
| ------------- | ------------- | 
| HTML | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) |
| CSS | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| JS | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Git | [https://git-scm.com/](https://git-scm.com/) |
| Axios | [https://axios-http.com/](https://axios-http.com/) |
| Bulma | [https://bulma.io/](https://bulma.io/) |
| D3.js | [https://d3js.org/](https://d3js.org/) |



## Overview and Strategies

A general overview of the application flow is:
1. Enter an address to get government info
2. See who your civic officials are & what offices they hold
3. Click on any name to get more information about them

The primary user experience we were looking to fill is someone who is curious or concerned and wants to know who oversees the government that affects them based on their address.  A concerned or curious user could enter in a address, a state, a zip code, or just a city name to get information on how the government entities are organized and then explore individuals who hold officies in those entities; giving the user a quick and easy way to get information and explore deeper if they wished to do so.

There is a separate HTML page for each of the different steps: the langing page (```index.html```), the org chart page (```org-tree.html```), and the bio page (```biopage.html```).  Each of the pages are described in more detail below.  We choose to implement 3 pages because there are 3 distinct facets to the interactions for this web app: ) identifying a location in the U.S. you are interested in, 2) getting information about the government entities that preside over that location, 3) and getting information about the civic officials withinin those governement entities.

We utilized the google [Civic Information API](https://developers.google.com/civic-information/docs/v2) to get government information, [D3.js](https://d3js.org/) to display the civic information in a dendrogram, and a YouTube search API and a [Perigon](https://docs.goperigon.com/docs) search API to get information about the officials in office.

To transition from the Landing page to the Org Chart page, once a valid address is entered, we pull the Civic Information Data from the API and confirm there are no issues.  If there are not issues, we save the data object in ```localStorage``` for later use.  We then redirt to the Org Chart page which looks for the Civic Information Data object in ```localStorage```.  The Civic Information data is then transformed into data objects that are passed to [D3.js](https://d3js.org/) for processesing into a dendrogram.  This process is outlined in more detail in the [Data Conversions for APIs and D3.js](#data-conversions-for-apis-and-d3js) section below.  The dendrogram has links applied to the Civic Official's names that redirect to the Bio Page and update the URL with the name.  Once the Bio Page loads, the name is used to get data from the YoutTube and Perigon APIs to get videos and news articles about that official.


## Landing Page

We implemented some input validation for the address being entered.  However, the civic API does a good job of normalizing input into more of a standad address format.  Our validation consisted of ensuring there are no special character like: "!", "|", "?", etc. that would not be used in an address.  Address errors and response errors are displayed to the user in the form of modals.  

This is the homepage of the application where the user can enter his/her location to find out who their representatives are. 

![homepage](assets/images/homepage.png)

Upon entering the address, the input is validated for correctness before API call is triggered. Regex is used to find any characters that is not intended to be the part of the address. Once any unwanted character is found, then we used CSS Bulma Modals to throw error message on screen. 

![modals](assets/images/modals.png)


## Org Chart Page

The Org Chart page uses [D3.js](https://d3js.org/) to transform the Civic Information data into an org chart (dendrogram) style chart for the user.  We felt this would be the best view for a user to consume the large amount of data the API pushes out.  It also give a vision representation of the data that we felt would be most useful for users.  

The Civic Data is pulled from ```localStorage``` and transformed into data nodes that [D3.js](https://d3js.org/) uses to generate the chart.  The data structures are outlined in more detail in the [Data Conversions for APIs and D3.js](#data-conversions-for-apis-and-d3js) section below.  A user can click on a Civic Official's name and get more information about that official from the Bio Page.

The Org Chart is rendered in ```<svg>``` tags and uses ```<g>``` tags to render and format the chart structure.

Example Org Chart Rendering:

![org tree display gif](assets/images/orgtree.gif)


## Bio Page

The Bio Page uses the YouTube and Perigon APIs and makes calls to both of these APIs to get media information about the Civic Official that was clicked.  The YouTube API returns a list of video information that is dispalayed on the page as embeded video snippets.  The Perigon API returns information about related new articles about the Civic Official.  This data is tranformed and displayed on the page as links to the articles.
Once a selection is made on the Org Chart page, a function obtains the candidates name and uses it as a query parameter in two seperate API calls. The first is for the Youtube Date V3 API which returns 5 search results with the requried Youtube video ID. We then dyanamical created mutiple `iframe` tags and embeded the video results within. 

![youtube results](assets/images/biopage1.png)

The second is for the Perigon API which returns 10 search news results with the requried web link for access access. Again, we used JavaScript to dyanamical create a list of `a` tags and rendered them to the page.  

![perigon results](assets/images/biopage2.png)


## Google Civic API and Data

For any U.S. residential address, you can look up who represents that address at each elected level of government using Google Civic information API.  The object returned is organized into 4 main parts: 1) a normalized address, 2) an object of divisions, 3) an array of offices, and 4) an array of officials.  Each of these contains data about those entities.

Example high level data:

```javascript
dataObject = {
    "normalizedInput" : {...},
    "divisions" : {...},
    "offices" : [...],
    "officials" : [...]
}

```

The ```normalizedInput``` object contains the normalized address input.  At a minimum, it contains a state, and can inlcude a street part, city part, or a zip code based on what the user input is.

Eaxample data:
```javascript
normalizedData = {
    "line1" : "...",
    "city" : "...",
    "state" : "...",
    " zip" : "..."
}

```
The ```divisions``` object contains the divisions of goverenment that presides over the address submitted.  For each division, there is a ```divisionId``` and this maps to one of the offices in the ```offices``` array.

Exmaple data:
```javascript
divisions = {
    "ocd-division/country:us": {...},
    "ocd-division/country:us/state:ca": {...},
    "ocd-division/country:us/state:ca/cd:36": {...},
    "ocd-division/country:us/state:ca/county:los_angeles": {...},
    "ocd-division/country:us/state:ca/place:santa_monica": {...}
}
```

The ```offices``` array of objects that ontains a list of all the offices that belong to one of the ```divisions```.  Each office includes an index reference to the ```officials``` array to map it to a civic official.

Example office object:
```javascript
object = {
    divisionId: "ocd-division/country:us",
    name: "President of the United States",
    levels: [ "country" ],
    roles: [ "headOfGovernment", "headOfState" ],
    officeIndices: [ 0 ]
}
```

The ```officials``` array contains a list of civic officials that belong to one of the offices.

Example official object:
```javascript
object = {
    name: "Joesph R. Biden",
    party: "Democratic Party",
    phones: [...],
    address: [ {...} ],
    channels: [ {...} ],
    geocodingSummaries: [ {...} ],
    ...
}
```

API endpoint - GET [https://www.googleapis.com/civicinfo/v2/representatives](https://www.googleapis.com/civicinfo/v2/representatives)

This api requires and address or address part, and an "api-key" as query parameters.  Read more about Google Civic API [here](https://developers.google.com/civic-information/docs/v2).


## YouTube API and Data

The YouTube Data API v3 is a web service that allows developers to access and manipulate YouTube videos and other resources. It can be used to retrieve information about videos, channels, playlists, and other resources on YouTube. 

API endpoint - GET https://www.googleapis.com/youtube/v3/search

This api requires a "query" and an "api-key" as parameters. 

Read more about the The YouTube Data API v3 [here](https://developers.google.com/youtube/v3).


## Perigon API and Data

Perigon API is an HTTP REST API for retrieving news and journalist information. It accepts HTTP GET and POST requests, and returns JSON-encoded responses. Standard HTTP response codes are used to indicate a response status for each request.

API endpoint - GET https://api.goperigon.com/v1/all

This requires "representative-name" and "api-key" as query parameters.

Read more about perigon API [here](https://docs.goperigon.com/docs)


## Data Conversions for APIs and D3.js

The [Google Civic API and Data](#google-civic-api-and-data) is converted to an array of data objects that are passed to [D3.js](https://d3js.org/) to be formatted into an dendrogram to be rendered on the page.

In the ```getKygDataObjs()``` function, the ```divisions``` data is joined onto the ```offices``` object data, which is in turn joined onto the ```officials``` data to create ```kygDataObj``` objects.  

Example ```kygDataObj``` data object:
```javascript
kygDataObj = {
    division: "...",
    divisionName: "..."
    office: "...",
    officeRole: "...",
    normalizedAddr: "...",
    repName: "...",
    partyName: "...",
    addressStreet1: "...",
    addressStreet2: "...",
    addressCity: "...",
    addressState: "...",
    addressZip: "...",
    phoneNum: "...",
    photoUrl: "...",
    relatedLinks: "..."
}
```
The array of ```kygDataObj``` obects are passed to [D3.js](https://d3js.org/) to generate an org chart.  Within [D3.js](https://d3js.org/), keys are made on the ```divison```, ```office```, and ```repName``` to build a relationship graph.  This graph is then used [D3.js](https://d3js.org/) to determine how the org chart should be rendered.  This operation is handled in the ```getTreeChart()``` function.  Within this function, URLs are also generated for the names so, once clicked, they will direct to the bio page with the name appended as a query.


## CSS Framework Implementation

To build out this project, we used the CSS framework Bulma. Bulma is a free and open-source CSS framework that is used to create responsive and modern web designs. It is based on Flexbox to create easy and responsive grid layouts. 

We used a range of pre-designed UI elements, such as forms, buttons, heros, and modals, that were easily customized to fit the needs of our project. We primarily relied on the classes associated with layouts, `tiles` and `columns`, however, we also styled some elements of the page such like the buttons and modals. Thanks to the built in repsonsiveness, we only needed a few media queries to obtain our desired styling.


## Bonus Features

* Add Voting Stats to Reps and Senators - (Pending: [Issue#17](https://github.com/bhaskell7901/know-your-government/issues/17) )
* Org-Tree Page Structure Update - (Complete: [Issue#27](https://github.com/bhaskell7901/know-your-government/issues/27) ) (converted to [D3.js](https://d3js.org/) dendrogram)
* Update Homepage With Image and Polish Up - (Complete: [Issue#32](https://github.com/bhaskell7901/know-your-government/issues/32) )


## Usage

To use this application, simple navigate to the [Live Site](https://bhaskell7901.github.io/know-your-government/) and enter your address and click "Look up my reps" button. This will redirect to a new page with a list of their representatives at various levels of government. You can click on any name to see more articles/media about them.

## Learning Points 

There was a lot of learning all around, just getting up to speed with [Bulma](https://bulma.io/), [Axios](https://axios-http.com/), and [D3.js](https://d3js.org/).  In addition to these APIs, we also learned a lot about Github Project and how useful they are for keeping a team up to speed on project management and allowing all members to stay on top of the work.


**Project View Snapshot**

 ![GitHub project view](/assets/images/github-project1-screenshot.png)


## Author Info

This project was done in collaboration with the following people:

### Srinithi Ravichandran

* [LinkedIn](https://www.linkedin.com/in/srinithi-ravichandran-18891243/)
* [Github](https://github.com/srinithi19)


### Brandon Haskell

* [LinkedIn](https://www.linkedin.com/in/BrandonDHaskell)
* [Github](https://github.com/bhaskell7901)


### Travis DuPree

* [LinkedIn](https://www.linkedin.com/in/travis-dupree-96380218b/)
* [Github](https://github.com/Traveye)


## License

MIT License
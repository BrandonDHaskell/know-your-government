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
11. [Learning Points](#learning-points)
12. [Author Info](#author-info)
13. [License](#license)


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

Example Org Chart Rendering:

```ADD IMAGE HERE```


## Bio Page

The Bio Page uses the YouTube and Perigon APIs and makes calls to both of these APIs to get media information about the Civic Official that was clicked.  The YouTube API returns a list of video information that is dispalayed on the page as embeded video snippets.  The Perigon API returns information about related new articles about the Civic Official.  This data is tranformed and displayed on the page as links to the articles.


## Google Civic API and Data

For any U.S. residential address, you can look up who represents that address at each elected level of government using Google Civic information API.  The object returned is organized into 4 main parts: 1) a normalized address, 2) an object of divisions, 3) an array of offices, and 4) an array of officials.  Each of these contains data about those entities.

Example high level data:

```javascript
object = {
    normalizedInput: {...},
    divisions: {...},
    office: [...],
    officials: [...]
}

```



API endpoint - GET https://www.googleapis.com/civicinfo/v2/representatives

This api requires "address" and "api-key" as query parameters. 






Read more about Google Civic API [here](https://developers.google.com/civic-information/docs/v2)


It uses a normalized addressing sytem. If address is valid, it gives an object which has information about all the government officials, their levels and roles for that location. If the address is invalid/not found, it throws Bad request/address not found repsonse.


## YouTube API and Data

TODO: More info in this section


# Perigon API and Data

Perigon API is an HTTP REST API for retrieving news and journalist information. It accepts HTTP GET and POST requests, and returns JSON-encoded responses. Standard HTTP response codes are used to indicate a response status for each request.

API endpoint - GET https://api.goperigon.com/v1/all

This requires "representative-name" and "api-key" as query parameters.

Read more about perigon API [here](https://docs.goperigon.com/docs)


## Data Conversions for APIs and D3.js

TODO: More info in this section


## CSS Implementation

TODO: More info in this section

## Bonus Features

TODO: More info in this section


## Usage

To use this application, simple navigate to the [Live Site](https://bhaskell7901.github.io/know-your-government/) and enter your address and click "Look up my reps" button. This will redirect to a new page with a list of their representatives at various levels of government. You can click on any name to see more articles/media about them.

## Learning Points 

TODO: More info in this section


**Project View Snapshot**

TODO: More info in this section


## Author Info

This project was done in collaboration with the following people:

### Srinithi Ravichandran

* [LinkedIn](https://www.linkedin.com/in/srinithi-ravichandran-18891243/)
* [Github](https://github.com/srinithi19)


### Brandon Haskell

* [LinkedIn](https://www.linkedin.com/in/BrandonDHaskell)
* [Github](https://github.com/bhaskell7901)


### Travis DuPree

TODO: Add your info here


## License

MIT License
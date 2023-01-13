var jsObj = {};

function getQuizData(url, callback){
    fetch(url)
        .then(response => response.json())
        .then(data => jsObj = data)
        .then(() => callback());
}

function displayObj(){
    console.log(jsObj);
}

document.onload = (event) => {
    getQuizData("./assets/data.json", displayObj);
}
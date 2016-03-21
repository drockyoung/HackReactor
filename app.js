var url = "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5/top-tracks?country=US";

window.onload = addListeners;

function addListeners() {
  document.getElementById('search').addEventListener("click", function () {
    console.log("yoooo");
    getResponse(callResponse);
    //listSongs(document.getElementById('query').value);
  });
}

function getResponse(callback) {
  var oReq = new XMLHttpRequest();
  oReq.onreadystatechange = function () {
    if (oReq.readyState === 4 && oReq.status === 200) {
      callback(oReq.responseText);
    }
  };
  oReq.open('GET', url);
  oReq.send();
}

function callResponse(result) {
  var response = JSON.parse(result);
  response = response.tracks;
  console.log(response[0].name);
  var resultsPlaceholder = document.getElementById('results');
  resultsPlaceholder.innerHTML = response[0].name;
  //for(var n in response) console.log(response[n].name);
};

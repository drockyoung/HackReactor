//var http = require("http");

/* Create an HTTP server to handle responses
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
*/

/* Code for browser request */
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5/top-tracks?country=US";

function getResponse(callback) {
  var oReq = new XMLHttpRequest();
  oReq.onreadystatechange = function () {
    if (oReq.readyState === 4 && oReq.status === 200) { // successfully
      callback(oReq.responseText); // we're calling our method
    }
  };
  oReq.open('GET', url);
  oReq.send();
}

getResponse(callResponse);

function callResponse(result) {
  var response = JSON.parse(result);
  response = response.tracks;
  for(var n in response) console.log(response[n].name);
};
//console.log(response);

var http = require("http");

/* Create an HTTP server to handle responses
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);

function reqListener () {
  console.log(this.responseText);
}*/

/* Code for browser request */
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5/top-tracks?country=US");
oReq.send();

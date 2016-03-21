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
var oReq = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5/top-tracks?country=US";
var response;

oReq.open("GET", "https://api.spotify.com/v1/artists/0L8ExT028jH3ddEcZwqJJ5/top-tracks?country=US", false);
oReq.send();

response = oReq.responseText;

console.log(response);

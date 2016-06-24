/*
This application takes input from the user, an artist's name, and finds related
artists. It stores the top tracks from the input artist and related artists and
randomly selects 25 songs from that pool to create a playlist.
*/


window.onload = addListeners;

//Global Variables
var allTopTracks = [];
var allArtists = [];
var playlistLen = 25;

function addListeners() {
  document.getElementById('search').addEventListener('click', clickSearch);
  document.getElementById('artist').addEventListener('keypress', function(key) {
    if (key.keyCode === 13) clickSearch();
  });
}

function clickSearch () {
  var search = document.getElementById('artist').value;
  var searchURL = buildSearchURL(search);

  if(search == '') alert('Please enter a search value.');

  getRequest(searchArtist, searchURL);
}

//Send the get request to Spotify
//Calls the callback function once the message is ready
function getRequest(callback, url, ready) {
  var oReq = new XMLHttpRequest();
  oReq.onreadystatechange = function () {
    if (oReq.readyState === 4 && oReq.status === 200) {
      callback(oReq.responseText, ready);
    }
  };
  oReq.open('GET', url);
  oReq.send();
}

/* Sets the inner HTML for the artistDiv to the name and image of the first
artist returned from the search criteria. */
var searchArtist = function(result) {
  var artist = JSON.parse(result); //Parse the JSON response
  var artistDiv = document.getElementById('artistDiv');

  artist = artist.artists.items[0]; //Get first artist in response
  artistDiv.innerHTML = setArtistDiv(artist);

  if(artist != null) {
    var relatedURL = buildRelatedURL(artist.id);
    allArtists.push(artist.id); //Add search artist to the pool of artists
    getRequest(searchRelated, relatedURL);
  }
};


//Locate artists related to the search artist and store those artists' ids
var searchRelated = function(result) {
  var ready = false;
  var related = JSON.parse(result); //Parse the JSON response
  related = related.artists; //Unwrap the Artists object

  //Push each related artist to the AllArtists array
  related.forEach(function(artist) {
    allArtists.push(artist.id);
  });

  //Search top tracks for each artist in AllArtists
  for(var i = 0; i < allArtists.length; i++){
    if(i === allArtists.length - 1) ready = true;
    getRequest(searchTopTracks, topTracksURL(allArtists[i]), ready);
  }
}

//Find the top tracks of each artist and set the Playlist DIV
var searchTopTracks = function(result, ready) {
  var topTracks = JSON.parse(result); //Parse the JSON response
  var playlistDiv = document.getElementById('playlist');

  topTracks = topTracks.tracks; //Unwrap the Tracks object

  //For each top track, push the track name, artist, and preview URL
  //to the allTopTracks array
  topTracks.forEach(function(track) {
    allTopTracks.push(new trackObj(track.name, track.artists[0].name, track.preview_url));
  });

  //Set the inner HTML of the playlist DIV once there are enough
  //elements in allTopTracks
  if(ready) {
    var playlist = createPlaylist(allTopTracks);
    playlistDiv.innerHTML = setPlaylistDiv(playlist);
  }
}

//Creates the HTML for the artist DIV
function setArtistDiv(artist) {
  var searchValue = document.getElementById('artist').value;
  if(artist == null) return 'Could not locate artist: <b>' + searchValue + '</b>';
  var text = 'Showing results for: <b>' + artist.name + '</b><br>';
  return text + imageURL(artist);
}

//Creates the playlist to be displayed to the user
function createPlaylist(tracks) {
  var songs = [];
  var indexes = randomNums(tracks.length);
  for(var i = 0; i < indexes.length; i++) {
    songs.push(tracks[indexes[i]]);
  }
  return songs;
}

//Builds the inner HTMl for the playlist Div
function setPlaylistDiv(playlist) {
  var header = '<b>Your custom playlist:</b><br>';
  var result = '<ol>';

  playlist.forEach(function(song) {
    result += '<li><a href="' + song.url + '" target="_blank">'
    + song.track + '</a> by '
    + song.artist + '</li>';
  });

  return header + result + '</ol>';
}

//Create an array of random, non-repeating numbers of length == playlistLen
function randomNums (numTracks) {
  var randoms = [];

  while(randoms.length < playlistLen) {
    var num = Math.floor(Math.random() * numTracks);
    if(randoms.indexOf(num) < 0) randoms.push(num);
  }
  return randoms;
}

//Top tracks song:artist:url object constructor
function trackObj(track, artist, url) {
  this.track = track;
  this.artist = artist;
  this.url = url;
}

//Builds the URL for the initial artist search
function buildSearchURL(search) {
  var base = 'https://api.spotify.com/v1/search?q=';
  return base + search.replace(/ /g,'%20') + '&type=artist';
}

//Builds the URL for the related artists search
function buildRelatedURL(id) {
  var base = 'https://api.spotify.com/v1/artists/';
  return base + id + '/related-artists';
}

//Builds the URL for the top tracks of the related artists
function topTracksURL(id) {
  var base = 'https://api.spotify.com/v1/artists/';
  return base + id + '/top-tracks?country=US';
}

//Builds the image HTML item for use in artist DIV section
//Shrink variable keeps the image within the imagepx range
function imageURL (artist) {
  var imagepx = 200;//The longer of width or height is set to this value
  var image = artist.images[0];
  var src = '<img src="' + image.url + '" ';
  var width = image.width;
  var height = image.height;
  var max = Math.max(width, height);
  var shrink = imagepx/max;

  //The image is "shrunk" to a max width or height of var imagepx
  width *= shrink;
  height *= shrink;

  var style = 'style="width:' + width + 'px;height:' + height + 'px;">'

  return src + style;
}



var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "33ba99557d430ccb0fab267769c643f7" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			model.browseItems = response.results;

			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
	$("#section-watchlist ul").empty();
	$("#section-browse ul").empty();

	model.watchlistItems.forEach(function(movie) {
		var liMovie = $("<li></li>").html("<p>" + movie.title + "</p>");
		$("#section-watchlist ul").append(liMovie);
	});

	// for each movie on the current browse list, 
	model.browseItems.forEach(function(movie) {
		var liMovie = $("<li></li>").html("<p>" + movie.title + "</p>");
		var addButton = $("<button></button>").text("Add to watchlist");
		$("#section-browse ul").append(liMovie);
		$("#section-browse ul").append(addButton);
		addButton.click(function(event){
			model.watchlistItems.push(movie)
			render();
		})
	});
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});


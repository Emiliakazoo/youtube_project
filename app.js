$(function() {

    /*  items = window.items;
      thumbnail = window.thumbnail;
      urlkey = window.urlkey;
      kind = window.kind;
*/

var searchTerm;
console.log(searchTerm);
$("#search-term").on("submit", function(event){
        event.preventDefault();
        searchTerm = $("#query").val();
        getRequest(searchTerm);
        $("#search-results").empty();
    //console.log(searchTerm);
    })

function getRequest(searchTerm){
    var url = "https://www.googleapis.com/youtube/v3/search";
    //var items;
    // part: 'snippet'
    // key: your API key as a string
    // q: put the search term here in the form of a string
    var dataObj = {
        part: "snippet",
        key: "AIzaSyCCBn9JwzQmit8uYl1qZFMZJrOXy2ovsQs",
        q: searchTerm
    }

    
    $.getJSON(url, dataObj, gotData);


    function gotData(data) {
        items = data;
        $(items.items).each(function(index, value){
            thumbnail = value.snippet.thumbnails.default.url;
            urlkey = value.id.videoId;
            kind = value.id.kind;
            title = value.snippet.title
           var urlbase = "<a href='https://www.youtube.com/watch?v=";

            if(kind == "youtube#channel"){
                urlbase = "<a href='https://www.youtube.com/user/";
                urlkey = value.snippet.channelTitle;
            }

            $("#search-results").append("<li>" + urlbase + urlkey + "' target='_blank'><div>" + title + "</div><img src='" + thumbnail + "' alt='" + title + "' /></a></li>");
            $("#query").val("");
        })


    }
}
});
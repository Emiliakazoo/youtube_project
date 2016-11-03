$(function() {

    var items;
    var searchTerm;
    
//---------------------------------------BEGIN getting items from API

    function getRequest(searchTerm) {
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

        //-----------------------------------BEGIN parsing
        function gotData(data) {
            items = data;
            console.log(items);
            $(items.items).each(function(index, value) {
                var thumbnail = value.snippet.thumbnails.medium.url;
                var nextpage = value.nextPageToken;
                var urlkey = value.id.videoId;
                var kind = value.id.kind;
                var title = value.snippet.title
                var urlbase = "<a href='https://www.youtube.com/watch?v=";
                console.log(nextpage);

                if (kind == "youtube#channel") {
                    urlbase = "<a class='channel' href='https://www.youtube.com/user/";
                    urlkey = value.snippet.channelTitle;
                }

                $("#search-results").append("<li>" + urlbase + urlkey + "'><div>" + title + "</div><img src='" + thumbnail + "' alt='" + title + "' /></a></li>");
                $('#search-results li').find('a').colorbox();
                $("#query").val("");
            })


        }


        $.getJSON(url, dataObj, gotData);

    }

//---------------------------------------END getting items from API



//---------------------------------------BEGIN searching


    $("#search-term").on("submit", function(event) {
        event.preventDefault();
        searchTerm = $("#query").val();
        getRequest(searchTerm);
        $("#search-results").empty();
        console.log(searchTerm);
    })

//---------------------------------------END searching



});

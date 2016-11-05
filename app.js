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
            var nextpage = items.nextPageToken;
            //console.log(nextpage);
            //console.log(items);
            $(items.items).each(function(index, value) {
                var thumbnail = value.snippet.thumbnails.medium.url;
                var channelId = value.snippet.channelId;
                var urlkey = value.id.videoId;
                var kind = value.id.kind;
                var title = value.snippet.title
                var urlbase = "class='singleVid' href='https://www.youtube.com/embed/";
                var urlchannelbase = "https://www.youtube.com/channel/";

                if (kind == "youtube#channel") {
                    urlbase = "href='https://www.youtube.com/user/";
                    urlkey = value.snippet.channelTitle;
                }
                if(!nextpage){
                    $("#nextBunch").hide();
                }
                else {
                    $("#nextBunch").show();
                }

                $("#search-results").append("<li><a " + urlbase + urlkey + "' target='_blank'><div>" + title + "</div><img src='" + thumbnail + "' alt='" + title + "' /></a><br><a class='channel' href='" + urlchannelbase + channelId + "' target='_blank'>More from channel</a></li>");
                $('#search-results li').find('a.singleVid').colorbox({iframe:true, innerWidth:640, innerHeight:390});
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
    })

//---------------------------------------END searching



});

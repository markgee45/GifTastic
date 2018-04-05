$(document).ready(function() {
    

var Comedians = ["Eddie Murphy", "Dave Chappelle", "Chris Rock", "Chris Tucker", "Cedric The Entertainer","Katt Williams", "Bernie Mac", "Kevin Hart", "Steve Harvey", "Richard Pryor", "Redd Foxx", "Jamie Foxx", "Eddie Griffin"];

//creates the initial buttons that are in comedians array//
function renderButtons() {
    //creates empty  div so it doesn't repeat every button//
    $("#buttonsView").empty(); 
    for (var i = 0; i < Comedians.length; i++) { 
        var laugh = $("<button>") 
        laugh.addClass("typeComedian"); 
        laugh.attr("data-name", Comedians[i]);
        laugh.text(Comedians[i]); 
        $('#buttonsView').append(laugh);
    }

    //adds the images//
    $('button').on('click', function () {
        $('#gif').empty(); 
            var Comedian = $(this).data('name'); 
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Comedian + "&api_key=dc6zaTOxFJmzC&limit=10";
            
            
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                console.log("are you responding?") 
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    //creates ComedianDiv//
                    var ComedianDiv = $('<div>'); 
                    ComedianDiv.addClass('imagestyling');
                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var ComedianImage = $('<img>');

                    ComedianImage.attr('data-animate', results[i].images.fixed_height.url);
                    ComedianImage.attr('data-still', results[i].images.fixed_height_still.url);
                    ComedianImage.attr('src', results[i].images.fixed_height_still.url);
                    ComedianImage.attr('data-state', "still");
                    //ratings div//
                    ComedianDiv.append(p); 
                    //adds the gif to the div
                    ComedianDiv.append(ComedianImage); 
                    ComedianImage.addClass("TheImage")
                    //adds the div to the page
                    $('#gif').prepend(ComedianDiv); 
                };


                     //change state when image is clicked
                    $(".TheImage").on('click', function(){
                        console.log("works");
                        var state = $(this).attr('data-state');
                        if (state == 'still') {
                        //changes the data-state
                            $(this).attr('data-state',"animate" );
                            //change image to animated gif
                            $(this).attr('src', $(this).data('animate'));
                        }
                        else{
                                //change to still image
                                $(this).attr('src', $(this).data('still'));
                                //changes the data-state
                                $(this).attr('data-state','still' );
                        }
                    });
            });
    });
};

    renderButtons();

    //adds a comedian button
    $('#addComedians').on('click', function(){
        var comedianText = $('#input').val().trim();
        Comedians.push(comedianText);
        renderButtons();
        return false;
    });

 });

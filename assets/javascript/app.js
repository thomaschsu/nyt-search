$( "#search" ).click(function() {
    alert( "you clicked search button" );
  });

  $( "#clear-search" ).click(function() {
    alert( "cleared history" );
  });


$(document).on("click", ".btn",function(){
    
    console.log("You clicked on "+$(this).text());

   if ($(this).text() ==" Search"){

    console.log($("#searchterm").val());
    console.log($("#records").val());
    console.log($("#startyear").val());
    console.log($("#endyear").val());   



    var startYr ="";
    var endYr ="";
    if ($("#startyear").val() != ""){
        startYr = "&begin_date="+$("#startyear").val()+"0101";
    }
       
    if ($("#endyear").val() != ""){
        endYr = "&end_date="+$("#endyear").val()+"1231";
    }

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=8972bc141a574aae8ccd6d9c82ed8113&q="
                    +$("#searchterm").val()+startYr+endYr+"&p=1";

    //obama&begin_date=20170101&end_date=20180101&p=1


    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

     console.log(response);
    })
}
})



        
       
       
    
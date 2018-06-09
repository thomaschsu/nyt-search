
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

  //  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=8972bc141a574aae8ccd6d9c82ed8113&q=obama"
  //  +startYr+endYr+"&p=1";

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=8972bc141a574aae8ccd6d9c82ed8113&q="
                    +$("#searchterm").val()+startYr+endYr+"&p=1";

    //obama&begin_date=20170101&end_date=20180101&p=1
    
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

     console.log(response);

     //
     for (i =0;i<$("#records").val();i++){
        console.log(response.response.docs[i].headline.main);
        console.log(response.response.docs[i].byline.original);
        console.log(response.response.docs[i].section_name);
        console.log(response.response.docs[i].section_name);
        console.log(response.response.docs[i].web_url);
        
        var artdiv = $("<div>");

        var pheadline = $("<p>");
        pheadline.append(response.response.docs[i].headline.main);
        artdiv.append(pheadline);

        var pbyline = $("<p>");
        pbyline.append(response.response.docs[i].byline.original);
        artdiv.append(pbyline);

        var p_sec_nm = $("<p>");
        p_sec_nm.append(response.response.docs[i].section_name);
        artdiv.append(p_sec_nm);
        
        var p_pub_dt = $("<p>");
        p_pub_dt.append(response.response.docs[i].pub_date);
        artdiv.append(p_pub_dt);
        
        var p_w_url = $("<p>");
        p_w_url.append(response.response.docs[i].web_url);
        artdiv.append(p_w_url);

        $("#article-container").append(artdiv);
         
     }
        


    })
}
})
        
       
       
    
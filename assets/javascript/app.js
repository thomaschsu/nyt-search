// Current Bug List
// 1. Fix Clear Results button
// 2. Before search is pulled, clear any previous search results
// 3. Fix append bug

var articlecontainer = $("#article-container");
var startYr = "";
var endYr = "";
var artdiv = $("<div>");
var pheadline = $("<p>");
var pbyline = $("<li>");
var p_sec_nm = $("<li>");
var p_pub_dt = $("<li>");
var p_w_url = $("<p>");

// Article container starts off as hidden
articlecontainer.hide();

$(document).on("click", ".btn", function() {

    if ($(this).text() == " Search") {

        if ($("#startyear").val() !== "") {
            startYr = "&begin_date=" + $("#startyear").val() + "0101";
        }

        if ($("#endyear").val() !== "") {
            endYr = "&end_date=" + $("#endyear").val() + "1231";
        }

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=8972bc141a574aae8ccd6d9c82ed8113&q=" +
            $("#searchterm").val() + startYr + endYr + "&p=1";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Show article container if search is clicked
            articlecontainer.show();

            for (i = 0; i < $("#records").val(); i++) {
                artdiv.addClass("artDiv");
                pheadline.append(response.response.docs[i].headline.main);
                pheadline.addClass("pheadline");
                artdiv.append(pheadline);
                pbyline.append(response.response.docs[i].byline.original);
                artdiv.append(pbyline);
                p_sec_nm.append(response.response.docs[i].section_name);
                artdiv.append(p_sec_nm);
                p_pub_dt.append(response.response.docs[i].pub_date);
                artdiv.append(p_pub_dt);
                p_w_url.append('<a href="' + response.response.docs[i].web_url + '">' + response.response.docs[i].web_url);
                p_w_url.addClass("urlClass");
                artdiv.append(p_w_url);
                articlecontainer.append(artdiv);

            }
        });
    }
});
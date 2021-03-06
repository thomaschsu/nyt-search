const articlecontainer = $("#article-container");
let startYr = "";
let endYr = "";

// Article container starts off as hidden
articlecontainer.hide();

$(document).on("click", ".btn", function() {
    $('#article-container').empty();
    if ($(this).text() == " Search") {

        if ($("#startyear").val() != "") {
            startYr = "&begin_date=" + $("#startyear").val() + "0101";
        }

        if ($("#endyear").val() != "") {
            endYr = "&end_date=" + $("#endyear").val() + "1231";
        }

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $("#searchterm").val() + "&api-key=t1z0AI074FpGxA06p4SlOK92Ft38VQfD&" + startYr + endYr;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Show article container if search is clicked
            articlecontainer.show();

            for (i = 0; i < $("#records").val(); i++) {
                var artdiv = $("<div>");
                artdiv.addClass("artDiv");
                var pheadline = $("<p>");
                pheadline.append(response.response.docs[i].headline.main);
                pheadline.addClass("pheadline");
                artdiv.append(pheadline);
                var pbyline = $("<li>");
                pbyline.append(response.response.docs[i].byline.original);
                artdiv.append(pbyline);
                var p_sec_nm = $("<li>");
                p_sec_nm.append(response.response.docs[i].section_name);
                artdiv.append(p_sec_nm);
                var p_pub_dt = $("<li>");
                p_pub_dt.append(response.response.docs[i].pub_date);
                artdiv.append(p_pub_dt);
                var p_w_url = $("<p>");
                p_w_url.append('<a href="' + response.response.docs[i].web_url + '">' + response.response.docs[i].web_url);
                p_w_url.addClass("urlClass");
                artdiv.append(p_w_url);
                articlecontainer.append(artdiv);

            }
        });
    }
});
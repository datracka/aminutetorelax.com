/**
 *
 * Takes care of the view in the HTML document the info
 * dinamically loaded.
 *
 */

var View = function () {

}


View.prototype.drawThumbnailsSidebar = function (numVideos){

    for(var i=0;i<numVideos;i++){

        var div = document.createElement("div");
        div.setAttribute("id","divThumbs-" + i);
        div.setAttribute("class","divThumbs");

        $("#st_thumbs").append(div);


    }

    var elem 			= $('body');
    var thumbs_wrapper = elem.find('.st_thumbs_wrapper');
    var thumbs 		= elem.find('.st_thumbs');
    //each thumb has 180px and we add 3 of margin
    var finalH 			= thumbs.find('div').length * 150;
    thumbs.css('height', finalH + 'px');
    thumbs_wrapper.css('height', ($(window).height() - 42) + 'px');

    View.prototype.makeScrollable(thumbs_wrapper,thumbs);

}

/**
 *
 * Draw image thumbnail
 *
 * @param el
 * @param data
 */
View.prototype.drawImageThumbnail = function(el, data, videoId){

    $(el).fadeTo('slow', 0.3, function()
    {
        $(el).css("background-image","none");

        var img = document.createElement("img");
        img.setAttribute("id","imgThumbs-" + el.id);
        img.setAttribute("class","imgThumbs");
        img.setAttribute("src",JSON.parse(data)[1]._content);
        //TODO better way to attach event centralizing into Main.
        img.setAttribute("onclick","View.prototype.showVideo('"+ videoId +"')");
        $(el).append(img);

    }).fadeTo('slow', 1);

}

/**
 *
 * makes the thumbs div scrollable
 * on mouse move the div scrolls automatically
 * @param outer
 * @param $inner
 */
View.prototype.makeScrollable =  function (outer, $inner){

    var extra 			= 100;
    //Get menu width
    var divHeight = outer.height();
    //Remove scrollbars
    outer.css({
        overflow: 'hidden'
    });
    //Find last image in container
    var lastElem = $inner.find('div:last');
    outer.scrollTop(0);
    //When user move mouse over menu
    outer.unbind('mousemove').bind('mousemove',function(e){
        var containerHeight = lastElem[0].offsetTop + lastElem.outerHeight() + 2*extra;
        var top = (e.pageY - outer.offset().top) * (containerHeight-divHeight) / divHeight - extra;
        outer.scrollTop(top);
    });
}

View.prototype.showVideo = function (videoId){

    var d = new Date();
    var n = d.getSeconds();

    var sentence = "";
    if (n >0 && n <= 10){
        sentence = "Yep, just a second... ";
    }
    if (n >10 && n <= 20){
        sentence = "Sir, yes sir! ";
    }
    if (n >20 && n <= 30){
        sentence = "Okie dokie! ";
    }
    if (n >30 && n <= 40){
        sentence = "10-4 ";
    }
    if (n >40 && n <= 50){
        sentence = "coming right up ";
    }
    if (n >50 && n <= 60){
        sentence = "mmh, let me see... ";
    }


    $('#embed').fadeOut(500).empty();
    $('#loadingBackground').empty()
        .append('<p id="loading" class="loading">'+ sentence +'<img  src="img/ajax-loader.gif"/></p>')
        .hide()
        .fadeIn(1000);
    var conf = new Config();
    window.location.href = conf.cannonicalUrl + videoId;

    var v = new Video();

    //set and return finakl url
    var videoUrl = 'http://www.vimeo.com/' + videoId;

    var ov = {
        videoUrl: videoUrl,
        videoTiming: 0
    }

    Video.prototype.getEmbeddedVideo(ov, window.innerWidth, window.innerHeight, 1,  "View.prototype.embedVideoFS2");
    //get Info video for sharing
    Video.prototype.getInfoVideo(videoId);

}

/**
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
View.prototype.embedVideoFS = function (video){

    $('#loadingBackground').delay(6000).fadeOut(2000,function(){
        $(this).empty();
        $('#embed').fadeOut(500).empty().append(decodeURI(video.html)).fadeIn(500);
    });

}

/**
 * TODO: That is why I do not want the delay when I show up the video the second time
 * So, easy solution was duplicate this function and the getVideo. But that its shit
 * please fix it!!
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
View.prototype.embedVideoFS2 = function (video){

    $('#loadingBackground').fadeOut(1000,function(){
        $(this).empty();
        $('#embed').fadeOut(500).empty().append(decodeURI(video.html)).hide().delay(500).fadeIn(500);
    });

}

/**
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
View.prototype.embedVideoWS = function (video) {

    $('#videoPlayer').empty().append(decodeURI(video.html)).delay(500).fadeIn(500);

}




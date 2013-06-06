/**
 *
 * Takes care of the view in the HTML document the info
 * dinamically loaded.
 *
 */

var View = function () {

}

View.prototype.drawThumbnailsSidebar = function (videos){

    $.each(videos, function(i,e){

        var div = document.createElement("div");
        div.setAttribute("id","divThumbs-" + i);
        div.setAttribute("class","divThumbs");

        //TODO better way to attach event centralizing into Main.
        div.setAttribute("onclick","View.prototype.showVideo('"+ e.id +"')");

        $("#st_thumbs").append(div);

        //load image
        Video.prototype.getThumbnailByVideoId(e.id, div);

    })

    View.prototype.makeScrollable(150);

}

/**
 *
 * Draw image thumbnail
 *
 * @param el
 * @param data
 */
View.prototype.drawImageThumbnail = function(el, data){

    $(el).fadeTo('slow', 0.3, function()
    {
        $(el).css("background-image","none");

        var img = document.createElement("img");
        img.setAttribute("id","big-" + el.id);
        img.setAttribute("class","imgThumbsBig");
        img.setAttribute("src",JSON.parse(data)[1]._content);
        $(el).append(img);

        var img = document.createElement("img");
        img.setAttribute("id","Small-" + el.id);
        img.setAttribute("class","imgThumbsSmall");
        img.setAttribute("src",JSON.parse(data)[0]._content);
        $(el).append(img);

    }).fadeTo('slow', 1);

}


/**
 *
 * makes the thumbs div scrollable
 * on mouse move the div scrol

 */
View.prototype.makeScrollable =  function (heightImage){

    var thumbs_wrapper  = $('body').find('.st_thumbs_wrapper');
    var thumbs 		    = $('body').find('.st_thumbs');
    //each thumb has 180px and we add 3 of margin
    var finalH 			= thumbs.find('div').length * heightImage;

    thumbs.css('height', finalH + 'px');
    thumbs_wrapper.css('height', ($(window).height() - 42) + 'px');

    var extra 			= 100;
    //Get menu width
    var thumbsWrapperHeight = thumbs_wrapper.height();

    //Find last image in container
    var lastElem = thumbs.find('div:last');
    thumbs_wrapper.scrollTop(0);
    //When user move mouse over menu
    thumbs_wrapper.unbind('mousemove').bind('mousemove',function(e){
        var containerHeight = lastElem[0].offsetTop + lastElem.outerHeight() + 2 * extra;
        var top = (e.pageY - thumbs_wrapper.offset().top) * (containerHeight-thumbsWrapperHeight) / thumbsWrapperHeight - extra;
        thumbs_wrapper.scrollTop(top);
    });
}

View.prototype.showVideo = function (videoId){

    var conf = new Config();
    window.location.href = conf.cannonicalUrl + videoId;

    var v = new Video();

    //set and return finakl url
    var videoUrl = 'http://www.vimeo.com/' + videoId;

    var ov = {
        videoUrl: videoUrl,
        videoTiming: 0
    }

    //get video for embed it
    Video.prototype.getVideo(ov);
    //get Info video for sharing
    Video.prototype.getInfoVideo(videoId);

}

/**
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
View.prototype.embedVideo = function (video){

    $('#loadingBackground').delay(6000).fadeOut(1000,function(){
       $('#embed').fadeOut(500).empty().append(decodeURI(video.html)).hide().delay(500).fadeIn(500);
    });

}




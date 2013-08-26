/**
 * Created with JetBrains PhpStorm.
 * User: vfayos
 * Date: 01.02.13
 * Time: 16:58
 * To change this template use File | Settings | File Templates.
 */

/**
 * Video manager
 */

var Video = function () {

}

/**
 *
 *
 * @return {*}
 */

Video.prototype.loadVideosFromChannel = function(numVideos){

    //for mobile we don't load the sidebar in order to save bandwidth.
    if( !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ) {

            //we have all the info. lets build the sidebars :)
            v = new View();
            v.drawThumbnailsSidebar(numVideos);

        var oConfig = new Config();

        var request = $.ajax({
            url: oConfig.getServiceUrl() + "getListVideos.php?numVideos=" + (numVideos+1),
            dataType: "script",
            async: true
        });

        request.success(function(data, textStatus, jqXHR){

            //get info needed from the list of videos
            atotalVideosToAdd = Video.prototype.processVideos(data, textStatus, jqXHR);
            //load image
            Video.prototype.getThumbnails(atotalVideosToAdd);

        })

    }else{ //if mobile don't show the sidebar thumbnails.
        $("#st_thumbs_wrapper").hide();
    }

}

/**
 *
 * return array of thumbnails for videos given
 *
 * @param videos
 * @return {Array}
 * @param jqXHR
 * @param textStatus
 */
Video.prototype.processVideos = function(videos, textStatus, jqXHR){

    var aVideos = JSON.parse(videos);

    //get the last 3 videos added to the channel
    var aVideos  = aVideos.reverse(); //reverse them to get the last one in position 0.

    var aLastVideos = [];
    aLastVideos.push(aVideos.pop());
    aLastVideos.push(aVideos.pop());
    aLastVideos.push(aVideos.pop());
    //schuffle the rest of the videos
    aVideos = Video.prototype.shuffleArray(aVideos);

    var aSliceVideos = aVideos;
    var aTotalVideos = aLastVideos.concat(aSliceVideos);

    return aTotalVideos;

}

/**
 *
 * Shuffle elements of an array
 *
 * @param o
 * @return array schuffled
 */

Video.prototype.shuffleArray = function(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
/**
 * Get the thumbnails
 *
 * @param videos
 */
Video.prototype.getThumbnails = function(videos){

    $.each(videos, function(i,e){

        Video.prototype.getThumbnailByVideoId(e.id, i);

    });

}

/**
 *
 * given video Id gather thumbnails
 * @param videoId
 * @param element
 */
Video.prototype.getThumbnailByVideoId = function(videoId, i){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getThumbsByVideoId.php?id="+ videoId,
        dataType: "script",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){

        //-->> should be inside the other function
        currThumb = "#divThumbs-"+i;
        View.prototype.drawImageThumbnail($(currThumb),data, videoId);



        /**
         * HERE CREATE THE drawThumbnailsWeb!!
         */

    });
}

/**
 *
 * Get the random video to show on the screen
 *
 * @deprecated -> no random video anymore!!
 * @param videos
 */
Video.prototype.getRandomVideo = function (videos) {

    var videoId = null;
    var t = null;
    var rn = null;
    var ov = null;
    var av = [];  //array videos

    v = "22439234";
    $.each(JSON.parse(videos),function(i,e){
        av.push(e.id);
    })

    //get a random video from the channel.
    var aLength = av.length;
    v = "22439234"; //default video
    if(av.length >0){
        rn = Math.floor(Math.random()*aLength);
        videoId = av[rn];
    }

    //set and return finakl url
    var videoUrl = 'http://www.vimeo.com/' + videoId;

    ov = {
        videoUrl: videoUrl,
        videoTiming: t
    }

    //Request video
    Video.prototype.getEmbeddedVideo(ov, window.innerWidth, window.innerHeight, 1,  "View.prototype.embedVideoFS");
    //get Info video for sharing
    Video.prototype.getInfoVideo(videoId);
};


/**
 *
 * get Last video from channel
 */

Video.prototype.getLastVideoFromChannel = function(){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getListVideos.php?numVideos=1",
        dataType: "script",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){


        var videoUrl = 'http://www.vimeo.com/' + JSON.parse(data)[0].id;
        Main.library.set("lastVideo", JSON.parse(data)[0].id);


        var ov = {
            videoUrl: videoUrl,
            videoTiming: 0 //don't use timing at the moment
        }

        Video.prototype.getEmbeddedVideo(ov, $("#videoPlayer").width(), $("#videoPlayer").height(), 0,  "View.prototype.embedVideoWS");

    })


}

/**
 * Request Selected video
 *
 * Callback embedVideo
 *
 */
Video.prototype.getEmbeddedVideo =  function (oVideo, width, height, autoPlay, callBack) {

    var url = "http://www.vimeo.com/api/oembed.json" + '?url=' + encodeURIComponent("http://www.vimeo.com/" + oVideo.videoUrl) +
        '&callback=' + callBack +
        '&width=' + width +
        '&height=' + height +
        '&autoplay=' + autoPlay +
        '&t=' + oVideo.videoTiming;

    $.getScript(url);

};

Video.prototype.getInfoVideo = function (videoId){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getInfoByVideoId.php?id="+ videoId,
        dataType: "script",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){
        //set the library in the library for later uses
        Main.library.set("oVideo", JSON.parse(data));
    });
}










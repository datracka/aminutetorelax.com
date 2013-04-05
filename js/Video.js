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
 * gather list of videos of selected channel
 *
 * Callback getVideoUrl
 *
 */
Video.prototype.loadVideosChannel =  function () {

    var oConfig = new Config();
    $.getScript(oConfig.getServiceUrl() + "getListVideos.php", function (data, textStatus, jqxhr){
        Video.prototype.prepareVideoUrl(data);
    });

}

/**
 *
 * given video Id gather thumbnails
 * @param videoId
 */
Video.prototype.getThumbnails = function(videoId){

    var oConfig = new Config();
    $.getScript(oConfig.getServiceUrl() + "getThumbsByVideoId.php?id="+videoId, function (data, textStatus, jqxhr){
        return (JSON.parse(data)[1]._content);  //returns pos 1 array with thumb 150x200
    });
}

/**
 * Get the random video to show on the screen
 *
 * @param videos
 */
Video.prototype.prepareVideoUrl = function (videos) {

    var v = null;
    var t = null;
    var rn = null;
    var ov = null;
    var av = [];  //array videos
    var at = [];  //arrray thumbs

    //iterate all the videos json and fill arrays
    $.each(JSON.parse(videos),function(i,e){
        av.push(e.id);
        at.push(Video.prototype.getThumbnails(e.id));
    })


    //get a random video from the channel.
    var aLength = av.length;
    v = "22439234"; //default video
    if(av.length >0){
        rn = Math.floor(Math.random()*aLength);
        v = av[rn];
    }

    //set and return finakl url
    var videoUrl = 'http://www.vimeo.com/' + v;

    ov = {
        videoUrl: videoUrl,
        videoTiming: t
    }

    //Request video
    Video.prototype.getVideo(ov);
};

/**
 * Request Selected video
 *
 * Callback embedVideo
 *
 */
Video.prototype.getVideo =  function (oVideo) {

    var url = "http://www.vimeo.com/api/oembed.json" + '?url=' + encodeURIComponent("http://www.vimeo.com/" + oVideo.videoUrl) +
        '&callback=' + "Video.prototype.embedVideo" +
        '&width=' + (window.innerWidth) +
        '&height=' + (window.innerHeight) +
        '&autoplay=1' +
        '&t=' + oVideo.videoTiming;

    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    document.getElementsByTagName('head').item(0).appendChild(js);

};

/**
 *
 * Callback from Video.prototype.getVideo
 * @param video
 */
Video.prototype.embedVideo = function (video){
    $('#loading').remove();
    $('#embed').append(decodeURI(video.html));

}








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

    //attributes
    this.endPoint           = "http://www.vimeo.com/api/oembed.json";
    this.callBack           = "Video.prototype.embedVideo";
    this.url = null;

    this.channel            = "497601"
    this.channelEndPoint    = "http://vimeo.com/api/v2/channel/"
    this.channelCallBack    = "Video.prototype.getVideoUrl";

    /**
     * Array of videosIds
     * @type {null}
     */
    this.aIdVideos = null;

}

/**
 * Get the random video to show on the screen
 *
 * @param videos
 */
Video.prototype.getVideoUrl = function (videos) {

    var v = null;
    var t = null;
    var rn = null;
    var ov = null;
    var av = [];

    //iterate all the videos json
    $.each(videos,function(i,e){
        av.push(e.id);
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
 * gather list of videos of selected channel
 *
 * Callback getVideo
 *
 */
Video.prototype.loadVideosChannel =  function () {
    $.getScript(    this.channelEndPoint +
                    this.channel +
                    '/videos.json?callback=' + this.channelCallBack);
}

Video.prototype.embedVideo = function (video){
    document.getElementById('embed').innerHTML = decodeURI(video.html);
}

/* deprecated#

Video.prototype.getVideoUrl = function () {

    var d = new Date();
    var n = d.getSeconds().toString();
    var v = null;
    var t = null;

    switch (n.charAt(0)) {
        case "0":
            v = 22439234; //yosemiti
            break;
        case "1":
            v = 40802206;
            t = "1m47s";
            break;
        case "2":
            v = 42882023;
            t = "2m053s";
            break;
        case "3":
            v = 28404579;
            t = "12m30s";
            break;
        case "4":
            v = 33749976;
            t = "1m30s";
            break;
        case "5":
            v = 29017795;
            t = "0m18s";
            break;
        case "6":
            v = 44941805;
            break;
        default:
        //no default

    }

    var videoUrl = 'http://www.vimeo.com/' + v;

    return {
        videoUrl: videoUrl,
        videoTiming: t
    }
};
*/






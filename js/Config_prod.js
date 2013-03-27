
var Config = function() {

    this.videoListServiceUrl = "http://www.aminutetorelax.com/php/getListVideos.php"
}

Config.prototype.getVideoListServiceUrl = function(){
    return  this.videoListServiceUrl;
}


var Config = function() {

    this.serviceUrl = "http://" + window.location.hostname + "/php/"
    this.cannonicalUrl = "http://" + window.location.hostname + "/#";
    this.hostname = "http://" + window.location.hostname;
}

Config.prototype.getServiceUrl = function(){
    return  this.serviceUrl;
}

Config.prototype.getCannonicalUrl = function(){
    return  this.cannonicalUrl;
}

Config.prototype.getHostname = function(){
    return  this.hostname;
}

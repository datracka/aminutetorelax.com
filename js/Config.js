
var Config = function() {

    this.serviceUrl = "http://relax.local/php/"
}

Config.prototype.getServiceUrl = function(){
    return  this.serviceUrl;
}

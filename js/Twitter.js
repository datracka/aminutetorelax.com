/**
 * Created with JetBrains PhpStorm.
 * User: vfayos
 * Date: 03.06.13
 * Time: 20:00
 * To change this template use File | Settings | File Templates.
 */

var Twitter = function() {

}

Twitter.prototype.getPostByUserName = function(){

    var oConfig = new Config();

    var request = $.ajax({
        url: oConfig.getServiceUrl() + "getPostTwitterByUsername.php",
        dataType: "json",
        async: true
    });

    request.success(function(data, textStatus, jqXHR){

        var str = data[0].text;

        var words = (str).split(" ");
        var wordsMatching = [];
        var ptrn = new RegExp("[/@]","g");

        $(words).each(function(i,el){
            if(el.search(ptrn) != -1){
                wordsMatching.push(el);
            };
        });

        $(wordsMatching).each(function(i,el){
            str = str.replace(el,"");
        });

        $("#loadingBackground p#quote").append(str).hide().fadeIn(2000);
    });

    request.error(function(data, textStatus, jqXHR){
        $("#loadingBackground").html('Just loading video...  <img id="loading" class="loading" src="img/ajax-loader.gif"/>');
    });

}


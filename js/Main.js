var Main = (function(){

    //Constructor
    function Main(){

        // Get new library object for storing elements
        Main.library = new Storage();

        Main.prototype.fetchElements();
        Main.prototype.initializeEventListeners();

        Main.prototype.init();

    }

    //atrributes
    Main.library = "";
    Main.video = null;
    Main.view = null;
    Main.urlVars = null;

//    Main.aVideosThumbs = []
//    Main.aThumbs = []  //array thumbs
//    Main.videos = null //videos


    Main.timeout = null;

    Main.prototype = {

        init: function () {

            //load video if exists Id. else we load it after ask for loadVideosFromChannel.

            if (typeof(Main.urlVars["id"]) != "undefined" || window.location.hash != ""){

                //set and return final url
                var param;
                (window.location.hash != "") ?
                    idVideo = window.location.hash.slice(1):
                    idVideo = Main.urlVars["id"];

                var videoUrl = 'http://www.vimeo.com/' + idVideo;

                var ov = {
                    videoUrl: videoUrl,
                    videoTiming: 0 //don't use timing at the moment
                }

                Video.prototype.getInfoVideo(idVideo);
                Video.prototype.getVideo(ov);
            }

            Main.video = new Video();
            Main.video.loadVideosFromChannel();

        },

        fetchElements: function(){

            var menuBarWrapper     = $('#menuBarWrapper')
            var shareOnFb       = $('#share_on_fb')
            var shareOnTw       = $('#share_on_tw')
            var sidebar         = $('#st_thumbs_wrapper')
            var html            = $('html');

            var cWindow         = $(window);
            var iframe          = $('iframe');


            Main.library.set('menuBarWrapper', menuBarWrapper);
            Main.library.set('sidebar', sidebar);
            Main.library.set('shareOnFb', shareOnFb);
            Main.library.set('shareOnTw', shareOnTw);

            Main.library.set('html', html);
            Main.library.set('cWindow', cWindow);
            Main.library.set('iframe', iframe);

        },

        initializeEventListeners: function () {

            /** get Vars from URL */
            Main.urlVars = this.getUrlVars();

            /** document events **/

            var cWindow = Main.library.get('cWindow');
            var html = Main.library.get('html');
            var menuBarWrapper = Main.library.get('menuBarWrapper');
            var sidebar = Main.library.get('sidebar');
            var shareOnFb = Main.library.get('shareOnFb');
            var shareOnTw = Main.library.get('shareOnTw');
            var iframe = Main.library.get('iframe');

            cWindow.resize(Main.prototype.resizeScreenElements);




            sidebar.hover(Main.prototype.showSidebar, Main.prototype.hideSidebar);
            shareOnFb.on('click',Main.prototype.shareOnFb);
            shareOnTw.on('click',Main.prototype.shareOnTw);
            menuBarWrapper.hover(Main.prototype.showCloseHeader, Main.prototype.hideCloseHeader);

            /** show iframe **/
            $(".wrapper").fadeIn(2000);

        },


        shareOnTw: function(){

            var oVideo = Main.library.get('oVideo');
            var config = new Config();

            //if the movie has tags we retrieve them
            var sTags = "";
            var tags = oVideo[0].tags;
            if (typeof  oVideo[0].tags === 'object'){

                $.each(tags.tag, function(i, v){
                    sTags += " #" + v.normalized;
                });

            }

            var pText = oVideo[0].title + " - " + window.location.hostname + '/?id=' + oVideo[0].id + sTags;

            //if text > 140 no good for twitter. We cut it in a cool way.
            var fText = pText;
            if(pText.length > 140){

                var mText = pText.substr(0,140);
                var lastOccurence = mText.lastIndexOf("#");
                fText = mText.substr(0,lastOccurence);
            }

            var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
            var wTop = window.screenTop ? window.screenTop : window.screenY;

            var left = wLeft + (window.innerWidth / 2) - (575 / 2);
            var top = wTop + (window.innerHeight / 2) - (400 / 2);

            var i = "http://twitter.com/share?url="
                + encodeURIComponent(window.location.hostname)
                + "&text=" + encodeURIComponent(fText)
                + "&related=aminuteorelax";
            var n = "status=1,width=575,height=400,top=" + top + ",left=" + left;
            window.open(i, "twitter", n);

            e.preventDefault();
        },

        fbCallback: function(){
            //blah blah
        },

        shareOnFb : function(e){

            var oVideo = Main.library.get('oVideo');
            var config = new Config();

            var obj = {
                method: 'feed',
                display: 'popup',
                name: 'A minute to relax: '+ oVideo[0].title,
                caption: 'Watch inspiring HD videos',
                description: oVideo[0].description,

                picture: oVideo[0].thumbnails.thumbnail[0]._content,
                link: config.getHostname() + '/?id=' + oVideo[0].id

            };

            FB.ui(obj, Main.prototype.fbCallback());

            e.preventDefault();
        },


        resizeScreenElements: function(){

            var elem 			= $('body');
            var thumbs_wrapper = elem.find('.st_thumbs_wrapper');
            thumbs_wrapper.css('height', ($(window).height() - 42) + 'px');

            $('.wrapper iframe').css('height', $(window).height() + 'px');
            $('.wrapper iframe').css('width', $(window).width() + 'px');
        },

        showSidebar: function () {
            $(this).stop().animate({
                opacity: 1
            }, 500)
        },

        hideSidebar: function () {
            $(this).stop().animate({
                opacity: 0
            }, 500)
        },

        showCloseHeader: function () {

            $("#menuBarWrapper").stop().animate({"top": "+50px"}, "fast");
        },
        hideCloseHeader: function () {

            $("#menuBarWrapper").stop().animate({"top": "0px"}, "fast");
        },

        getUrlVars: function(){

            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });

           return vars;
        }

}
    return Main;
}());




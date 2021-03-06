<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head id="head">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>A minute to relax</title>
        <meta name="description" content="Allow yourself to relax for a minute watching inspiring Fullscreen HD videos.">
        <meta name="keywords" content="relax, relaxation, meditation, spirituality, Awareness, , Mindfulness, Personal growth
    Relax video, time to relax, time to Meditation, minute relax, A minute to relax, calm, do nothing for 2 minutes,
    do nothing">
        <meta name="viewport" content="width=device-width">

        <?php

        //Ugliest Hardcoded ever for FB. improve it!!
        include "php/vimeo/vimeo.php";
        include "php/VimeoApi.php";


        if (isset($_GET['id']))
        {

            $vimeo = new phpVimeo(
                "11ea28e89d369a475e41c255278f5a9ae47c61a4",
                "031045fc9da4d57d405f51ee63ca5761ae8c7264",
                "10bbc5bbfc5005ca32a5a95a0403b41f",
                "222efa6b3c8621dc201a3a1333f531293d866a3c"
            );

            $oVideoInfo = $vimeo->call('vimeo.videos.getInfo',
                array(
                    'video_id' => $_GET['id'])
            );

            $oData = $oVideoInfo->video;

            $title = $oData[0]->title;
            $desc = $oData[0]->description;
            $id = $oData[0]->id;
            $content = $oData[0]->thumbnails->thumbnail[2]->_content;

            echo ('<meta property="og:title" content="A minute to relax: ' . $title . '" />');
            echo ('<meta property="og:description" content="' . $desc . '" />');
            echo ('<meta property="og:type" content="video.movie" />');
            echo ('<meta property="og:url" content="http://aminutetorelax.com/?id=' . $id . '" />');
            echo ('<meta property="og:image" content="' . $content . '" />');

        }

        ?>

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- http://www.iconarchive.com/show/rose-icons-by-shiftercat.html -->
        <link rel="icon" href="brown.ico" type="image/x-icon">
        <link rel="shortcut icon" href="brown.ico" type="image/x-icon">
        <link rel="apple-touch-icon" href="brown.png">

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <!-- vimeo url container-->
        <script type="text/javascript" src=""></script>

    </head>
    <body onload="Main();">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
<!--        <div id="ultralayer" class="ultralayer" style="width: 100%; height: 100%; position: fixed;"></div>-->
        <div id="fb-root"></div>

<!--        <div id="twitter"></div>-->
        <script>(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=114844025327528";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>


            <div id="wrapperLoading" class="wrapperLoading">
                <div id="loadingBackground" class="loadingBackground">
                    <p id="loading" class="loading">Just loading video... <img  src="img/ajax-loader.gif"/></p>
                    <p id="quote"></p>
                </div>
            </div>
            <div id="embed" class="wrapper"></div>
            <div class="st_thumbs_wrapper" id="st_thumbs_wrapper">
                <div class="st_thumbs" id="st_thumbs">
                </div>
            </div>

        <div id="menuBarWrapper" class="menuBarWrapper" style="">
                        <div id="menuBar" class="menuBar" >
                            <ul>
                                <li><div class="fb-like" data-href="http://aminutetorelax.com" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false" data-font="verdana"></div></li>
                                <li id="first"><a id="share_on_fb" href="javascript:return false">share on FB</a></li>
                                <li><a id="share_on_tw" href="javascript:return false">share on Twitter</a></li>
                                <li><a href="http://meerkat.aminutetorelax.com" target="_blank">Meerkat</a></li>
                                <li id="list_fb" class="list_fb">
                                    <a id="facebook" class="facebook" href="http://facebook.com/aminutetorelax" target="_blank">
                                         <img id="img_fb" src="/img/facebook_19_on.jpg"/>
                                    </a>
                                </li>
                                <li id="list_twitter" class="list_twitter">
                                    <a id="twitter" class="twitter" href="http://twitter.com/aminutetorelax" target="_blank">
                                        <img id="img_twitter" src="/img/twitter_19_on.jpg"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
        </div>
        <!-- my app -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.0.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/Config.js"></script>
        <script src="js/Storage.js"></script>
        <script src="js/View.js"></script>
        <script src="js/Video.js"></script>
        <script src="js/Twitter.js"></script>
        <script src="js/Main.js"></script>
        <noscript>Allow yourself to relax for a minute watching inspiring Fullscreen HD videos.</noscript>

        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-39556499-1', 'aminutetorelax.com');
            ga('send', 'pageview');
        </script>
    </body>
</html>

<?php
/**
 * Created by JetBrains PhpStorm.
 * User: vfayos
 * Date: 03.06.13
 * Time: 19:40
 * To change this template use File | Settings | File Templates.
 */

class TwitterApi extends phpTwitter{

    /**
     * Method needed by http
     * @var string
     */
    protected $method = "GET";

    /**
     *
     * Set access tokens here - see: https://dev.twitter.com/apps/
     **/
    protected $settings = null;

    /**
     * url statuses. HC todo set a more scalable url manager
     * @var string
     */

    private function setMethodToGet(){
        $this->method = 'GET';
    }

    private function setMethodToPost(){
        $this->method = 'POST';
    }

    private function getMethod(){
       return $this->method;
    }

    public function __construct(){

        $this->settings = array(
            'oauth_access_token' => "110818470-qHtu3u4PR5v1qELouPlFUuMoEZ0b6nCjsvf2O51N",
            'oauth_access_token_secret' => "ZNhB1G5LvDM5bI2NKBwS8MoR9BPvtFCHAoaGWVC5JWA",
            'consumer_key' => "QGnITdfi7LmGg5OKFC0uIA",
            'consumer_secret' => "bzdz8ztNFTSSEN4kkhhVy2aD2KPBKl7NX671Tbm5aE"
         );

        parent::__construct($this->settings);
    }

    public function getPostByUserName($username, $numberPosts){

        $getfield = '?screen_name=' . $username .
            '&count=' . $numberPosts;

        echo $this->setGetfield($getfield)
            ->buildOauth("https://api.twitter.com/1.1/statuses/user_timeline.json", $this->getMethod())
            ->performRequest();

    }
}

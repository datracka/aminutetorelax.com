<?php

include "twitter/phpTwitter.php";
include "TwitterApi.php";

$t = new TwitterApi();

//ugly substring... why it returns a null???!!!!
echo substr_replace(json_encode($t->getPostByUserName("Zen_Moments", "1")),"",-4);


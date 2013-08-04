<?php

include "vimeo/vimeo.php";
include "VimeoApi.php";

$oVimeoApi = new VimeoApi();

$oVideos = $oVimeoApi->getListOfVideos($_GET['numVideos']);
echo json_encode($oVideos->videos->video);
<?php
require_once('twitter_proxy.php');
// Twitter OAuth Config options
$oauth_access_token = '88054807-TAzqVok9HJAcFE0uF1FHQ9fH8SY8xcXt5Gn21sZWz';
$oauth_access_token_secret = 'i8tiBu3Slux9bJeOTlKTL3VpVEWrHBaFRXodAjddEbkeg';
$consumer_key = 'gwkXakrc6o0bm2pLMTWth8vBp';
$consumer_secret = 'KqsseI2h03ZYmafVxO06gCUg7bw1u7enD3j65elaDiQyuEjyyh';
$user_id = '88054807';
$screen_name = 'd_young19';
$count = 5;
$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;
// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);
// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);
echo $tweets;
?>

<?php
/**
 * Copyright (c) BoonEx Pty Limited - http://www.boonex.com/
 * CC-BY License - http://creativecommons.org/licenses/by/3.0/
 */

require_once( './inc/header.inc.php' );
require_once( './inc/db.inc.php' );
require_once( './inc/profiles.inc.php' );

$aPredefinedRssFeeds = array (
    'boonex_news' => 'http://www.boonex.com/notes/featured_posts/?rss=1',
    'boonex_version' => 'http://rss.boonex.com/',
    'boonex_unity_market' => 'http://www.boonex.com/market/latest/?rss=1',
    'boonex_unity_lang_files' => 'http://www.boonex.com/market/tag/translations&rss=1',
    'boonex_unity_market_templates' => 'http://www.boonex.com/market/tag/templates&rss=1',
    'boonex_unity_market_featured' => 'http://www.boonex.com/market/featured_posts?rss=1',
);

if (isset($aPredefinedRssFeeds[$_GET['ID']])) {

    $sCont = $aPredefinedRssFeeds[$_GET['ID']];

} else {

    $sQuery = "SELECT `Content` FROM `sys_page_compose` WHERE `ID` = " . (int)$_GET['ID'];
    $sCont = db_value( $sQuery );

    if( !$sCont )
        exit;
}

list( $sUrl ) = explode( '#', $sCont );
$sUrl = str_replace( '{SiteUrl}', $site['url'], $sUrl );

$iMemID = (int)$_GET['member'];
if( $iMemID ) {
    $aMember = getProfileInfo( $iMemID );
    $sUrl = str_replace( '{NickName}', $aMember['NickName'], $sUrl );
}

header( 'Content-Type: text/xml' );
echo bx_file_get_contents( $sUrl . (BX_PROFILER && 0 == strncmp($site['url'], $sUrl, strlen($site['url']))? '&bx_profiler_disable=1' : '') );

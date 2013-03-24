<?php
/**
 * Copyright (c) BoonEx Pty Limited - http://www.boonex.com/
 * CC-BY License - http://creativecommons.org/licenses/by/3.0/
 */

require_once(BX_DIRECTORY_PATH_CLASSES . 'BxDolConfig.php');

class BxProfileCustomizeConfig extends BxDolConfig
{
    var $_oDb;

    /**
     * Constructor
     */
    function BxProfileCustomizeConfig($aModule)
    {
        parent::BxDolConfig($aModule);
    }

    function init(&$oDb)
    {
        $this->_oDb = &$oDb;
    }
}

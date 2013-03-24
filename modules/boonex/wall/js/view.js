function BxWallView(oOptions) {
    this._sActionsUrl = oOptions.sActionUrl;
    this._sObjName = oOptions.sObjName == undefined ? 'oWallView' : oOptions.sObjName;
    this._iOwnerId = oOptions.iOwnerId == undefined ? 0 : oOptions.iOwnerId;
    this._iGlobAllowHtml = 0;
    this._sAnimationEffect = oOptions.sAnimationEffect == undefined ? 'slide' : oOptions.sAnimationEffect;
    this._iAnimationSpeed = oOptions.iAnimationSpeed == undefined ? 'slow' : oOptions.iAnimationSpeed;
}

BxWallView.prototype.deletePost = function(iId) {
    var $this = this;
    var oData = this._getDefaultData();
    var oLoading = $('#bx-wall-view-loading');

    oData['WallEventId'] = iId;

    if(oLoading)
    	oLoading.bx_loading();

    $.post(
        this._sActionsUrl + 'delete/',
        oData,
        function(oData) {
        	if(oLoading)
        		oLoading.bx_loading();

            if(oData.code == 0)
                $('#wall-event-' + oData.id + ', #wall-event-' + oData.id + ' + .wall-divider-nerrow').bxwallanim('hide', $this._sAnimationEffect, $this._iAnimationSpeed, function() {
                    $(this).remove();
                    
                    if($('#bxwall .wall-view :last').is('.wall-divider-nerrow'))
                    	$('#bxwall .wall-view :last').remove();

                    if($('#bxwall .wall-view .wall-events .wall-event').length == 0) {
                    	$('.wall-view .wall-events div.wall-divider-today').hide();
                    	$('.wall-view .wall-events div.wall-load-more').hide();
                    	$('.wall-view .wall-events div.wall-empty').show();
                    }
                });                        
        },
        'json'
    );
};

BxWallView.prototype.changeFilter = function(oLink) {
    var sId = $(oLink).attr('id');
    var sFilter = sId.substr(sId.lastIndexOf('-') + 1, sId.length);

    //--- Change Control ---//
    $(oLink).parent().siblings('.active:visible').hide().siblings('.notActive:hidden').show().siblings('#' + sId + '-pas:visible').hide().siblings('#' + sId + '-act:hidden').show();

    this.getTimeline(0, null, sFilter, null);
    this.getPosts('filter', 0, null, sFilter, null);

    //--- Is used with common Pagination
    //this.getPaginate(0, null, sFilter);
};

BxWallView.prototype.changeTimeline = function(sFilter, oEvent) {
	var sTimeline = $(oEvent.target).siblings("[name='timeline']").val();

	this.getPosts('timeline', 0, null, sFilter, sTimeline);
};

BxWallView.prototype.changePage = function(iStart, iPerPage, sFilter, sTimeline) {
    this.getPosts('page', iStart, iPerPage, sFilter, sTimeline);

    //--- Is used with common Pagination
    //this.getPaginate(iStart, iPerPage, sFilter);
};

BxWallView.prototype.getPosts = function(sAction, iStart, iPerPage, sFilter, sTimeline) {
    var $this = this;
    var oData = this._getDefaultData();

    if(iStart)
        oData['WallStart'] = iStart;
    if(iPerPage)
        oData['WallPerPage'] = iPerPage;
    if(sFilter)
        oData['WallFilter'] = sFilter;
    if(sTimeline)
        oData['WallTimeline'] = sTimeline;

	switch(sAction) {
		case 'page':
			oLoading = $('#wall-load-more .bx-btn');
			oLoading.bx_btn_loading();
			break;
	
		default:
			oLoading = $('#bx-wall-view-loading');
			oLoading.bx_loading();
			break;
	}

    jQuery.post(
        this._sActionsUrl + 'get_posts/',
        oData,
        function(sResult) {
            if(sAction == 'page') {
            	if(oLoading)
            		oLoading.bx_btn_loading();

	            $('#bxwall .wall-view .wall-load-more').bxwallanim('hide', $this._sAnimationEffect, $this._iAnimationSpeed, function() {
	                $(this).replaceWith(sResult).bxwallanim('show', $this._sAnimationEffect, $this._iAnimationSpeed);
	            });
            }
            else {
            	if(oLoading)
            		oLoading.bx_loading();

            	$('#bxwall .wall-view .wall-events').bxwallanim('hide', $this._sAnimationEffect, $this._iAnimationSpeed, function() {
	                $(this).html(sResult).bxwallanim('show', $this._sAnimationEffect, $this._iAnimationSpeed);
	            });
            }
        }
    );
};

BxWallView.prototype.getTimeline = function(iStart, iPerPage, sFilter, sTimeline) {
    var $this = this;
    var oData = this._getDefaultData();
    var oLoading = $('#bx-wall-view-loading');

    if(iStart != undefined)
        oData['WallStart'] = iStart;
    if(iPerPage != undefined)
        oData['WallPerPage'] = iPerPage;
    if(sFilter)
        oData['WallFilter'] = sFilter;
    if(sTimeline)
        oData['WallTimeline'] = sTimeline;

    if(oLoading)
    	oLoading.bx_loading();

    jQuery.post (
        this._sActionsUrl + 'get_timeline/',
        oData,
        function(sResult) {                                    
        	if(oLoading)
        		oLoading.bx_loading();

            $('#bxwall .wall-view .wall-timeline').bxdolcmtanim('hide', $this._sAnimationEffect, $this._iAnimationSpeed, function() {
            	$(this).html(sResult);
            	$(document).addNonWebForms();
            	$(this).bxdolcmtanim('show', $this._sAnimationEffect, $this._iAnimationSpeed);
            });            
        }
    );
};

BxWallView.prototype.getPaginate = function(iStart, iPerPage, sFilter, sTimeline) {
    var $this = this;
    var oData = this._getDefaultData();
    var oLoading = $('#bx-wall-view-loading');

    if(iStart != undefined)
        oData['WallStart'] = iStart;
    if(iPerPage != undefined)
        oData['WallPerPage'] = iPerPage;
    if(sFilter)
        oData['WallFilter'] = sFilter;
    if(sTimeline)
        oData['WallTimeline'] = sTimeline;

    if(oLoading)
    	oLoading.bx_loading();

    jQuery.post (
        this._sActionsUrl + 'get_paginate/',
        oData,
        function(sResult) {                                    
        	if(oLoading)
        		oLoading.bx_loading();

            $('#bxwall > .paginate').bxdolcmtanim('hide', $this._sAnimationEffect, $this._iAnimationSpeed, function() {
                if(sResult.length > 0) {
                    $(this).replaceWith(sResult);
                    $(this).bxdolcmtanim('show', $this._sAnimationEffect, $this._iAnimationSpeed);
                }
            });            
        }
    );
};

BxWallView.prototype._getDefaultData = function () {
	var oDate = new Date();
    return {WallOwnerId: this._iOwnerId, _t: oDate.getTime()};
};

BxWallView.prototype._err = function (oElement, bShow, sMessage) {    
	if (bShow && !$(oElement).next('.wall-post-err').length)
        $(oElement).after(' <b class="wall-post-err">' + sMessage + '</b>');
    else if (!bShow && $(oElement).next('.wall-post-err').length)
        $(oElement).next('.wall-post-err').remove();    
};
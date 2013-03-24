function BxWallOutline(oOptions) {
    this._sActionsUrl = oOptions.sActionUrl;
    this._sObjName = oOptions.sObjName == undefined ? 'oWallOutline' : oOptions.sObjName;
    this._iOwnerId = oOptions.iOwnerId == undefined ? 0 : oOptions.iOwnerId;
    this._sAnimationEffect = oOptions.sAnimationEffect == undefined ? 'slide' : oOptions.sAnimationEffect;
    this._iAnimationSpeed = oOptions.iAnimationSpeed == undefined ? 'slow' : oOptions.iAnimationSpeed;

    $(document).ready(function() {
    	$('#bx-wall-outline .wall-outline-items').masonry({
		  itemSelector: '.wall-oi-item',
		  columnWidth: 170,
		  gutterWidth: 20
		});
    });
}

BxWallOutline.prototype.changePage = function(iStart, iPerPage, sFilter) {
    this.getPosts('page', iStart, iPerPage, sFilter);
};

BxWallOutline.prototype.getPosts = function(sAction, iStart, iPerPage, sFilter) {
    var $this = this;
    var oData = this._getDefaultData();
    var oLoading = null;

    if(iStart)
        oData['WallStart'] = iStart;
    if(iPerPage)
        oData['WallPerPage'] = iPerPage;
    if(sFilter)
        oData['WallFilter'] = sFilter;

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
        this._sActionsUrl + 'get_posts_outline/',
        oData,
        function(oData) {
        	switch(sAction) {
        		case 'page':
        			if(oLoading)
                		oLoading.bx_btn_loading();

        			var oItems = $(oData.items);
		            $('#bx-wall-outline .wall-outline-items').append(oItems).masonry('appended', oItems);
		            $('#bx-wall-outline .wall-load-more').replaceWith(oData.paginate);
        			break;

        		default:
        			if(oLoading)
                		oLoading.bx_loading();
        			break;
        	}
        },
        'json'
    );
};

BxWallOutline.prototype._getDefaultData = function () {
	var oDate = new Date();
    return {_t: oDate.getTime()};
};
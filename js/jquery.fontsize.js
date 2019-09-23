function fontSize(container, target, minSize, defSize, maxSize) {
	/*Editable settings*/
	var minCaption = "Make font size smaller"; //title for smallFont button
	var defCaption = "Make font size default"; //title for defaultFont button
	var maxCaption = "Make font size larger"; //title for largefont button
 
 
	//Now we'll add the font size changer interface in container
	smallFontHtml = "<a href='javascript:void(0);' class='smallFont' title='" + minCaption +"'>" + minCaption + "</a> ";
	defFontHtml = "<a href='javascript:void(0);' class='defaultFont' title='" + defCaption +"'>" + defCaption + "</a> ";
	largeFontHtml = "<a href='javascript:void(0);' class='largeFont' title='" + maxCaption +"'>" + maxCaption + "</a> ";
	//$(container).html(smallFontHtml + defFontHtml + largeFontHtml);
 
	//Read cookie &amp; sets the fontsize
	if ($.cookie != undefined) {
		var cookie = target.replace(/[#. ]/g,'');
		var value = $.cookie(cookie);
		if (value !=null) {
			$(target).css('font-size', parseInt(value));
		}
	}
 
	//on clicking small font button, font size is decreased by 1px
	$(container + " .smallFont").click(function(){ 
		curSize = parseInt($(target).css("font-size"));
		newSize = curSize - 1;
		if (newSize >= minSize) {
			$(target).css('font-size', newSize);
		} 
		if (newSize <= minSize) {
			$(container + " .smallFont").addClass("sdisabled");
		}
		if (newSize < maxSize) {
			$(container + " .largeFont").removeClass("ldisabled");
		}
		updatefontCookie(target, newSize); //sets the cookie 
 
	});
 
	//on clicking default font size button, font size is reset
	$(container + " .defaultFont").click(function(){
		$(target).css('font-size', defSize);
		$(container + " .smallFont").removeClass("sdisabled");
		$(container + " .largeFont").removeClass("ldisabled");
		updatefontCookie(target, defSize);
	});
 
	//on clicking large font size button, font size is incremented by 1 to the maximum limit
	$(container + " .largeFont").click(function(){
		curSize = parseInt($(target).css("font-size"));
		newSize = curSize + 1;
		if (newSize <= maxSize) {
			$(target).css('font-size', newSize);
		} 
		if (newSize > minSize) {
			$(container + " .smallFont").removeClass("sdisabled");
		}
		if (newSize >= maxSize) {
			$(container + " .largeFont").addClass("ldisabled");
		}
		updatefontCookie(target, newSize);
	});
 
	function updatefontCookie(target, size) { //Private function for setting cookie
		if ($.cookie != undefined) { //If cookie plugin available, set a cookie
			var cookie = target.replace(/[#. ]/g,'');
			$.cookie(cookie, size);
		} 
	}
}
(function(window){
	var	jsDebug 		= this;
	
	// Console
	var consoleReady	= typeof window.console !== 'undefined',
		consoleLog		= consoleReady ? window.console.log : function(){},
		keepAlerting	= true;
	if(!consoleReady) {
		window.console	= {log:function(){}};
	}
	jsDebug.log		= function() {
		consoleLog.apply(window.console, arguments);
	}
	jsDebug.alert	= function(error) {
		if(keepAlerting) {
			keepAlerting	= confirm(error+"\n\nContinue debug ?");
		}
	}
	jsDebug.error	= function(error) {
		if(!consoleReady) {
			alert('jsDebug: '+error);
		} else {
			jsDebug.log('jsDebug: '+error);
		}
	}
	window.console.log = function() {
		jsDebug.error('Using console could stop your script in IE');
		jsDebug.log.apply(this, arguments);
	}
	
	// Framework
	window.$	= function() {
		jsDebug.error('There is no framework attached to \'$\'');
	}
	window.jQuery	= function() {
		jsDebug.error('jQuery is not loaded');
	}
})(window);
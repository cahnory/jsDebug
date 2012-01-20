(function(window){
	var	jsDebug 		= {},
		keepAlerting	= true;
	
	// Console
	var consoleReady	= typeof window.console !== 'undefined',
		consoleMethods	= ['assert', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'trace', 'warn'],
		//s:source object, t:target object, n:method name, w:warning message 
		wrapMethod		= function(s, t, n, w) {
			var m = s[n];
			t[n]	= function() {
				m.apply(s, arguments);
			}
			s[n] = function() {
				jsDebug.warning(w);
				m.apply(s, arguments);
			}
		};
	
	if(!consoleReady) {
		window.console	= {
			assert: function() {},
			count: function() {},
			debug: function() {},
			dir: function() {},
			dirxml: function() {},
			error: function() {},
			exception: function() {},
			group: function() {},
			groupCollapsed: function() {},
			groupEnd: function() {},
			info: function() {},
			log: function() {},
			profile: function() {},
			profileEnd: function() {},
			table: function() {},
			time: function() {},
			timeEnd: function() {},
			trace: function() {},
			warn: function() {}
		};
	}
	
	jsDebug.console	= {};
	for(var i in consoleMethods) {
		wrapMethod(window.console, jsDebug.console, consoleMethods[i], 'Using console could stop your script in IE');
	}
	jsDebug.alert	= function(error) {
		if(keepAlerting) {
			keepAlerting	= confirm(error+"\n\nContinue debug ?");
		}
	}
	jsDebug.error	= function(error) {
		if(!consoleReady) {
			jsDebug.alert('jsDebug: '+error);
		} else {
			jsDebug.console.error('jsDebug: '+error);
		}
	}
	jsDebug.warning	= function(error) {
		if(!consoleReady) {
			jsDebug.alert('jsDebug: '+error);
		} else {
			jsDebug.console.warn('jsDebug: '+error);
		}
	}
	
	// Framework
	window.$	= function() {
		jsDebug.error('There is no framework attached to \'$\'');
	}
	window.jQuery	= function() {
		jsDebug.error('jQuery is not loaded');
	}
})(window);
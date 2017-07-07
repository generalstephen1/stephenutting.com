var HTML5ClickableSkin = (function()
{
	var exit_name = "Clickable Skin Exit";
	var position = "fixed";
	var background_color = "#000000";
	var _CSS_display = 'block';
	var _CSS_div_id = '_rm_dc_html5_skin_version_01';
	var _CSS_backgroundRepeat='no-repeat';
	var _CSS_backgroundPosition ='center';
	var _CSS_widht = '100%';

	var _injectBackgroundSkin = function(img)
	{
		var command = "";
		command += "if(document.getElementById('injected_javascript') == null ){";
		command += "var extJavascript = document.createElement('script');";
		command += "extJavascript.setAttribute('type', 'text/javascript');";
		command += "extJavascript.setAttribute('id', 'injected_javascript');";
		command += "extJavascript.textContent = 'var DC_backgroundSkinHtml5=(function(){var iframeName;return {init: function(name){iframeName=name;},click: function(event){document.getElementById(iframeName).contentWindow.postMessage(JSON.stringify({m:event}),\"*\");}}}());';";
		command += "document.getElementsByTagName('head')[0].appendChild(extJavascript);";
		command += "console.log(DC_backgroundSkinHtml5);"
		command += "		DC_backgroundSkinHtml5.init('"+Enabler.getParameter('varName') + ".if');";
		command += "}";
		//console.log(command);
		Enabler.invokeExternalJsFunction(command);    
	
		var H = window.screen.availHeight;
	//	var W = window.screen.availWidth;
				var W = "100%";

		var command = "";
		command += "var addedElement = document.createElement('skin');";
		command += "addedElement.setAttribute('id','"+_CSS_div_id+"');";
		command += "addedElement.setAttribute('style','padding-right: 0px; margin-right: 0px; background-image: url("+ img +"); background-repeat: "+ _CSS_backgroundRepeat +"; background-position: "+_CSS_backgroundPosition+"; background-color: " + background_color + "; display: "+_CSS_display+"; margin: auto; padding: 0px; width: "+ W +"; height:"+ H +"px; text-align: center; position:" + position + "; cursor: pointer; z-index: 0;');";
		command += "addedElement.setAttribute('onclick','DC_backgroundSkinHtml5.click(\"" + exit_name + "\")');";
		command += "var body = document.body;";
		command += "body.insertBefore(addedElement, body.firstChild);";
		//console.log('=======================');
		//console.log(command);
		Enabler.invokeExternalJsFunction(command);
	};

	return {
		init: function(img) 
		{
			if (document.getElementsByTagName("skin")[0].getAttribute("exit"))
				exit_name = document.getElementsByTagName("skin")[0].getAttribute("exit");

			if (document.getElementsByTagName("skin")[0].getAttribute("backgroundAttachment"))
				position = document.getElementsByTagName("skin")[0].getAttribute("backgroundAttachment");

			if (document.getElementsByTagName("skin")[0].getAttribute("backgroundColor"))
				background_color = document.getElementsByTagName("skin")[0].getAttribute("backgroundColor");
			
			if (document.getElementsByTagName("skin")[0].getAttribute("visible"))
				_CSS_display =(document.getElementsByTagName("skin")[0].getAttribute("visible")=='false')?'none':'block';
			
			if (document.getElementsByTagName("skin")[0].getAttribute("backgroundRepeat"))
				_CSS_backgroundRepeat = document.getElementsByTagName("skin")[0].getAttribute("backgroundRepeat");
			
			if (document.getElementsByTagName("skin")[0].getAttribute("position"))
				_CSS_backgroundPosition = document.getElementsByTagName("skin")[0].getAttribute("backgroundPosition");
				
			if (document.getElementsByTagName("skin")[0].getAttribute("widht"))
			_CSS_backgroundPosition = document.getElementsByTagName("skin")[0].getAttribute("widht");
			

			window.onmessage = function(e)
			{
				//console.log('contact');
				var data = JSON.parse(e.data);
				if (data.m == exit_name) 
				{
					Enabler.exit(exit_name);
				}
			}
		_injectBackgroundSkin(img);
		},
		updateCSSPorperty: function(property, value){
				 Enabler.invokeExternalJsFunction("document.getElementsByTagName('skin')[0].style['"+property+"']='"+value+"'");
		}
	}
}());

var enabler_is_initialized = function ()
{
	var background_image_filename = document.getElementsByTagName("skin")[0].getAttribute("backgroundImageFilename");
	HTML5ClickableSkin.init(background_image_filename);
}

if (!Enabler.isInitialized()) 
{
	Enabler.addEventListener( studio.events.StudioEvent.INIT, enabler_is_initialized);
}
else
{
	enabler_is_initialized();
}
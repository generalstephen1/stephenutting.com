/*
******************************************************
			TWEETYBYTE UTILITIES CENTER
******************************************************
*/

var App = App || {};

App.utils = App.utils || {};
App.config = App.config || {};
App.dom = App.dom || {};
App.ajax = App.ajax || {};
App.tweetProcessor = App.tweetProcessor || {};
App.colours = App.colours || {};

(function(){
	 
	  
	/**
	 * Honey I shrunk the Kids
	 * Resizes the font to input parameters for large or small values
	 *
	 * @target = the text box to be resized
	 * @opts = options used to determine new text {charMax, newSize, newPadding}
	 * 											 
	 */
    var doFontSizing = function (target, opts){
	    
	    var targetObj = domElement(target);
	    var objLength = targetObj.innerHTML.length;
	    
	    for (var i=0; i<opts.length; i++){
		    if(opts[i].charMax < objLength){
		    	
		    	targetObj.style.fontSize = opts[i].newSize;
		    	
				if(opts[i].newPadding != null){
			    	targetObj.style.padding = opts[i].newPadding + " 0";			    	
			    }	
		    	
		    	if(opts[i].altTextOpt !== null && opts[i].altTextOpt == "opt1"){
			   			var overflow = domElement(target+"Overflow");

		   				overflow.style.display = "block";
		   				overflow.style.fontSize= "1em";
		   				overflow.style.paddingBottom= opts[i].newPadding;
		   		}	
		    }
		}
    }
    
    
    
    /**
	 * Lego Movie
	 * sets up the masonry library to fit all the modules correctly on the page
	 *
	*/
	var doMasonry = function(){
		App.utils.log("utils.js || doMasonry", "grey");
		var container = document.querySelector('#theModules');

		var msnry = new Masonry(container, {
		  "isFitWidth": true,
		  itemSelector: '.stoneBlock'
		});

	}
	
	
	
	/**
	 * Big Brother
	 * Generic log function
	 *
	 * @message = Message to be logged
	 * @colour = text colour
	 * @status = decides if it is an object of just text
	 *
	*/
	var log = function(message, colour, status){
		if (App.config.isDevLink){
			if (typeof console == "object") {
				if(colour != null){
					console.log('[----] %c'+message, 'color: '+colour);
				} else {
					console.log('[----] '+message);		
				}
			}
		}
	}



	/**
	 * The Social Network
	 * handles the social engagements, copy etc
	 *
	 * @outlet = Twitter, Email, Direct, Facebook, etc
	 * @shareTarget = page or results
	*/
	var socialExit = function(outlet, shareTarget){
		App.utils.log("utils.js || socialExit: " + outlet +" || "+shareTarget);

		var copy;
		var pageLink;
		var resultSuffix;
		var gaCopy;
		var recipient = "";
		var curHref = window.location.href;
		
		//if alreaday on a results page this stops duplication of share urls
		curHref = curHref.replace("results.html?u="+App.config.globalUsername, "");
		
				
		if(outlet == "twitter"){
			if(shareTarget == "page"){
				copy = "#TweetieByte #displays your #twitter #stats in easy to swallow #bytesize chunks.";
				resultSuffix = "";
				gaCopy = 'sharePageTwitter';
				
			} else if (shareTarget == "result"){
				copy = "Oh hai there, here's my #TweetieByte";
				resultSuffix = "results.html?t="+App.config.themeType+"&u="+App.config.globalUsername;
				gaCopy = 'shareResultTwitter';
			} 
		
			window.open("http://www.twitter.com/intent/tweet/?text="+encodeURIComponent(copy)+"&url="+curHref + encodeURIComponent(resultSuffix));
			
		} else if (outlet == "e-letter"){
			
			var subjectCopy;
		
			if(shareTarget == "page"){
				subjectCopy = "Oh hai there, take a peek at TweetieByte";
				copy = "TweetieByte displays your twitter stats in easy to swallow bytesize chunks.";
				resultSuffix = "";
				gaCopy = 'sharePageELetter';
				
			} else if (shareTarget == "result"){
				subjectCopy = " Oh hai there, here's my TweetieByte";
				copy = "TweetieByte displays your twitter stats in easy to swallow bytesize chunks.";
				resultSuffix = "results.html?t="+App.config.themeType+"&u="+App.config.globalUsername;
				gaCopy = 'shareResultELetter';
				
				App.utils.log(resultSuffix, "red")
				
			} else if (shareTarget == "contact"){
				subjectCopy = "I've seen TweetieByte ….";
				copy = "Feedback always welcome!";
				recipient = "hello@tweetiebyte.com";
				resultSuffix = "";
				curHref = "";
			}
			window.location.href = "mailto:"+recipient+"?subject="+subjectCopy+"&body="+encodeURIComponent(copy)+" %0A%0A"+curHref + encodeURIComponent(resultSuffix);
		
		} else if (outlet == "direct"){
			window.open(shareTarget);
			
		}
	
		App.utils.gAnalytics(gaCopy , outlet , App.config.globalUsername.toLowerCase());
	}
	
	
	
	/**
	 * Minority Report
	 * checks to see if the string is "breaking the law" and converts it before it causes problems
	 *
	 * @target = what to validate
	*/
	var validateThis = function (target){
		var regex = new RegExp("^$|^[a-z0-9_@]+$", "i");
		var inputError = null;
		if (target == "" || !regex.test(target)){
			return false;
		}

		if (!inputError){
			return true;
		} else {
			return false;
		}

	}
	
	
	/**
	 * Matrix
	 * Changes the input into a usable format
	 *
	*/
	var editInput = function (target){
		return target.toLowerCase().replace("@", "");
	}
	
	
	
	/**
	 * The invisible Man
	 * Sets elements display to none
	 *
	 * @elementArr = an array of elements to hide
	*/
	var hideElem = function(elementArr){
		for (var i = 0; i < elementArr.length; i++){
			if(elementArr[i]){
				elementArr[i].style.display = "none";
			} else {
				App.utils.log("utils.js || hideElem || error trying to hide "+elementArr[i], "red")
			}
		}
	}
	
	
	
	/**
	 * Dawn of the Dead
	 * Sets elements display to block
	 *
	 * @elementArr = an array of elements to show
	*/
	var showElem = function(elementArr){
		for (var i = 0; i < elementArr.length; i++){
			if(elementArr[i]){
				elementArr[i].style.display = "block";
			} else {
				App.utils.log("utils.js || showElem || error trying to show element "+i+": "+elementArr[i], "red")
			}
		}
	}
	
	
	
	/**
	 * I Robot
	 * Handles the showing and hiding elements on errors
	 *
	 * @command = what kind of error
	*/
	var errorMessage = function (command){	
		
		if(command == "noInputError"){

			App.utils.showElem([
				App.dom.introLogo,
				App.dom.logoLoaderDesktop
			]);

			App.utils.hideElem([
				App.dom.instruct,
				App.dom.inputArea,
				App.dom.alfrydLoaderContainer,
				App.dom.errorWindow
			])
			
			App.dom.loaderCogMask.style.visibility = "hidden";

		} else {
			App.utils.log("utils.js || errorMessage: "+command, "red");
			App.config.allowSearch = true;
		}
		
		if(command == "inputError"){
			App.utils.log("utils.js || errorMessage: "+command, "red");	
			
			App.utils.showElem([App.dom.errorWindow]);
			
			App.utils.hideElem([
				App.dom.introLogo,
				App.dom.instruct
			]);
		}
		
		if(command == "wrongReturn"){
			App.utils.showElem([
				App.dom.errorWindow,
				App.dom.inputArea, 
				App.dom.inputModule
			]);
			App.utils.hideElem([App.dom.introLogo]);
			
			App.utils.log(App.config.resultsPage + " || "+ App.config.numInputs)
			if (App.config.resultsPage && App.config.numInputs == 0){ 	
				App.utils.addUserPlease();
			}
			//things which run on new form page
			$('#searchTwitter').on('click', App.ajax.computeHandler);
		
			//if 'enter' is hit then submit
			$(window).keydown(function(event){	
					
				if(event.keyCode == 13){
					if (App.config.allowSearch){
						App.config.allowSearch = false;
						App.ajax.computeHandler();
					}
				} 
			});
		}
		
		
	}
	
	
	
	/**
	 * White Chicks
	 * Handles the showing and hiding elements during adding and removing users
	 *
	*/
	var toggleInputStyles = function(){
		var curNum = $('.userInput').length;
	
		//if there are 4 users then remove add more button
		if( curNum >= 4) {
			App.utils.hideElem([App.dom.addUserBtn]);
		} else {
			//App.utils.showElem([App.dom.addUserBtn]);			 //-----------------------------uncomment this line to enable multi-user
		}
		
		var curNum1 = App.utils.domElement("userInput"+App.config.inputsArray[0]);
		var curRem1 = App.utils.domElement("removeUser"+App.config.inputsArray[0]);
		
		if( curNum == 1) {
			if(curNum1 != null){	curNum1.style.width = "100%";	}
			if(curRem1 != null){	App.utils.hideElem([curRem1]);	}
		} else {
			if(curNum1 != null){	curNum1.style.width = "80%";	}
			if(curRem1 != null){	App.utils.showElem([curRem1]);	}
		}
	}
	
	
	
	/**
	 * Tron
	 * Adds users at input stage
	 *
	*/
	var addUserPlease = function(){
		App.utils.log("utils.js || addUserPlease", "orange");
		App.config.incrementInput ++

		//create new div
		var newId = "input"+App.config.incrementInput;
		var newdiv = document.createElement('div');
			newdiv.setAttribute('id',newId);
			newdiv.setAttribute('class', "inputField");
		
		
		//push userinput template into div once div has been added to markup
		App.dom.inputSpace.appendChild(newdiv);
		App.config.numInputs ++;
		
		

		//App.utils.log("creating input #"+App.config.incrementInput+", with id:"+newId);
		
		var html = Handlebars.TEMPLATES.userInput(App.config.incrementInput);
			$("#"+newId).html(html);
		
		//add div name to user array
		

		App.config.inputsArray.push(App.config.incrementInput);

		//App.utils.log("App.config.inputsArray: "+App.config.inputsArray, "orange");
		
		//add listener to the removeUser segment of Input to remove selected Div
		$('#removeUser'+App.config.incrementInput).on('click', function(e){		
			removeUserPlease(e.target.attributes['data-inputnum'].value);
		});
		
		
		toggleInputStyles();
				
	}
	
	
	
	/**
	 * Wreck it Ralph
	 * handle the addition and removal of extra users
	 *
	 * @thisUser = the user to remove
	*/
	var removeUserPlease = function(thisUser){
		App.utils.log("utils.js || remove User "+thisUser+" Please", "orange");
		//remove input from DOM
		App.dom.inputSpace.removeChild(returnDOMElement("input"+thisUser));
		App.config.numInputs --;
		
		//remove reference from array
		App.config.inputsArray.indexOf("input"+thisUser);
		App.config.inputsArray.splice(App.config.inputsArray.indexOf("input"+thisUser), 1);
		
		toggleInputStyles();
	}
	
	
	
	/**
	 * Homeward Bound
	 * returns the DOM element
	 *
	 * @target = name of element
	*/
	var domElement = function(target){
		target = document.getElementById(target);
		return target;
	}
	
	
	
	/**
	 * Pans Labyrinth
	 * Here there be Dragons
	 *
	 * @p = name of element
	*/
	var getQuerystring = function(p) {
    	return new RegExp("[?&]+"+p+"=([^&$]*)", "gi").test(document.location.href) ? RegExp.$1 : "";
    };
	
	
	
	/**
	 * The Internship
	 * Google analytics if not a dev link
	 *
	 * @event = the action that triggers the analytics
	 * @label = reference to the option chosen from the trigger
	 * @uniqueID = specifics to do with the choice, input value etc. 
	*/
	var gAnalytics = function(event, label, uniqueID) {
		if(App.config.isDevLink || App.config.environment == "DEV"){
			App.utils.log("utils.js || Analytic: "+event+", "+label+", "+uniqueID, "light blue");
		} else {
			ga('send', 'event', event, label, uniqueID);
		}
    };
	
	
	
	/**
	 * Jumper
	 * Loads in themed Images
	 *
	*/
	var loadImages = function(){
		App.utils.log('loadImages');
		var images = document.getElementsByTagName('img');
		
				
		for (var i = 0; i < images.length; i++) {
			if(images[i].getAttribute('data-imgSrc')){
				images[i].setAttribute('src', './img/'+App.config.themeType+'/'+App.config.themeType+'Sprites_'+images[i].getAttribute('data-imgSrc'));
				
				//this is a little 'hack' that will force Safari to repaint the window, and make images the right size - jb
				images[i].style.display='none';
				images[i].offsetHeight;
				images[i].style.display='';
			}
			/*images[i].onload = function(){
				Ad.loadedListener.imgCounter++	
				
				if(Ad.loadedListener.imgCounter == images.length){
					Ad.loadedListener.imgLoaded = true;	
					Ad.loadedListener.launchChild();	
				}
			}*/
			
		}
	}
	
	
	var updateCSS = function(){
		App.utils.log("updateCSS ");
		
		CN = App.colours.colourNames;
		BC = App.colours.baseColor[App.config.themeType];
		
		//Finds elements with background color property and replaces
		for(var i = 0; i < CN.length; i++){
			var curArr = document.getElementsByClassName(CN[i]+"Box");
			for (var j = 0; j < curArr.length; j++){
				curArr[j].style.backgroundColor = BC[CN[i]];
			}
		}
		
		//Finds elements with color property and replaces
		for(var k = 0; k < CN.length; k++){
			var curArr = document.getElementsByClassName(CN[k]+"Text");
			for (var l = 0; l < curArr.length; l++){
				curArr[l].style.color = BC[CN[k]];
			}
		}		
		
		for(var m = 0; m <= 4; m++){
			var obj = document.getElementById('hashtag'+m);
			if(obj){
				obj.style.backgroundColor = BC.hashtagMod[m]
			}
		}
		
	}
		
	/**
	 * Catch Me if you Can
	 * switches between themes
	 *
	 * @whatTheme = theme to load in
	*/
	var switchTheme = function(whatTheme){
		App.utils.log("switchTheme "+whatTheme);
		
		App.config.themeType = whatTheme;
		
		
		App.utils.loadImages();
		App.utils.updateCss();
		
		
	}
    
    App.utils.updateCss = updateCSS;
    App.utils.switchTheme = switchTheme;
    App.utils.loadImages = loadImages;
	App.utils.log = log;    
    App.utils.gAnalytics = gAnalytics;
	App.utils.getQuerystring = getQuerystring;
	App.utils.domElement = domElement;
	App.utils.toggleInputStyles = toggleInputStyles;
	App.utils.addUserPlease = addUserPlease;
	App.utils.removeUserPlease = removeUserPlease;
	App.utils.errorMessage = errorMessage;
	App.utils.hideElem = hideElem;
	App.utils.showElem = showElem;
	App.utils.editInput = editInput;
	App.utils.validateThis = validateThis;
	App.utils.doFontSizing = doFontSizing;
	App.utils.doMasonry = doMasonry;
	App.utils.socialExit = socialExit;

})();

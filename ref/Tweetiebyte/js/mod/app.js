/*
******************************************************
			TWEETYBYTE APP CONTROLLER
******************************************************
*/

var App = App || {};

App.utils = App.utils || {};
App.config = App.config || {};
App.dom = App.dom || {}
App.handlebars = App.handlebars || {};
App.ajax = App.ajax || {};
App.tweetProcessor = App.tweetProcessor || {};
App.colours = App.colours || {};


(function(){


	App.config.isDevLink = false;
	App.config.ModuleTest = false;
	App.config.allowSearch = true;
	App.config.numUsers = 1;
	App.config.inputsArray = new Array();
	App.config.serverPackage = new Array();
	App.config.incrementInput = 0;
	App.config.themeType = '';
	
	App.colours = {
		baseColor: {
			global: 	{black:'#000', white:'#fff', lightGrey:'#666', darkGrey:'#444'},
			
			//			||	  primary	  ||	  secondary	   || 	 quaternary		 ||	  quinary   	||	  senary		||
			//			||		red		  ||	    blue	   || 	     green		 ||	  lightGreen	||	  darkGreen		||
			original: 	{primary:'#ff7373', secondary:'#4399ff', quaternary:'#3ad0d6', quinary:'#a6e2e2', senary:'#3BD0D7',
				hashtagMod: ['#a6e1e1','#b8e7e7','#caeded','#dbf3f3','#e4f6f7']
			},
			valentine:	{primary:'#ff45af', secondary:'#ed0a81', quaternary:'#a3dfff', quinary:'#ffb0e7', senary:'#f684c0', 
				hashtagMod: ['#a3dfff','#ade2ff','#c2e9ff','#d1efff','#e0f4ff']
			},
			christmas:	{primary:'#ff7373', secondary:'#4399ff', quaternary:'#3ad0d6', quinary:'#a6e2e2', senary:'#3BD0D7',
				hashtagMod: ['#a6e1e1','#b8e7e7','#caeded','#dbf3f3','#e4f6f7']
			},
		},
		colourNames: ['primary', 'secondary', 'quaternary', 'quinary', 'senary']
	}


	if(App.config.isDevLink){
		App.utils.log("//////////////////////////////////", "gray", true);
		App.utils.log("TWEETIEBYTE IS IN DEVELOPMENT MODE", "gray", true);
		App.utils.log("//////////////////////////////////", "gray", true);
		App.utils.log("", "gray", true);
		App.utils.log("App.config.isDevLink = "+App.config.isDevLink+"|| App.config.ModuleTest = "+App.config.ModuleTest, "gray", true);
		App.utils.log("", "gray", true);
	}
	
		

	/**
	 * kicks off the whole darn thing
	 *
	 * 	
	 */
	var init = function(){
		if (App.config.environment == "DEV"){
			App.config.isDevLink = true;
		}
		
		
		App.utils.log("app.js || Init", "grey");
		App.config.globalUsername = "";
		App.config.numInputs = 0;
		
		
		
		
		
		setupDom();
		

		if ($('body').data('results')==true){
			App.config.resultsPage = true;
			App.ajax.requestResult();
			
			App.utils.domElement("loaderCog").style.webkitAnimationPlayState = "running";
			
			App.utils.showElem([
				App.dom.logoLoaderDesktop,
				App.dom.loaderText
			]);
			App.utils.hideElem([
				App.dom.alfrydLoaderContainer,
				App.dom.logoText,
				App.dom.loaderCogMask
			]);

		} else {
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
		

		//TEMPLATES
		App.handlebars.registerHelpers();
		App.handlebars.loadTemplates(); //this triggers the add user input to main page

		App.utils.addEventListeners("initial");	
		
		
	}
	
	
	//
	var loadedInit = function(){
		App.utils.addUserPlease();
		App.dateLogic = new App.DateLogic();
		document.getElementById('body').style.opacity = 1;
	}
	
	
	
	/**
	 * get a reference to elements in the DOM
	 *
	 * 	
	 */	
	 var setupDom = function(){
		App.dom.container = App.utils.domElement("container");
		App.dom.container =  App.utils.domElement("container");
		App.dom.loaderText =  App.utils.domElement("loaderText");
		App.dom.logoText = App.utils.domElement("logoText");
		App.dom.loaderCog = App.utils.domElement("loaderCog");
		App.dom.loaderCogMask = App.utils.domElement("loaderCogMask");
		App.dom.instruct = App.utils.domElement("instruct");
		App.dom.inputArea = App.utils.domElement("inputArea");
		App.dom.logoLoaderDesktop = App.utils.domElement("logoLoaderDesktop");
		App.dom.alfrydLoaderContainer = App.utils.domElement("alfrydLoaderContainer");
		App.dom.inputModule = App.utils.domElement("inputModule");
		App.dom.saveBar = App.utils.domElement("saveBar");
		App.dom.header = App.utils.domElement("header");
		App.dom.errorWindow = App.utils.domElement("errors");
		App.dom.introLogo = App.utils.domElement("introLogo");
		App.dom.discalimer = App.utils.domElement("discalimer");
		App.dom.inputSpace = App.utils.domElement('inputSpace');
		App.dom.addUserBtn = App.utils.domElement("addUserBtn");
	}



	/**
	 * make sure buttons have the correct listeners
	 *
	 * 	
	 * @whatListeners = types of listeners to add										 
	 */
	var addEventListeners = function(whatListeners){
		App.utils.log("app.js || addEventListeners "+whatListeners, "grey");
		
		
				
		
		if(whatListeners == "initial"){
			$('#ssTwitterBtn').on('click', function(){App.utils.socialExit("twitter", "page")});
			$('#ssShareMeBtn').on('click', function(){App.utils.socialExit("e-letter", "page")});
			
			$('#footerTwitter').on('click', function(){App.utils.socialExit("direct", "http://www.twitter.com/tweetiebyte")});
			$('#footerMail').on('click', function(){App.utils.socialExit("e-letter", "contact")});
			
			$('#addUserBtn').on('click', App.utils.addUserPlease );
			
			$('#switchThemeBtn').on('click', function(){
				//this will link to a function that determines a bunch of stuff to switch theme. For now it just toggles
				
				App.utils.log("switch Theme Btn Clicked")
				
				if (App.config.themeType == 'christmas' || App.config.themeType == 'valentine'){
					App.config.prevTheme = App.config.themeType;
					App.utils.switchTheme('original');
				} else if (App.config.themeType == 'original'){
					App.utils.switchTheme(App.config.prevTheme);	
				}
				
				$(this).toggleClass('off');
				
				if(App.config.tweetData){
					doMapSetup(App.config.tweetData.geoModule);
					doTODayGraph(App.config.tweetData.timeOfDayModule, App.config.tweetData.dataTypeModule);
				}
			});

						
		} else if (whatListeners == "infograph"){
		
			$('#resetMeBtn').on('click', resetPlease );
			
			$('#shareEmailBtn').on('click', function(){App.utils.socialExit("e-letter", "result")});
			$('#shareTwitterBtn').on('click', function(){App.utils.socialExit("twitter", "result")});
		}

		$('.goToHome').on('click', resetPlease );
		
		

		
		/*$('#printMeBtn').on('click', function(event) {
							var w = window.open('your Tweetybyte');
								printHandler(w);
							})*/
	}
	
	
	
	/**
	 * revert to home page
	 *
	 * 	
	 */
	var resetPlease = function(){
		App.utils.log("app.js || resetPlease", "violet");
		window.location.href = ".";
	}
	
	
	App.loadedInit = loadedInit;



	/**
	 *	push results module to html2Canvas and coverts to image in new window then opens the print dialogue
	*/
	/*var printHandler = function(newWindow){
		console.log("printHandler");
		//var printSpace = domElement("container");
		var printSpace = domElement("theHTML");

		container.style.width = "1100px";

		doMasonry();

		var renderOptions = [
			allowTaint=false,
			background='#ececec',
			taintTest=false,
			useCORS = false
		]

		saveBar.style.display = "none";
		header.style.display = "none";
		printSpace.style.backgroundColor = "#ececec";


		newWindow.document.write(printSpace.innerHTML);
		//newWindow.document.close();
		newWindow.print();
		*/
		/*html2canvas(printSpace, {
			onrendered: function(canvas, renderOptions) {
				var dataURL = canvas.toDataURL("image/png");

				newWindow.document.write("<img src='"+dataURL+"' alt='from canvas'/>");
				newWindow.document.close();
				newWindow.print();


				//...
				//code pauses here for user input, upon input continue....
				//...
				saveBar.style.display = "block";
				header.style.display = "block";
				//newWindow.close();
				container.style.width = "100%";
				doMasonry();
				printSpace.style.backgroundColor = "";
       		}
        });*//*
	}*/
	
	App.utils.addEventListeners = addEventListeners;
	
	window.onload = init;
	
}());
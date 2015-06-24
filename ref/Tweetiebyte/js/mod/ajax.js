/*
******************************************************
			TWEETYBYTE AJAX CONTROLLER
******************************************************
*/

var App = App || {};

App.utils = App.utils || {};
App.config = App.config || {};
App.dom = App.dom || {}
App.handlebars = App.handlebars || {};
App.ajax = App.ajax || {};
App.tweetProcessor = App.tweetProcessor || {};


(function(){


	/**
	 * Sends direct request to twitter asking about a user, for results page
	 *
	 * @val = value if it is the results page (passed in through the href);
	 * 											 
	 */
	var requestResult = function(val){
		App.utils.log("ajax.js || requestResult", "grey");
		
		var theme = App.utils.getQuerystring('t');
		if (theme == "christmas" || theme == "original" || theme == 'valentine'){
			App.utils.switchTheme(theme);
			document.getElementById('switchThemeBtn').style.visibility = "visible";
		}
		
		var username = App.utils.getQuerystring('u');
		var url;
		
		App.utils.log("ajax.js || username: "+ username)
				
		if(App.config.isDevLink){
			///////////////////////////////////////////////////url = "../Backend/algo/testReturn.php";
			url = "../Backend/algo/tweetReturn.php";
		} else {
			console.log("App.config.isDevLink = "+App.config.isDevLink + " || App.config.environment = "+App.config.environment);
			if (App.config.environment == "PROD"){
				url = "./Backend/algo/tweetReturn.php";
			} else if (App.config.environment == "DEV"){
				///////////////////////////////////////////////////url = "../Backend/algo/testReturn.php";
				url = "../Backend/algo/tweetReturn.php";
			}
		} 
		
		App.utils.hideElem([App.dom.inputArea]);	
		
		$.ajax({
			url: url,
			dataType: "json",
			type: "GET",
			data: { twitterHandle: username },
			success: function(data){
				App.utils.log("ajax.js || Twitter has responded", "grey");
				App.loadedInit();

				App.utils.showElem([App.dom.saveBar,
									App.dom.inputArea									
									]);

				
				App.tweetProcessor.tweetProcessPlant(data);

				App.utils.domElement("loaderCog").style.webkitAnimationPlayState = "paused";
				
			},
			error: function(jqXHR, textStatus, errorThrown){
				//console.log("jqXHR " +jqXHR);
				//console.log("textStatus "+textStatus);
				//console.log("errorThrown "+errorThrown);
			}
		});
	}
	
	

	/**
	 * does something
	 *
	 * 											 
	 */
	var computeHandler = function(){
		App.utils.log("ajax.js || computeHandler || searchAvailable = "+App.config.searchAvailable, "grey");
			var errorLog = new Array();
			App.config.serverPackage = new Array();
			
			for (var i = 0; i < App.config.inputsArray.length; i++){
				
				
				App.config.serverPackage[i] = $('#twitterName'+App.config.inputsArray[i]).val();
				
				//regex check, will return false if there is an issue
				if(!App.utils.validateThis(App.config.serverPackage[i])){
					App.utils.log("error with "+App.config.serverPackage[i], "red");
					errorLog.push(App.config.inputsArray[i]);
				}		
				
			}
			
			if(errorLog.length > 0){
			
				App.utils.errorMessage("inputError");
				
				for (var i = 0; i < errorLog.length; i++){
					App.utils.domElement("userInput"+errorLog[i]).style.color = "red";
				}
	
				
			} else {
				
				var val = "";
				
				for (var i = 0; i < App.config.serverPackage.length; i++){
					if (i == 0){
						val = val + App.config.serverPackage[i];
					} else {
						val = val + ":" +App.config.serverPackage[i];
					}
				}
				
				App.config.globalUsername = val;
				computeSend(val);
				App.utils.errorMessage("noInputError");//this starts the load screen
				
	
			
		}
	}



	/**
	 * does something
	 *
	 * 	
	 * @val = something										 
	 */
	var computeSend = function(val){
		App.utils.log("ajax.js || computeSend "+val, "grey");
		
		scroll(0,0);
		
		document.getElementById("loaderCog").style.webkitAnimationPlayState = "running";
		
		App.utils.showElem([App.dom.loaderText]);
		App.utils.hideElem([App.dom.logoText]);

		//add height to push down footer
		App.dom.inputModule.style.paddingBottom = "15em";
		
		var url;
		
		//App.utils.log("App.config.environment = "+App.config.environment, "gray");
		
		if(App.config.environment == "DEV"){
			///////////////////////////////////////////////////url = "../Backend/algo/testReturn.php";
			url = "../Backend/algo/tweetReturn.php";
		} else {
			///////////////////////////////////////////////////url = "./Backend/algo/testReturn.php";
			url = "./Backend/algo/tweetReturn.php";
		}		

		$.ajax({
			url: url,
			dataType: "json",
			type: "POST",
			data: { twitterHandle: val },
			success: function(data){
				App.utils.log("app.js || Twitter has responded", "grey");
				App.tweetProcessor.tweetProcessPlant(data);
				
				/*
				console.log("                               ");
				console.log(data);
				console.log("                               ");
				*/
				document.getElementById("loaderCog").style.webkitAnimationPlayState = "paused";

			},
			error: function(jqXHR, textStatus, errorThrown, data){
				App.utils.errorMessage("ajaxError");
				App.utils.log("errorThrown: "+errorThrown, "red");
				App.utils.log("jqXHR: "+jqXHR, "red");
				App.utils.log("textStatus: "+textStatus, "red");
			}
		});
	}



	App.ajax.computeSend = computeSend;
	App.ajax.computeHandler = computeHandler;
	App.ajax.requestResult = requestResult;
	
})();
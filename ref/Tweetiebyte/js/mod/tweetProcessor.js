/*
******************************************************
			WHERE THE TWEETS ARE PROCESSED
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
	 * The great tweet factory, belching black smoke
	 *
	 * @returnData = the return from the twitter request
	 * 											 
	 */
	var tweetProcessPlant = function(returnData){
		
		
		
		App.config.errorLog = new Array();
		var usersArray = new Array();
			
		//checks multiple users for input errors. 	
		for (var user in returnData){
			
			//console.dir(returnData[user]);
			
			if(userReturnErrors(returnData[user])){
				usersArray.push(returnData[user])
			} else {
				App.utils.log("tweetProcessor.js || there is an input error with: "+user, "red");
				App.config.errorLog.push(user);	
			}
		}
		
		//if there are no input errors then initialise processing
		if(App.config.errorLog.length > 0){
			App.utils.errorMessage("wrongReturn");
		} else {
			populateTemplates();			
		}
		
		
		function populateTemplates(){
			var numReturns = 0;
			
			for (var i = 0; i < usersArray.length; i++){
				App.config.globalUsername = usersArray[i].titleModule.usrScreenName;
				var tweetData = usersArray[i];
				numReturns ++;
			}
			
			
			App.utils.showElem([
				App.dom.saveBar,
				App.dom.discalimer
			]);
			
			App.utils.hideElem([App.dom.inputModule]);
			
			App.utils.gAnalytics('Generate', 'Submit', App.utils.editInput(App.config.globalUsername));

			
			var templates = [{
					name: 'titleModule',
					dataSrc: tweetData.titleModule
				},{
					name: 'saveBar',
					dataSrc: "_blank"
				},{
					name: 'totalTweetsModule',
					dataSrc: tweetData.totalTweetsModule
				},{
					name: 'geoModule',
					dataSrc: tweetData.geoModule
				},{
					name: "followersModule",
					dataSrc: tweetData.followersModule
				},{
					name: 'tweetDayModule',
					dataSrc: tweetData.tweetDayModule
				},{	
					name:'timesRetweetedModule',
					dataSrc: tweetData.timesRetweetedModule
				},{
					name: 'hashtagModule',
					dataSrc: tweetData.hashtagModule
				},{
					name: 'popularTweetModule',
					dataSrc: tweetData.popularTweetModule
				},{
					name: 'dataTypeModule',
					dataSrc: tweetData.dataTypeModule
				},{
					name: 'inBeginningModule',
					dataSrc: tweetData.inBeginningModule
				},{
					name: 'userMentionsModule',
					dataSrc: tweetData.userMentionsModule
				},{
					name: 'tweetTimeModule',
					dataSrc: tweetData.tweetTimeModule
				},{
					name: 'timeOfDayModule',
					dataSrc: tweetData.timeOfDayModule
				}]
			
			/*
				if data is available then display each module
			*/			
			for (var i=0; i<templates.length; i++){
			
				var html = Handlebars.TEMPLATES[templates[i].name](templates[i].dataSrc);
					$('#'+templates[i].name).html(html);
					
				//console.dir(templates[i].dataSrc);
					
				if(templates[i].dataSrc == false){
					App.utils.log("tweetProcessor.js ||  " + templates[i].name+" not displaying", "red");
					
					App.utils.hideElem([
						document.getElementById(templates[i].name)
					]);
				}
				
			}
			
			App.utils.loadImages();
			App.utils.updateCss();
			
			App.config.tweetData = tweetData;
			
			doMapSetup(tweetData.geoModule);
			doTODayGraph(tweetData.timeOfDayModule, tweetData.dataTypeModule);
			
			
			
			/*
				change font size of text fields depending on the length of the field
			*/
			App.utils.doFontSizing('totalTweetResizable', [{
					charMax: 3,
					newSize: '3em',
					newPadding: '8%'
				},{
					charMax: 4,
					newSize: '2em',
					newPadding: '10%',
					altTextOpt: 'opt1'
				},{
					charMax: 6,
					newSize: '1em',
					newPadding: '10%',
					altTextOpt: 'opt1'
				},{
					charMax: 8,
					newSize: '1em',
					newPadding: '6%',
					altTextOpt: 'opt1'
			}]);
			App.utils.doFontSizing('followersResizable', [{
					charMax: 3,
					newSize: '1.5em',
					newPadding: '23%'
				},{
					charMax: 5,
					newSize: '1.1em',
					newPadding: '29%',
				},{
					charMax: 6,
					newSize: '0.9em',
					newPadding: '34%',
			}]);
			App.utils.doFontSizing('followers2Resizable', [{
					charMax: 3,
					newSize: '1.5em',
					newPadding: '23%'
				},{
					charMax: 5,
					newSize: '1.1em',
					newPadding: '29%'
				},{
					charMax: 6,
					newSize: '0.9em',
					newPadding: '34%'
			}]);
			App.utils.doFontSizing('titleModuleResizable', [{
					charMax: 10,
					newSize: '3em'
				},{
					charMax: 14,
					newSize: '2em'
			}]);
			
			App.utils.doFontSizing('tweetDayResizable', [{
					charMax: 3,
					newSize: '3em',
					newPadding: '10%'
			}]);
									
			App.utils.addEventListeners("infograph");
			
			App.utils.doMasonry();
			
		}
	}
	
	
	
	/**
	 * checks user return for errors, returns true or false.
	 *
	 * @value = the return from the twitter request
	 * 											 
	 */
	var userReturnErrors = function(user){
		if (user == "error"){
			return false;
		} else if (user == null){
			return false;
		} else if (user.titleModule.usrScreenName == false || user.titleModule.usrScreenName == null){
			return false;
		} else {
			return true;
		}
	}
	
	
	
	
	App.tweetProcessor.tweetProcessPlant = tweetProcessPlant;

	
})()
/*
******************************************************
			TWEETYBYTE HANDLEBARS STUFF
******************************************************
*/

var App = App || {};

App.utils = App.utils || {};
App.errors = App.errors || {};
App.config = App.config || {};
App.dom = App.dom || {}
App.handlebars = App.handlebars || {};
App.ajax = App.ajax || {};
App.tweetProcessor = App.tweetProcessor || {};


(function(){

	/**
	 * Get the math set up for handlebars li'l helpers
	 * 
	 *
	*/
	var registerHelpers = function(){
		App.utils.log("handlebars.js || registerHelpers", "grey");
		
		Handlebars.registerHelper("LogThis", function(Thisthing) {

  			App.utils.log("handlebars.js || logThis: "+Thisthing, "red");

  			return Thisthing;
    	});
		
  		Handlebars.registerHelper("getKey", function(index) {

  			var keysArr = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'];

  			return keysArr[index];
    	});

    	Handlebars.registerHelper("getFullDay", function(shortHand) {

  				if (shortHand == 'mon'){return 'monday';}
				if (shortHand == 'tue'){return 'tuesday';}
				if (shortHand == 'wed'){return 'wednesday';}
				if (shortHand == 'thu'){return 'thursday';}
				if (shortHand == 'fri'){return 'friday';}
				if (shortHand == 'sat'){return 'saturday';}
				if (shortHand == 'sun'){return 'sunday';}
    	});

    	Handlebars.registerHelper("getTime", function(string) {

  			if(string == "after0_before3"){return"00:00 - 03:00";}
  			if(string == "after3_before6"){return"03:00 - 06:00";}
  			if(string == "after6_before9"){return"06:00 - 09:00";}
  			if(string == "after9_before12"){return"09:00 - 12:00";}
  			if(string == "after12_before15"){return"12:00 - 15:00";}
  			if(string == "after15_before18"){return"15:00 - 18:00";}
  			if(string == "after18_before21"){return"18:00 - 21:00";}
  			if(string == "after21_before24"){return"21:00 - 00:00";}
  			
  			App.utils.log("handleBars.js getTime Error output:"+string, "red");
  			return "error";
    	});
    	
    	Handlebars.registerHelper("replaceLinks", function(string) {
			var pattern = /(HTTP:\/\/|HTTPS:\/\/)([a-zA-Z0-9.\/&?_=!*,\(\)+-]+)/gi;
			var replace = "<a class='popularTweetModuleLink quinaryText hoverBlue' target='_blank' href=\"$1$2\">$1$2</a>";
			//App.log(string.replace(pattern , replace))
			if (string){
				return string.replace(pattern , replace);
			} else {
				return "";
			}
    	});
    	
    	Handlebars.registerHelper("PlusOne", function(number){
	    	return number + 1;
    	})
    	
    	Handlebars.registerHelper('trimString', function(passedString, charMax) {			
			var theString = passedString;

    		if(passedString.length >= charMax){
			   theString = passedString.substring(0,charMax) + "...";
			} 
			
			return new Handlebars.SafeString(theString)
			
		});
    	
    	Handlebars.registerHelper('setMin', function(input, minVal) {
	    	
	    	var returnVal = input;
	    	
	    	if (returnVal < minVal || returnVal == null){
		    	returnVal = minVal;
	    	}
	    	
	    	return returnVal;
    	});
    	
    	Handlebars.registerHelper('checkZero', function(target){
	    	var temp = target;
	    	if (temp < 1){
		    	temp = "<1";
	    	}
	    	return temp;
    	});
    	
    	
    	
	}


	/**
	 * Load the Handlebars templates Ajaxily
	 * 
	 *
	*/
	var loadTemplates = function(){
		App.utils.log("handlebars.js || loadTemplates", "grey");
		Handlebars.TEMPLATES = {};

		$.ajax({
			url: 'templates.html',
			success: function(data) {
				$(data).filter('script[type="text/x-handlebars-template"]').each(function() {
					templateName = $(this).attr('id');
					Handlebars.TEMPLATES[templateName] = Handlebars.compile($(this).html());	
				});
				if (App.config.resultsPage != true){
					//App.utils.addUserPlease();
					App.loadedInit();
				}			
			}
		});
	}
	
	
	

	App.handlebars.registerHelpers = registerHelpers;
	App.handlebars.loadTemplates = loadTemplates;

}());

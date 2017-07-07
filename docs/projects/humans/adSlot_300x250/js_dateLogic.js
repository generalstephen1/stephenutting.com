var Ad = Ad || {};
Ad.dom = Ad.dom || {};
Ad.config = Ad.config || {};
Ad.dateLogic = Ad.dateLogic || {};


Ad.dateLogic.getDate = function(){

	var outcomes = {
		dayOfLive: {
			txID: "txTonight",
			vidID: "vidTonight"
		},
		beforeLive: {
			txID: "txTomorrow",
			vidID: "vidTomorrow"
		},
		dated: {
			txID: "txSunday",
			vidID: "vidSunday"
		}
	}


	var dateObj = new Date();
	var monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	//var dayArray = new Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");

	var year = dateObj.getFullYear();
	var month = monthArray[dateObj.getMonth()];
	var date = dateObj.getDate();
	//var day = dateObj.getDay();

	//console.log('Current year is: ' + year +' || Current month is: ' + month + " || Current date is: " + date + " || the day is: "+dayArray[day-1]);

	//defaults
	Ad.dateLogic.outcome = outcomes.dated

	if(year == 2015){
		if(month == "Jun"){
			if(date == 14){
				//Day of live
				Ad.dateLogic.outcome = outcomes.dayOfLive;
			} else if(date == 13){
				//Sometime before Live date
				Ad.dateLogic.outcome = outcomes.beforeLive;
			}
		}
	}
}

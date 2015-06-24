var App = App || {};
App.class = App.class || {};


App.DateLogic = function(){

	var dateObj = new Date();
	var monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

	var month = monthArray[dateObj.getMonth()];
	var date = dateObj.getDate();

	var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var day = dayArray[dateObj.getDay()];

	App.utils.log('Cur month: ' + month + " || Cur date: " + date + " || Cur day: " + day);
	
	
	if (month == 'Dec'){
		App.utils.switchTheme('christmas');
	} else if (month == 'Feb' && date >= 10 && date < 15){
		App.utils.log("")
		App.utils.log("VALENTINES DAY")
		App.utils.log("")
		App.utils.switchTheme('valentine');
	} else {
		App.utils.switchTheme('original');
		document.getElementById('switchThemeBtn').style.visibility = "hidden";
	}
	
	
}

App.colours = App.colours || {};

/*
	A SCRIPT THAT CONTROLS THE GRAPH ELEMENTS OF TWEETIEBYTE
*/

//The graph for Type of data Module
function doTODataGraph(theTODdata){
	App.utils.log("tweetieGraphs.js || doTODataGraph", "grey");
	
	var TODataCtx = document.getElementById("TypeofDataGraph").getContext("2d");
	var TODataData = [{
	        value: theTODdata.percentLinks,
	        color: chooseTODataColour(theTODdata.percentLinks),
	    },{
	        value: theTODdata.percentPhotos,
	        color: chooseTODataColour(theTODdata.percentPhotos),
	    },{
	        value: (theTODdata.percentVideo),
	        color: chooseTODataColour(theTODdata.percentVideo),
	    },{
	        value: theTODdata.percentText,
	        color: chooseTODataColour(theTODdata.percentText),
	    }]
	    
    var TODoptions = {
		    	hover : false,
			    segmentShowStroke : true,
			    segmentStrokeColor : "#fff",
			    segmentStrokeWidth : 2,
			    percentageInnerCutout : 0, 
			    animationSteps : 26,
			    animationEasing : "easeOutBounce",
			    animateRotate : true,
			    animateScale : false,
			    showTooltips: false,
    			tooltipEvents: [],
			}
	var TODPieChart = new Chart(TODataCtx).Pie(TODataData, TODoptions);
}
function chooseTODataColour(comparator){
		if (comparator < 10){
			//return '#4399FF'; //LightBlue
			return App.colours.baseColor[App.config.themeType].quaternary;
		} else if (comparator < 25){
			//return '#2F86DD'; //Blue
			return App.colours.baseColor[App.config.themeType].secondary;
		} else if (comparator < 35){
			//return '#3BD0D7'; //DarkGreen
			return App.colours.baseColor[App.config.themeType].quinary;
		} else {
			//return '#FF7373'; //red
			return App.colours.baseColor[App.config.themeType].primary;
		}
	} //#A6E2E2; //Green 
	






//The graphs for Time Of Day Module	
function doTODayGraph(theTODayData, theTODdata){
	App.utils.log("tweetieGraphs.js || doTODayGraph", "grey");
	
	var numDayChunks = theTODayData.graphSeg.day;
	var numNightChunks = theTODayData.graphSeg.night;
		
	var numChunks = 24;
	var TODayDataDay = [];
	var TODayDataNight = [];
	
	for (var i = 0; i < numChunks; i++){
		var segNum = segNumBuffer(i, numChunks);
		TODayDataDay.push({
		        value: 4.166,
		        color: segmentColour('day', segNum, numDayChunks)
		    });
	}
	
	for (var i = 0; i < numChunks; i++){
		var segNum = segNumBuffer(i, numChunks);
		TODayDataNight.push({
		        value: 4.166,
		        color: segmentColour('night', segNum, numNightChunks)
		    });
	}
	
	var TODayctxDay = document.getElementById("TypeofDataGraph1").getContext("2d");
	var TODayctxNight = document.getElementById("TypeofDataGraph2").getContext("2d");
    
	var TODayOptions = {
		    	hover : true,
			    segmentShowStroke : true,
			    segmentStrokeColor : "#fff",
			    segmentStrokeWidth : 2,
			    percentageInnerCutout : 60, // This is 0 for Pie charts
			    animationSteps : 1,
			    animationEasing : "easeOutBounce",
			    animateRotate : true,
			    animateScale : false,
			    showTooltips: false,
    			tooltipEvents: [],
			}
	    
	
	window.setTimeout(function(){	
		var TODayPieChart = new Chart(TODayctxNight).Pie(TODayDataNight, TODayOptions);
	}, 100);
	
	window.setTimeout(function(){	
		var TODayPieChart = new Chart(TODayctxDay).Pie(TODayDataDay, TODayOptions);
	}, 300);

	doTODataGraph(theTODdata);

}
	
function segmentColour(forGraph, segNum, numToFill){
	if(forGraph == 'day'){
	//	console.log("day segments - segNum "+segNum + " numToFill "+numToFill)
		if(segNum < numToFill){
			//return '#4399FF'
			return App.colours.baseColor[App.config.themeType].quaternary;
		} else {
			//return '#3BD0D7'
			return App.colours.baseColor[App.config.themeType].quinary;
		}
	} else {
	//	console.log("night segments - segNum "+segNum + " numToFill "+numToFill)
		if(segNum < numToFill){
			//return '#4399FF'
			return App.colours.baseColor[App.config.themeType].quaternary;
		} else {
			//return '#3BD0D7'
			return App.colours.baseColor[App.config.themeType].quinary;
		}
	}
}

function segNumBuffer(indexNum, numChunks){
	var bufferAmt = 5;
	var bufferValue = indexNum - bufferAmt;

	if ((indexNum - bufferAmt) < 0){
		return indexNum + (numChunks - bufferAmt);
	} else {
		return bufferValue;

	}
}
var Ad = Ad || {};
		Ad.bgVid = Ad.bgVid || {}

		Ad.bgVid.processComplete = false;

Ad.bgVid.init = function(){
	Ad.log("bgVid.init");

	Ad.config.canAutoplayVideo = false;
	Ad.bgVid.testAutoplayVideo(2000, function(){
		Ad.log("autoplay exists!")
		Ad.bgVid.getVid();
		Ad.adMain.startAd();
	},
	function(){
		Ad.log("autoplay doesn't exits")

		//TODO start360
		Ad.dom.backup360.className = "backup360";



		Ad.adMain.startAd();
	})
}




Ad.bgVid.getVid = function(){
	Ad.log("bgVid.getVid");
	/*
	var outcomes = [
		"bg360Blink",
		"bg360Shake",
	]
	*/
//	var randomNum = Ad.utils.randomNum(0, 2);
	//Ad.bgVid.outcome = outcomes[randomNum];
	Ad.bgVid.outcome = "bg360Shake";

	//Ad.log("bgVid.getRandom vid: "+outcomes[randomNum]);

	Ad.dom[Ad.bgVid.outcome].style.visibility = "visible";


	Ad.dom[Ad.bgVid.outcome].addEventListener("ended", Ad.bgVid.bgVidLoop);

}



Ad.bgVid.bgVidLoop = function(){
	Ad.log("bgVid.bgVidLoop");

	if(Ad.config.adRunning == true && Ad.config.curLoop < Ad.config.maxLoop){
		Ad.config.curLoop ++;
		Ad.dom[Ad.bgVid.outcome].play();
	}
	else {
		//Ad.utils.goTo(100, 150);
		Ad.utils.goTo(3, 200);
	}
}



Ad.bgVid.playToggle = function(command){
	Ad.log("bgVid.playToggle");
	if(Ad.config.canAutoplayVideo){
		if(Ad.dom[Ad.bgVid.outcome].paused == true && command == "play"){
				Ad.dom[Ad.bgVid.outcome].play();
		}
		else if (Ad.dom[Ad.bgVid.outcome].paused == false && command == "pause"){
			Ad.dom[Ad.bgVid.outcome].pause();
		}
	} else {
		if(command == "play"){
			superTween.run360(Ad.dom.backup360, 1, {numSteps: 32, stepSize: 305, interval: 150});
		}
		else if (command == "pause"){
			superTween.kill360(Ad.dom.backup360);
		}
	}
}

/*
 * tests to see if the current browser supports autoplay video and responds with positive and negative
 * callback functions. Relies on there being a test video present in the DOM.
 * @timeout{Number} = number in ms for how long to wait until browser responds
 * @callbackFnPos{Function} = function to call if autaplay is true
 * @callbackFnNeg{Function} = function to call if autaplay is false
*/
Ad.bgVid.testAutoplayVideo = function(timeout, callbackFnPos, callbackFnNeg){
	Ad.log("bgVid.testAutoplayVideo");
	//called on timeout or on video play, removes test video and triggers correct function
	function theTimeout(){
		//clear timeout and remove the playing event listener (so it doesnt fire later on)
		clearTimeout(Ad.config.testVidTimeout);
		Ad.dom.testVideo.removeEventListener('playing', listener);

		// remove the test video if it is in the dom (it might not have
		// actually been added yet, because of Googles RAD video implementation)
		if (Ad.dom.testVideo.parentNode){
			Ad.dom.testVideo.parentNode.removeChild(Ad.dom.testVideo);
		}

		Ad.bgVid.processComplete = true;

		if (Ad.config.canAutoplayVideo){
			callbackFnPos.call();
		} else {
			callbackFnNeg.call();
		}
	}

	//tests to see if testvideo fires the 'playing' flag
	Ad.dom.testVideo.addEventListener('playing', listener);

	function listener(){
		//when the timeout on step 1 triggers, this property will be true and nothing further will happen
		Ad.config.canAutoplayVideo = true;
		Ad.dom.testVideo.pause();
		//end test
		theTimeout();
	}

	//start test video playing & set timeout
	Ad.dom.testVideo.play();
	Ad.config.testVidTimeout = setTimeout(theTimeout, timeout)
}

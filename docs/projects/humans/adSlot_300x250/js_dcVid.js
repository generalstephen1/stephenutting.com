Ad.dcVid = Ad.dcVid || {};

/**
 * Add event listeners to the trailer video
 *
 * @method addListeners
 * @return {void}
 */
Ad.dcVid.addListeners = function(){
	Ad.log("Ad.dcVid.addListeners")

	//add the click handler on the video to actually start the video
	Ad.dom.ctaVid.addEventListener("click", Ad.dcVid.startVid);
	//for windows phones only, add an event listener to the video element itself
	Ad.dom.trailerVideo.addEventListener("click", Ad.dcVid.startVidWindows);

	Ad.dom.trailerVideo.addEventListener("play", Ad.dcVid.vidStatus);
	Ad.dom.trailerVideo.addEventListener("playing", Ad.dcVid.vidStatus);
	Ad.dom.trailerVideo.addEventListener("pause", Ad.dcVid.vidStatus);
	Ad.dom.trailerVideo.addEventListener("ended", Ad.dcVid.vidStatus);
}


/**
 * Play the trailer and remove the tint, poster and other overlays on the video
 *
 * @method startVid
 * @param {Object} e The click event
 * @return {void}
 */
Ad.dcVid.startVid = function(e){
	Ad.log('playing video. TrailerVideo: ' + Ad.dom.trailerVideo);

	super360.kill360(Ad.dom.vid360);
	Ad.dom.vid360.style.visibility = "hidden";
	Ad.dom.vid360.style.display = "none";

	Ad.utils.hide([
		Ad.dom.ctaVid,
		Ad.dom.vidPoster,
		Ad.dom.tint
	]);

	Ad.dom.trailerVideo.style.top = "0px";
	//play the vid, yo
	Ad.dom.trailerVideo.play();

	if (e.target.className == "ctaVidReplay"){
		Ad.log("counter = ctaVidReplay");
		Enabler.counter("Replay", true);
	}
	else{
		Ad.log("counter = ctaVid");
		Enabler.counter("Play with sound", true);
	}
}


/**
 * Special handling for Windows phone to play the trailer. (click events need to be directly on the video element)
 *
 * @method startVidWindows
 * @return {void}
 */
Ad.dcVid.startVidWindows = function(){
	if (navigator.userAgent.indexOf('Windows Phone') > -1){
		Ad.dom.trailerVideo.play();
	}
}


/**
 * Pauses the trailer video
 *
 * @method stopVid
 * @return {void}
 */
Ad.dcVid.stopVid = function(){
	Ad.log("pausing video");
	if (Ad.dom.trailerVideo){
		Ad.dom.trailerVideo.pause();
	}
}


/**
 * Called on video events (play, playing, paused, etc). Does different things based on the event type
 *
 * @method vidStatus
 * @param  {Object} e The event that has called this method
 * @return {void}
 */
Ad.dcVid.vidStatus = function(e){
	Ad.log("vidStatus " + e.type);

	super360.kill360(Ad.dom.vid360);
	Ad.dom.vid360.style.visibility = "hidden";
	Ad.dom.vid360.style.visibility = "hidden";
	Ad.dom.vid360.style.display = "none";

	switch(e.type){
		case 'playing':
			Ad.utils.hide([
				Ad.dom.ctaVid,
				Ad.dom.vidPoster,
				Ad.dom.tint
			]);
			Ad.dom.trailerVideo.style.top = "0px";
		break;

		case "ended":
			Ad.utils.show([
				Ad.dom.ctaVid,
				Ad.dom.vidPoster,
				Ad.dom.tint
			]);
			ctaVid.className = "ctaVidReplay";
			Ad.dom.trailerVideo.style.top = "-9999px";
		break;
	}
}

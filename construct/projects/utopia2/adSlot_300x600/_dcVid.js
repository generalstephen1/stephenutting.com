Ad.class.DcVid = function(){

	function addListeners(){
		Ad.activeVideo.addEventListener("play", vidStatus);
		Ad.activeVideo.addEventListener("playing", vidStatus);
		Ad.activeVideo.addEventListener("pause", vidStatus);
		Ad.activeVideo.addEventListener("ended", vidStatus);
	}


	function startVid(){
		console.log("[----]doStartVid. ActiveVideo: ", Ad.activeVideo.id);

		Ad.log('Hiding the video cta and the 360');
		Ad.dom.ctaVid.style.display = "none";
		Ad.dom.container360.style.display = "none";
		Ad.dom.tint.style.display = "none";
		//Ad.activeVideo.style.visibility="visible";
		Ad.activeVideo.style.top = "0px";

		Ad.activeVideo.play();
	}


	function startVidWindows(){
		if (navigator.userAgent.indexOf('Windows Phone') > -1){
			Ad.activeVideo.play();
		}
	}


	function stopVid(){
		console.log("[----]doStopVid");
		if (Ad.activeVideo){
			Ad.activeVideo.pause();
		}
	}


	function stop360(){
		Ad.dom.container360.className = "";
	}


	function start360(){
		Ad.dom.container360.className = "doTransition";
	}


	function vidStatus(e){
		console.log("[----]vidStatus ", e.type);

		switch(e.type){

			case 'playing':
				Ad.dom.ctaVid.style.display="none";
				Ad.dom.container360.style.display="none";
				Ad.dom.tint.style.display = "none";

				Ad.activeVideo.style.top = "0px";
			break;

			case "ended":
				ctaVid.className = "ctaVidReplay";
				ctaVid.style.display = "block";
				container360.style.display = "block";
				Ad.dom.tint.style.display = "block";

				Ad.activeVideo.style.top = "-9999px";
			break;

		}
	}

	return {
		addListeners: addListeners,
		startVid: startVid,
		startVidWindows: startVidWindows,
		stopVid: stopVid,
		stop360: stop360,
		start360: start360,
		vidStatus: vidStatus
	}

}

Ad.class.DateLogic = function(){

	this.showExperience = true;
	this.txId = "StartsTonight";
	this.video = "StartsTonight";
	this.reportingId = "StartsTonight";


	this.setupActiveVideo = function(){
		//set the active video by grabbing the correct video object from dom
		Ad.activeVideo = document.getElementById('vid'+ this.video);
		//add the correct reporting id onto the active video
		studio.video.Reporter.attach(this.reportingId, Ad.activeVideo);
		//add the click handler on the video to actually start the video
		Ad.dom.ctaVid.addEventListener("click", Ad.dcVid.startVid);
		Ad.dom.container360.addEventListener("click", Ad.dcVid.startVid);
		//for windows phones only, add an event listener to the video element itself
		Ad.activeVideo.addEventListener("click", Ad.dcVid.startVidWindows);

		//show the vid
		Ad.activeVideo.style.visibility = "visible";
	}


	console.log(this);
	return this;
}

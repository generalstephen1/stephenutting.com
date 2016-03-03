Ad.class.DateLogic = function(){

	var dateObject = new Date();
	var monthAarray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
	var month = dateObject.getMonth();
	var usrMonth = monthAarray[month];
	var usrDate = dateObject.getDate();

	//console.log("[----]usrMonth: "+usrMonth+". usrDate: "+usrDate);

	if(usrMonth == "Jul"){

		if(usrDate <= "7"){
			//find out more only
			this.showExperience = false;
			this.txId = "DoubleBill";
			this.video = "DoubleBill";
			this.reportingId = "DoubleBill";
		}

		if(usrDate >= "8" && usrDate <= "12"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "DoubleBill";
			this.video = "DoubleBill";
			this.reportingId = "DoubleBill";
		}

		else if(usrDate == "13"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "StartsTomorrow";
			this.video = "StartsTomorrow";
			this.reportingId = "StartsTomorrow";
		}

		else if(usrDate == "14"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "StartsTonight";
			this.video = "StartsTonight";
			this.reportingId = "StartsTonight";
		}

		else if(usrDate == "15"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "Tonight";
			this.video = "Tonight";
			this.reportingId = "Tonight";
		}

		else if(usrDate > "15"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "DoubleBill";
			this.video = "DoubleBill";
			this.reportingId = "DoubleBill";
		}

	} else{
		//find out more only
		this.showExperience = true;
		this.txId = "DoubleBill";
		this.video = "DoubleBill";
		this.reportingId = "DoubleBill";
	}



	this.setUpCta = function(){
		//correctly position the bip cta
		if (!this.showExperience){
			Ad.dom.ctaBip.style.left = "600px";
		}
	}


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


	//console.log(this);
	return this;
}

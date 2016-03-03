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
			//this.video = "standard";
		}

		if(usrDate >= "8" && usrDate <= "12"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "DoubleBill";
			//this.video = "standard";
		}

		else if(usrDate == "13"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "StartsTomorrow";
			//this.video = "standard";
		}

		else if(usrDate == "14"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "StartsTonight";
			//this.video = "standard";
		}

		else if(usrDate == "15"){
			//enter the network + find out more
			this.showExperience = true;
			this.txId = "Tonight";
			//this.video = "standard";
		}

		else if(usrDate > "15"){
			//find out more only
			this.showExperience = false;
			this.txId = "DoubleBill";
			//this.video = "standard";
		}

	} else{
		//find out more only
		this.showExperience = false;
		this.txId = "DoubleBill";
		//this.video = "standard";
	}



	this.setUpCta = function(){
		//correctly position the bip cta
		if (!this.showExperience){
			Ad.dom.ctaBip.style.left = "100px";
		}
	}


	//console.log(this);
	return this;

}

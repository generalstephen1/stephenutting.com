var Site = Site || {};
		Site.projFilter = Site.projFilter || {};


Site.projFilter.init = function(){
	Site.log("projFilter.init");

	 var projects = document.getElementsByClassName("projectCard");

	 Site.activeProjects = {}
	 for(var i = 0; i < projects.length;i++){

		 var projectName = projects[i].id;
		 var tagString = projects[i].getAttribute("data-tags");

		 Site.activeProjects[projectName] = {
			 tags: {},
			 elem: projects[i],
		 }

		 var tags = tagString.split(",");
		 for (var t = 0; t < tags.length; t++){
			 Site.activeProjects[projectName].tags[tags[t]] = true;
		 }

	 }
}


Site.projFilter.tagClick = function(e){
	var selectedTag = e.srcElement.dataset.tagname;
	var isActive = e.srcElement.dataset.active;
	var parent = e.srcElement.parentElement;

	function checkMatches(whatSet, checkVar){
		for (var card in  Site.activeProjects){
			//loop through projects tags
			for (var tag in Site.activeProjects[card].tags){
				//check if a match
				if (selectedTag == tag){
					if(whatSet == "activate"){
						Site.activeProjects[card].tags[tag] = true;
					}
					if(whatSet == "deactivate"){
						Site.activeProjects[card].tags[tag] = false;
					}
				}
			}
		}
	}

	//check if we are toggling on or off
	if(isActive == "false"){
		Site.log("activating "+selectedTag)
		e.srcElement.setAttribute("data-active", true)
		parent.className = "tagFilterElem selected";
		checkMatches("activate", false);
	}
	else {
		Site.log("deactivating "+selectedTag)
		e.srcElement.setAttribute("data-active", false)
		parent.className = "tagFilterElem";
		checkMatches("deactivate", true);
	}

	for (var card in  Site.activeProjects){
		var showCard = false;

		//loop through projects tags
		for (var tag in Site.activeProjects[card].tags){
			//check if a match
			if(Site.activeProjects[card].tags[tag] == true){
				showCard = true;
			}
		}

		if(!showCard){
			Site.activeProjects[card].elem.style.display = "none";
		}
		else {
			Site.activeProjects[card].elem.style.display = "block";
		}
	}

	Site.siteMain.doMasonry()
}

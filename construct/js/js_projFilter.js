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
			 tags: tagString.split(","),
			 elem: projects[i],
			 active: true
		 }
	 }

}


Site.projFilter.tagClick = function(e){
	var selectedTag = e.srcElement.dataset.tagname;
	var isActive = e.srcElement.dataset.active;


	function checkMatch(whatSet, checkVar){
		for (var card in  Site.activeProjects){
			//checking if already active/inactive
			if(Site.activeProjects[card].active == checkVar){
				//loop through projects tags
				for (var i = 0;i<Site.activeProjects[card].tags.length; i++){
					//check if tag matches selected tag
					if (selectedTag == Site.activeProjects[card].tags[i]){
						//there is a match, show project card
						if(whatSet == "activate"){
							Site.log("activating card "+card);
							Site.activeProjects[card].active = true;
							Site.activeProjects[card].elem.style.display = "block";
						}
						if(whatSet == "deactivate"){
							Site.log("deactivating card "+card);
							Site.activeProjects[card].active = false;
							Site.activeProjects[card].elem.style.display = "none";
						}
					}
				}
			}
		}
	}

	//check if we are toggling on or off
	if(isActive == "false"){
		Site.log("activating "+selectedTag)
		e.srcElement.setAttribute("data-active", true)
		checkMatch("activate", false);
	}
	else {
		Site.log("deactivating "+selectedTag)
		e.srcElement.setAttribute("data-active", false)
		checkMatch("deactivate", true);
	}


	Site.siteMain.doMasonry()
}

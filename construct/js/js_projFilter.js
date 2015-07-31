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


	for (var card in  Site.activeProjects){
		var pass = false;
		for(var i = 0; i < Site.activeProjects[card]["tags"].length; i++){
			if(Site.activeProjects[card].active){
				Site.log("testing if "+selectedTag+" = "+Site.activeProjects[card].tags[i]+"?")
				if(selectedTag == Site.activeProjects[card].tags[i]){
					Site.log("Success")
					pass = true;
				}
			}
		}

		if(!pass){
			Site.log(card+" failed "+Site.activeProjects[card].tags+" vs "+selectedTag)
			Site.activeProjects[card].elem.style.display = "none";
			Site.activeProjects[card].active = false;
		}
	}


	Site.siteMain.doMasonry()

}

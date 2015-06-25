var Site = Site || {};
    Site.siteMain = Site.siteMain || {};
    Site.dom = Site.dom || {};


Site.siteMain.pageLoad = function(){
	Site.log("siteMain.pageLoad");

	Site.siteMain.loadDom();
  Site.handlebars.init();

}

Site.siteMain.templateLoad = function(){
  Site.log("siteMain.templateLoad");

  for (var i = 0; i < Site.projectObj.length; i++){
    var html = Site.handlebars.TEMPLATES[Site.projectObj[i].blockSize+"ProjectTemplate"](Site.projectObj[i]);
    $('#projectCards').append(html);
  }

  //start masonry
}


Site.siteMain.loadDom = function(){

	var elems = [
		"siteMain",
    "projectCards",
	]

	//get global references to DOM objects
	for(var i = 0; i < elems.length; i++){
		Site.dom[elems[i]] = document.getElementById(elems[i])
	}

}



window.onload = Site.siteMain.pageLoad;

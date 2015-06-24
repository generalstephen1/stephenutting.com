var Site = Site || {};
    Site.siteMain = Site.siteMain || {};
    Site.dom = Site.dom || {};


Site.siteMain.pageLoad = function(){
	Site.log("siteMain.pageLoad");

	Site.siteMain.loadDom();

}


Site.siteMain.loadDom = function(){

	var elems = [
		"siteMain",
	]

	//get global references to DOM objects
	for(var i = 0; i < elems.length; i++){
		Site.dom[elems[i]] = document.getElementById(elems[i])
	}

}



window.onload = Site.siteMain.pageLoad;

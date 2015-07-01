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

  var images = document.getElementsByTagName("img");
  var numImages = images.length;
  var imagesLoaded = 0;
  for(var i = 0; i < numImages; i++){
    var newSrc = images[i].getAttribute("data-src");
        images[i].src = newSrc;
        images[i].onload = function(){
          imagesLoaded ++;
          if (imagesLoaded == numImages){
            Site.siteMain.imageLoad();
          }
        }
  }
}

Site.siteMain.imageLoad = function(){
  Site.log("siteMain.imageLoad");

  var gridWidth = document.getElementsByClassName('projectCard')[0].offsetWidth;
  Site.log(gridWidth)

  var elem = document.querySelector('#projectCards');
  var msnry = new Masonry( elem, {
    // options
    itemSelector: '.mGrid',
    columnWidth: 10,
    
  });
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

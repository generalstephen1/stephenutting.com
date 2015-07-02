var Site = Site || {};
    Site.siteMain = Site.siteMain || {};
    Site.dom = Site.dom || {};


/* NOTES & TODO
     breakpoints @ 480, 640, 960

*/


/**
 * Triggered on page load, starts loading DOM and handlebars
 */
Site.siteMain.pageLoad = function(){
	Site.log("siteMain.pageLoad");

	Site.siteMain.loadDom();
  Site.handlebars.init();
}


/**
 * Loading template file, setting current templates
 */
Site.siteMain.templateLoad = function(){
  Site.log("siteMain.templateLoad");
  $.ajax({
    url: "projects.json",
    success: function(data){
      Site.log(data);
      Site.projectObj = data.projects;
      Site.siteMain.projectLoad();
    }
  });
}


/**
 * Populate templates and put on page then initiate page-load
 */
Site.siteMain.projectLoad = function(){
  Site.log("siteMain.projectLoad");

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
            Site.siteMain.doMasonry();
          }
        }
  }

  Site.dom.$projectCards = document.querySelector('#projectCards');
  Site.msnry = new Masonry( Site.dom.$projectCards, {
    itemSelector: '.mGrid',
  });

}


/**
 * Once images have loaded initiate Masonry to place them
 */
Site.siteMain.doMasonry = function(){
  Site.log("siteMain.doMasonry");
  Site.msnry = new Masonry( Site.dom.$projectCards, {
    itemSelector: '.mGrid',
    columnWidth: 1,
    gutter: 0
  });
}


/**
 * Gives a reference to DOM elements
 */
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

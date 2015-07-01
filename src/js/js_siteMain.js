var Site = Site || {};
    Site.siteMain = Site.siteMain || {};
    Site.dom = Site.dom || {};


/* NOTES
  image sizes:
    HOME mob full width  reg 480x200
         mob full width  sml 480x200

*/


Site.siteMain.pageLoad = function(){
	Site.log("siteMain.pageLoad");

	Site.siteMain.loadDom();
  Site.handlebars.init();

}

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
            Site.siteMain.imageLoad();
          }
        }
  }

  Site.dom.$projectCards = document.querySelector('#projectCards');
  Site.msnry = new Masonry( Site.dom.$projectCards, {
    itemSelector: '.mGrid',
  });

}


Site.siteMain.imageLoad = function(){
  Site.log("siteMain.imageLoad");

  Site.siteMain.doMasonry();






  //
}

Site.siteMain.doMasonry = function(){
  Site.log("siteMain.doMasonry");

  var columns    = 3,
  setColumns = function() { columns = $( window ).width() > 640 ? 3 : $( window ).width() > 320 ? 2 : 1; };

  //Site.dom.$projectCards = document.querySelector('#projectCards');
  window.addEventListener("resize", setColumns);

  Site.msnry = new Masonry( Site.dom.$projectCards, {
    itemSelector: '.mGrid',
    columnWidth:  function( containerWidth ) { return containerWidth / columns; }
  });

/*
  Site.dom.$projectCards = document.querySelector('#projectCards');
  Site.msnry = new Masonry( Site.dom.$projectCards, {
    itemSelector: '.mGrid',
  });
*/
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

var Site = Site || {};
    Site.siteMain = Site.siteMain || {};

    /**
     * Main Site initialisation and control script
     *
     * @class Site.siteMain
     */



/**
 * Main load sequence, ajax template loader, populator and initialiser
 *
 * @method loadSeq
 * @param {String} whatStep Command to enact
 * @return {void}
 */
Site.siteMain.loadSeq = function(whatStep){
  Site.log("loadSeq "+whatStep);
  switch(whatStep){
    case "init":

      //TODO show loader

      Site.siteMain.loadDom();
      Site.siteMain.loadSeq("imageLoad");
      Site.projFilter.init();
      break;

    case "imageLoad":
      Site.globalListeners.addListeners();
      Site.utils.politeLoadImg(function(){
        Site.siteMain.loadSeq("deploy");
      })
      break;

    case "deploy":

      //TODO stop and hide loader

      Site.siteMain.doMasonry();

      //this will animate on the individual cards
      for (var project in Site.activeProjects){
        TweenLite.to(
          Site.activeProjects[project].elem,
          0,
          {
            rotationX:90,
            transformOrigin:"left top",
          }
        )
      }

      break;
  }
}


/**
 * Triggers Masonry
 *
 * @method doMasonry
 * @return {void}
 */
Site.siteMain.doMasonry = function(){
  Site.log("siteMain.doMasonry");
  Site.dom.$projectCards = document.querySelector('#projectCards');
  Site.msnry = new Masonry(Site.dom.$projectCards, {
    itemSelector: '.mGrid',
    columnWidth: 1,
    gutter: 0
  });
}


/**
 * Gives a reference to DOM elements
 *
 * @method loadDom
 * @return {void}
 */
Site.siteMain.loadDom = function(){

  Site.domClass = {}
  Site.dom = {}

	var elems = [
		"siteMain",
    "projectCards",
    "globalHeader",
    "globalLogoLrg",
    "globalLogoSml"
	]

  var classes = [
    "regImg",
    "lrgImg",
    "xLrgImg"
  ]

  for(var j = 0; j < classes.length; j++){
    Site.domClass[classes[j]] = document.getElementsByClassName(classes[j])
  }

	//get global references to DOM objects
	for(var i = 0; i < elems.length; i++){
		Site.dom[elems[i]] = document.getElementById(elems[i])
	}
}


/**
 * Once images have loaded initiate Masonry to place them
 *
 * @method windowResize
 * @return {void}
 */
Site.siteMain.windowResize = function(){
  var windowWidth = window.innerWidth;
  if (windowWidth <= 640){
    if (windowWidth <= 480){

    } else {
      for(var i = 0; i < Site.domClass.regImg.length; i++){
        //Site.domClass.regImg[i].src =
      }
    }
  }
}


window.onload = function(){
  Site.siteMain.loadSeq("init");
}

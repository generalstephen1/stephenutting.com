var Site = Site || {};
    Site.projectMain = Site.projectMain || {};

    /**
     * Main Site initialisation and control script
     *
     * @class Site.projectMain
     */



/**
 * Main load sequence, ajax template loader, populator and initialiser
 *
 * @method loadSeq
 * @param {String} whatStep Command to enact
 * @return {void}
 */
Site.projectMain.loadSeq = function(whatStep){
  Site.log("loadSeq "+whatStep);
  switch(whatStep){
    case "init":
      Site.projectMain.loadDom();
      Site.projectMain.loadSeq("imageLoad");
      break;

    case "imageLoad":

      var images = document.getElementsByTagName("img");
      var numImages = images.length;
      var imagesLoaded = 0;

      for(var i = 0; i < numImages; i++){
        var newSrc = images[i].getAttribute("data-src");
          images[i].src = newSrc;
          images[i].onload = function(){
            imagesLoaded ++;
            if (imagesLoaded == numImages){
              //all images loaded
            }
          }
      }

      Site.globalListeners.addListeners();
      break;
  }
}



/**
 * Gives a reference to DOM elements
 *
 * @method loadDom
 * @return {void}
 */
Site.projectMain.loadDom = function(){

  Site.domClass = {}
  Site.dom = {}

	var elems = [
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
Site.projectMain.windowResize = function(){
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
  Site.projectMain.loadSeq("init");
}

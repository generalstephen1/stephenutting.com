var Site = Site || {};
    Site.siteMain = Site.siteMain || {};

    /**
     * Main Site initialisation and control script
     *
     * @class Site.siteMain
     */


/* NOTES & TODO
     breakpoints @ 480, 640, 960

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
      Site.siteMain.loadDom();
      Site.handlebars.init();
      break;

    case "templates":
      $.ajax({
        url: "projects.json",
        success: function(data){
          Site.projectObj = data.projects;
          Site.siteMain.loadSeq("projects");
        }
      });
      break;

    case "projects":
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
      Site.siteMain.loadSeq("listeners");
      break;

    case "listeners":
      //window.addEventListener("resize", Site.siteMain.windowResize);
      window.addEventListener("scroll", Site.siteMain.scrollChange);
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
  Site.msnry = new Masonry( Site.dom.$projectCards, {
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
    "homepageHeader"
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
 * When the user scrolls
 *
 * @method scrollChange
 * @param {MouseEvent} e Event return
 * @return {void}
 */
Site.siteMain.scrollChange = function(e){
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  if (top >= 50){
    Site.dom.homepageHeader.style.height = "50px"
  }
  else {
    Site.dom.homepageHeader.style.height = "400px"
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

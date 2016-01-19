var Site = Site || {};
    Site.globalListeners = Site.globalListeners || {};





Site.globalListeners.addListeners = function(){
	window.addEventListener("scroll", Site.scrollControl.scrollChange);

  var tagDots = document.getElementsByClassName("tagDotOuter");
  for(var i = 0; i < tagDots.length; i++){
    tagDots[i].addEventListener("click", Site.projFilter.tagClick);
  }
};

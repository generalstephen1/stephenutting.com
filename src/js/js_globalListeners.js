var Site = Site || {};
    Site.globalListeners = Site.globalListeners || {};





Site.globalListeners.addListeners = function(){
	window.addEventListener("scroll", Site.scrollControl.scrollChange);
}

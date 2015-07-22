var Site = Site || {};
    Site.headerControl = Site.headerControl || {};





Site.headerControl.shrinkHeader = function(){
	Site.dom.globalHeader.style.height = "50px"
	Site.dom.globalLogoLrg.style.opacity = "0"
	Site.dom.globalLogoSml.style.opacity = "1"
}

Site.headerControl.enlargeHeader = function(){
	Site.dom.globalHeader.style.height = "400px"
	Site.dom.globalLogoLrg.style.opacity = "1"
	Site.dom.globalLogoSml.style.opacity = "0"
}

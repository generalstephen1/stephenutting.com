var Site = Site || {};
    Site.headerControl = Site.headerControl || {};


Site.headerControl.shrinkHeader = function(){
	Site.dom.globalHeader.style.height = "50px";
	Site.dom.globalLogoLrg.style.display = "none";
	Site.dom.globalLogoSml.style.opacity = "1";
};

Site.headerControl.enlargeHeader = function(){
	Site.dom.globalHeader.style.height = "22em";
	Site.dom.globalLogoLrg.style.display = "inline-block";
	Site.dom.globalLogoSml.style.opacity = "0";
};

var Site = Site || {};
    Site.animation = Site.animation || {};


/**
 * Animates in the project cards on teh home page if scrollpoint has reached them
 *
 * @method projectCards
 * @param {Number} top Scroll position from the top of the page
 * @return {void}
 */
Site.animation.projectCards = function(top){
	for (var project in Site.activeProjects){
		var projTop = Site.activeProjects[project].elem.offsetTop;

		var projectTL = new TimelineLite();

		if(projTop < (top + 150)){
			projectTL.to(
          Site.activeProjects[project].elem,
          1,
          {
            rotationX:0,
            y: 0,
            opacity: 1,
            transformOrigin:"center top",
            transformPerspective: -200
          },
          "+=0.5", "sequence"
        );
    	// Site.activeProjects[project].elem.style.opacity = 1;
		}
	}
};
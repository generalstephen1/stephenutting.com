var Site = Site || {};
    Site.scrollControl = Site.scrollControl || {};




/**
 * When the user scrolls
 *
 * @method scrollChange
 * @param {MouseEvent} e Event return
 * @return {void}
 */
Site.scrollControl.scrollChange = function(e){
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

  if (top >= 50){
		Site.headerControl.shrinkHeader();
  }
  else {
		Site.headerControl.enlargeHeader();
  }

  Site.animation.projectCards(top);
}

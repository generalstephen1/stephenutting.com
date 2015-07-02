var Site = Site || {};
    Site.handlebars = Site.handlebars || {};




Site.handlebars.init = function(){
	Site.log("handlebars.init");

	Site.handlebars.TEMPLATES = {};

	$.ajax({
		url: 'templates.html',
		success: function(data) {
			$(data).filter('script[type="text/x-handlebars-template"]').each(function() {
				templateName = $(this).attr('id');
				Site.handlebars.TEMPLATES[templateName] = Handlebars.compile($(this).html());
			});
			//Site.siteMain.templateLoad();
      Site.siteMain.loadSeq("templates");
		}
	});
}

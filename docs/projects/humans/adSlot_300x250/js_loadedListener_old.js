var Ad = Ad || {};
Ad.dom = Ad.dom || {};
Ad.config = Ad.config || {};
Ad.loadedListener = Ad.loadedListener || {};
Ad.dateLogic = Ad.dateLogic || {};

  /* * * * * * * * * * * * * * * * * * *
	 * LOADED LISTENER
	 */

	/*
	 *	Global ad config
	 */
	Ad.config = {
		width: 300,
		height: 250,
		debugMode: true,
		adRunning: true,
		onloadFired: false,
		isIE9: false,
		stepTimer: null,
		fadeSpeed: 0.4,
		maxLoop:1,
		curLoop: 1
	};

	Ad.loadedListener = {
		imgCounter: 0,
		cssCounter: 0,
		cssLoaded:false,
		jsLoaded:false,
		imgLoaded:false,
		jsTimeout: null,
		loadTimer: null,
		curTime:0,
		maxTime: 10000, //time it takes to revert to gif etc
		adTimeout: false
	}


	/*
	 * names of the external CSS scripts for Child ("css_" and ".css" are added automatically.)
	*/
	Ad.loadedListener.externalCSS = [
	];
	/*
	 * names of the external JS scripts for Child ("js_" and ".js" are added automatically.)
 	 * please make sure these are the same as the names of the classes.
	*/
	Ad.loadedListener.externalJS = [
	];


	/*
	*	This runs once enabler has initialised and ultimately runs the windowLoaded function
	*/
	Ad.loadedListener.start = function(){
		if (Ad.config.onloadFired == true){
			Ad.loadedListener.injectChild();
		} else {
			window.addEventListener('load', function(){
				Ad.config.onloadFired = true;
				Ad.loadedListener.injectChild();
			});
		}
	}


	Ad.loadedListener.log = function(msg){
		if (window.console && typeof console === "object" && window.console.log){
			console.log(msg);
		}
	}


	/*
	*	the script that injects the auxillary elements and scripts into the DOM
	*/
	Ad.loadedListener.injectChild = function(){

		Ad.loadedListener.traceTime();

		Ad.loadedListener.loadedJS = Ad.loadedListener.externalJS.slice(0);


		var images = document.getElementsByTagName('img');


		for (var i = 0; i < images.length; i++) {

			var newSrc = images[i].getAttribute('data-src');

			images[i].setAttribute('src', newSrc);

			images[i].onload = function(){
				Ad.loadedListener.imgCounter++

				if(Ad.loadedListener.imgCounter == images.length){
					Ad.loadedListener.imgLoaded = true;
					Ad.loadedListener.launchChild();
				}
			}
		}

		/*
		* LOADING CSS SCRIPTS
		*/
		if(Ad.loadedListener.externalCSS.length){
			for (var i = 0; i <  Ad.loadedListener.externalCSS.length; i++){
				var newCSS = "css_"+Ad.loadedListener.externalCSS[i]+".css";
					var stylesheet = document.createElement('link');
						stylesheet.setAttribute('rel', 'styleSheet');
						stylesheet.setAttribute('href', newCSS);
						stylesheet.setAttribute('type', "text/css");

					document.getElementsByTagName('head')[0].appendChild(stylesheet);

					if (stylesheet.onload){
						stylesheet.onload = function(){
							Ad.loadedListener.cssCounter++
							if (Ad.loadedListener.cssCounter == Ad.loadedListener.externalCSS.length){
								Ad.loadedListener.cssLoaded = true;
								Ad.loadedListener.launchChild();
							};
						}
					}
					else { // FOR ANDROID DEVICES WITHOUT ONLOAD CAPABILITIES || TODO, FIGURE OUT BETTER WAY TO DO THIS
						Ad.loadedListener.cssLoaded = true;
						Ad.loadedListener.launchChild();
					}
			}
		}
		else {
			Ad.loadedListener.cssLoaded = true;
			Ad.loadedListener.launchChild();
		}

		/*
		 * LOADING JS SCRIPTS
		*/
		if (Ad.loadedListener.externalJS.length){
			for (var i = 0; i < Ad.loadedListener.externalJS.length ; i++){
				var script = document.createElement('script');
					script.setAttribute('src', "js_"+Ad.loadedListener.externalJS[i]+".js");
					script.setAttribute('type', "text/javascript");

					Ad.loadedListener.externalJS[i] = Ad.loadedListener.externalJS[i].replace(".min", "");

				document.getElementsByTagName('body')[0].appendChild(script);

				if (script.onload){
					script.onload = function(){
						Ad.loadedListener.jsOnload();
					};
					script.onerror = function(){
					}
				}
				else {
					Ad.loadedListener.jsOnload();
				}
			}
		}
		else {
			Ad.loadedListener.jsLoaded = true;
			Ad.loadedListener.launchChild();
		}
	}



	/*
	* onload function for JS files, figuring out if they've been parsed rather than just loaded.
	*
	*/
	Ad.loadedListener.jsOnload = function(){

		clearTimeout(Ad.loadedListener.jsTimeout);

		for (var j = 0; j < Ad.loadedListener.loadedJS.length; j++){

			var remMin = Ad.loadedListener.externalJS[j].replace(".min", "");
			var tempID = Ad.loadedListener.loadedJS[j];

			if (Ad[remMin]){
				Ad.loadedListener.loadedJS.splice(Ad.loadedListener.loadedJS[j], 1);
			}
		}

		if (Ad.loadedListener.loadedJS.length == 0 && !Ad.loadedListener.jsLoaded){
			Ad.loadedListener.jsLoaded = true;
			Ad.loadedListener.launchChild();
			clearTimeout(Ad.loadedListener.jsTimeout);
		}
		else {
			Ad.loadedListener.jsTimeout = setTimeout(Ad.loadedListener.jsOnload, 10);
		}
	}



	/*
	* One last check that everything is in order, and the big red button
	* to launch the 'child' files
	*
	*/
	Ad.loadedListener.launchChild = function(){
		if (Ad.loadedListener.imgLoaded && Ad.loadedListener.cssLoaded && Ad.loadedListener.jsLoaded && !Ad.loadedListener.adTimeout){

			clearTimeout(Ad.loadedListener.loadTimer);
			Enabler.loadModule(studio.module.ModuleId.VIDEO, function(){
				stopAndHideLoader();
				Ad.adMain.init()
			});
		}
	}



	/*
	* Code runs if it takes too long to load assets.... could be used to show backup?
	*
	*/
	Ad.loadedListener.loadTimeout = function(){

		Ad.loadedListener.adTimeout = true;

		clearTimeout(Ad.loadedListener.jsTimeout);

		Ad.loadedListener.log("");
		Ad.loadedListener.log("there was a problem loading external files");
		Ad.loadedListener.log("img:"+Ad.loadedListener.imgLoaded+" || css:"+Ad.loadedListener.cssLoaded+" || js:"+Ad.loadedListener.jsLoaded);
		Ad.loadedListener.log("");


		clearTimeout(Ad.loadedListener.loadTimer);


		stopAndHideLoader();
		var backup = document.createElement("div");
				backup.setAttribute("class", "backupGif");

		document.getElementsByTagName("body")[0].appendChild(backup);

		document.getElementById("coverallBtn").addEventListener('click', function(){
			Enabler.exit('bipExit');
		});
	}



	/*
	*	Traces the time that the ad hasn't loaded
	*/
	Ad.loadedListener.traceTime = function(){

		Ad.loadedListener.curTime += 100;
		Ad.loadedListener.log('Ad.loadedListener.curTime: ', Ad.loadedListener.curTime);


		if(Ad.loadedListener.curTime >= Ad.loadedListener.maxTime){
			Ad.loadedListener.loadTimeout();
		}
		else {
			Ad.loadedListener.loadTimer = setTimeout(function(){Ad.loadedListener.traceTime();}, 100);
		}
	}

	/*
	*	Listen for the enabler initialising
	*/
	if (!Enabler.isInitialized()) {
		Enabler.addEventListener(studio.events.StudioEvent.INIT, Ad.loadedListener.start);
	}
	else {
		Ad.loadedListener.start();
	}

	/*
	*	Listen for the window loading
	*/
	// window.addEventListener('load', function(){
		// Ad.loadedListener.log('Window loaded');
		Ad.config.onloadFired = true;
	// });

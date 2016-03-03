var Ad = Ad || {};	// global ad config	Ad.config = {		width: 300,		height: 250,		//animInSpeed: 0.5,		//animInEase: "Back.easeOut",		//animOutSpeed: 0.4,		//animOutEase: "Expo.easeOut",		debugMode: true,		adRunning: true	};	// all dom elements in here please	Ad.dom = Ad.dom || {};	//classes - eyeMove, eyeBreakup, etc	Ad.class = Ad.class || {};	Ad.start = function(){		Ad.log("Ad.start");		imagesLoaded( document.querySelectorAll('img'), function(instance){			stopAndHideLoader();			//do the ad			Ad.init();			Ad.doStep(1);		});	}	Ad.init = function(){		//set up objects		Ad.mouseChase = new Ad.class.MouseChase();		Ad.eyeBreakdown = new Ad.class.EyeBreakdown();		Ad.dateLogic = new Ad.class.DateLogic();		//set up dom objects for overall class divs		Ad.dom.mouseChase = document.getElementById('mouseChase');		Ad.dom.eyeBreakdown = document.getElementById('eyeBreakdown');		Ad.dom.endFrame = document.getElementById('endFrame');		//misc		Ad.dom.slicesHolder = document.getElementById('slicesHolder');		Ad.dom.coverallBtn = document.getElementById('coverallBtn');		//endframe's		Ad.dom.strapline = document.getElementById('strapline');		Ad.dom.lockup = document.getElementById('lockup');		//tx's		Ad.dom.txDoubleBill = document.getElementById('txDoubleBill');		Ad.dom.txStartsTomorrow = document.getElementById('txStartsTomorrow');		Ad.dom.txStartsTonight = document.getElementById('txStartsTonight');		Ad.dom.txTonight = document.getElementById('txTonight');		//ctas		Ad.dom.ctaExperience = document.getElementById('ctaExperience');		Ad.dom.ctaBip = document.getElementById('ctaBip');		Ad.dateLogic.setUpCta();		//set up a specific exit for the web experience		Ad.dom.ctaExperience.addEventListener('click', function(){			Ad.killAll();			Enabler.exit('experienceExit');		});		//set up default exit		Ad.dom.coverallBtn.addEventListener('click', function(){			Ad.killAll();			Enabler.exit("bipExit")		});	}	Ad.doStep = function(whatStep){		//console.log("[----]whatStep = "+whatStep);		switch(whatStep){			case 1:				//do eye movement				Ad.mouseChase.start();				Ad.goTo(2, 2000);			break;			case 2:				Ad.mouseChase.stop();				Ad.goTo(3, 50);			break;			case 3:				Ad.mouseChase.hide();				//do eye breakdown				Ad.eyeBreakdown.start();				Ad.goTo(4, 500);			break;			case 4:				Ad.eyeBreakdown.stop();				Ad.eyeBreakdown.hide();				Ad.mouseChase.show();				//Ad.mouseChase.expandPupil()				//Ad.eyeBreakdown.swooshOff();				Ad.goTo(5, 600);			break;			case 5:				Ad.mouseChase.hide();				Ad.eyeBreakdown.restart();				Ad.goTo(6, 200);			break;			case 6:				if (Ad.dateLogic.showExperience){					Ad.dom.ctaExperience.style.display = "block";				}				Ad.eyeBreakdown.stop();				Ad.eyeBreakdown.hide();				Ad.dom.endFrame.style.display = "block";				TweenLite.to(Ad.dom.strapline, 0.4, {opacity: 1});				TweenLite.to(Ad.dom.lockup, 0.4, {opacity: 1, delay: 0.4});				//show active cta				TweenLite.to(Ad.dom['tx' + Ad.dateLogic.txId], 0.2, {opacity: 1, delay: 0.8});				//show or hide experience cta				if (Ad.dateLogic.showExperience){					TweenLite.to(Ad.dom.ctaExperience, 0.4, {opacity: 1, delay: 1.2});				}				TweenLite.to(Ad.dom.ctaBip, 0.4, {opacity: 1, delay: 1.6});			break;		}	}	Ad.goTo = function(step, duration){		stepTimer = setTimeout(function(){			if (Ad.config.adRunning){				Ad.doStep(step);			}		}, duration);	}	Ad.killAll = function(){		//stop stepTimer		Ad.config.adRunning = false;		//stop/hide mousechase		Ad.mouseChase.stopDead();		Ad.mouseChase.hide();		//stop/hide eyebreakdown		Ad.eyeBreakdown.stop();		Ad.eyeBreakdown.hide();		//show endframe immeditely		Ad.dom.endFrame.style.display = "block";		Ad.dom.strapline.style.opacity = 1;		Ad.dom.lockup.style.opacity = 1;		Ad.dom['tx' + Ad.dateLogic.txId].style.opacity = 1;		Ad.dom.ctaBip.style.opacity = 1;		if (Ad.dateLogic.showExperience){			Ad.dom.ctaExperience.style.opacity = 1;		}	}	Ad.log = function(message){		if (Ad.config.debugMode){			//console.log("[----] "+message);		}	}	if (!Enabler.isInitialized()) {		 //console.log("[----]waiting for enabler")		 Enabler.addEventListener(studio.events.StudioEvent.INIT, Ad.start);	} else {		//console.log("[----]Enabler initialized");		Ad.start();	}
var Ad = Ad || {};		Ad.dom = Ad.dom || {};		Ad.class = Ad.class || {};		Ad.adMain = Ad.adMain || {};		Ad.config = Ad.config || {};		Ad.config.adStarted = false;	/*	 *	Sets up classes, dom objects and click handlers	 *	@todo: rename init to something more accurate? setup?	 */	Ad.adMain.init = function(){		Ad.log("adMain.init");		//Gather elements for DOM		var elems = [			'pageAssets',			"endFrame",			'coverallBtn',			'adMain',			"titleContainer",			"bg360container",			"txContainer",			"logo",			"txTonight" ,			"txTomorrow" ,			"txSunday" ,			"backup360",			'bg360Shake_container',			'testVideo_container'		]		for (var i = 0; i < elems.length; i++){			Ad.dom[elems[i]] = document.getElementById(elems[i]);		}		// set up the RAD videos of the test video and the background video		Ad.adMain.insertRADVideos();		Ad.dateLogic.getDate();		Ad.bgVid.init();		Ad.log("revealing "+Ad.dateLogic.outcome.txID)		Ad.utils.show([			Ad.dom[Ad.dateLogic.outcome.txID]		])		Ad.timeline.curTime = 0;		Ad.timeline.traceTime();		var defaultExit = function(){			Ad.log("coverAllbtn clicked")			Ad.config.adRunning = false;			Ad.timeline.killAll();			Enabler.exit('bipExit');		}		Ad.dom.coverallBtn.addEventListener('click', defaultExit);		Ad.dom.bg360container.addEventListener('click', defaultExit);		Ad.adMain.startAd();	}	/**	 * Inserts the videos into the DOM via the Doubleclick RAD module method	 *	 * @method insertRADVideos	 * @return {void}	 */	Ad.adMain.insertRADVideos = function(){		var radVideo = new studio.sdk.rad.Video({	    id: 'testVideo',	    autoplay: false,	    controls: false,			muted: true,	    sources: [				'testVideo.mp4',				'testVideo.webm',				'testVideo.ogv'			]	  });		radVideo.setElement(Ad.dom.testVideo_container);		Ad.dom.testVideo = radVideo.getVideoElement();		Ad.dom.testVideo.id = 'testVideo';		Ad.dom.testVideo.className = 'offScreen';		var radVideo = new studio.sdk.rad.Video({	    id: 'bg360Shake',	    autoplay: true,	    controls: false,			muted: true,	    sources: [				'headTurn_160x600_1.3mbps.mp4',				'headTurn_160x600_1.3mbps.webm',				'headTurn_160x600_1.3mbps.ogv'			]	  });		radVideo.setElement(Ad.dom.bg360Shake_container);		Ad.dom.bg360Shake = radVideo.getVideoElement();		Ad.dom.bg360Shake.poster = Enabler.getUrl('img_bg360_160x600_poster.jpg');		Ad.dom.bg360Shake.id = 'bg360Shake';		Ad.dom.bg360Shake.className = 'bg360';	}	Ad.adMain.startAd = function(){		if(!Ad.config.adStarted && Ad.bgVid.processComplete){			stopAndHideLoader();			Ad.utils.goTo(1, 10);		}		else {			Ad.log("Ad is running")		}	}
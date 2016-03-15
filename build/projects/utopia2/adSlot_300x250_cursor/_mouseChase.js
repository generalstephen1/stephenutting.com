Ad.class.MouseChase = function(){

	var interactionTimer;
	var animationTimer;
	var interactionTimeout = 2000; //how long the eye waits before looking around randomly
	var animationTimeout = 15000 - interactionTimeout; //how long the eye moves after no interaction
	var curStatus;

	var angle;
	var setupComplete = false;
	var adInteracting = false;
	var curMouseY;
	var curMouseX;
	var adXCenter;
	var adYCenter;
	var messageData;
	var positionTop;
	var positionLeft;
	
	var mouseLocation = "offAd";

	var guideObject = document.getElementById('guideObject');
	var pupilGuide = document.getElementById('pupilGuide');
	var eyeWhite = document.getElementById('eyeWhite');
	var iris = document.getElementById('iris');
	var pupil = document.getElementById('pupil');
	var mask = document.getElementById('mask');

	//this function makes sure that after animationTimeout of no interaction the animation gets killed. 
	function setAnimationTimeout(target){			
		/*if (target !== curStatus){
			Ad.log("setAnimationTimeout to "+target);
			if (target === "start"){
				animationTimer = setTimeout(stop, animationTimeout);
			} else {
				clearTimeout(animationTimer);
			}
		}
		curStatus = target;	*/
	}

	function setTimeouts(status){
		//Ad.log("setTimeouts "+status);
		clearTimeout(interactionTimer);
		if (status != "stopAll"){
			if (status == "random"){
				interactionTimeout = randRange (200, 1200);
				setAnimationTimeout("start");
			} else {
				setAnimationTimeout("stop");
				interactionTimeout = 3000;
			}
			interactionTimer = setTimeout(function(){
				mouseLocation = "MIA";
				update();
			}, interactionTimeout);
		} else {
			clearTimeout(interactionTimer);
		}
	}

	function update(e) {
	
			
	
		clearTimeout(interactionTimer);
		Ad.log(mouseLocation)
		switch(mouseLocation){
			case "overAd" :
					//Ad.log(mouseLocation);
					setTimeouts();
					curMouseX = e.clientX + positionLeft;
					curMouseY = e.clientY + positionTop;
					angle = Math.atan2(curMouseY-adYCenter, curMouseX-adXCenter);
					rotateGuide(angle);
					moveEye("guide");
					adInteracting = true;
				break;

			case "overEye" :
			
					setTimeouts();
					curMouseX = e.clientX;
					curMouseY = e.clientY;
					rotateGuide(0);
					moveEye("direct");
					adInteracting = true;
				break;

			case "offAd" :
				setTimeouts();
				if(typeof e.data === 'string'){
					var dataArray = e.data.split(':');

					if (dataArray[0] == "SetupInformation"){
						viewportWidth = dataArray[1]; //users window width
		                viewportHeight = dataArray[2]; //users window height
		                adXCenter = (Ad.config.width / 2) + parseFloat(dataArray[4]);
		                adYCenter = (Ad.config.height / 2) + parseFloat(dataArray[3]);
		                positionTop = parseFloat(dataArray[3]); //ad distance from top
		                positionLeft = parseFloat(dataArray[4]); //ad distance from left
		                setupComplete = true;
		            } else if (dataArray[0] == "ParallaxInformation" && setupComplete){
		                currentScroll = dataArray[1];
		                curMouseX = dataArray[2];
		                curMouseY = dataArray[3];
		                angle = Math.atan2(curMouseY-adYCenter, curMouseX-adXCenter);
		                rotateGuide(angle);
		                moveEye("guide");
		            }
		        } else {
			        mouseLocation = "overAd";
			    }
			adInteracting = true;
			break;

			default:
				adInteracting = false;
				setTimeouts("random");
				moveEye("random");
			break;
	}
}

	//controls the eye movement, changing ref points if mouse is over ad and/or over guideobject + the pupil zoom
	function moveEye(target){
		var referencePt1;
		var referencePt2;
		var cos = Math.cos(angle);
		var sin = Math.sin(angle);
		var xDist;
		var yDist;

		if (target == "guide"){ //if not on the eye itself them moves to the guide object
	        referencePt1 = (pupilGuide.offsetLeft * cos - 0 * sin);
	        referencePt2 = (pupilGuide.offsetTop * sin + 0 * cos);
	        xDist = curMouseX - adXCenter;
	        yDist = curMouseY - adYCenter;
		} else if (target == "random"){
	        referencePt1 = randRange (-30, 30);
	        referencePt2 = randRange (-30, 30);
	        xDist = randRange (0, 400);
	        yDist = randRange (0, 400);
		} else {
	        referencePt1 = curMouseX - 150;
	        referencePt2 = curMouseY - 125;
	        xDist = 0;
	        yDist = 0;
		}

		TweenLite.to(eyeWhite, 0.5, {
        	x: (referencePt1 * 0.16),
        	y: (referencePt2 * 0.16)
        	});
      
        TweenLite.to(iris, 0.5, {
	       	x: referencePt1 * 0.6, // * 0.8 to keep it slightly away from the edge of the white
	       	y: referencePt2 * 0.6
	    });
      
	    //This is the sleight skew effect on the eye as it looks to the side
	    TweenLite.to(iris, 0.5, {
       	 	rotationY: referencePt1/2,
       	 	rotationX: -referencePt2/2
       	});
      
      //doing a sleight zoom on the pupil in accordance with how far away the mouse is.
      var mouseDistance = Math.sqrt((xDist * xDist) + (yDist * yDist));
        if (mouseDistance < 500){
	        	TweenLite.to(pupil, 0.2, {
		        scaleX:1 - (mouseDistance/1500),
		        scaleY:1 - (mouseDistance/1500)});
        }
        if (mouseDistance < 300){
	        	TweenLite.to(iris, 0.2, {
		        scaleX:1 - (mouseDistance/4000),
		        scaleY:1 - (mouseDistance/4000)});
        }

    }

	function moveEyeToCentre(){
		Ad.log("moveEyeToCentre ");
		TweenLite.to(eyeWhite, 0.5, {x: 0,y: 0});
		TweenLite.to(iris, 0.5, {x:0, y:0, rotationY:0, rotationX:0});
		TweenLite.to(pupil, 0.2, {scaleX:1, scaleY:1});
	}

	function rotateGuide(targetAngle){
		var deg = targetAngle * 180/Math.PI;
		guideObject.style.webkitTransform = 'rotate('+deg+'deg)';
		guideObject.style.mozTransform    = 'rotate('+deg+'deg)';
		guideObject.style.msTransform     = 'rotate('+deg+'deg)';
		guideObject.style.oTransform      = 'rotate('+deg+'deg)';
		guideObject.style.transform       = 'rotate('+deg+'deg)';
	}

	function randRange (minNum, maxNum) {	
		return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	}

	function start(){
	    Ad.log("Ad.class.MouseChase: starting");
	    setAnimationTimeout("start");
	    messageData = Ad.config.mouseChaseSetupData;
	    Ad.dom.mouseChase.style.display = "block";
	    TweenLite.to(Ad.dom.mouseChase, 0.2, {alpha:1});
	    update(messageData);
	    addListeners();
	    setTimeouts();
	}
	
	function restart(){
	    Ad.log("Ad.class.MouseChase: restarting: ");
	    window.removeEventListener("mouseover", restart, false);
	    mouseLocation = "overAd";
	    addListeners();
	    setTimeouts();
	}
	
	function addListeners(){
	    Ad.log("addListeners");
	    window.addEventListener('message', messageListener, false);
	    window.addEventListener('mousemove', windowMouseListener, false);
	    mask.addEventListener("mouseover", adMouseListener, false);
	    guideObject.addEventListener("mouseover", guideMouseListener, false);
	    guideObject.addEventListener("mouseout", guideMouseListenerOut, false);
	}

	function messageListener(e){
		mouseLocation = "offAd";
		update(e);
	}
	function windowMouseListener(e){
		
		update(e);
	}
	function adMouseListener(){
		mouseLocation = "overAd";
		setAnimationTimeout("stop");
	}
	function guideMouseListener(){
	
		mouseLocation = "overEye";
	}
	function guideMouseListenerOut(){
	
		mouseLocation = "overAd";
	}

	function stop(){
		Ad.log("Ad.class.MouseChase: stopping");
		setTimeouts("stopAll");
		moveEyeToCentre();
		setAnimationTimeout("stop");

		window.removeEventListener('message', messageListener, false);
		window.removeEventListener('mousemove', windowMouseListener, false);
		mask.removeEventListener("mouseover", adMouseListener, false);
		guideObject.removeEventListener("mouseover", guideMouseListener, false);

		window.addEventListener("mouseover", restart, false);
	}

	function hide(){
		//hide all eye move elements
		Ad.dom.mouseChase.style.display = "none";
		//guideObject.style.display = "none";
		//eyeWhite.style.display = "none";
		//iris.style.display = "none";
	}

	return {
		start: start,
		stop: stop,
		hide: hide
	};
};
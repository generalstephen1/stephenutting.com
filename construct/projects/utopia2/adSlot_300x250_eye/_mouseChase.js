Ad.class.MouseChase = function(){

	var eyeInterval;
	var angle;

	var guideObject = document.getElementById('guideObject');
	var pupilGuide = document.getElementById('pupilGuide');
	var eyeWhite = document.getElementById('eyeWhite');
	var iris = document.getElementById('iris');
	var pupil = document.getElementById('pupil')
	
	var tween1, tween2, tween3;
	
	var eyePositions = Array(-20, -15, 0, 15, 20, 0);
	var curPos = 0;

	function updateFromArray(){
	
		tween1 = TweenLite.to(eyeWhite, 0.2, {
			x: eyePositions[curPos] * 0.5,
		});

		tween2 = TweenLite.to(iris, 0.2, {
			x: eyePositions[curPos], // * 0.8 to keep it slightly away from the edge of the white
		});
		
		curPos++;
		window.setTimeout(updateFromArray, 400);
	}
	
	
	function expandPupil(){
		pupil.style.display = "block";
		tween3 = TweenLite.to(pupil, 2, {
			easeParams:[0.5,0.3],
			ease: Elastic.easeOut,
			width: "160px",
			height: "160px",
			left: "71px",
			top: "39px",
		});
	}


	function update(){

		var adXCenter = (Ad.config.width / 2);
		var adYCenter = (Ad.config.height / 2);

		var randX = randRange(0, Ad.config.width);
		var randY = randRange(0, Ad.config.height);

		//This figures out where the mouse is in relation to the ad's center point
	    angle = Math.atan2(randY-adYCenter, randX-adXCenter);
	    var deg = angle * 180/Math.PI;

		guideObject.style.webkitTransform = 'rotate('+deg+'deg)';
		guideObject.style.mozTransform    = 'rotate('+deg+'deg)';
		guideObject.style.msTransform     = 'rotate('+deg+'deg)';
		guideObject.style.oTransform      = 'rotate('+deg+'deg)';
		guideObject.style.transform       = 'rotate('+deg+'deg)';

		moveEye();
	}


	//controls the eye movement, changing ref points if mouse is over ad and/or over guideobject
	function moveEye(){
	    var cos = Math.cos(angle);
	    var sin = Math.sin(angle);
	    var referencePt1 = (pupilGuide.offsetLeft * cos - 0 * sin);
	    var referencePt2 = (pupilGuide.offsetLeft * sin + 0 * cos);

	    tween1 = TweenLite.to(eyeWhite, 0.2, {
			x: (referencePt1 * 0.25),
			//y: (referencePt2 * 0.16)
		});

	    tween2 = TweenLite.to(iris, 0.2, {
			x: referencePt1 * 0.4, // * 0.8 to keep it slightly away from the edge of the white
			//y: referencePt2 * 0.6
		});

		//This is the sleight skew effect on the eye as it looks to the side
		//tween3 = TweenLite.to(iris, 0.2, {
			//rotationX: -referencePt2/2,
			//rotationY: referencePt1/2
		//});
	}


	function moveEyeToCentre(){
		TweenLite.to(eyeWhite, 0.2, {
			x: 0,
			y: 0
		});

		TweenLite.to(iris, 0.2, {
			x: 0,
			y: 0
		});

		TweenLite.to(iris, 0.2, {
			rotationY: 0,
			rotationX: 0
		});
	}


	function randRange (minNum, maxNum) {
		return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	}


	function start(){
	    Ad.log("Ad.class.MouseChase: starting");
		Ad.dom.mouseChase.style.display = "block";
		//update();
		updateFromArray();
		//eyeInterval = window.setInterval(update, 500);
	}


	function stop(){
		Ad.log("Ad.class.MouseChase: stopping");
		window.clearInterval(eyeInterval);
		moveEyeToCentre();
	}


	function stopDead(){
		Ad.log("Ad.class.MouseChase: stopping dead");
		window.clearInterval(eyeInterval);
		tween1.kill();
		tween2.kill();
		//tween3.kill();
	}


	function hide(){
		Ad.dom.mouseChase.style.display = "none";
	}


	function show(){
		Ad.dom.mouseChase.style.display = "block";
	}


	return {
		start: start,
		stop: stop,
		stopDead: stopDead,
		hide: hide,
		show: show,
		expandPupil: expandPupil
	}

}

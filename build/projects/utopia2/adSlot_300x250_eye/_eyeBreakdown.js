Ad.class.EyeBreakdown = function(){

	var slices = 13; // the number of slices to break the image down into
	var imgHeight = 250; //the height of the eye image
	var looping = true; //is the breakdown animation still looping?
	var selectedSlicesVar; //random number for how many slices are selected for animation each loop
	var numLoops = 0; //the current number of animation iterations

	var delayArray = new Array(100, 100, 100, 100, 100, 100, 100); //the time to delay between animation phases

	var sliceHeights = new Array(12, 13, 19, 27, 4, 10, 17, 9, 25, 35, 25, 19, 35); //limited to 10 slices

	var frames = new Array(
		new Array(0, 0, -2, 0, 0, 2, 0, 0, -1, 0, 0, 0, 0),
		new Array(0, 0, -2, 5, 10, 9, 8, 8, 7, 8, 8, 8, 8),
		new Array(0, 0, -4, 15, 22, 3, 2, -28, -28, -30, -33, -33, -33),
		new Array(0, 2, 0, 15, 22, -3, -4, -32, -32, -34, -37, -44, -44),
		new Array(0, 22, 20, 35, 42, 17, 16, -12, -12, -14, -17, -24, -24),
		new Array(0, 22, 20, 35, 42, 17, 16, -12, -12, -14, -17, -24, -24),
		new Array(0, 22, 23, 37, 44, 19, 18, -10, -10, -12, -15, -28, -33),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
		new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	);
	var curFrame = 0; // the current frame

	/*
	 * kick the ting off
	*/
	function start(){
		createSlices();
		moveSlicesByArray();
	}


	/*
	 * restart
	*/
	function restart(){
		looping = true;
		curFrame = 0;
		Ad.dom.eyeBreakdown.style.display = "block";
		moveSlicesByArray();
	}


	/*
	 * stop da ting
	*/
	function stop(){
		looping = false;
	}


	/*
	* hide da ting
	*/
	function hide(){
		//hide in dom
		Ad.dom.eyeBreakdown.style.display = "none";
	}


	/*
	* swoosh the slices off the screen
	*/
	function swooshOff(){
		//hide in dom
		for (var i=0; i<slices; i++){

			var animTime = Math.random() * 500;
			var way="";

			if (i % 2 == 0){
				//console.log('even');
				way = "-";
			}

			TweenLite.to(Ad.dom.slices[i], animTime/1000, {
				left: way + "280px",
				opacity: 0
				//ease:animInEase,
			});
		}
	}


	/*
	 * create da slices init
	*/
	function createSlices(){

		Ad.dom.slices = [];
		//var height = imgHeight/slices; //not needed now heights are set manually
		var curOffset = 0;

		for (var i=0; i<sliceHeights.length; i++){
			var div = document.createElement('div');
			div.className = "breakdownSlice";
			div.style.height = sliceHeights[i] + 'px';

			div.style.backgroundPosition = "0 " + -curOffset + 'px';
			curOffset += sliceHeights[i];

			Ad.dom.slicesHolder.appendChild(div)
			Ad.dom.slices.push(div);
		}
	}


	/*
	* get da random variable for each of da slicez
	*/
	function moveSlicesToFrame(x){

		for (var i=0; i<slices; i++){

			Ad.dom.slices[i].style.left = frames[x][i] + 'px';
		}
	}


	/*
	* get da random variable for each of da slicez
	*/
	function moveSlicesByArray(){
		var delayTime = 50;

		if (looping){

			moveSlicesToFrame(curFrame);

			//if (numLoops < delayArray.length){
			//	delayTime = delayArray[numLoops];
			//}

			if (curFrame == frames.length-1){
				curFrame = 0;
			} else {
				curFrame++;
			}
			Ad.log('currentFrame: ' + curFrame);

			numLoops++;
			window.setTimeout(moveSlicesByArray, delayTime);
		}
	}


	/*
	 * get da random variable for each of da slicez
	*/
	function getRandomVars(){
		var maxAnimTime = 50;

		//random selections - only some slices will move
		if (Math.random() > selectedSlicesVar){
			return false;
		}

		//random x and y pos (/distance)
		var xDist = Math.random() * 50;
		var xDir = Math.random() > 0.5 ? -1: 1;

		//random scale
		var yScale = (Math.random()/2) + 1;

		//random animation time
		var animTime = Math.random() * maxAnimTime;

		return {
			'xDist': xDist,
			'xDir': xDir,
			'yScale': yScale,
			'animTime': animTime
		}
	}


	/*
	 * dis move da slices and den moves em back to normal and loops indefinitly
	*/
	function moveSlices(){
		var delayTime = 1000;
		selectedSlicesVar = Math.random();

		if (looping){
			//this is a single phase of erratic movement,
			for (var i=0; i<slices; i++){
				//get random variables to attribute to the slice,
				var rand = getRandomVars();

				if (rand){
					//then trigger an animation of the slice
					TweenLite.to(Ad.dom.slices[i], rand.animTime/1000, {
						left: rand.xDist * rand.xDir,
						scaleY: rand.yScale,
						//ease:animInEase,
						onComplete: returnSliceToNormal
					});

				}
			}

			if (numLoops < delayArray.length){
				delayTime = delayArray[numLoops];
			}

			window.setTimeout(moveSlices, delayTime);
			numLoops++;
		}
	}


	/*
	 * move slices back to da normal
	*/
	function returnSliceToNormal(){
		window.setTimeout(function(){
			for (var i=0; i<Ad.dom.slices.length; i++){
				Ad.dom.slices[i].style.left = 0;
				Ad.dom.slices[i].style.webkitTransform = "";
			}
		}, 250);
	}


	/*
	 * return object containing methods
	*/
	return {
		start: start,
		restart: restart,
		stop: stop,
		hide: hide,
		createSlices: createSlices,
		swooshOff: swooshOff,
		getRandomVars: getRandomVars,
		moveSlices: moveSlices,
		moveSlicesByArray: moveSlicesByArray,
		moveSlicesToFrame: moveSlicesToFrame
	}
}

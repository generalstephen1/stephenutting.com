var Ad = Ad || {};
Ad.loader = Ad.loader || {};

function setUpLoader(){
	Ad.loader.fields = document.getElementsByClassName('preloader-stalk');
	Ad.loader.container = document.getElementById('preloader');
	var radius = 20,
		width = Ad.loader.container.clientWidth,
		height = Ad.loader.container.clientHeight;

	var angle = 0,
		step = (2*Math.PI) / Ad.loader.fields.length;

	for (var i=0; i<Ad.loader.fields.length; i++){
		var x = Math.round(width/2 + radius * Math.cos(angle) - Ad.loader.fields[i].clientWidth/2);
		var y = Math.round(height/2 + radius * Math.sin(angle) - Ad.loader.fields[i].clientHeight/2);
		Ad.loader.fields[i].style.left = x + 'px',
		Ad.loader.fields[i].style.top = y + 'px',
		Ad.loader.fields[i].style.webkitTransform = "rotate("+(i+3)*30+"deg)";
		Ad.loader.fields[i].style.mozTransform = "rotate("+(i+3)*30+"deg)";
		Ad.loader.fields[i].style.msTransform = "rotate("+(i+3)*30+"deg)";
		Ad.loader.fields[i].style.oTransform = "rotate("+(i+3)*30+"deg)";
		Ad.loader.fields[i].style.transform = "rotate("+(i+3)*30+"deg)";
		angle += step;
	}
}

function moveLoader(){
	var curLit = 0;
	Ad.loader.timer = window.setInterval(function(){
		Ad.loader.fields[curLit].className = "preloader-stalk";
		curLit == 11 ? curLit=0 : curLit++;
		Ad.loader.fields[curLit].className = "preloader-stalk preloader-stalk-active";
		//add transition property if not added already
		if (!Ad.loader.fields[curLit].style.transition){
			Ad.loader.fields[curLit].style.webkitTransition = '0.1s';
			Ad.loader.fields[curLit].style.mozTransition = '0.1s';
			Ad.loader.fields[curLit].style.oTransition = '0.1s';
			Ad.loader.fields[curLit].style.transition = '0.1s';
		}
	}, 100);
}

function stopAndHideLoader(){
	clearInterval(Ad.loader.timer);
	Ad.loader.container.style.display = "none";
}

setUpLoader();
moveLoader();


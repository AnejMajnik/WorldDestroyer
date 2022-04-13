function beginning(){
	
}
function drawIt(){
	var x = 315;
	var y = 600;
	var dx = 1.5;
	var dy = 1.5;
	var r = 8;
	var WIDTH;
	var HEIGHT;
	var ctx;
	var paddlex;
	var paddleh;
	var paddlew;
	var paddley;
	var rightDown = false;
	var leftDown = false;
	var canvasMinX;
	var canvasMaxX;
	var bricks;
	var NROWS;
	var NCOLS;
	var BRICKWIDTH;
	var BRICKHEIGHT;
	var PADDING;
	var lives;
	var sekunde;
	var sekundeI;
	var minuteI;
	var intTimer;
	var izpisTimer;
	var score;
	var bricknum=0;
	var noscore=0;
	var start=true;
	var f=r/2;
	var planet1 = new Image();
	planet1.src = "images/earth.png";
	var planet2 = new Image();
	planet2.src = "images/earth1.png";
	
	function timer(){
		if(start==true){
			sekunde++;

			sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
			minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
			izpisTimer = minuteI + ":" + sekundeI;

			$("#timer").html("TIME: "+izpisTimer);
		}
		else{
			sekunde=0;
			//izpisTimer = "00:00";
			$("#timer").html("TIME: "+izpisTimer);
		}
	}
	
	//nastavljanje leve in desne tipke
	function onKeyDown(evt) {
		if (evt.keyCode == 39)
			rightDown = true;
		else if (evt.keyCode == 37) leftDown = true;
	}

	function onKeyUp(evt) {
		if (evt.keyCode == 39)
			rightDown = false;
		else if (evt.keyCode == 37) leftDown = false;
	}
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp); 
	
	function easy(){
		dx=1;
		dy=1;
	}
	function medium(){
		dx=1.3;
		dy=1.3;
	}
	function hard(){
		dx=1.8;
		dy=1.8;
	}
	
	function init() {

		ctx = $('#main')[0].getContext("2d");
		WIDTH = $("#main").width();
		HEIGHT = $("#main").height();
		lives = 3;
		score = 0;
		$("#score").html("SCORE: "+score);
		$("#lives").html("LIVES: "+lives);
		sekunde = 0;
		izpisTimer = "00:00";
		intTimer = setInterval(timer, 1000);
		return setInterval(draw, 2);
	}
	function initbricks() { //inicializacija opek - polnjenje v tabelo
		NROWS = 3;
		NCOLS = 10;
		BRICKWIDTH = 66;
		BRICKHEIGHT = BRICKWIDTH;
		PADDING = 4;
		bricks = new Array(NROWS);
		for (i=0; i < NROWS; i++) {
			bricks[i] = new Array(NCOLS);
			for (j=0; j < NCOLS; j++) {
				bricks[i][j] = 2;
				bricknum+=2;
		}
	  }
	}
	function init_mouse() {
		//canvasMinX = $("#canvas").offset().left;
		canvasMinX = $("canvas").offset().left;
		canvasMaxX = canvasMinX + WIDTH;
	}
	//nastavljanje miske
	function onMouseMove(evt) {
		if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
			paddlex = evt.pageX - canvasMinX - paddlew/2;
		}
	}
	$(document).mousemove(onMouseMove);
	
	function circle(x, y, r) {		
		ctx.beginPath();
		ctx.arc(x, y, 10, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = "#00ff0d"
		ctx.fill();
	}
	
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fillStyle = "#00ff0d"
		ctx.fill();
	}
	
	function clear() {
		ctx.clearRect(0, 0, HEIGHT, WIDTH);
	}
	
	function init_paddle() {
		paddlex = WIDTH /2 - 35;
		paddley = HEIGHT - 40;
		paddleh = 10;
		paddlew = 95;
	}
	function draw() {
		clear();
		circle(x, y, r);
		if (rightDown){
			if((paddlex+paddlew) < WIDTH){
				paddlex += 3;
			}
		}
		else if (leftDown){
			if(paddlex>0){
				paddlex -= 3;
			}else{
				paddlex=0;
			}
		}
		else{
		if(paddlex<0)
			paddlex=0;
		else if(paddlex+paddlew>WIDTH)
			paddlex=WIDTH-paddlew;
		}
	
		rect(paddlex, paddley, paddlew, paddleh);
		
		//riši opeke
			for (i=0; i < NROWS; i++) {
				for (j=0; j < NCOLS; j++) {
					if (bricks[i][j] == 1) {
						ctx.drawImage(planet2, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
					}
					if(bricks[i][j]==2){
						ctx.drawImage(planet1, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
					}
				}
			}
			rowheight = BRICKHEIGHT + PADDING + f/2; //Smo zadeli opeko?
			colwidth = BRICKWIDTH + PADDING + f/2;
			row = Math.floor(y/rowheight);
			col = Math.floor(x/colwidth);
			//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
			if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2) {
				dy = -dy; bricks[row][col] = 1;
				if(noscore<1){
				score=score+10;
				bricknum-=1;
				$("#score").html("SCORE: "+score);
				}
			}
			else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
				dy = -dy; bricks[row][col] = 0;
				if(noscore<1){
				score=score+10;
				bricknum-=1;
				$("#score").html("SCORE: "+score);
				}
			}
			
			
			if (x + dx > WIDTH -r|| x + dx < r)
				dx = -dx;
			if (y + dy < r)
				dy = -dy;
			else if (y + dy > paddley-r) {
				if (x > paddlex && x < paddlex + paddlew && noscore<1) {
					dx =((x-(paddlex+paddlew/2))/paddlew);
					dy = -dy;
			}else if(y + dy > HEIGHT-(r+3) && lives>0){
				lives-=1;
				score-=20;
				$("#lives").html("LIVES: "+lives);
				dy = -dy;
				start=true;
			}else if(y + dy > HEIGHT-(r+3) && lives==0){ //3 je border canvasa
				start=false;
				noscore+=1;
				// location.reload();
				$("#lives").html("LIVES: "+lives);
				clearInterval(intervalId);
			}else if(y + dy > HEIGHT-(r+3) && bricknum==0){
				start=false;
				noscore+=1;
				clearInterval(intervalId);
			}
			
		}

		x += dx;
		y += dy;
	}
	
	init();
	init_paddle();
	init_mouse();
	initbricks();
	

}

drawIt();

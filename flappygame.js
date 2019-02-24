// JavaScript source
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load image
var bird = new Image();
var upipe = new Image();
var lpipe = new Image();
var bg = new Image();


bird.src = "img/bird.png";
upipe.src = "img/upipe.png";
lpipe.src = "img/lpipe.png";
bg.src = "img/bg.jpeg";

var score = 0;


//intialize variable

var gap = 150;
var constant;
var bx = 20;
var by = 45;
var gravity = 0.4;


// audio files
var fly = new Audio();
var scor = new Audio();
fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

var pipe = [];
pipe[0] = {x : cvs.width, y : -120};

document.addEventListener("keydown", moveUp);
function moveUp() {
    "use strict";
    by = by - 70;
    fly.play();
}



//draw image on canvas
"use strict";
function draw(){
    ctx.drawImage(bg, 0, 0);

    
	for (var i=0;i<pipe.length;i++)
   {
       constant = upipe.height + gap;
    ctx.drawImage(upipe, pipe[i].x,pipe[i].y);
    ctx.drawImage(lpipe, pipe[i].x,pipe[i].y + constant);
    pipe[i].x--;
    if( pipe[i].x == 10){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*upipe.height)-upipe.height
            }); 

    }
     if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + upipe.width && (by <= pipe[i].y + upipe.height || by+bird.height >= pipe[i].y+constant) || by + bird.height >=  cvs.height - 10)
		{    location.reload(); // reload the page
        }
        if(by<0||by>450)
		{
			location.reload();
		}
        if(pipe[i].x == 1){
            score++;
            scor.play();
        }
	
 }  
 
	ctx.drawImage(bird, bx, by);
      by=by+gravity;
    
	ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    requestAnimationFrame(draw);
     setInterval(draw,4000);
}

draw();

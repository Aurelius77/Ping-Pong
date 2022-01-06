var canvas;

var canvasContext;

var ball = 50;

var ballY = 50;

var ballSpeed= 20;

var ballSpeedY = 20;

var paddleone = 250;

var paddletwo = 250;

const paddleHeight = 100; 

var playerOne = 0;
var playerTwo = 0;

const WINNER = 10;
var winnerShow = false;




function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x : mouseX,
        y: mouseY
    };
}  











function mouseClick(evt){
   if(winnerShow){
    playerOne = 0;
    playerTwo= 0;
    winnerShow= false;
   }
}



window.onload = function(){
	canvas = document.getElementById('gamecanvas')
     canvasContext = canvas.getContext('2d');
    var FPS = 30
    setInterval(function(){
        drawCanvas();
    		moveBall();
	       

    }, 200)
    drawCanvas();


    canvas.addEventListener('mousedown',mouseClick)

      canvas.addEventListener('mousemove', function(evt){
        var mousePos = calculateMousePos(evt);
        paddleone = mousePos.y - (paddleHeight/2);
      }
)
    

} 




function ballReset(){

   if(playerOne >= WINNER || playerTwo >=WINNER){
   
      winnerShow =true;
   }

    ballSpeed = -ballSpeed;
    ball= canvas.width/2;
    ballY= canvas.height/2;
}



function moveAI(){
    var paddletwoCenter = paddletwo + (paddleHeight/2);
    if(paddletwoCenter < ballY){
        paddletwo += 10;
    }
    else{
        paddletwo -= 10; 
    }
}


 function moveBall(){
    if(winnerShow){
          return;
    }

    moveAI();

 	ball = ball+ ballSpeed;
    ballY = ballY+ ballSpeedY;

    if(ball > canvas.width){
       
       if(ballY > paddletwo && ballY< paddletwo+paddleHeight){
           ballSpeed = -ballSpeed;
           var apexY = ballY- (paddletwo+paddleHeight/2);
           ballSpeedY = apexY * 0.4
            
               
         }  else{
           
           playerOne += 1;
           ballReset();
         
           
         }


       
    }
    
 	if(ball < 0){
        if(ballY > paddleone && ballY< paddleone+paddleHeight){
           ballSpeed = -ballSpeed;
            var apexY = ballY- (paddleone+paddleHeight/2);
           ballSpeedY = apexY * 0.4
               
         }  else{
           playerTwo += 1;
           ballReset();
           
         }
        
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    
    if(ballY < 0){
        ballSpeedY = -ballSpeedY;
    }
 }













function drawCanvas(){

    canvasContext.fillStyle = 'blue'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    
if(winnerShow){
     
    canvasContext.fillStyle = 'yellow'
     canvasContext.font = '20px Verdana'

     if(playerOne >= WINNER){
         canvasContext.fillText("playerOne Has Won", 400, 100);
     } else if( playerTwo >=WINNER){


         canvasContext.fillText("playerTwo Has Won", 400, 120);
     }
   
      canvasContext.fillText("GAME OVER", 400, 150);
    canvasContext.fillText("click to continue", 400, 300);
    return;
}



    canvasContext.fillStyle = 'red'
    canvasContext.fillRect(0, paddleone, 10, paddleHeight);
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(400, 0, 5, canvas.height);
    canvasContext.fillStyle = 'red'
    canvasContext.beginPath()
    canvasContext.arc(ball,ballY,8, 0, Math.PI*2, true);
    canvasContext.fill();

    canvasContext.fillStyle = 'red'
    canvasContext.fillRect(790,paddletwo, 10, paddleHeight);
    canvasContext.fillStyle = 'yellow'
    canvasContext.font = '20px Verdana'
    canvasContext.fillText("playerOne:" +playerOne, 120, 40);
    canvasContext.fillText("playerTwo:" +playerTwo, canvas.width-150, 40);

}











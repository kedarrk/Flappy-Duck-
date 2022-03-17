var canvas= document.getElementById("canvas");
var ctx= canvas.getContext("2d");
var canvas2= document.getElementById("canvas2");
var ctx2=canvas2.getContext("2d");


// canvas.offscreenCanvas = document.createElement('canvas');
// canvas.offscreenCanvas.width = canvas.width;
// canvas.offscreenCanvas.height = canvas.height;

// canvas.getContext('2d').drawImage(canvas.offScreenCanvas, 0, 0);
var mouselocation=document.getElementById("mouse-location");
var ctx2= canvas.getContext("2d");
// var img= new Image();
// img.src="./sprite_0.png";
// var img1= new Image();
// img.src="./sprite_1.png";
// var img2= new Image();
// img.src="./sprite_2.png";

var highScore=0;
var imgs= document.images;
console.log(imgs);
var currentLoopIndex=0;
var frameCount=0;
var clicked=0;
var score=0;
var end=20;
var img = new Image();
var score_div=document.getElementById("score-board");
img.src="./back.jpg";
ctx2.drawImage(img,0,0,canvas.width+150,canvas.height);
var start= document.getElementById("start-btn");
img.onload=()=>{
    
}
//ctx.strokeRect(0,0,600,400);\
var lengths=[];
//console.log(lengths);
console.log(canvas.height);
var bars=[];
// bars=[
//     {
//     index:0,
//   //  length:100,
//     top:{
//       //  length:canvas.height,
//         width:40,
//         x:100,
//         y: 50,
//         vx:0,
//         draw: function(){
//             ctx.fillStyle="green";
//             ctx.fillRect(this.x,this.y,this.width,300);
//         }
//     },
//     bot:{
//      //   length:0,
//         width:40,
//         x:100,
//         y:lengths[0] + Math.random()*100+100,
//         vx:0,
//         draw: function(){
//             ctx.fillStyle="green";
//             ctx.fillRect(this.x,this.y,this.width,1000);
//         }
//     }
//     },
// ]
var bird={
    x:50,
    y: canvas.height/2,
    width:60,
    vy:0,
    vx:0,
    gravity:5,
    flag:0,
    draw1: function(){
        ctx.fillStyle="white";
        ctx.drawImage(imgs[0],this.x,this.y,60,60);
        //ctx.fillRect(this.x,this.y,this.width,this.width);
    },
    draw2: function(){
        ctx.drawImage(img1[1],this.x,this.y,60,60);
        this.f=2;
    },
    draw3: function(){
        ctx.drawImage(img2[2],this.x,this.y,60,60);
        this.f=0;
    }
}
var gameStarted=0;
var drawb=0;
function drawFrame(){
   
    if(gameStarted){
        frameCount++;
        
    // if (frameCount < 15) {
        
    //       return;
    // }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.drawImage(img,0,0,canvas.width+150,canvas.height);
   // ctx.drawImage(img,0,0,canvas.width+150,canvas.height);
        bird.y+=bird.gravity + bird.vy;
        bird.x+=bird.vx;
        if(currentLoopIndex==0){
            bird.draw1();
        }
        if(currentLoopIndex==1){
            bird.draw2();
        }
        if(currentLoopIndex==2){
            bird.draw3();
        }
        currentLoopIndex++;

        if (currentLoopIndex >= 3) {
          currentLoopIndex = 0;
        }
        //window.requestAnimationFrame(step);
     //   ctx.clearRect(0,0, canvas.width,canvas.height);
        
    }
    if(gameStarted){
    for(var i=0;i<1001;i++){
        //collison --------------------88------------------
        if(bars[i].top.x<=bird.x+bird.width && bird.x+ bird.width <= bars[i].top.x+bars[i].top.width){
            if(bars[i].top.y + lengths[i] > bird.y){
                //alert("game over");
                gameStarted=0;
               // startGame();
               start.classList.remove("hide");
            }
            if(bars[i].bot.y <= bird.y ){
                //alert("game over");
                if(bars[i].bot.x<=bird.x+bird.width && bird.x+ bird.width <= bars[i].bot.x+bars[i].top.width){
                    if(bird.y+bird.width > bars[i].bot.y){
                        gameStarted=0;
                    }
                }
                gameStarted=0;
              //  startGame();
              start.classList.remove("hide");
            }
        }
        if(bird.y+bird.width-20>=canvas.height){
           // alert("game over");
            gameStarted=0;
            start.classList.remove("hide");
        }
        if(gameStarted){
        if(bars[i].top.x + bars[i].top.width <= bird.x && bars[i].index===0 ){
            bars[i].index=1; // to calculate score only once flag;
            score++;
            score_div.innerText=score;
            if(highScore<score){
                highScore=score;
            }
            console.log(score);
            

        }

        bars[i].top.x+=bars[i].top.vx;
        bars[i].bot.x+=bars[i].bot.vx;
        
        bars[i].top.draw();
        bars[i].bot.draw();
        }
    }
    if(score%10==0 &&  (score>=0 || score<10)){
       // start=score-10;
        end= Math.min(score+20,1000);
    }
    // if(score >=20){
    // for(var i=start;i<end;i++){
    //     //bars[i].top.x+=bars[i].top.vx;
    //     //bars[i].bot.x+=bars[i].bot.vx;
        
    // }
    // }
    // if (frameCount < 15) {
        
    //       return;
    // }
    requestAnimationFrame(drawFrame);
     
    
    }else{
        
        
        score_div.innerHTML="<div>"+  "Score:" + score +"</div>" + "<div>" + "High Score:" + highScore + "</div>";
        score_div.classList.add("dummy");
        start.classList.remove("hide");
    }
}
function startGame(){
    gameStarted=1;
    score=0;
    score_div.innerText=0;
    
    ctx2.drawImage(img,0,0,canvas.width+150,canvas.height);
    score_div.classList.remove("dummy");
    bird={
        x:50,
        y: canvas.height/2,
        width:30,
        vy:0,
        vx:0,
        gravity:5,
        flag:0,
        draw1: function(){
            
            ctx.drawImage(imgs[0],this.x-18,this.y-15,60,60);
            ctx.fillStyle="white";
           // ctx.fillRect(this.x,this.y,this.width,this.width);
        },
        draw2: function(){
            ctx.drawImage(imgs[1],this.x-18,this.y-15,60,60);
            ctx.fillStyle="white";
           // ctx.fillRect(this.x,this.y,this.width,this.width);
            this.f=2;
        },
        draw3: function(){
            ctx.drawImage(imgs[2],this.x-18,this.y-15,60,60);
            ctx.fillStyle="white";
           // ctx.fillRect(this.x,this.y,this.width,this.width);
            this.f=0;
        }
    }
    renderBars();
    drawFrame();
}
// space bar button
var spaceClicked=0;
window.addEventListener("keypress",(e)=>{
    console.log(e.keyCode);
    if(e.keyCode == 32 && spaceClicked==0){
        bird.vy-=25;
        gravity=0;
        spaceClicked=1;
        console.log("32");
        var spaceTimeout= setTimeout(()=>{
            bird.vy+=25;
            gravity=7;
            spaceClicked=0;
        },50)
    }
})
window.addEventListener("click",(e)=>{
    if(gameStarted==1 && spaceClicked==0){
        bird.vy-=25;
        gravity=0;
        spaceClicked=1;
        console.log("32");
        var spaceTimeout= setTimeout(()=>{
            bird.vy+=25;
            gravity=7;
            spaceClicked=0;
        },50)
    }
})
// creating var bars
var cnt=450;

//startGame();
//console.log(bars[2]);
function renderBars(){
    var l=0,m=0;
    for(var i=0;i<1001;i++){
        lengths[i]=Math.floor(100 + Math.random() * 300);
        if(i==1000){
            l=1;
        }
    }
    console.log(lengths[2]);
    cnt=300;
    if(l==1){
    for(var i=0;i<1001;i++){
        cnt+=240;
        bars[i]={
            index:0,
          //  length:100,
            top:{
              //  length:canvas.height,
                width:80,
                x:cnt,
                y: 0,
                vx:-5,
                length:Math.floor(lengths[i]),
                draw: function(){
                    ctx.fillStyle="#7A942E";
                    ctx.fillRect(this.x,this.y,this.width,this.length);
                    ctx.fillStyle="#b2ec5d";
                    ctx.fillRect(this.x ,this.y,10,this.length);
                    ctx.fillStyle="#87D37C";
                    ctx.fillRect(this.x +15 ,this.y,5,this.length); 
                    ctx.fillStyle="#507d2a";
                    ctx.fillRect(this.x +60 ,this.y,10,this.length); 
                    ctx.fillStyle="#507d2a";
                    ctx.fillRect(this.x +75 ,this.y,5,this.length); 
                }
            },
            bot:{
             //   length:0,
                width:80,
                x:cnt,
                y:lengths[i] + Math.random()*70+150,
                vx:-5,
                draw: function(){
                    ctx.fillStyle="#7A942E";
                    ctx.fillRect(this.x,this.y,this.width,1000);
                    //border
                    //sj
                    ctx.fillStyle="#b2ec5d";
                    ctx.fillRect(this.x ,this.y,10,1000);
                    ctx.fillStyle="#87D37C";
                    ctx.fillRect(this.x +15 ,this.y,5,1000); 
                    ctx.fillStyle="#507d2a";
                    ctx.fillRect(this.x +60 ,this.y,10,1000); 
                    ctx.fillStyle="#507d2a";
                    ctx.fillRect(this.x +75 ,this.y,5,1000); 
                }
            }
            }
        if(i==1000){
            m=1;
        }    
    
    }
}
    
    
    console.log(bars);
}

start.addEventListener("click",()=>{
    if(gameStarted==0){
        start.classList.add("hide");
        startGame();
       
    }
})
var monkey , monkey_running, monkey_collide;
var obstacle, obstacleImage
var obstacleGroup
var score , forest , forestImage , foodGroup , foodImage , food , invisibleground, score=0 ,survivaltime=0 ,  PLAY=0 , END=1, gameState=PLAY , resetImage , reset;

function preload(){
  //loading animation for monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collide = loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestImage=loadImage("forest.png");
  foodImage = loadImage("banana.png");
  resetImage=loadImage("reset.png");
}

function setup() {
  createCanvas(600,600);
//background("white");
forest=createSprite(200,200,1200,1200);
forest.scale=2;
forest.addImage(forestImage);
forest.velocityX=-(20+survivaltime*1.5/100);    
  
  monkey=createSprite(20,500);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collide", monkey_collide);
  
  invisibleground = createSprite(50,575,1200,2);
  invisibleground.visible= false;
  
  monkey.scale=0.2; 
  reset=createSprite(280,250);
  reset.addImage(resetImage);
  reset.scale=0.3;
  reset.visible=false;
  obstacleGroup=createGroup();
  foodGroup=createGroup();
}


function draw() {
  
  if(gameState===PLAY){
    
    obstacles();
    banana();
  survivaltime = survivaltime+ Math.round(getFrameRate()/60);
    // making monkey to jump
  if(keyDown("space")&&   monkey.y >= 500){
   monkey.velocityY=-20;
    } 
    // add gravity
  monkey.velocityY=monkey.velocityY+1;
  //infinite screen
if(forest.x<0){
    forest.x=forest.width/2;
    }
    //increasing score
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+1;
    }
  

    if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  }
  // Game over and RESET option
   if(gameState===END){
    forest.velocityX=0;
     obstacleGroup.setVelocityXEach(0);   
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setVelocityXEach(0);
     foodGroup.setLifetimeEach(-1);
      monkey.changeAnimation("collide", monkey_collide);
      reset.visible=true;
     if(mousePressedOver(reset)){
        foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("running", monkey_running);
      score = 0;
      gameState = PLAY; 
      forest.velocityX=-(10+survivaltime*3/100);
      reset.visible=false; 
        }
  
    
       }      
  drawSprites();
  fill("white");
  textSize(20);
   text("SCORE: "+ score, 100,50);
  //survivaltime=0;
   text("SURVIVAL TIME: "+ survivaltime, 250,50);
    monkey.collide(invisibleground);
  if(gameState===END){
    fill("red");
    textSize(30);
    textAlign("algerian");
    text("GAME OVER!!!", 180,180);
    
  }
    
}
    
  function obstacles(){
  if((frameCount % 60==0)){
     obstacle=createSprite(600,510,50,60);  
      obstacle.addImage(obstacleImage);
     // obstacle.debug = true ;
      obstacle.scale=0.3;
      obstacle.velocityX=-(20+survivaltime*3/100);  
      obstacle.setCollider("circle" , 0,0,40);
      obstacle.lifetime=200;
    
         obstacleGroup.add(obstacle);         
 }
  }
  function banana(){
  if((frameCount % 140==0)){
      food=createSprite(600,400,50,60);  
      food.addImage(foodImage);
      //food.debug = true ;
      food.setCollider("circle" , 0,0,10);
      food.scale=0.13;
      food.velocityX=-(20+survivaltime*3/100);  
      food.lifetime=200;
      foodGroup.add(food); 
              
 }
  }





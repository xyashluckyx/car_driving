var playerCar, ground;
var playerCarImg,groundImg;
var leftbd,rightbd;
var edges;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle7,obstacle8;
var obstacle1Img, obstacle2Img,obstacle3Img,obstacle4Img,obstacle5Img,obstacle6Img;
var obstacle7Img,obstacle8Img;
var score=0;
var START=0
var PLAY=1;
var END=2;
var INCREASEFUEL=3;
var ALERT=4;
var gameState=START;
var obstacleGroup;
var fuel1=1000;
var score2=0;
var score3=0;
var score4=0;

function preload(){
    groundImg=loadImage("images/track.jpg");

    playerCarImg=loadImage("images/car5.png");

    obstacle1Img=loadImage("images/car1.png");

    obstacle2Img=loadImage("images/car2.png");

    obstacle3Img=loadImage("images/car3.png");

    obstacle4Img=loadImage("images/car4.png");

    obstacle5Img=loadImage("images/car1.jpg");

    obstacle6Img=loadImage("images/car6.jpg");

    obstacle7Img=loadImage("images/car7.jpg");

    obstacle8Img=loadImage("images/truck.jpg");

    startImg=loadImage("images/play.png");

    goodJobImg=loadImage("images/goodjob.png");

    wowImg=loadImage("images/wow.png");

    restartImg=loadImage("images/restart.png");

    treeImg=loadImage("images/plants.png");

    sides=loadImage("images/sides.jpg");

    fuelImg=loadImage("images/fuel.png");

    dividerImg=loadImage("images/divider.jpg");

    flowerImg=loadImage("images/plant.png");

    alertImg=loadImage("images/alert.jpg");

    //sound=loadSound("sounda/sound.mp3");

    sound3=loadSound("sounda/sound3.wav");

    sound2=loadSound("sounda/sound2.wav");
}

function setup(){
  createCanvas(1400,900);
  
  ground=createSprite(700,400,10,10);
  ground.velocityY=(15 + 0.5*score/100);
  ground.addImage(groundImg);
  ground.scale=2.6;

  side1=createSprite(20,400,10,10);
  side1.velocityY=(15 + 0.5*score/100);
  side1.addImage(sides);
  side1.scale=0.2;

  side2=createSprite(1380,400,10,10);
  side2.velocityY=(15 + 0.5*score/100);
  side2.addImage(sides);
  side2.scale=0.2;

  playerCar=createSprite(550,1000,100,100);
  playerCar.velocityY=-10;
  playerCar.addImage(playerCarImg);
  playerCar.scale=0.8;

  select_message=Math.round(random(1,4));

  leftbd=createSprite(70,450,5,900);
  leftbd.visible=false;

  rightbd=createSprite(1330,450,5,900);
  rightbd.visible=false;

  start=createSprite(680,450,50,50);
  start.addImage(startImg);
  start.scale=0.2;
  start.visible=false;

  restart=createSprite(700,450,100,100);
  restart.addImage(restartImg);
  restart.scale=0.1;
  restart.visible=false;

  goodJob=createSprite(690,375,10,10);
  goodJob.addImage(goodJobImg);
  goodJob.scale=0.2;
  goodJob.visible=false;

  wow=createSprite(690,450,10,10);
  wow.addImage(wowImg);
  wow.scale=0.2;
  wow.visible=false;

  Alert=createSprite(680,450,10,10);
  Alert.addImage(alertImg);
  Alert.scale=1;
  Alert.visible=false;

  obstacleGroup=new Group();

  obstacle2Group=new Group();

  treesGroup=new Group();

  trees2Group=new Group();

  fuelGroup=new Group();

  dividerGroup=new Group();

  flowerGroup=new Group();

  flower2Group=new Group();

  flower3Group=new Group();

  flower4Group=new Group();

  flower5Group=new Group();

  flower6Group=new Group();

  flower7Group=new Group();

  flower8Group=new Group();

  flower9Group=new Group();

  score=0;
}

function draw(){
  background("black");

  console.log(gameState);

  if(gameState===START){
    side1.velocityY=0;
    side2.velocityY=0;
    start.visible=true;
    playerCar.y=750;
    playerCar.velocityY=0;
    ground.velocityY=0;
    obstacleGroup.setVelocityYEach(0);

    if(mousePressedOver(start)){
      playerCar.y=1000;
      gameState=PLAY;
    }
  }

  if(gameState===PLAY){
    goodJob.visible=false;

    wow.visible=false;

    if(keyDown("space")){
      sound2.play();

    }

    if(fuel1===200){
      score4=0;
      sound3.play();
      gameState=ALERT;
    }

    if(fuel1===0){
      gameState=END;
    }

    fuel1 = fuel1 - Math.round(getFrameRate()/60);

    if(dividerGroup.isTouching(playerCar)){
      gameState=END;
    }

    if(obstacle2Group.isTouching(playerCar)){
      gameState=END;
    }

    if(fuelGroup.isTouching(playerCar)){
      select_message=Math.round(random(1,4));

      gameState=INCREASEFUEL;
      fuel1=1000;
      score2=0;
      score3=0;

    }

  
    Divider();

    spawntreesR();

    spawntreesL();

    Fuel();

    spawnObstaclesDOWN();

    spawnObstaclesUP();

    restart.visible=false;

    playerCar.velocityY=-10;

    if(playerCar.y<=750){
      playerCar.velocityY=0;
    }

    ground.velocityY=(15 + 0.5*score/100);

    start.visible=false;

    score = score + Math.round(getFrameRate()/60);

    playerCar.collide(leftbd);
    playerCar.collide(rightbd);

  if(ground.y>800){
    ground.y=400;
  }

  if(side1.y>100){
    side1.y=400;
  }

  if(side2.y>100){
    side2.y=400;
  }


  if(keyDown(RIGHT_ARROW)){
    playerCar.x=playerCar.x+10;
  }
  
  if(keyDown(LEFT_ARROW)){
    playerCar.x=playerCar.x-10;
  }

  if(obstacleGroup.isTouching(playerCar)){
    gameState=END;
  }
}


if(gameState===INCREASEFUEL){
  fuelGroup.destroyEach();

  if(keyDown("space")){
    sound2.play();

  }

  if(fuel1===200){
    score4=0;
    sound3.play();
    gameState=ALERT;
  }

  if(fuel1===0){
    gameState=END;
  }

  fuel1 = fuel1 - Math.round(getFrameRate()/60);

  if(dividerGroup.isTouching(playerCar)){
    gameState=END;
  }

  if(obstacle2Group.isTouching(playerCar)){
    gameState=END;
  }

  if(fuelGroup.isTouching(playerCar)){
    select_message=Math.round(random(1,4));

    gameState=INCREASEFUEL;
    fuel1=1000;
    score2=0;
    score3=0;

  }


  Divider();

  spawntreesR();

  spawntreesL();

  Fuel();

  spawnObstaclesDOWN();

  spawnObstaclesUP();

  restart.visible=false;

  playerCar.velocityY=-10;

  ground.velocityY=(15 + 0.5*score/100);

  start.visible=false;

  score = score + Math.round(getFrameRate()/60);

  playerCar.collide(leftbd);
  playerCar.collide(rightbd);

  if(keyDown("space")){
    sound2.play();

  }

if(ground.y>800){
  ground.y=400;
}

if(side1.y>100){
  side1.y=400;
}

if(side2.y>100){
  side2.y=400;
}

if(playerCar.y<=750){
  playerCar.velocityY=0;
}

if(keyDown(RIGHT_ARROW)){
  playerCar.x=playerCar.x+10;
}

if(keyDown(LEFT_ARROW)){
  playerCar.x=playerCar.x-10;
}

if(obstacleGroup.isTouching(playerCar)){

  gameState=END;
}

if(select_message==1){
  score2 = score2 + Math.round(getFrameRate()/60);
  goodJob.visible=true;
} 
else if(select_message==2){
  score3 = score3 + Math.round(getFrameRate()/60);
  wow.visible=true;
}
else if(select_message==3){
  score3 = score3 + Math.round(getFrameRate()/60);

}
else if(select_message==4){
  score3 = score3 + Math.round(getFrameRate()/60);

}

if(score2>=25){
  goodJob.visible=false;
  gameState=PLAY;
}

if(score3>=25){
  wow.visible=false;
  gameState=PLAY;
}

}

if(gameState===ALERT){
  if(keyDown("space")){
    sound2.play();

  }

  if(fuel1===200){
    score4=0;
    sound3.play();
    gameState=ALERT;
  }

  if(fuel1===0){
    gameState=END;
  }

  fuel1 = fuel1 - Math.round(getFrameRate()/60);

  if(dividerGroup.isTouching(playerCar)){
    gameState=END;
  }

  if(obstacle2Group.isTouching(playerCar)){
    gameState=END;
  }

  if(fuelGroup.isTouching(playerCar)){
    select_message=Math.round(random(1,4));

    gameState=INCREASEFUEL;
    fuel1=1000;
    score2=0;
    score3=0;

  }

  //sound.stop();

  Divider();

  spawntreesR();

  spawntreesL();

  Fuel();

  spawnObstaclesDOWN();

  spawnObstaclesUP();

  restart.visible=false;

  playerCar.velocityY=-10;

  ground.velocityY=(15 + 0.5*score/100);

  start.visible=false;

  score = score + Math.round(getFrameRate()/60);

  playerCar.collide(leftbd);
  playerCar.collide(rightbd);

  if(keyDown("space")){
    sound2.play();

  }

if(ground.y>800){
  ground.y=400;
}

if(side1.y>100){
  side1.y=400;
}

if(side2.y>100){
  side2.y=400;
}

if(playerCar.y<=750){
  playerCar.velocityY=0;
}

if(keyDown(RIGHT_ARROW)){
  playerCar.x=playerCar.x+10;
}

if(keyDown(LEFT_ARROW)){
  playerCar.x=playerCar.x-10;
}

if(obstacleGroup.isTouching(playerCar)){
  gameState=END;
}

  Alert.visible=true;
  score4 = score4 + Math.round(getFrameRate()/60);


if(score4>=10){
  Alert.visible=false;
}

if(score4>=15){
  Alert.visible=true;
}

if(score4>=20){
  Alert.visible=false;
}

if(score4>=25){
  Alert.visible=true;
}

if(score4>=30){
  Alert.visible=false;
}

if(score4>=35){
  Alert.visible=true;
}

if(score4>=40){
  Alert.visible=false;
}

if(score4>=45){
  Alert.visible=true;
}

if(score4>=50){
  Alert.visible=false;
}

if(score4>=55){
  Alert.visible=true;
}

if(score4>=60){
  Alert.visible=false;
}

if(score4>=65){
  Alert.visible=true;
}

if(score4>=70){
  Alert.visible=false;
  gameState=PLAY;
}
}


else if(gameState===END){
  //console.log("hello");
   //sound.play();
   flowerGroup.setLifetimeEach(-1);
   flowerGroup.setVelocityYEach(0);
   flower2Group.setLifetimeEach(-1);
   flower2Group.setVelocityYEach(0);
   flower3Group.setLifetimeEach(-1);
   flower3Group.setVelocityYEach(0);
   flower4Group.setLifetimeEach(-1);
   flower4Group.setVelocityYEach(0);
   flower5Group.setLifetimeEach(-1);
   flower5Group.setVelocityYEach(0);
   flower6Group.setLifetimeEach(-1);
   flower6Group.setVelocityYEach(0);
   flower7Group.setLifetimeEach(-1);
   flower7Group.setVelocityYEach(0);
   flower8Group.setLifetimeEach(-1);
   flower8Group.setVelocityYEach(0);
   flower9Group.setLifetimeEach(-1);
   flower9Group.setVelocityYEach(0);
   dividerGroup.setLifetimeEach(-1);
   dividerGroup.setVelocityYEach(0);
   obstacle2Group.setVelocityYEach(0);
   obstacle2Group.setLifetimeEach(-1);
   fuelGroup.setLifetimeEach(-1);
   fuelGroup.setVelocityYEach(0);
  side1.velocityY=0;
  side2.velocityY=0;
  treesGroup.setVelocityYEach(0);
  treesGroup.setLifetimeEach(-1);
  trees2Group.setVelocityYEach(0);
  trees2Group.setLifetimeEach(-1);
  obstacleGroup.setVelocityYEach(0);
  ground.velocityY=0;
  obstacleGroup.setLifetimeEach(-1);
  playerCar.velocityY=0;
  restart.visible=true;
  Alert.visible=false;
  wow.visible=false;
  goodJob.visible=false;

  if(mousePressedOver(restart)){
    playerCar.y=1000;
    flowerGroup.destroyEach();
    flower2Group.destroyEach();
    flower3Group.destroyEach();
    flower4Group.destroyEach();
    flower5Group.destroyEach();
    flower6Group.destroyEach();
    flower7Group.destroyEach();
    flower8Group.destroyEach();
    flower9Group.destroyEach();
    obstacle2Group.destroyEach();
    dividerGroup.destroyEach();
    obstacleGroup.destroyEach();
    treesGroup.destroyEach();
    trees2Group.destroyEach();
    fuelGroup.destroyEach();
    fuel1=1000;
    score=0;
    gameState=PLAY;
  }
}



  drawSprites();

  if(gameState===START){
    fill("blue");
    textSize(60);
    text("PLAY",610,560);
  }

  if(gameState===ALERT){
    fill("red");
    textSize(60);
    text("Fuel is Low",550,650);
  }

  if(gameState===END){
  fill("red");
  textSize(80);
  text("Game Over",500,350);

  fill("blue");
  textSize(60);
  text("RESTART",550,600);
  }

  fill("red");
  textSize(40);
  text("Fuel: "+ fuel1,1200,50);

  fill("red");
  textSize(40);
  text("Score: "+ score,50,50);
}

function spawnObstaclesUP(){
  if(frameCount%40===0){
    var Obstacle=createSprite(random(100,630),0,10,10);
    Obstacle.velocityY=(5 + 0.5*score/100);

    var obstacle=Math.round(random(1,4));
    switch(obstacle){
    case 1 : Obstacle.addImage(obstacle1Img);
    break;
    case 2 : Obstacle.addImage(obstacle2Img);
    break;
    case 3 : Obstacle.addImage(obstacle3Img);
    break;
    case 4 : Obstacle.addImage(obstacle4Img);
    break;
    default: break;

  }
  Obstacle.scale=1.4;
  Obstacle.lifetime=200;
  obstacle2Group.add(Obstacle);

}
}

function spawnObstaclesDOWN(){
  if(frameCount%40===0){
    var Obstacle2=createSprite(random(800,1215),0,10,10);
    Obstacle2.velocityY=(10 + 0.5*score/100);

    var obstacle2=Math.round(random(1,4));
    switch(obstacle2){
    case 1 : Obstacle2.addImage(obstacle5Img);
    break;
    case 2 : Obstacle2.addImage(obstacle6Img);
    break;
    case 3 : Obstacle2.addImage(obstacle7Img);
    break;
    case 4 : Obstacle2.addImage(obstacle8Img);
    break;
    default: break;

  }
  Obstacle2.scale=0.8;

  Obstacle2.lifetime=110;
  obstacleGroup.add(Obstacle2);
}
}

function spawntreesL(){
  if(frameCount%15===0){
    var trees=createSprite(30,0,10,10);
    trees.velocityY=(10 + 0.5*score/100);
    trees.addImage(treeImg);
    trees.scale=0.04;
    trees.lifetime=110;
    treesGroup.add(trees);
}
}

function spawntreesR(){
  if(frameCount%15===0){
    var trees2=createSprite(1370,0,10,10);
    trees2.velocityY=(10 + 0.5*score/100);
    trees2.addImage(treeImg);
    trees2.scale=0.04;
    trees2.lifetime=110;
    trees2Group.add(trees2);
}
}

function Fuel(){
  if(frameCount % 500===0){
    fuel=createSprite(random(50,1350),0,200,200);
    fuel.addImage(fuelImg);
    fuel.scale=0.3;
    fuel.velocityY=10;
    fuel.lifetime=100
    fuelGroup.add(fuel);
  } ``
}

function Divider(){
  if(frameCount % 130===0){
    divider=createSprite(700,-500,50,1000);
    divider.addImage(dividerImg);
    divider.scale=3;
    divider.velocityY=(10+0.5*score/100);
    divider.lifetime=190;
    divider.depth=wow.depth;
    wow.depth=wow.depth+1;
    divider.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    divider.depth=restart.depth;
    restart.depth=restart.depth+1;

    dividerGroup.add(divider);

    var flower=createSprite(100,100,200,200);
    flower.velocityY=(10+0.5*score/100);
    flower.addImage(flowerImg);
    flower.scale=0.2;
    flower.y=divider.y;
    flower.x=divider.x;
    flower.lifetime=190;
    flower.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower.depth;
    restart.depth=restart.depth+1;
    flower.depth=divider.depth;
    divider.depth=divider.depth-1;
    flower.depth=wow.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower.depth;
    Alert.depth=Alert.depth+1;

    flowerGroup.add(flower);

    var flower2=createSprite(100,100,200,200);
    flower2.velocityY=(10+0.5*score/100);
    flower2.addImage(flowerImg);
    flower2.scale=0.2;
    flower2.y=divider.y+90;
    flower2.x=divider.x;
    flower2.lifetime=190;
    flower2.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower2.depth;
    restart.depth=restart.depth+1;
    flower2.depth=wow.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower2.depth;
    Alert.depth=Alert.depth+1;

    flower2Group.add(flower2);

    var flower3=createSprite(100,100,200,200);
    flower3.velocityY=(10+0.5*score/100);
    flower3.addImage(flowerImg);
    flower3.scale=0.2;
    flower3.y=divider.y+180;
    flower3.x=divider.x;
    flower3.lifetime=190;
    flower3.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower3.depth;
    restart.depth=restart.depth+1;
    flower3.depth=wow.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower3.depth;
    Alert.depth=Alert.depth+1;

    flower3Group.add(flower3);

    var flower4=createSprite(100,100,200,200);
    flower4.velocityY=(10+0.5*score/100);
    flower4.addImage(flowerImg);
    flower4.scale=0.2;
    flower4.y=divider.y+270;
    flower4.x=divider.x;
    flower4.lifetime=190;
    flower4.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower4.depth;
    restart.depth=restart.depth+1;
    flower4.depth=wow.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower4.depth;
    Alert.depth=Alert.depth+1;

    flower4Group.add(flower4);

    var flower5=createSprite(100,100,200,200);
    flower5.velocityY=(10+0.5*score/100);
    flower5.addImage(flowerImg);
    flower5.scale=0.2;
    flower5.y=divider.y+360;
    flower5.x=divider.x;
    flower5.lifetime=190;
    flower5.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower5.depth;
    restart.depth=restart.depth+1;
    flower5.depth=wow.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower5.depth;
    Alert.depth=Alert.depth+1;

    flower5Group.add(flower5);

    var flower6=createSprite(100,100,200,200);
    flower6.velocityY=(10+0.5*score/100);
    flower6.addImage(flowerImg);
    flower6.scale=0.2;
    flower6.y=divider.y-90;
    flower6.x=divider.x;
    flower6.lifetime=190;
    flower6.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower6.depth;
    restart.depth=restart.depth+1;
    wow.depth=flower6.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower6.depth;
    Alert.depth=Alert.depth+1;

    flower6Group.add(flower6);

    var flower7=createSprite(100,100,200,200);
    flower7.velocityY=(10+0.5*score/100);
    flower7.addImage(flowerImg);
    flower7.scale=0.2;
    flower7.y=divider.y-180;
    flower7.x=divider.x;
    flower7.lifetime=190;
    flower7.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower7.depth;
    restart.depth=restart.depth+1;
    wow.depth=flower7.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower7.depth;
    Alert.depth=Alert.depth+1;

    flower7Group.add(flower7);

    var flower8=createSprite(100,100,200,200);
    flower8.velocityY=(10+0.5*score/100);
    flower8.addImage(flowerImg);
    flower8.scale=0.2;
    flower8.y=divider.y-270;
    flower8.x=divider.x;
    flower8.lifetime=190;
    flower8.depth=goodJob.depth;
    goodJob.depth=goodJob.depth+1;
    restart.depth=flower8.depth;
    restart.depth=restart.depth+1;
    wow.depth=flower8.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower8.depth;
    Alert.depth=Alert.depth+1;

    flower8Group.add(flower8);

    var flower9=createSprite(100,100,200,200);
    flower9.velocityY=(10+0.5*score/100);
    flower9.addImage(flowerImg);
    flower9.scale=0.2;
    flower9.y=divider.y-360;
    flower9.x=divider.x;
    flower9.lifetime=190;
    flower9.depth=goodJob.depth;
    flower9.depth=goodJob.depth+1;
    restart.depth=flower9.depth;
    restart.depth=restart.depth+1;
    wow.depth=flower9.depth;
    wow.depth=wow.depth+1;
    Alert.depth=flower9.depth;
    Alert.depth=Alert.depth+1;

    flower9Group.add(flower9);
  }
}
var ground,groundImg
var trex,trexImg,trex_collided
var invisiGround
var coinImg,dinoImg
var score = 0,coin = 0,hcoin = 0
var coinGroup,dinoGroup,bulletGroup
var gun,gunImg
var bulletImg,bulletNum = 100
var START = 2
var PLAY = 1
var END = 0
var gameState = START
var gameOver,gameOverImg 
var restart,restartImg
var play,playImg
var coins,coinsImage
var home,homeImg


function preload(){
  bg = loadImage("assets/bgg.jpg")
  groundImg = loadImage("assets/ground.png")
  trexImg = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png")
  trex_collided = loadImage("assets/trex_collided.png")
  coinImg = loadImage("assets/coin.png")
  dinoImg = loadImage("assets/dino.png")
  gunImg = loadImage("assets/gun.png")
  bulletImg = loadImage("assets/bullet.png")
  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")
  playImg = loadImage("assets/start.png")
  coinsImg = loadImage("assets/coin.png")
  homeImg = loadImage("assets/home.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
    
  ground = createSprite(width/2,height,width,2)
  ground.addImage("ground",groundImg)
  // ground.scale = 0.7
  

  trex = createSprite(150,620,100,50)
  trex.addAnimation("running",trexImg)
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.2

  gun = createSprite(180,620,100,50)
  gun.addImage(gunImg)
  gun.scale = 0.3

  play = createSprite(width/2,500,100,100)
  play.addImage(playImg)
  play.scale = 1
  play.visible = false

  coins = createSprite(100,50,100,100)
  coins.addImage(coinsImg)
  coins.scale = 0.1
  coins.visible = false

  home = createSprite(100,50,100,100)
  home.addImage(homeImg)
  home.scale = 0.1
  home.visible = false

  gameOver = createSprite(width/2,300,100,100)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 1.5
  gameOver.visible = false

  restart = createSprite(width/2,400,100,100)
  restart.addImage(restartImg)
  restart.scale = 0.2
  restart.visible = false

  invisiGround = createSprite(150,700,100,20)
  invisiGround.visible = false  

  invisiGround2 = createSprite(150,640,100,20)
  invisiGround2.visible = false  

  coinGroup = new Group()
  dinoGroup = new Group()
  bulletGroup = new Group()
}

function draw() {
  //trex.debug = true;
  background(bg);
  if(gameState === START)
  {
    play.visible = true
    coins.visible = true
    home.visible = false
    gameOver.visible = false
    restart.visible = false
    textSize(30)
    text(hcoin,150,60)
    score = 0
    coin = 0
    if(mousePressedOver(play))
    {
      gameState = PLAY
    }
    ground.velocityX = 0
    coinGroup.setVelocityXEach(0)
    dinoGroup.setVelocityXEach(0) 
    coinGroup.destroyEach()
    dinoGroup.destroyEach()
  }
  if(gameState === PLAY)
  {
    home.visible = true
     if(mousePressedOver(home))
     {
       gameState = START
     }
    play.visible = false
    coins.visible = false
    ground.velocityX = -(6 + 3*score/200)
    score = score + Math.round(getFrameRate()/60)

    if(ground.x < 0)
    {
          ground.x = ground.width/2
    }
    if(coinGroup.isTouching(trex))
   {
     coinGroup.destroyEach()
     coin += 10
     hcoin += 10
   }

   if(keyDown(UP_ARROW) && trex.y >= height-320)
   {
     trex.velocityY = -12
     gun.velocityY = -12
   }
   trex.velocityY = trex.velocityY + 0.8
   gun.velocityY = gun.velocityY + 0.8

   if(dinoGroup.isTouching(bulletGroup))
   {
    dinoGroup.destroyEach()
    bulletGroup.destroyEach()
   }

   if(dinoGroup.isTouching(trex))
   {
     gameState = END
   }
   spawnDino()
   spawnCoin() 
   spawnBullet()
  textSize(20)
  text("Meters :- "+score,100,100)
  text("Coins :- "+coin,100,200)
  text("Bullets :- "+bulletNum,100,150)
  
  }

  else if(gameState === END)
  {
    if(mousePressedOver(home))
    {
      gameState = START
    }
    gameOver.visible = true
    restart.visible = true
    trex.changeAnimation("collided",trex_collided)
    ground.velocityX = 0
    bulletGroup.setVelocityXEach(0)
    dinoGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
    bulletGroup.destroyEach()
    if(mousePressedOver(restart))
    {
      reset()
    }
  }
  trex.collide(invisiGround)
  gun.collide(invisiGround2)
  
   drawSprites();
}

 function spawnCoin() {
   if(frameCount % 100 === 0)
   {
   var coin = createSprite(1500,random(300,600),50,50)
   coin.addImage(coinImg)
   coin.scale = 0.1
   coin.velocityX = -(6 + 3*score/200)
   coinGroup.add(coin)
   }
 
 }

 function spawnDino() {
 
   if(frameCount % 160 === 0)
   {
     var dino = createSprite(1500,630,20,20)
     dino.addImage(dinoImg)
     dino.scale = 0.7
     dino.velocityX = -(6 + 3*score/200)
     dinoGroup.add(dino)
   }
  
 }

 function spawnBullet() {
 
  if(keyDown("f") && bulletNum > 0)
  {
    var bullet = createSprite(180,gun.position.y,100,50)
    bullet.addImage(bulletImg)
    bullet.scale = 0.1
    bullet.velocityX = 10
    bulletNum -= 1
    bulletGroup.add(bullet)
  }
 
}

function reset()
{
  gameState = PLAY
  score = 0
  coin = 0
  gameOver.visible = false
  restart.visible = false
  trex.changeAnimation("running",trexImg)
  coinGroup.destroyEach()
  dinoGroup.destroyEach()
}
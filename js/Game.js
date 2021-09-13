class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200,100,100);
    car1.addImage(carImg1);
    car2=createSprite(300,200,100,100);
    car2.addImage(carImg2);
    car3=createSprite(500,200,100,100);
    car3.addImage(carImg3);
    car4=createSprite(700,200,100,100);
    car4.addImage(carImg4);
    cars=[car1,car2,car3,car4]
    
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display_position = 130;
      var index=0;
      var x=175,y
      for(var plr in allPlayers){
        index=index+1
        x=x+200
        y=displayHeight-allPlayers[plr].distance
        cars[index-1].x=x;
        cars[index-1].y=y;
        textAlign(CENTER)
        textSize(15);
        fill("white");
        text(allPlayers[plr].name , cars[index-1].x,cars[index-1].y+75)
        if(index===player.index){
          stroke(10);
          fill("yellow");
          ellipse(x,y,70,70)
            cars[index-1].shapeColor="yellow"
            camera.position.x=displayWidth/2;
            camera.position.y=cars[index-1].y
        }

        //display_position+=20;
        
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3850){
       gameState=2;
       player.rank=player.rank+1;
       Player.updatecarsAtEnd(player.rank);
       player.update()
    }

    drawSprites();
   }
   gameEnd(){
     console.log("GAME OVER");
     console.log("YOUR RANK :"+player.rank);
   }
}

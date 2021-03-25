class Game {
    constructor() {

    }

    getState() {
        //Reading from database : 
        //.ref -> which column in DB you want to refer too,  
        //.on-->opening a listener to read the dats from database 

        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) { gameState = data.val() })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        car1 = createSprite(100, 200);
        car1.addImage("car1",car1Image);

        car2 = createSprite(300, 200);
        car2.addImage("car2",car2Image);

        car3 = createSprite(500, 200);
        car3.addImage("car3",car3Image);

        car4 = createSprite(700, 200);
        car4.addImage("car4",car4Image);

        
        cars = [car1, car2, car3, car4]
    }


    play() {
        form.hide();
        textSize(30);
        text("Game Start", 120, 100);

        Player.getPlayerInfo();
        player.getCarsAtEnd();

        if (allPlayers !== undefined) {
            background("#c68767");
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
            var index=0;
            var x=175;
            var y;

           // jahanvi     name1   name2   name4
           // dist:0     dist:0   dist:0  dist:0

            for (var plr in allPlayers)
            {
               index=index+1; //1
               x=x+200;// 200
               y=displayHeight-allPlayers[plr].distance;//displayHeight
               cars[index-1].x = x;
               cars[index-1].y = y;

               if(index===player.index){
                stroke(10);
                fill("red");
                ellipse(x,y,60,60);

                
                cars[index - 1].shapeColor = "red";
                camera.position.x=displayWidth/2;
                camera.position.y=cars[index-1].y;
               }
            }
        }
        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 50
            player.update();
        }
        if(player.distance>3860)
            {
                gameState=2;
                player.rank+=1;
                player.update();
                Player.updateCarsAtEnd(player.rank);
                
            }
        drawSprites()
    }

     end()
     {
        camera.position.x =0;
        camera.position.y = 0;
        imageMode(CENTER);
        Player.getPlayerInfo();
        console.log("Game Ended");
        fill("red");
        textAlign(CENTER);
        textSize(50);

        for(var plr in allPlayers)
        {
            console.log(allPlayers[plr].rank)
            if(allPlayers[plr].rank === 1)
            {
                text("1st :  "+allPlayers[plr].name,0,85);
      
            }
            else if(allPlayers[plr].rank === 2){
                text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
              }


        }

     }


}
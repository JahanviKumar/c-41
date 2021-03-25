class Player {

    constructor() {
    this.index=null;
     this.distance = 0;
     this.name=null;
    this.rank=0;   


    }


    deletePlayerAll(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.remove();
    }
    
    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", function (data) {
            playerCount = data.val();
        })

    }


    getCarsAtEnd() {
        var carsAtEndRef = database.ref('CarsAtEnd');
        carsAtEndRef.on("value", (data)=> {
            this.rank = data.val();
        })

    }

    static updateCarsAtEnd(rank) {
       console.log(rank);
        database.ref('/').update({
            CarsAtEnd: rank
        });
    }

    updateCount(count) {

        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
    //players
     //   player1
         
      //  player2

      //  player3

    var playerIndex="players/player"+this.index;
    database.ref(playerIndex).set({
        name:this.name,
        distance: this.distance,
        rank:this.rank
    });

    }


    static getPlayerInfo(){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
          })
    }

}
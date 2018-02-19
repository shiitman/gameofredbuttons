class NuclearAI extends Player{
	constructor(gameManager, button, nuclear, name, image){
		super(gameManager, button, nuclear, name, image);
		var self=this;
		this.agression=6;//Math.round(Math.random()*20)+1;
		this.defence=9;Math.round(Math.random()*20)+1;
		this.startInterval();	
	}

	playerShot(){
		super.playerShot();
		this.stopInterval();
	}

    killPlayer(){
		super.killPlayer();
		this.stopInterval();
	}
	
	pressOrNot(){
	//	console.log(this);
		var self=this;
	//	console.log("Interval called");
		var rndm=Math.random();

		var offence=rndm*Math.sqrt(this.button.radius);
		var defence=rndm*Math.sqrt(this.gameManager.otherPlayer().button.radius);

		if (offence<this.agression && defence<this.defence){
			this.stopInterval();
			this.button.pressButton();
		}
	}
    reactivatePlayer(){
		super.reactivatePlayer();
		if (this.alive==1){		
			this.startInterval();
	//		console.log("REACTIVATE INTERVAL");
		}
	}
	startInterval(){
		var self=this;
		this.stopInterval();
		this.interval=setInterval(function(){self.pressOrNot();}, this.gameManager.speed*10);
	//	console.log("START INTERVAL");
	}
		
	stopInterval(){
		if (this.interval){
			clearInterval(this.interval);
			this.interval=null;
	//		console.log("STOP INTERVAL", this.name);
		}
	}
	
}
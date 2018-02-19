class Player{
    constructor(gameManager, button, nuclear, name, image){
        this.gameManager=gameManager;
        this.button=button;
        this.button.player=this;
        this.nuclear=nuclear;
        this.name=name;
        this.label= new TextLabel(gameManager.paper, button.x, button.y+65,  this.name, 30);
        this.button.startGrowing();
        this.alive=1;
		this.avatar =gameManager.paper.image(image, button.x-50, button.y-50, 100, 100);
		this.label.label.toBack();
		this.avatar.toBack();
    }

    goingNuclear(radius){
	//	console.log("GOING NUCLEAR", this.name);
	   	var self=this;
	    var r=Math.random()*20;
	    if (/*true*/ r<Math.sqrt(radius)){
            self.button.hideButton();   
			if (self.alive==1){
			    self.label.animateCaption("Button works good!");
				self.alive=2;
				self.playerShot();
			}
		
			self.gameManager.nuclearBlast(this);

		}
	    else {			
			if (self.alive==1){
		   			self.label.animateCaption("Button too small!");
					setTimeout(function(){self.label.animateCaption(self.name); }, self.gameManager.speed*20);
					self.resetAvatar();
					setTimeout(function(){self.reactivatePlayer();}, this.gameManager.speed*5);
			}else {
		//		console.log("DOOMSDAY NOT SUCCEED", this.name);
				self.gameManager.endGame();
			}
    	}
    }   
        
    reactivatePlayer(){
		if (this.alive==1){	
			this.button.startButton();
		}
    }

	resetAvatar(){
		this.avatar.animate({"x":this.button.x-50, "y":this.button.y-50, "width":100, "height":100}, this.gameManager.speed*5, "bounce");
		this.label.label.animate({"y":this.button.y+65}, this.gameManager.speed*5, "bounce");

	}

	resizeAvatar(r){
		this.avatar.attr({"x":this.button.x-25-r*0.5, "y":this.button.y-25-r*0.5, "width":r+50, "height":r+50});
		this.label.label.attr("y", this.button.y+25+0.5*r+15);
	}

    killPlayer(){
		if (this.alive==0){
			return;
		}
	//	console.log("killing "+this.name );
		if (this.alive==1){
			this.alive=0;
			this.doomsdayWeapon();
		}
		else{
			this.alive=0;
		}

        this.nuclear.nuclearBlast();
		this.avatar.animate({"x":this.nuclear.x+this.nuclear.width/2-110, "y":this.nuclear.y+10, "width":200, "height":200}, this.gameManager.speed*10, "bounce");
		this.avatar.animate({"opacity":0.1}, this.gameManager.speed*50, "bounce");
		//this.label.label.animate({"x":this.nuclear.x+this.nuclear.width/2-110, "y":this.nuclear.y+300, "width":200, "height":200}, this.gameManager.speed*10, "bounce");
		//this.label.label.toFront();

		this.label.label.hide();
		this.avatar.toFront();
        this.button.fadeAway();

    }

	 playerShot(){
	//	this.avatar.hide();
	//	this.label.label.hide();
     //   this.alive=false;
        this.button.fadeAway();
    }

	doomsdayWeapon(){
	//	console.log("DOOMSDAY", this.name);
	if (Math.random()<0.5)
		this.button.pressButton();
	else
		this.gameManager.endGame();
	}

}
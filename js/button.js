class Button{
	constructor(gameManager,  minRadius, maxRadius, x, y){
		var self=this;
		this.gameManager=gameManager;
		this.paper = gameManager.paper;
		this.minRadius=minRadius;
		this.maxRadius=maxRadius;
		this.x=x;
		this.y=y;
				
		this.radius=this.minRadius;
		this.pressed=false;
	
		this.circle = this.paper.circle(x, y, this.radius);
		this.circle.attr("fill", "#ee0000");

		// Sets the stroke attribute of the circle to white
		this.circle.attr("stroke", "#ffffff").attr("opacity", "0.85");				
		this.circle.attr("stroke-width", "2");
	}

	cancelSelect(){
		this.pressed=false;
		this.circle.animate({"stroke": "#ffffff", "opacity":0.85}, this.gameManager.speed, "linear");
		
	}
	
	selectButton()	{
	if (this.pressed) return;
		this.circle.animate({"stroke": "#ff5555", "opacity":0.8}, this.gameManager.speed, "linear");//attr("stroke", "#dd0505");

	}

	disableInput(){
		var self=this;
		this.circle.unclick();		
	}

	fadeAway(){
		var self=this;

		
		this.circle.animate({"r":this.minRadius, "opacity":0}, this.gameManager.speed*5, "bounce", function(){self.hideButton();});	
	}

	hideButton(){

		this.stopGrowing();
		this.cancelSelect();
		this.circle.hide();
	}

	startButton(){
		this.circle.show();
		this.startGrowing();
	}

	initInput(player){
		var self=this;
		this.circle.hover(
				function()
				{self.selectButton(); },
				function()
				{self.cancelSelect();}
			);
			
		this.circle.click(function(){self.pressButton();});	
		this.circle.mousemove(function(){self.selectButton();})
		this.circle.mousedown(function(){self.pressed=true; self.circle.animate({"opacity":0.95}, self.gameManager.speed, "linear");})
	}
	
	increaseButton(){
		if (this.radius<this.maxRadius){
			this.radius++;
		}
		if (this.radius>50 && this.player){
			this.player.resizeAvatar(this.radius);
		}
		
		this.circle.attr("r", this.radius);
	
	}
	
	pressButton(){
		var self	=	this;
		var radius	=	self.radius;
		this.stopGrowing();
		this.pressed=false;
		this.cancelSelect();
		self.player.goingNuclear(radius);
		this.circle.animate({"r":this.minRadius}, this.gameManager.speed*5, "bounce", function(){});	
		this.radius=this.minRadius;

	}

	stopGrowing(){
		if (this.interval)
			clearInterval(this.interval);
	}	

	startGrowing(){
		var self=this;
		this.stopGrowing();
		this.interval=setInterval(function(){self.increaseButton();}, this.gameManager.speed);
	}


}
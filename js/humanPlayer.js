class HumanPlayer extends Player{
    constructor(gameManager, button, nuclear, name, image){
        super(gameManager, button, nuclear,  name, image);
        button.initInput(this);
    }

    killPlayer(){
        super.killPlayer();
    //    this.button.disableInput();
    }

    reactivatePlayer(){
		super.reactivatePlayer();
	//	this.button.initInput(this);
	}
}
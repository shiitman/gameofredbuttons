const PLAYERS = [{ "name": "Very Stable Genius", "image": "svg/trump.svg" }, { "name": "The Shining Sun", "image": "svg/kim.svg" }];
const NUCLEAR_IMAGE = "svg/nuclear-explosions.svg";

class TextLabel {
    constructor(paper, x, y, startText, size) {
        this.paper = paper;
        this.label = paper.text(x, y, startText).attr("font-size", size).attr("font-family", "Strangelove").attr("font-weight", "bold");
        this.x = x;
        this.y = y;
        this.size = size;
    }

    hide() {
        this.label.hide();
    }
    show() {
        this.label.show();
    }
    animateCaption(newCaption) {
        this.label.attr("text", newCaption);
        /*
            var self=this;
            var newText=this.paper.text(this.x, this.y, newCaption).attr("font-size", this.size).attr("font-family", "Strangelove").attr("font-weight", "bold");
            this.label.remove();
            this.label=newText;*/
    }
}

class GameManager {
    constructor(raphael) {
        var self = this;
        this.paper = raphael;
        this.speed = 100;
        this.menu = new Menu(this, PLAYERS);
        this.resize();

        this.game = false;

        window.onresize = function () {
            self.resize();
        }

        this.logger = new Logger();
        this.simulations = 1;

        document.onkeypress = function (event) {
            if (self.game != true)
                return;
            if (event.which == 13 && self.mode == 2) {
                self.buttons[1].pressButton();
                event.preventDefault();
            }
            if (event.which == 32 && self.mode != 3) {
                self.buttons[0].pressButton();
                event.preventDefault();
            }
        };
    }

    resize() {
        var width = 1200;
        var height = 700;
        if (window.innerWidth < 1200) {
            this.paper.DOM.style.left = 0;
            width = 1200 / window.innerWidth * 1200;
        }
        else {
            this.paper.DOM.style.left = (window.innerWidth - 1200) / 2;
        }

        if (window.innerHeight < 700 && window.innerWidth < 1200) {
            this.paper.DOM.style.top = 0;
            height = 700 / window.innerWidth * 700;
        }
        else {
            if (window.innerHeight > 700)
                this.paper.DOM.style.top = (window.innerHeight - 700) / 2;
        }

        this.paper.setViewBox(0, 0, width, height);
    }

    initGame(mode, player) {
        this.clearScreen();

        this.nuclear = [];
        this.nuclear.push(new NuclearBlast(this, 50, 50, 500, 500));
        this.nuclear.push(new NuclearBlast(this, 650, 50, 500, 500));

        this.buttons = [];
        this.buttons.push(new Button(this, 10, 200, 300, 300));
        this.buttons.push(new Button(this, 10, 200, 900, 300));

        this.mode = mode;
        this.players = [];
        this.shots = 0;

        if (mode == 1) {
            this.players.push(new HumanPlayer(this, this.buttons[0], this.nuclear[0], PLAYERS[player].name, PLAYERS[player].image));
            this.players.push(new NuclearAI(this, this.buttons[1], this.nuclear[1], PLAYERS[1 - player].name, PLAYERS[1 - player].image));
        }

        if (mode == 2) {
            this.players.push(new HumanPlayer(this, this.buttons[0], this.nuclear[0], PLAYERS[player].name, PLAYERS[player].image));
            this.players.push(new HumanPlayer(this, this.buttons[1], this.nuclear[1], PLAYERS[1 - player].name, PLAYERS[1 - player].image));
        }

        if (mode == 3) {
            this.players.push(new NuclearAI(this, this.buttons[0], this.nuclear[0], PLAYERS[0].name, PLAYERS[0].image));
            this.players.push(new NuclearAI(this, this.buttons[1], this.nuclear[1], PLAYERS[1].name, PLAYERS[1].image));
        }

        this.label = new TextLabel(this.paper, 600, 40, "Game of Red Buttons", 50);

        this.game = true;
    }

    clearScreen() {
        this.paper.clear();
    }
    nuclearBlast(player) {
        //	console.log("BLAST BY", player.name);
        var self = this;
        this.shots++;
        var shots = this.shots;
        //		console.log("BLASTS", this.shots);

        for (var i in this.players) {
            if (this.players[i] != player)
                this.players[i].killPlayer();
        }

        if (shots > 1) {
            //			console.log("END GAME AFTER NUCLEAR BLAST");
            this.endGame();
        }
    }

    endGame() {
        this.game = false;
        var self = this;
        //		console.log("END GAME");

        var draw = true;
        for (var i in this.players) {
            if (this.players[i].alive == 2) {
                this.label.animateCaption(this.players[i].name + " wins the Game of Red Buttons");
                this.players[i].playerShot();
                draw = false;
                break;
            }
        }

        if (draw) {
            this.label.animateCaption("Mutually assured destruction");
        }

        //	if (this.mode==1 || this.mode==2)

        this.menuButton();

        /*				if (this.mode==3){
                    //		this.simulations--;

                    //		console.log(this.logger);
                            if (this.simulations>0){
                        //		this.logger.addLogEntry(this.players);
                        //		setTimeout(function(){self.initGame(3, 0);}, 10*self.speed)
                            }
                            else    {
                                this.speed=100;
                            }
                        }*/
    }

    menuButton() {
        var self = this;
        this.replay = new TextLabel(this.paper, 600, 450, "Replay", 50);
        this.replay.label.hover();

        this.replay.label.click(function () {
            //      console.log(self.menu);
            self.initGame(self.mode, self.menu.selectedPlayer);
        });
        this.replay.label.hover(
            function () { this.attr({ "fill": "#ee0000", "cursor": "pointer" }); },
            function () { this.attr({ "fill": "#000000", "cursor": "default" }); },
        );

        this.menuB = new TextLabel(this.paper, 600, 500, "Main Menu", 50);
        this.menuB.label.hover();

        this.menuB.label.click(function () {
            self.clearScreen();
            self.menu.initMenu(PLAYERS);
            //		self.gameManager.initGame();
        });
        this.menuB.label.hover(
            function () { this.attr({ "fill": "#ee0000", "cursor": "pointer" }); },
            function () { this.attr({ "fill": "#000000", "cursor": "default" }); },
        );
    }

    otherPlayer(player) {
        for (var i in this.players) {
            if (this.players[i] != player)
                return this.players[i];
        }
    }
}
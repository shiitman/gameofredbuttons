class Menu {
    constructor(gameManager, players) {
        var self = this;

        this.gameManager = gameManager;
        this.paper = this.gameManager;
        this.initMenu(players);
    }

    initMenu(players) {
        var self = this;
        this.gameManager.game = false;
        this.startMenu = [];
        this.startMenu["onePlayerMode"] = this.buttonPrepare(function () { self.hideMenu(self.startMenu); self.showMenu(self.choosePlayerMenu); }, 600, 200, "One Player", 40);
        this.startMenu["twoPlayerMode"] = this.buttonPrepare(function () { self.hideMenu(self.startMenu); self.showMenu(self.choosePlayer2Menu); }, 600, 250, "Two Players", 40);
        this.startMenu["autoSimulaton"] = this.buttonPrepare(function () { self.gameManager.initGame(3, 0); }, 600, 300, "AI Match", 40);
        this.startMenu["help"] = this.buttonPrepare(function () { self.hideMenu(self.startMenu); self.showMenu(self.helpText); }, 600, 350, "How to play", 40);

        this.choosePlayerMenu = [];
        this.choosePlayerMenu["avatars"] = [];
        this.choosePlayerMenu["choosePlayer"] = new TextLabel(this.gameManager.paper, 600, 200, "Choose Player", 40);
        this.choosePlayerMenu["start"] = this.buttonPrepare(function () { self.gameManager.initGame(1, self.selectedPlayer); }, 600, 400, "Start game!", 40);
        this.choosePlayerMenu["back"] = this.buttonPrepare(function () { self.showMenu(self.startMenu); self.hideMenu(self.choosePlayerMenu); }, 600, 450, "Back", 40);

        this.choosePlayer2Menu = [];
        this.choosePlayer2Menu["avatars"] = this.choosePlayerMenu["avatars"];
        this.choosePlayer2Menu["choosePlayer"] = new TextLabel(this.gameManager.paper, 600, 200, "Choose Player 1", 40);
        this.choosePlayer2Menu["start"] = this.buttonPrepare(function () { self.gameManager.initGame(2, self.selectedPlayer); }, 600, 400, "Start game!", 40);
        this.choosePlayer2Menu["back"] = this.buttonPrepare(function () { self.showMenu(self.startMenu); self.hideMenu(self.choosePlayer2Menu); }, 600, 450, "Back", 40);

        this.selectedPlayer = 0;

        for (var i in players) {
            (function (j) {
                self.choosePlayerMenu.avatars.push(self.gameManager.paper.image(players[i].image, 500 + j * 100 - 50 * (players.length - 2), 250, 100, 100).attr("opacity", 0.5));
                self.choosePlayerMenu.avatars[j].mousein = function () { console.log("IN"); this.attr("opacity", 1); }
                self.choosePlayerMenu.avatars[j].mousemout = function () { console.log("OUT"); var op = 0.5; if (self.selectedPlayer == j) op = 1; this.attr("opacity", op); }
                self.choosePlayerMenu.avatars[j].hover(function () { self.choosePlayerMenu.avatars[j].mousein() }, function () { self.choosePlayerMenu.avatars[j].mousemout() });

                self.choosePlayerMenu.avatars[j].click(
                    function () {
                        self.selectedPlayer = j;

                        for (var k in players) {
                            self.choosePlayerMenu.avatars[k].mousemout();
                        }
                    }
                )
            })(i);
        }
        self.choosePlayerMenu.avatars[this.selectedPlayer].attr("opacity", 1);
        this.helpText = [];
        this.helpText["text"] = new TextLabel(this.gameManager.paper, 600, 250, "How to play: \n 1. Remember: bigger buttons always work better.\n	2. Touching button makes it smaller. \n 3. Doomsday devices may fire back automatically and turn victory into defeat  \n  4. When playing against friend on the same PC, you may use keyboard. SPACE for Player 1 and ENTER for Player 2. \n Tip: Mouse still works in two player mode, so, try to grab it first! \nFighting for mouse adds additional fun to the game.", 30);
        this.helpText["back"] = this.buttonPrepare(function () { self.showMenu(self.startMenu); self.hideMenu(self.helpText); }, 600, 400, "Back", 40);

        this.label = new TextLabel(this.gameManager.paper, 600, 20, "Game of Red Buttons", 60);

        this.hideMenu(this.choosePlayerMenu);
        this.hideMenu(this.choosePlayer2Menu);
        this.hideMenu(this.helpText);
    }

    buttonPrepare(onclick, x, y, text, size) {
        var button = new TextLabel(this.gameManager.paper, x, y, text, size);
        button.label.hover(
            function () { this.attr({ "fill": "#ee0000", "cursor": "pointer" }); },
            function () { this.attr({ "fill": "#000000", "cursor": "default" }); },
        );

        button.label.click(onclick);

        return button;
    }

    showMenu(menu) {
        for (var i in menu) {
            if (menu[i].show)
                menu[i].show();
            else if (menu[i].length)
                this.showMenu(menu[i]);
        }
    }

    hideMenu(menu) {
        for (var i in menu) {
            if (menu[i].hide)
                menu[i].hide();
            else if (menu[i].length) {
                console.log(menu[i])
                this.hideMenu(menu[i]);
            }
        }
    }
}
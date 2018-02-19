class NuclearBlast {
    constructor(gameManager, x, y, width, height) {
        var self = this;
        this.paper = gameManager.paper;
        this.color = "#ee0000";

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gameManager = gameManager;
        this.rad = 8;
    }

    nuclearInit() {
        var self = this;
        self.explosion = self.paper.image(NUCLEAR_IMAGE, self.x, self.y, self.width, self.height);
        self.explosion.attr("width", 0);
        self.explosion.attr("height", 0);
        self.explosion.attr("x", self.x + self.width / 2);
        self.explosion.attr("y", self.y + self.height);
        self.explosion.animate({ "height": self.height, "y": self.y }, self.gameManager.speed * 5, "bounce");
        self.explosion.animate({ "width": self.width, "x": self.x }, self.gameManager.speed * 6, "bounce");
    }
    nuclearReset() {
        if (this.explosion)
            this.explosion.remove();
    }

    nuclearBlast() {
        var self = this;
        this.nuclearReset();
        this.nuclearInit();
    }
}
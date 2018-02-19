//used to figure out optimal winning strategy

class Logger {
    constructor() {
        this.results = [];
        this.count = 0;
        this.maxwin = 0;
        this.maxresult = 0;
    }

    addLogEntry(players) {
        this.count++;

        //console.log(players);
        for (var i in players) {
            var ad = "a" + players[i].agression.toString() + "d" + players[i].defence.toString();
            if (!this.results[ad]) {
                this.results[ad] = { "win": 0, "matches": 0, "winpossibility": 0.0 };

                if (!this.results[this.maxwin])
                    this.maxwin = ad;
            }

            if (players[i].alive == 2) {
                this.results[ad].win += 1;
            }
            this.results[ad].matches += 1;
            this.results[ad].winpossibility = this.results[ad].win / this.results[ad].matches;
        }
        console.log(this);
        localStorage.setItem("logger", JSON.stringify(this.results));

        for (var i in this.results) {
            if (this.results[i].winpossibility > this.results[this.maxwin].winpossibility || (this.results[i].winpossibility == this.results[this.maxwin].winpossibility && this.results[i].matches > this.results[this.maxwin].matches)) {
                this.maxwin = i;
            }
        }
        this.maxresult = this.results[this.maxwin];
    }
}
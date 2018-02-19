window.onload = function () {
    var paper = Raphael(0, 0, 1200, 700);
    // paper.DOM = $(document).find("svg");
    //paper.DOM.css("position", "relative");

    var gameManager = new GameManager(paper);
}
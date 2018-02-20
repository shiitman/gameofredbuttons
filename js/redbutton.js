window.onload = function () {
    var paper = Raphael(0, 0, 1200, 700);
    paper.DOM = document.getElementsByTagName("svg")[0];
    paper.DOM.style.position = "relative";

    var gameManager = new GameManager(paper);
}
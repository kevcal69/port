var mainCanvas = document.getElementById("canvas");
mainCanvas.height = $(document).height();
mainCanvas.width = $(document).width();
var mainContext = mainCanvas.getContext("2d");

var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

var hearts = new Array();

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function Heart(centerx, centery, angle, size) {
    this.centerx = centerx;
    this.centery = centery;
    this.angle = angle;
    this.size = size;
}

Heart.prototype.update = function() {
    this.angle += Math.PI / 64;
    var radius = (Math.abs(Math.cos(this.angle))) * this.size;
    centerx = mainCanvas.width / 2;
    centery = mainCanvas.height / 2;
    drawHeart(this.centerx, this.centery, radius / 100);
}

function createHeart() {
    for (var i = 0; i < 100; i++) {
        var initialX = Math.floor((Math.random() * mainCanvas.width) + 0);
        var initialY = Math.floor((Math.random() * mainCanvas.height) + 0);
        var init_angle = Math.random();
        var init_size = Math.floor((Math.random() * 50) + 20);
        var heart = new Heart(initialX, initialY, init_angle, init_size);
        hearts.push(heart);
    };
    requestAnimationFrame(animate);
}

function draw() {
    mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
    mainContext.fillStyle = "#F6F6F6";
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < hearts.length; i++) {
        var heart = hearts[i];
        heart.update();
    };
}
var framesPerSecond = 30;

function animate() {
    setTimeout(function() {
        requestAnimationFrame(animate);

        draw();

    }, 1000 / framesPerSecond);
}

function drawHeart(centerx, centery, size) {
    mainContext.beginPath();
    mainContext.moveTo(centerx - (100 * size), centery - (50 * size));
    // mainContext.bezierCurveTo(325, 220, 370, 220, 400, 250);
    mainContext.bezierCurveTo(
        centerx - (75 * size),
        centery - (80 * size),
        centerx - (30 * size),
        centery - (80 * size),
        centerx,
        centery - (50 * size));
    // mainContext.bezierCurveTo(425, 220, 470, 220, 500, 250);
    mainContext.bezierCurveTo(
        centerx + (25 * size),
        centery - (80 * size),
        centerx + (70 * size),
        centery - (80 * size),
        centerx + (100 * size),
        centery - (50 * size));
    // mainContext.bezierCurveTo(550, 300, 470, 350, 400, 400);
    mainContext.bezierCurveTo(
        centerx + (150 * size),
        centery - (0 * size),
        centerx + (70 * size),
        centery + (50 * size),
        centerx + (0 * size),
        centery + (100 * size));
    // mainContext.moveTo(300, 250);
    mainContext.moveTo(centerx - (100 * size), centery - (50 * size));
    // mainContext.bezierCurveTo(250, 300, 330, 350, 400, 400);
    mainContext.bezierCurveTo(
        centerx - (150 * size),
        centery - (0 * size),
        centerx - (70 * size),
        centery + (50 * size),
        centerx + (0 * size),
        centery + (100 * size));
    mainContext.closePath();

    var grd = mainContext.createRadialGradient(centerx, centery, size * 100, centerx, centery, size);
    grd.addColorStop(1, "rgba(130,45,163,.3)");
    grd.addColorStop(0, "rgba(232,222,42, .3)");

    // color in the circle
    mainContext.fillStyle = grd;
    mainContext.fill();
}
createHeart();
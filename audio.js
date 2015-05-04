var mainCanvas = document.getElementById("canvas");
mainCanvas.height = $(document).height() - 10;
mainCanvas.width = $(document).width();

var mainContext = mainCanvas.getContext("2d");
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;
var d = false;
var audio = new Audio();
audio.controls = true;
audio.loop = false;
audio.autoplay = false;

var hearts = new Array();
var circles = new Array();

var framesPerSecond = 30;

var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

window.addEventListener("load", initMp3Player, false);

function initMp3Player() {
    document.getElementById('audio_box').appendChild(audio);
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById('analyser_render');
    canvas.height = 200;
    canvas.width = $(document).width();
    ctx = canvas.getContext('2d');
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    createHeart();
    createCircles();
    frameLooper();
}

function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bars = 200;
    for (var i = 0; i < bars; i++) {
        ctx.fillStyle = getRandomColor(); // Color of the bars
        bar_width = canvas.width / 200;
        bar_x = i * bar_width;
        bar_height = -(fbc_array[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, 0, bar_width, -bar_height);
    }
    mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
    mainContext.fillStyle = "#f6f6f6";
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);
    if (d)
        hearts[0].update(average(fbc_array));
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        circle.update();
    }
}

function average(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += array[i];
    };
    ave = sum / array.length;
    if (ave < 10)
        ave = 10;
    if (ave > 70)
        ave = 70;
    return ave;
}

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

Heart.prototype.update = function(size) {
    var radius = size;
    centerx = mainCanvas.width / 2;
    centery = mainCanvas.height / 2;
    drawHeart(this.centerx, this.centery, radius / 100);
}

function createHeart() {
    var initialX = mainCanvas.width / 2;
    var initialY = mainCanvas.height / 2;
    var init_angle = Math.random();
    var init_size = Math.floor((Math.random() * 50) + 20);
    var heart = new Heart(initialX, initialY, init_angle, init_size);
    hearts.push(heart);
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


    // color in the circle
    mainContext.fillStyle = "#fa00b7";
    mainContext.fill();
}

function Circle(angle, sign, radius, rotationRadius, initialX, initialY) {
    this.angle = angle;
    this.sign = sign;
    this.radius = radius;
    this.rotationRadius = rotationRadius;
    this.initialX = initialX;
    this.initialY = initialY;
    this.incrementer = .01 + Math.random() * .1;
}

Circle.prototype.update = function() {

    this.angle += this.incrementer;

    this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
    this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);

    if (this.angle >= (Math.PI * 2)) {
        this.angle = 0;
        this.incrementer = .01 + Math.random() * .1;
    }

    // The following code is responsible for actually drawing the circle on the screen
    mainContext.beginPath();
    mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
    var grd = mainContext.createRadialGradient(this.currentX, this.currentY, this.radius, this.currentX, this.currentY, this.radius / 2);
    grd.addColorStop(1, "rgba(130,45,163,.3)");
    grd.addColorStop(0.4, "rgba(232,222,42, .3)");
    grd.addColorStop(0, "rgba(173,168,182,.3)");

    mainContext.fillStyle = grd;
    mainContext.fill();
};

function createCircles() {
    // change the range of this loop to adjust the number of circles that you see
    for (var i = 0; i < 50; i++) {
        var initialX = Math.floor((Math.random() * mainCanvas.width) + 0);
        var initialY = Math.floor((Math.random() * mainCanvas.height) + 0);
        for (var j = 0; j < 5; j++) {
            var radius = 5 + Math.random() * 40;
            var rotationRadius = 1 + Math.random() * 30;
            var angle = Math.random() * 2 * Math.PI;

            var signHelper = Math.floor(Math.random() * 2);
            var sign;

            // Randomly specify whether the circle will be rotating clockwise or counterclockwise
            if (signHelper == 1) {
                sign = -1;
            } else {
                sign = 1;
            }

            // create the Circle object
            var circle = new Circle(angle, sign, radius, rotationRadius, initialX, initialY);
            circles.push(circle);
        }
    };
}

var keyboard = "";
$(document).on('keypress', function(e) {
    if (e.which == 100) {
        audio.src = 'sound.mp3';
        audio.play();
        d = true;
    } else if (e.which == 32 && !isPlaying(audio)) {
        audio.src = 'sample.mp3';
        audio.play();
        d = false;
    } else if (e.which == 32 && isPlaying(audio)) {
        audio.pause();
        d = false;
    }
});

function isPlaying(audelem) {
    return !audelem.paused;
}
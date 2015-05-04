// depending on your browser, the right version of the rAF function will be returned...I hope


// this array contains a reference to every circle that you will create
//
// The Circle "constructor" is responsible for creating the circle objects and defining the various properties
// they have
//


// function draw() {
//     mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
//     mainContext.fillStyle = '#ffffff';
//     mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

//     // call the draw function again!
//     requestAnimationFrame(draw);
// }

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(color);
    var rgb = "rgba(" + parseInt(matches[1], 16) + "," + parseInt(matches[2], 16) + "," + parseInt(matches[3], 16) + ",.3);";
    return rgb;
}
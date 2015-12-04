var mycanvas = document.getElementById("mycanvas");
var ctx = mycanvas.getContext("2d");
//Array created to store rectangles created
var rectangles = [];
// Used in if statement to say when all squares have been collected
var youWin = false;
//Creates small box that collects squares
var box = {
    xPos: 2,
    yPos: 480,
    width: 20,
    height: 20,
    goLeft: false,
    goRight: false,
    goUp: false,
    goDown: false,
    //Determines where the box can and cannot go.
    move: function() {

        if (box.goLeft && box.xPos > 0) {
            box.xPos = box.xPos - 5;
        }
        if (box.goRight && box.xPos < 480) {
            box.xPos += 5;
        }
        if (box.goUp && box.yPos > 0) {
            box.yPos -= 5;
        }
        if (box.goDown && box.yPos < 480) {
            box.yPos += 5;
        }

    },
    //Draws the small box
    draw: function() {
        ctx.rect(box.xPos, box.yPos, box.width, box.height);
        ctx.stroke();
    }
};
//Function used in order to create random rectangles
function Rectangle(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.width = 10;
    this.height = 10;
    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
    };
}
//Used to determine which keys you use in order to control the square. WASD is used here
document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 65) {
        box.goLeft = true;
    }
    if (evt.keyCode === 87) {
        box.goUp = true;
    }
    if (evt.keyCode === 68) {
        box.goRight = true;
    }
    if (evt.keyCode === 83) {
        box.goDown = true;
    }

});
// Determines what happens when keys are not being pressed on.
document.addEventListener("keyup", function(evt) {
    if (evt.keyCode === 65) {
        box.goLeft = false;
    }
    if (evt.keyCode === 87) {
        box.goUp = false;
    }
    if (evt.keyCode === 68) {
        box.goRight = false;
    }
    if (evt.keyCode === 83) {
        box.goDown = false;
    }
});
//For loop used in order to randomize where rectangles are placed within the canvas.
for (var i = 0; i < 40; i++) {
    var randomX = (Math.random() * mycanvas.width);
    var randomY = (Math.random() * mycanvas.height);
    rectangles.push(new Rectangle(randomX, randomY));
}

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    box.move();
    box.draw();
    for (i = 0; i < rectangles.length; i++) {
        if (isColliding(box, rectangles[i])) {
            rectangles.splice(i, 1);

        }
    }
    //When all rectangles are collected the rectangles array is at 0 which causes "you collected all squares" to pop up
    if (rectangles.length === 0) {
        youWin = true;
    }
    else {
        youWin = false;
    }
    if (youWin) {
        ctx.font = "30px Arial";
        ctx.fillText("You Collected All Squares!", 79, 250);
    }

    // Draws the rectangles to make sure they are always on the screen unless collected   
    for (var x = 0; x < rectangles.length; x++) {
        rectangles[x].draw();
    }


    window.requestAnimationFrame(gameLoop);


}
// This is what causes rectangles to be removed from the canvas when colliding with the little box.
function isColliding(obj1, obj2) {
    var isLeft = obj1.xPos + obj1.width < obj2.xPos;
    var isAbove = obj2.yPos > obj1.yPos + obj1.height;
    var isRight = obj2.xPos + obj2.width < obj1.xPos;
    var isDown = obj2.yPos + obj2.height < obj1.yPos;
    return !(isLeft || isAbove || isRight || isDown);
}
gameLoop();
var mycanvas2 = document.getElementById("mycanvas2");
var ctx2 = mycanvas2.getContext("2d");
//Array created to store rectangles created
var rectangles2 = [];
// Used in if statement to say when all squares have been collected
var youWin2 = false;
//Creates small box that collects squares
var box2 = {
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

        if (box2.goLeft && box2.xPos > 0) {
            box2.xPos = box2.xPos - 5;
        }
        if (box2.goRight && box2.xPos < 480) {
            box2.xPos += 5;
        }
        if (box2.goUp && box2.yPos > 0) {
            box2.yPos -= 5;
        }
        if (box2.goDown && box2.yPos < 480) {
            box2.yPos += 5;
        }
    },
    //Draws the small box
    draw: function() {
        ctx2.rect(box2.xPos, box2.yPos, box2.width, box2.height);
        ctx2.stroke();
    }
};
//Function used in order to create random rectangles
function Rectangle(x, y) {
    this.xPos = x;
    this.yPos = y;
    this.width = 10;
    this.height = 10;
    this.draw = function() {
        ctx2.beginPath();
        ctx2.fillStyle = "#FF99F3";
        ctx2.fillRect(this.xPos, this.yPos, this.width, this.height);
    };
}

for (var i = 0; i < 40; i++) {
    var randomX = (Math.random() * mycanvas2.width - 5);
    var randomY = (Math.random() * mycanvas2.height - 5);
    rectangles2.push(new Rectangle(randomX, randomY));
}


//Used to determine which keys you use in order to control the square. WASD is used here
document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 37) {
        box2.goLeft = true;
    }
    if (evt.keyCode === 38) {
        box2.goUp = true;
    }
    if (evt.keyCode === 39) {
        box2.goRight = true;
    }
    if (evt.keyCode === 40) {
        box2.goDown = true;
    }

});
// Determines what happens when keys are not being pressed on.
document.addEventListener("keyup", function(evt) {
    if (evt.keyCode === 37) {
        box2.goLeft = false;
    }
    if (evt.keyCode === 38) {
        box2.goUp = false;
    }
    if (evt.keyCode === 39) {
        box2.goRight = false;
    }
    if (evt.keyCode === 40) {
        box2.goDown = false;
    }
});
//For loop used in order to randomize where rectangles are placed within the canvas.
function gameLoop2() {
    ctx2.beginPath();
    ctx2.clearRect(0, 0, mycanvas2.width, mycanvas2.height);
    box2.move();
    box2.draw();

    for (i = 0; i < rectangles2.length; i++) {
        if (isColliding(box2, rectangles2[i])) {
            rectangles2.splice(i, 1);

        }
    }
    //When all rectangles are collected the rectangles array is at 0 which causes "you collected all squares" to pop up
    if (rectangles2.length === 0) {
        youWin2 = true;
    }
    else {
        youWin2 = false;
    }
    if (youWin2) {
        ctx2.font = "30px Arial";
        ctx2.fillText("You Collected All Squares!", 79, 250);
    }
    console.log("this" + rectangles2.length);

    window.requestAnimationFrame(gameLoop2);
    // Draws the rectangles to make sure they are always on the screen unless collected
    for (var i = 0; i < rectangles2.length; i++) {
        rectangles2[i].draw();
    }
}
// This is what causes rectangles to be removed from the canvas when colliding with the little box.
function isColliding(obj1, obj2) {
    var isLeft = obj1.xPos + obj1.width < obj2.xPos;
    var isAbove = obj2.yPos > obj1.yPos + obj1.height;
    var isRight = obj2.xPos + obj2.width < obj1.xPos;
    var isDown = obj2.yPos + obj2.height < obj1.yPos;
    return !(isLeft || isAbove || isRight || isDown);
}
gameLoop2();

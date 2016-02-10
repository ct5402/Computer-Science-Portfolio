var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var devSpeed = 0;
var enter = false;
//Drawing all the images used for characters 
var charI = new Image();
charI.src = "http://www.thedieselstop.com/archives/ubbthreads/73EandD1/warmsmile.gif";
var cImage = new Image();
cImage.src = "http://www.northernlion-db.com/i/c.png";
var ocImage = new Image();
ocImage.src = "http://s.cdn.gaiaonline.com/images/thumbnails/10b7b0fc9abce3.png";
var charpI = new Image();
charpI.src = "http://vignette1.wikia.nocookie.net/nitrome/images/d/db/RT_Boss_Walking.gif/revision/latest?cb=20111219141356";
var bearI = new Image();
bearI.src = "https://s-media-cache-ak0.pinimg.com/30x30/88/02/17/8802174f70d853267d1aee95c239ee90.jpg";
var lastI = new Image();
lastI.src = "http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/creature_icon.png";
var bookI = new Image();
bookI.src = "https://s-media-cache-ak0.pinimg.com/avatars/paddleduckapps_1336459409_30.jpg";
var pjI = new Image();
pjI.src = "http://static-files.cdnandroid.com/ff/d2/1e/41/imagen-panda-papel-de-parede-animado-0mini_comments.jpg";
var tree = new Image();
tree.src = "http://a.deviantart.net/avatars/n/o/noekert.gif?3";
var flow = new Image();
flow.src = "http://vignette2.wikia.nocookie.net/cityville/images/e/ea/Yellow_Flower_Patch-icon.png/revision/latest/scale-to-width-down/40?cb=20110306014725";
//Objects are drawn in here and this function is called on in the game loop
var render = function() {
    h.draw();
    door.draw();
    parhouse.draw();
    pd.draw();
    k.draw();
    dk.draw();
    fh.draw();
    fd.draw();
    ctx.drawImage(charI, char.xPos, char.yPos);
    ctx.drawImage(tree, 20, 90);
    ctx.drawImage(flow, 370, 150);
    if (char.position === "insidethef") {
        ctx.drawImage(pjI, 700, 250);
    }
    if (char.position === "inside") {
        ctx.drawImage(cImage, 800, 190);
    }
    ctx.drawImage(ocImage, 900, 400);

    if (char.position === "insidep") {
        ctx.drawImage(charpI, 800, 170);
        ctx.drawImage(bearI, 630, 190);
        ctx.drawImage(lastI, 700, 250);
        ctx.drawImage(bookI, 700, 120);

    }
};
//Creating the variable for the character
var char = {
    position: "outside",
    xPos: 30,
    yPos: 285,
    width: 20,
    height: 20,
    goLeft: false,
    goRight: false,
    goUp: false,
    goDown: false,
    //Determines where the character can and cannot go. Also how many spots it moves
    move: function() {
        if (char.goLeft && char.xPos > char.minX) {
            char.xPos = char.xPos - 2 - devSpeed;
        }
        if (char.goRight && char.xPos < char.maxX) {
            char.xPos += 2 + devSpeed;
        }
        if (char.goUp && char.yPos > char.minY) {
            char.yPos -= 2 + devSpeed;
        }
        if (char.goDown && char.yPos < char.maxY) {
            char.yPos += 2 + devSpeed;
        }
 },
 //Drawing the character on the screen   
    draw: function() {
        ctx.rect(char.xPos, char.yPos, char.width, char.height);
        ctx.stroke();
    }
};
//If the key is down then the character will move. 
document.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 37) {
        char.goLeft = true;
    }
    if (evt.keyCode === 38) {
        char.goUp = true;
    }
    if (evt.keyCode === 39) {
        char.goRight = true;
    }
    if (evt.keyCode === 40) {
        char.goDown = true;
    }

});
//If the key is not being pressed the character will stop
document.addEventListener("keyup", function(evt) {
    if (evt.keyCode === 37) {
        char.goLeft = false;
    }
    if (evt.keyCode === 38) {
        char.goUp = false;
    }
    if (evt.keyCode === 39) {
        char.goRight = false;
    }
    if (evt.keyCode === 40) {
        char.goDown = false;
    }
});
//Object Constructor used to create characters,houses, and doors since they are all squares
function Chars(x, y, width, height) {
    this.xPos = x;
    this.yPos = y;
    this.width = width;
    this.height = height;
    this.draw = function() {
        ctx.rect(this.xPos, this.yPos, this.width, this.height);
        ctx.stroke();
    };
}
//House in the upper right corner
var k = new Chars(480, 130, 100, 60);
var dk = new Chars(504, 160, 50, 30);
var dkd = new Chars(800, 40, 60, 50);

//The House with one character
var h = new Chars(200, 130, 100, 60);

// Door to enter the house with one character
var door = new Chars(222, 160, 50, 30);

//Other Character
var oc = new Chars(900, 400, 30, 30);

// House with many People
var parhouse = new Chars(500, 380, 100, 60);
var pd = new Chars(523, 380, 50, 30);
var edp = new Chars(800, 40, 60, 50);

//House in lower left corner
var fh = new Chars(300, 380, 100, 60);
var fd = new Chars(323, 380, 50, 30);
var fdinside = new Chars(800, 40, 60, 50);
var pj = new Chars(700, 250, 30, 30);

//People inside the house
var charp = new Chars(800, 170, 30, 30);
var book = new Chars(700, 120, 30, 30);
var bear = new Chars(630, 190, 30, 30);
var last = new Chars(700, 250, 30, 30);

// House with only one character
var ch = new Chars(800, 190, 30, 30);
var iH = new Chars(600, 40, 300, 300);
var iHD = new Chars(800, 40, 60, 50);


function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    char.move();
    char.draw();
    render();
    totalk(char, oc, 850, 400, "Did you", "visit", "everyone?");
    //If statement for collison detection between rectangle and door. If detected character will be moved to different spot
    if (message(char, door)) {
        enter = true;
        char.position = "inside";
    }
    else {
        enter = false;
    }
    //If statement for posititon change to "inside" First House
    if (char.position === "inside") {
        iH.draw();
        iHD.draw();
        ch.draw();
        if (message(char, iHD)) {
            exit = true;
            char.position = "outsideH";
        }
        // Allows the character inside house to talk when touched First House
        totalk(char, ch, 720, 160, "Welcome to my", "house. My name", "is Finley.");
        // Position of Character when enetering. Also restrictions on where the character can and caannot walk. First House
        if (enter) {
            entering();
        }
    }
    //Causes rectangle to be reset to outside of house
    if (char.position === "outsideH") {
        char.xPos = 220;
        char.yPos = 200;
        char.position = "outside";
    }
    if (char.position === "outside") {
        exiting();
    }
    // Actions inside house with many  House in the lower right corner 
    if (message(char, pd)) {
        var party = true;
        char.position = "insidep";
    }
    else {
        party = false;
    }
    //Drawing everything that is required inside the house like the characters
    if (char.position === "insidep") {
        iH.draw();
        edp.draw();
        charp.draw();
        book.draw();
        bear.draw();
        last.draw();
        if (party) {
            entering();
        }
        if (message(char, edp)) {
            char.position = "outsidep";
        }
        if (char.position === "outsidep") {
            char.xPos = 523;
            char.yPos = 350;
            char.position = "outsidehp";
        }
        if (char.position === "outsidehp") {
            exiting();
        }
        //Characters messages
        totalk(char, charp, 730, 160, "I am", "having a", "book club!");
        totalk(char, book, 740, 120, "I want", "to go", "home.");
        totalk(char, last, 740, 240, "It is", "too cold", "in here.");
        totalk(char, bear, 670, 200, "I didn't", "even read.", " ");
    }
    window.requestAnimationFrame(gameLoop);

    //Entering house in the upper right corner
    if (message(char, dk)) {
        var ok = true;
        char.position = "insidedk";
    }
    else {
        ok = false;
    }
    if (char.position === "insidedk") {
        iH.draw();
        dkd.draw();
        ctx.font = "14px Arial";
        ctx.fillText("Nobody is home.....", 720, 160);
        if (message(char, dkd)) {
            char.position = "outsidejk";
        }
    }
    if (ok) {
        entering();
    }
    //Exiting the house in the upper right corner
    if (char.position === "outsidejk") {
        char.xPos = 545;
        char.yPos = 200;
        char.position = "outsidepk";
    }
    if (char.position === "outsidepk") {
        exiting();
    }

    //Entering the house in the lower left corner
    if (message(char, fd)) {
        var ik = true;
        char.position = "insidethef";
    }
    else {
        ik = false;
    }
     //Message from character
        totalk(char, pj, 640, 240, "If only", "it was", "summer.");
    if (char.position === "insidethef") {
        pj.draw();
        iH.draw();
        fdinside.draw();
        //What draws the box inside the house and teleports the character 
        if (ik) {
            entering();
        }
        //Collision with the door
        if (message(char, fdinside)) {
            char.position = "outsidefd";
        }
        if (char.position === "outsidefd") {
            char.xPos = 370;
            char.yPos = 350;
            char.position = "outside";
        }
        }
}
//What sets the inside of the house when touching a door
function entering() {
    char.xPos = 849;
    char.yPos = 110;
    char.minY = 40;
    char.minX = 600;
    char.maxY = 315;
    char.maxX = 875;
}
//Used to reset location when exiting a house
function exiting() {
    char.minY = 0;
    char.minX = 0;
    char.maxX = 980;
    char.maxY = 480;
}
//Collision detection on when the character is touching a door or other character
function message(obj1, obj2) {
    var isLeft = obj1.xPos + obj1.width < obj2.xPos;
    var isAbove = obj2.yPos > obj1.yPos + obj1.height;
    var isRight = obj2.xPos + obj2.width < obj1.xPos;
    var isDown = obj2.yPos + obj2.height < obj1.yPos;
    return !(isLeft || isAbove || isRight || isDown);
}
//This is what creates the messages the characters say
function totalk(x, y, spot1, spot2, mes1, mes2, mes3) {
    if (message(x, y)) {
        var to = true;
    }
    else {
        to = false;
    }
    if (to) {
        ctx.font = "14px Arial";
        ctx.fillText(mes1, spot1, spot2);
        ctx.fillText(mes2, spot1, spot2 + 20);
        ctx.fillText(mes3, spot1, spot2 + 40);
    }

}


gameLoop();
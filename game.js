var gamePattern = [];
var userClickedPattern = [];
var colors = ["blue", "green", "red", "yellow"];
var level = 0;
var g = 0;
var userColor;
var gameRunning = false;

function playSound(color){
    var sound = new Audio("sounds/"+color+".mp3");
    sound.play();
}

function flash(color){
    $("#"+color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function nextSequence()
{
    gameRunning = true;
    $("body").removeClass("game-over")
    $("h1").text("Level "+level);
    level++;
    var n = Math.floor(Math.random()*4);
    var randomColor = colors[n];
    gamePattern.push(randomColor);
    playSound(randomColor);
    flash(randomColor);
    return randomColor;
}

$(".btn").click(function(){
    userColor = $(this).attr("id");
    userClickedPattern.push(userColor);
    checkSequence();
    playSound(userColor);
    flash(userColor);
});

function wrongAns()
{
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },500);
    playSound("wrong");
}

function startOver()
{
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameRunning = false;
}

function checkSequence()
{
    var n = userClickedPattern.length;
    if(userClickedPattern[n-1] != gamePattern[n-1])
    {
        wrongAns();
        startOver();
        $("h1").text("Game Over, Press A Key to Start a Game");
        return;
    }
    else if(n == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(nextSequence,1000);
        return;
    }
    else {
        return;
    }
}

$(document).keypress(function()
{
    if(gameRunning === false) nextSequence();
});
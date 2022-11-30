var urlPrefix = "assets/images/character1/";
idleImageNumber=0;
idleAnimationNumber = 0;

//idle Animation function
function idleAnimation(){
    idleImageNumber = idleImageNumber+1;

    let idleFileName = "Idle (";
    let idleNum = idleImageNumber;
    let idleBracket = ").png";
    let idleImageName=idleFileName.concat(idleNum);
    let idleLastImageName=idleImageName.concat(idleBracket);

    /*console.log(lastImageName);*/

    $("#boy").attr("src", urlPrefix + idleLastImageName);

    if(idleImageNumber == 10){
        idleImageNumber=1;
    }

}

//idle Animation function starter
function idleAnimationStart(){
    idleAnimationNumber = setInterval(idleAnimation, 200);
}
/*setInterval(idleAnimation, 200);*/


runImageNumber =0;
runAnimationNumber=0;


//run Animation function
function runAnimation(){
    runImageNumber = runImageNumber+1;

    let runFileName = "Run (";
    let runNum = runImageNumber;
    let runBracket = ").png";
    let runImageName=runFileName.concat(runNum);
    let runLastImageName=runImageName.concat(runBracket);

    /*console.log(runLastImageName);*/

    $("#boy").attr("src", urlPrefix + runLastImageName);

    if(runImageNumber == 8){
        runImageNumber=1;
    }

}

//run Animation function starter
function runAnimationStart(){
    runAnimationNumber = setInterval(runAnimation, 200);
    clearInterval(idleAnimationNumber);
}



/*enterKeyRun(function (e) {
    if (e.which == 13) {
        runAnimationStart();
        console.log("enter key")
    }
});*/

function enterKeyRun(event){
    /*console.log(event.which);*/

    if (event.which == 13) {
        clearInterval(runAnimationNumber);
        clearInterval(barrierAnimationID);
        barrierAnimationID=0;
        runAnimationStart();
        console.log("enter key");

        playBackgroundSound();

        if(moveBackgroundAnimationId == 0){
            moveBackgroundAnimationId = setInterval(moveBackground,100);
        }

        /*setInterval(barrierAnimation,100);*/

        if( barrierAnimationID == 0){
            barrierAnimationID = setInterval(barrierAnimation,100);
        }
    }

    else if (event.which == 32){
        clearInterval(idleAnimationNumber);
        clearInterval(runAnimationNumber);
        clearInterval(jumpAnimationNumber);
        clearInterval(barrierAnimationID);
        barrierAnimationID=0;
        jumpAnimationStart();
        console.log("space key");

        /*playBackgroundSound();*/
        playJumpSound();

        /*setInterval(barrierAnimation,100);*/

        if( barrierAnimationID == 0){
            barrierAnimationID = setInterval(barrierAnimation,100);
        }
    }

}

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

//background move Animation function starter
function moveBackground(){
    backgroundImagePositionX = backgroundImagePositionX - 15;
    console.log(backgroundImagePositionX);

    $('#background').css( "backgroundPositionX",backgroundImagePositionX + "px" );
    console.log(backgroundImagePositionX + "px");
}

jumpImageNumber =0;
jumpAnimationNumber=0;
boyMarginTop = 520;

//jump Animation function
function jumpAnimation(){
    jumpImageNumber = jumpImageNumber+1;

    let jumpFileName = "Jump (";
    let jumpNum = jumpImageNumber;
    let jumpBracket = ").png";
    let jumpImageName=jumpFileName.concat(jumpNum);
    let jumpLastImageName=jumpImageName.concat(jumpBracket);

    /*console.log(jumpLastImageName);*/

    if(jumpImageNumber <=6){
        boyMarginTop = boyMarginTop - 25;
        $('#boy').css("top",boyMarginTop + "px");

    }

    if(jumpImageNumber >6){
        boyMarginTop = boyMarginTop + 25;
        $('#boy').css("top",boyMarginTop + "px");

    }

    $("#boy").attr("src", urlPrefix + jumpLastImageName);

    if(jumpImageNumber == 12){
        jumpImageNumber=1;
        boyMarginTop = 500;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 0;
        runAnimationStart();
    }

}

//jump Animation function starter
function jumpAnimationStart(){
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
    clearInterval(runAnimationNumber);
}

var barrierMarginLeft = 500;
function createBarriers(){
    for (let i = 0; i < 10; i++) {

        let barrierChange=barrierMarginLeft+ "px";
        let divID="div"+i;
        console.log(barrierChange);
        console.log(divID);

        $("#background").append(`<div id="${divID}" style="margin-left: ${barrierChange}"></div>`);

        barrierMarginLeft = barrierMarginLeft + 500;

        if(i<5){
            barrierMarginLeft = barrierMarginLeft+generateRandom(1200);
        }

        else if(i>=5){
            barrierMarginLeft = barrierMarginLeft+generateRandom(800);
        }

    }
}

function generateRandom(maxLimit = 500){
    let rand = Math.random() * maxLimit;
    console.log(rand); // say 99.81321410836433

    rand = Math.floor(rand); // 99
    console.log(rand);

    return rand;
}

var barrierAnimationID = 0;
function barrierAnimation(){
    for (let i = 0; i < 10; i++) {
        var divName ="div"+i;
        console.log(divName);

        var box = document.getElementById("div"+i);
        /*var currentMarginLeft = getComputedStyle(box).marginLeft;*/

        var currentMarginLeft = $('#' + divName).css("margin-left");
        console.log("current margin "+currentMarginLeft);
        var newMarginLeft = parseInt(currentMarginLeft)-35;
        console.log("new margin "+newMarginLeft);
        var lastNewMarginLeft = newMarginLeft + "px";
        /*box.style.marginLeft =newMarginLeft+"px";*/
        $('#' + divName).css("margin-left",lastNewMarginLeft);


        if(newMarginLeft >= -20 & newMarginLeft <=150){
            if(boyMarginTop >499){
                clearInterval(barrierAnimationID);

                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;

                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;

                deadAnimatinStart();
                playDeadSound();
            }
        }

        else if((i==9) & newMarginLeft <=5){

            clearInterval(moveBackgroundAnimationId);
            moveBackgroundAnimationId = -1;

            youWinEffect();
            pauseBackgroundSound();
        }


    }
}


var deadAnimationNumber = 0;
var deadImageNumber = 0;
function deadAnimation(){
    deadImageNumber = deadImageNumber+1;

    let deadFileName = "Dead (";
    let deadNum = deadImageNumber;
    let deadBracket = ").png";
    let deadImageName=deadFileName.concat(deadNum);
    let deadLastImageName=deadImageName.concat(deadBracket);

    /*console.log(runLastImageName);*/

    $("#boy").attr("src", urlPrefix + deadLastImageName);

    if(deadImageNumber == 8){
        clearInterval(deadAnimationNumber);
        /*alert("Try Again");*/
        tryAgainEffect();
    }
}

function deadAnimatinStart(){
    deadAnimationNumber = setInterval(deadAnimation,100);
}

// run the tryAgain effect
function tryAgainEffect() {
    // get effect type from
    var selectedEffect = "bounce";

    // Most effect types need no options passed by default
    var options = {};

    // Run the effect
    $( "#tryAgainImg" ).show( selectedEffect, options, 500, callbackTry );
};

// run the you win effect
function youWinEffect() {
    // get effect type from
    var selectedEffect = "bounce";

    // Most effect types need no options passed by default
    var options = {};

    // Run the effect
    $( "#youWinImg" ).show( selectedEffect, options, 500, callbackWin );
};

//callback function to bring a hidden box back
function callbackTry() {
    setTimeout(function() {
        $( "#tryAgainImg:visible" ).removeAttr( "style" ).fadeOut();
    }, 1000 );

    // Set effect from select menu value
    tryAgainEffect();
};

//callback function to bring a hidden box back
function callbackWin() {
    setTimeout(function() {
        $( "#youWinImg:visible" ).removeAttr( "style" ).fadeOut();
    }, 1000 );

    // Set effect from select menu value
    youWinEffect();
    hurtAnimationStart();
};

$( "#tryAgainImg" ).hide();
$( "#youWinImg" ).hide();

//loading animation
$(document).ready(function() {
    $("#loadingImg").hide();
    $(window).load(function() {
        $("#loadingImg").show();
        $("#loading").hide();
    })
})

var hertAnimationNumber = 0;
var hurtImageNumber = 0;
function hertAnimation(){
    hurtImageNumber = hurtImageNumber+1;

    let hurtFileName = "Hurt (";
    let hurtNum = hurtImageNumber;
    let hurtBracket = ").png";
    let hurtImageName=hurtFileName.concat(hurtNum);
    let hurtLastImageName=hurtImageName.concat(hurtBracket);

    /*console.log(hurtLastImageName);*/

    $("#boy").attr("src", urlPrefix + hurtLastImageName);
}

function hurtAnimationStart(){
    hertAnimationNumber = setInterval(hertAnimation,100);
}

$("#btnReload").click(function () {
    alert("reload");
    window.location.reload();
});

$("#btnPlayPause").click(function () {
    /*alert("pl");*/

    var playPauseImages = $('#btnPlayPause').attr('src');
    alert(playPauseImages);
    var defaultPlayPause = "assets/images/pause%20copy.png";
    /*$("#btnPlayPause").attr("src", "assets/images/play%20copy.png");*/

    if(playPauseImages==defaultPlayPause){
        $("#btnPlayPause").attr("src", "assets/images/play%20copy.png");

    }else {
        $("#btnPlayPause").attr("src", "assets/images/pause%20copy.png");
    }

});

$("#btnSound").click(function () {
    /*alert("reload");*/

    var playPauseSoundImages = $('#btnSound').attr('src');
    alert(playPauseSoundImages);
    var defaultPlayPauseSound = "assets/images/sound%20on%20copy.png";
    /*$("#btnPlayPause").attr("src", "assets/images/play%20copy.png");*/

    if(playPauseSoundImages==defaultPlayPauseSound){
        $("#btnSound").attr("src", "assets/images/sound%20off%20copy.png");
        pauseBackgroundSound();

    }else {
        $("#btnSound").attr("src", "assets/images/sound%20on%20copy.png");
        playBackgroundSound();
    }
});


var backgroundAudio;
function playBackgroundSound() {
    backgroundAudio = new Audio("assets/sfx/character-running.wav");
    backgroundAudio.loop = true;
    backgroundAudio.play();
}

function pauseBackgroundSound() {
    backgroundAudio.pause();
}

var jumpAudio;
function playJumpSound() {
    jumpAudio= new Audio("assets/sfx/character-jumping.wav");
    /*backgroundAudio.loop = true;*/
    jumpAudio.play();
}

var deadAudio;
function playDeadSound() {
    deadAudio= new Audio("assets/sfx/character-dead.wav");
    /*backgroundAudio.loop = true;*/
    deadAudio.play();
}

function Start1Animation(){
    // get effect type from
    var selectedEffect = "bounce";

    // Most effect types need no options passed by default
    var options = {};

    /*// Run the effect
    $( "#loadingLevel1Img" ).show( selectedEffect, options, 500, callbackStart1 );*/

    // Run the effect
    $( "#level1" ).show( selectedEffect, options, 500, callbackStart1 );
}

//callback function to bring a hidden box back
function callbackStart1() {
    /*setTimeout(function() {
        $( "#loadingLevel1Img:visible" ).removeAttr( "style" ).fadeOut();
    }, 1000 );*/

    setTimeout(function() {
        $( "#btnLevel1:visible" ).removeAttr( "style" ).fadeOut();
    }, 1000 );

    // Set effect from select menu value
    Start1Animation();
};

$( "#loadingLevel1Img" ).hide();
$( "#btnLevel1" ).hide();
$( "#loadingLevel2Img" ).hide();
$( "#btnLevel2" ).hide();
$( "#loadingLevel3Img" ).hide();
$( "#btnLevel3" ).hide();
$( "#loadingLevel4Img" ).hide();
$( "#btnLevel4" ).hide();

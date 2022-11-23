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
        console.log("enter key");

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
    backgroundImagePositionX = backgroundImagePositionX - 20;
    console.log(backgroundImagePositionX);

    $('#background').css( "backgroundPositionX",backgroundImagePositionX + "px" );
    console.log(backgroundImagePositionX + "px");
}

jumpImageNumber =0;
jumpAnimationNumber=0;
boyMarginTop = 500;

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
        boyMarginTop = boyMarginTop - 20;
        $('#boy').css("top",boyMarginTop + "px");

    }

    if(jumpImageNumber >=8){
        boyMarginTop = boyMarginTop + 20;
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
    jumpAnimationNumber = setInterval(jumpAnimation, 200);
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
        var newMarginLeft = parseInt(currentMarginLeft)-25;
        console.log("new margin "+newMarginLeft);
        var lastNewMarginLeft = newMarginLeft + "px";
        /*box.style.marginLeft =newMarginLeft+"px";*/
        $('#' + divName).css("margin-left",lastNewMarginLeft);
    }
}

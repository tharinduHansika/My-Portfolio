var initArray=[];
var leftQue =["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff", "#ffe6e6", "#ff8080", "#ff3333", "#e60000", "#990000", "#b30000"];
var rightQue =["#ffe6e6","#ff8080", "#ff3333", "#e60000","#990000","#b30000" , "#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];

function animateRight(){
    let firstValue=initArray.shift();
    initArray.push(firstValue);
}

function animateLeft(){
    let lastColor=initArray.pop();
    initArray.unshift(lastColor);
}

var count=0;
function animate(){
    count++;
    if (count<=leftQue.length){
        initArray=leftQue;
        animateLeft();
    }else{
        if (count>=(leftQue.length*2)){
            count=0;
        }
        initArray=rightQue;
        animateRight();
    }
}

function renderKnightRider(){
    $("#container").empty();
    for (let i = 0; i < (initArray.length)/2; i++) {
        $("#container").append(`<div style="background-color: ${initArray[i]}"></div>`)
    }
    animate();
}

setInterval(renderKnightRider,100);
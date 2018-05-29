var canvas;
var thermobg;
var ticks;
var thermoHandle;
var handleX= 45.59;
var handleY = 303.75;
var thermoBoundary = {
    l: 30,
    r: 75,
    t: 30,
    b: 360
}

var degreeC;
var degreeCEl;
var degreeF;
var degreeFEl;

var imgEl;

function preload(){
    thermobg = loadImage('/images/thermo-bg.png');
    ticks = loadImage('/images/ticks.png');
    thermoHandle = loadImage('/images/thermo-handle.png');
}

function setup(){
    canvas = createCanvas(104,430);
    canvas.parent('thermo-container');
    degreeCEl = document.querySelector("#degreeC");
    degreeFEl = document.querySelector("#degreeF");
    imgEl = document.querySelector("#img-weather");
}

function draw(){
    background(255);

    // Load thermometer background
    image(thermobg,0,0);

    // Create thermometer center bar
    rectMode(CORNERS);
    noStroke();
    fill("#d25f5e");
    rect(49.59, 388.63, 56.52, handleY);

    // Put ticks and drag handle over top of thermometer bar
    image(ticks, 46.52, 37.07);
    image(thermoHandle, handleX, handleY);

    // cursor decoration
    if(mouseInsideThermo()){
        cursor(HAND);
    }else{
        cursor(ARROW);
    }

    degreeC = Math.round((-3/8)*(handleY+2) + (1833/16))
    degreeCEl.setAttribute("value",`${degreeC}`);
    degreeF = Math.round(degreeC * 1.8 + 32);
    degreeFEl.setAttribute("value", `${degreeF}`);
}

function mouseDragged(){
    if(mouseInsideThermo()){
        handleY = mouseY;
        console.log(handleY);
    }
    if(mouseY>300 && mouseY<=400){
        imgEl.setAttribute("src", "/images/01-temperature-coldest.jpg");
    }else if(mouseY > 250 && mouseY <=300 ){
        imgEl.setAttribute("src", "/images/02-temperature-cold.jpg");
    }else if(mouseY > 220 && mouseY <=250){
        imgEl.setAttribute("src","/images/03-temperature-warm.jpg");
    }else if(mouseY > 170 && mouseY <=220){
        imgEl.setAttribute("src","/images/04-temperature-hot.jpg");
    }else if(mouseY > 40 && mouseY <=170){
        imgEl.setAttribute("src","/images/05-temperature-hottest.jpg");
    }else if(mouseY <=40){
        imgEl.setAttribute("src","/images/06-temperature-boiling.jpg");
    }
}

function mouseInsideThermo(){
    if(mouseX<thermoBoundary.r && mouseX>thermoBoundary.l){
        if(mouseY > thermoBoundary.t && mouseY < thermoBoundary.b){
            return true;
        }   
    }else{
        return false;
    }
}
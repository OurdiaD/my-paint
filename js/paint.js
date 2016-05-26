/*jslint browser: true, node: true */
/*global $, jQuery*/
'use strict';
var bligne = $('#ligne');
var brectangle = $('#rectangle');
var bcrayon = $('#crayon');
var bcercle = $('#cercle');
var bclear = $('#clear');
var bpot = $('#pot');
var canvas = $('#paint');
var posX;
var posY;
var context = canvas[0].getContext("2d");
var start = true;
var inpColor = document.getElementById('color');
var color = inpColor.value;
var inpSize = document.getElementById('size');
var size = inpSize.value;
var paint = false;
var x;
var y;
var lon;
var lar;
var centX;
var centY;
var rayon;
var a;
var b;

function getPos(e) {
    posX = e.pageX - canvas.offset().left;
    posY = e.pageY - canvas.offset().top;
}

inpColor.addEventListener('input', function () {
    color = inpColor.value;
});

inpSize.addEventListener('input', function () {
    size = inpSize.value;
});

function ligne(e) {
    getPos(e);
    if (start === true) {
        //console.log("1er click");
        context.beginPath();
        context.moveTo(posX, posY);
        start = false;
    } else {
        //console.log('2e click');
        context.lineTo(posX, posY);
        context.strokeStyle = color;
        context.lineWidth = size;
        context.stroke();
        start = true;
    }
}

function rectangle(e) {
    getPos(e);
    if (start === true) {
        x = posX;
        y = posY;
        start = false;
    } else {
        lon = posX - x;
        lar = posY - y;
        context.rect(x, y, lon, lar);
        context.strokeStyle = color;
        context.lineWidth = size;
        context.stroke();
        start = true;
    }
    //console.log('rect');
}

function crayon() {
    //getPos(e);
    canvas.mousedown(function (e) {
        paint = true;
        //start = true;
        getPos(e);
    });
    canvas.mouseup(function () {
        paint = false;
        start = true;
    });
    canvas.mousemove(function (e) {
        getPos(e);
        if (paint === true) {
        //console.log('paint')
            if (start === true) {
                //console.log('start');
                context.beginPath();
                context.moveTo(posX, posY);
                start = false;
            } else {
                //console.log("noStart");
                context.lineTo(posX, posY);
                context.strokeStyle = color;
                context.lineWidth = size;
                context.stroke();
                //start = true;
            }
        }
    });
    //console.log('cry');
}

function cercle(e) {
    //console.log('cercle');
    getPos(e);
    if (start === true) {
        centX = posX;
        centY = posY;
        start = false;
    } else {
        x = centX - posX;
        y = centY - posY;
        rayon = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        context.beginPath();
        context.arc(centX, centY, rayon, 0, 2 * Math.PI);
        context.strokeStyle = color;
        context.lineWidth = size;
        context.stroke();
        start = true;
    }
}

function clear() {
    context.clearRect(0, 0, canvas.width(), canvas.height());
}

function pot() {
    a = canvas.width();
    b = canvas.height();
    context.fillStyle = color;
    context.fillRect(0, 0, a, b);
    //context.stroke();
    //context.fill();
}

function activeLigne() {
    canvas.off();
    canvas.click(ligne);
}

function activeRectangle() {
    canvas.off();
    canvas.click(rectangle);
}

function activeCrayon() {
    canvas.off();
    canvas.click(crayon);
}

function activeCercle() {
    canvas.off();
    canvas.click(cercle);
}
function activePot() {
    canvas.off();
    canvas.click(pot);
}

bligne.click(activeLigne);
brectangle.click(activeRectangle);
bcrayon.click(activeCrayon);
bcercle.click(activeCercle);
bclear.click(clear);
bpot.click(activePot);

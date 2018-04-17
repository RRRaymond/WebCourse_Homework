"use strict";

var deltatime = 300;
var text;
var timer;

window.onload = function(){
    document.getElementById("start").onclick = startAnimation;
    document.getElementById("stop").disabled = true;
    document.getElementById("stop").onclick = stopAnimation;
    var sizeselect = document.getElementsByName("sizeselect");
    for(var i=0;i < sizeselect.length;i++) {
        sizeselect[i].onclick = changesize;
    }
    document.getElementById("speedSelect").onchange = changespeed;
}

function startAnimation() {
    index = 0;
    var inputtext = document.getElementById("inputtext");
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    document.getElementById("inputtext").disabled = true;
    if(inputtext.value==""){
        alert("请先输入文本");
        return;
    }
    text = inputtext.value.split(/[ \t\n]+/);
    var pattern = new RegExp("[,`':;',‘；：”“'。，、！？,.!?（）()]+", 'g');
    for(var i=0;i<text.length;i++){
        if(text[i].match(pattern)){
            text[i] = text[i].replace(pattern,"");
            if(text[i]==""){
                text.splice(i,1);
                i--;
            }else{
                text.splice(i,0,text[i]);
            }
        }
    }
    timer = setInterval(play, deltatime);
}

var index = 0;
function play() {
    if(index == text.length){
        stopAnimation();
        return;
    }
    var container = document.getElementById("container");
    container.innerText = text[index++];
}

function stopAnimation() {
    var container = document.getElementById("container");
    container.innerText = "";
    clearInterval(timer);
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("inputtext").disabled = false;
}

function changesize() {
    var container = document.getElementById("container");
    switch(this.value) {
        case "medium":
            container.style.fontSize = "36pt";
            break;
        case "big":
            container.style.fontSize = "48pt";
            break;
        case "bigger":
            container.style.fontSize = "60pt";
            break;
        default:
            alert("default");
            break;
    }
}

function changespeed(){
    deltatime = this.options[this.selectedIndex].value;
    clearInterval(timer);
    timer = setInterval(play, deltatime);
}
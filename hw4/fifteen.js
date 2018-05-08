/**
 * @author: raymondchen
 * @date: 2018/5/6
 * @Description:
 *             This is the 4th homework of the web programming course.
 *             And this assignment is about JavaScript's Document Object Model (DOM) and events.
 *             This scrip is about the game "Fifteen Puzzle".
 */


"use strict";

window.onload=function (ev) {
    initPuzzle();
    empty_x = 4;
    empty_y = 4;
    checkMoveable();
    document.getElementById("shufflebutton").onclick = shuffle;
};


//position for the empty square
var empty_x, empty_y;


//initialize the puzzle
function initPuzzle() {
    var puzzleArea = document.getElementById("puzzlearea");
    var x_pos = 0, y_pos = 0;
    for(var i=0;i<4;i++){
        x_pos=0;
        for(var j=0;j<4;j++){
            var newdiv = document.createElement("div");
            newdiv.id = "square_"+(i+1)+"_"+(j+1);
            newdiv.classList.add("tile");
            newdiv.style.backgroundPosition = -x_pos+"px " + -y_pos+ "px";
            newdiv.innerText = 4*i+j+1+"";
            newdiv.style.left = x_pos + "px";
            newdiv.style.top = y_pos + "px";
            newdiv.x_pos = i+1;
            newdiv.y_pos = j+1;
            puzzleArea.appendChild(newdiv);
            x_pos+=100;
        }
        y_pos+=100;
    }
    puzzleArea.removeChild(puzzleArea.lastChild);
}


//move the Tile to the empty square
function moveTile() {
    this.style.left = (empty_y-1)*100+"px";
    this.style.top = (empty_x-1)*100+"px";
    var temp_x = empty_x;
    var temp_y = empty_y;
    empty_x = this.x_pos;
    empty_y = this.y_pos;
    this.x_pos = temp_x;
    this.y_pos = temp_y;
    this.id = "square_"+temp_x+"_"+temp_y;
    checkMoveable();
    setTimeout(checkSuccess,100);
}


//change style on mouse over
function mouseIn() {
    this.style.color = "red";
    this.style.cursor = "pointer";
    this.style.borderColor = "red";
}

//change style on mouse out
function mouseOut() {
    this.style.color = "burlywood";
    this.style.cursor = "default";
    this.style.borderColor = "black";
}


//randomly shuffle the puzzle
function shuffle() {
    for(var i=0;i<1000;i++){
        var moveableTiles = [];
        moveableTiles.push(getTileAt(empty_x, empty_y-1));
        moveableTiles.push(getTileAt(empty_x, empty_y+1));
        moveableTiles.push(getTileAt(empty_x+1, empty_y));
        moveableTiles.push(getTileAt(empty_x-1, empty_y));
        for(var j=0;j<moveableTiles.length;j++){
            if(moveableTiles[j]===null){
                moveableTiles.splice(j,1);
                j--;
            }
        }
        var index = parseInt(Math.random()*moveableTiles.length);
        moveableTiles[index].onclick();
    }
}


//get the Tile at position(x,y)
function getTileAt(x, y) {
    return document.getElementById("square_"+x+"_"+y);
}


//check whether the Tile can be moved
function checkMoveable() {
    var children = document.getElementById("puzzlearea").children;
    for(var i=0;i<children.length;i++){
        children[i].onclick = null;
        children[i].onmouseover = null;
        children[i].onmouseout = null;
    }
    var moveableTiles = [];
    moveableTiles.push(getTileAt(empty_x, empty_y-1));
    moveableTiles.push(getTileAt(empty_x, empty_y+1));
    moveableTiles.push(getTileAt(empty_x+1, empty_y));
    moveableTiles.push(getTileAt(empty_x-1, empty_y));
    for(var i=0;i<moveableTiles.length;i++){
        if(moveableTiles[i] === null) {
            continue;
        }
        moveableTiles[i].onclick = moveTile;
        moveableTiles[i].onmouseover = mouseIn;
        moveableTiles[i].onmouseout = mouseOut;
    }
}

function checkSuccess() {
    var flag = true;
    var children = document.getElementById("puzzlearea").children;
    for(var i=0;i<children.length;i++){
        if(children[i].innerText != (children[i].x_pos-1) * 4 + children[i].y_pos) {
            flag = false;
        }
    }
    if(flag === true) {
        alert("You win! :]");
    }
}
/**
 * Created by Marv
 */

let context = document.getElementById('puzzle').getContext('2d');

class GameHandler{
    constructor(gameObject){
        this.go = gameObject;
    }

    scaleOnchange(){
        this.go.tileCount = this.value;
        this.go.reCalculateTileSize();
        //go.tileSize = go.boardSize / go.tileCount;
        this.go.setBoard();
        this.go.drawTiles();
    }

    puzzleOnclick(e, htmlElement){
        this.go.clickLoc.x = Math.floor((e.pageX - htmlElement.offsetLeft) / this.go.tileSize);
        this.go.clickLoc.y = Math.floor((e.pageY - htmlElement.offsetTop) / this.go.tileSize);
        if (distance(this.go.clickLoc.x, this.go.clickLoc.y, this.go.emptyLoc.x, this.go.emptyLoc.y) == 1) {
            this.go.slideTile(this.go.emptyLoc, this.go.clickLoc);
            this.go.drawTiles();
        }
        if (this.go.solved) {
            if (!this.go.solved_Triggered){
                setTimeout(function() {alert("You solved it!");}, 500);
                this.go.solved_Triggered = true;
            }
        }
    }
}

class GameObject {
    constructor() {
        this.boardParts;
        this.tileCount = document.getElementById('scale').value;
        this.boardSize = document.getElementById('puzzle').width;
        this.emptyLoc = new Point();
        this.clickLoc = new Point();
        this.solved = false;
        this.solved_Triggered = false;
        //this.context = document.getElementById('puzzle').getContext('2d');
        this.tileSize;
        this.reCalculateTileSize();

        this.img = new Image();
        this.img.src = "../data/dimetrodon.jpg";
        this.img.onload = function() {go.drawTiles();}
        //this.img.addEventListener('load', this.drawTiles(), false);


        this.setBoard(); //init func
    }

    reCalculateTileSize(){
        this.tileCount = document.getElementById('scale').value;
        this.boardSize = document.getElementById('puzzle').width;
        this.tileSize = this.boardSize / this.tileCount;
    }

    setBoard() {
        this.solved_Triggered = false;
        this.boardParts = new Array(this.tileCount);
        for (var i = 0; i < this.tileCount; ++i) {
            this.boardParts[i] = new Array(this.tileCount);
            for (var j = 0; j < this.tileCount; ++j) {
                this.boardParts[i][j] = new Point;
                this.boardParts[i][j].x = (this.tileCount - 1) - i;
                this.boardParts[i][j].y = (this.tileCount - 1) - j;
            }
        }
        this.emptyLoc.x = this.boardParts[this.tileCount - 1][this.tileCount - 1].x;
        this.emptyLoc.y = this.boardParts[this.tileCount - 1][this.tileCount - 1].y;
        this.solved = false;
    }

    drawTiles() {
        context.clearRect(0, 0, this.boardSize, this.boardSize);
        for (let i = 0; i < this.tileCount; ++i) {
            for (let j = 0; j < this.tileCount; ++j) {
                let x = this.boardParts[i][j].x;
                let y = this.boardParts[i][j].y;
                if (i != this.emptyLoc.x || j != this.emptyLoc.y || this.solved == true) {
                    context.drawImage(this.img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize,
                        i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }

    slideTile(toLoc, fromLoc) {
        if (!this.solved) {
            this.boardParts[toLoc.x][toLoc.y].x = this.boardParts[fromLoc.x][fromLoc.y].x;
            this.boardParts[toLoc.x][toLoc.y].y = this.boardParts[fromLoc.x][fromLoc.y].y;
            this.boardParts[fromLoc.x][fromLoc.y].x = this.tileCount - 1;
            this.boardParts[fromLoc.x][fromLoc.y].y = this.tileCount - 1;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            this.checkSolved();
        }
    }

    checkSolved() {
        var flag = true;
        for (var i = 0; i < this.tileCount; ++i) {
            for (var j = 0; j < this.tileCount; ++j) {
                if (this.boardParts[i][j].x != i || this.boardParts[i][j].y != j) {
                    flag = false;
                }
            }
        }
        this.solved = flag;
    }
}

let go = new GameObject();
let gh = new GameHandler(go);
document.getElementById('scale').onchange = function(){ gh.scaleOnchange(); }
let pz = document.getElementById('puzzle');
pz.onclick = function(e){ gh.puzzleOnclick(e, pz); }

/*Distance func as arrow*/
let distance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

function Point(x = 0, y = 0){
   return {x, y};
}
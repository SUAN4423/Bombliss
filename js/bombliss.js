import backgroundImage from '../img/background.png'
import normalImage from '../img/normal.png'
import bombImage from '../img/bomb.png'
import bigbombImage from '../img/bigbomb.png'

var gamewidth = document.documentElement.clientWidth;
var gameheight = document.documentElement.clientHeight;

if (gamewidth / 256 < gameheight / 239) {
    gamewidth -= 20;
    gameheight = gamewidth * 239 / 256;
} else {
    gameheight -= 20;
    gamewidth = gameheight * 256 / 239;
}

let blockwidthheight = gamewidth / 32;

console.log(gamewidth + " " + gameheight);

let app = new PIXI.Application({
    width: gamewidth,
    height: gameheight,
    backgroundColor: 0x000000,
    autoDensity: true,
});

let el = document.getElementById('app');
el.appendChild(app.view);

let backTexture = new PIXI.Texture.from(backgroundImage);
let normalTexture = new PIXI.Texture.from(normalImage);
let bombTexture = new PIXI.Texture.from(bombImage);
let bigbombTexture = new PIXI.Texture.from(bigbombImage);

let backSprite = new PIXI.Sprite(backTexture);
backSprite.anchor.x = 0;
backSprite.anchor.y = 0;
backSprite.scale.x = gamewidth / 256;
backSprite.scale.y = gameheight / 239;
backSprite.x = 0;
backSprite.y = 0;
app.stage.addChild(backSprite);

let gameContainer = new PIXI.Container();

gameContainer.x = gamewidth / 256 * 88;
gameContainer.y = gameheight / 239 * 31;
app.stage.addChild(gameContainer);

let background = new PIXI.Graphics()
    .beginFill(0x000000)
    .drawRect(0, 0, gamewidth / 256 * 80, gameheight / 239 * 176)
    .endFill();
gameContainer.addChild(background);

console.log(blockwidthheight + " " + gamewidth / 256 * 8 + " " + gameheight / 239 * 8)

let stage = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let now = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

let turn = 0;

// let normalSprite = new PIXI.Sprite(normalTexture);
// normalSprite.anchor.x = 0;
// normalSprite.anchor.y = 0;
// normalSprite.scale.x = blockwidthheight / 8;
// normalSprite.scale.y = blockwidthheight / 8;
// normalSprite.x = blockwidthheight * 3;
// normalSprite.y = blockwidthheight * 21;
// gameContainer.addChild(normalSprite);
//
// let bombSprite = new PIXI.Sprite(bombTexture);
// bombSprite.anchor.x = 0;
// bombSprite.anchor.y = 0;
// bombSprite.scale.x = blockwidthheight / 8;
// bombSprite.scale.y = blockwidthheight / 8;
// bombSprite.x = blockwidthheight * 6;
// bombSprite.y = blockwidthheight * 21;
// gameContainer.addChild(bombSprite);
//
// let bigbombSprite = new PIXI.Sprite(bigbombTexture);
// bigbombSprite.anchor.x = 0;
// bigbombSprite.anchor.y = 0;
// bigbombSprite.scale.x = blockwidthheight / 8;
// bigbombSprite.scale.y = blockwidthheight / 8;
// bigbombSprite.x = blockwidthheight * 4;
// bigbombSprite.y = blockwidthheight * 20;
// gameContainer.addChild(bigbombSprite);

app.ticker.add(animate);

let x = 4;
let y = 0;

function animate(delta) {
    switch (turn) {
        case 0:             //ブロック生成
            blockcreate(0);
            turn = 1;
            break;
        case 1:
            for (i = 0; i < 5; i++) {
                for (j = 0; j < 5; j++) {
                    console.log(y + " " + delta);
                    if (now[j][i] != 0) {
                        now[j][i].x = blockwidthheight * (x - 2 + i);
                        now[j][i].y = blockwidthheight * (y - 2 + j);
                    }
                }
            }
            y += 1 * app.ticker.deltaMS / 1000;
            if (y >= 21) turn = 0;
            break;
    }
    if (WASD[A]) {
        x--;
        if (x < 0) x = 0;
    }
    if (WASD[D]) {
        x++;
        if (x > 9) x = 9;
    }
    if (WASD[S]) {
        y+=0.1;
    }
    if (WASD[W]) {
    }
}

const W = 0;
const A = 1;
const S = 2;
const D = 3;
let WASD = [false, false, false, false];

window.addEventListener('keydown', function (e) {
    if (e.key == 'w')
        WASD[0] = true;
    if (e.key == 'a')
        WASD[1] = true;
    if (e.key == 's')
        WASD[2] = true;
    if (e.key == 'd')
        WASD[3] = true;
});

window.addEventListener('keyup', function (e) {
    if (e.key == 'w')
        WASD[0] = false;
    if (e.key == 'a')
        WASD[1] = false;
    if (e.key == 's')
        WASD[2] = false;
    if (e.key == 'd')
        WASD[3] = false;
});

function blockcreate(blocktype) {
    if (blocktype == 0) {
        block(0);
        return;
    } else if (blocktype == 1) {

    } else {

    }
}

function block(blocknum) {
    switch (blocknum) {
        case 0:
            let bomb = new PIXI.Sprite(normalTexture);
            bomb.anchor.x = 0;
            bomb.anchor.y = 0;
            bomb.scale.x = blockwidthheight / 8;
            bomb.scale.y = blockwidthheight / 8;
            bomb.x = blockwidthheight * 4;
            bomb.y = blockwidthheight * 0;
            gameContainer.addChild(bomb);
            let bomb2 = new PIXI.Sprite(bombTexture);
            bomb2.anchor.x = 0;
            bomb2.anchor.y = 0;
            bomb2.scale.x = blockwidthheight / 8;
            bomb2.scale.y = blockwidthheight / 8;
            bomb2.x = blockwidthheight * 4;
            bomb2.y = blockwidthheight * -1;
            gameContainer.addChild(bomb2);
            now = [
                [0, 0, 0, 0, 0],
                [0, 0, bomb2, 0, 0],
                [0, 0, bomb, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];
            x = 4;
            y = 0;
            return;
    }
}
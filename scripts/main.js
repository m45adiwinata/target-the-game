var cvs, ctx;
var player1, player2, player3;
var bg = new Image();
bg.src = 'images/background/mainBG.jpg';
var base = new Image();
base.src = 'images/grounds/base.jpg';
var target = new Image();
target.src = 'images/grounds/target.jpg';
var bf = new Image();
bf.src = 'images/grounds/battlefield.jpg';
var basePath1 = new Image();
basePath1.src = 'images/grounds/basePath1.jpg';
var basePath2 = new Image();
basePath2.src = 'images/grounds/basePath2.jpg';
var targetPath = new Image();
targetPath.src = 'images/grounds/targetPath.jpg';

var player1_ord, player2_ord, player3_ord;

function setPlayer(numberPlayer) {
    document.getElementById('menu').innerHTML = '';
    document.getElementById('canvas').style.visibility = 'visible';
    switch (numberPlayer) {
        case 1:
            player1 = new Image();
            player1.src = 'images/players/player1.png';
            player1_ord = [spawnPointX,spawnPointY];
            player1MoveState = 0; player1CurrentStage = 'base';
            break;
        case 2:
            player1 = new Image();
            player1.src = 'images/players/player1.png';
            player2 = new Image();
            player2.src = 'images/players/player2.png';
            player1_ord = [spawnPointX,spawnPointY];
            player2_ord = [spawnPointX,spawnPointY];
            player1MoveState = 0; player1CurrentStage = 'base';
            player2MoveState = 0; player2CurrentStage = 'base';
            break;
        case 3:
            player1 = new Image();
            player1.src = 'images/players/player1.png';
            player2 = new Image();
            player2.src = 'images/players/player2.png';
            player3 = new Image();
            player3.src = 'images/players/player3.png';
            player1_ord = [spawnPointX,spawnPointY];
            player2_ord = [spawnPointX,spawnPointY];
            player3_ord = [spawnPointX,spawnPointY];
            player1MoveState = 0; player1CurrentStage = 'base';
            player2MoveState = 0; player2CurrentStage = 'base';
            player3MoveState = 0; player3CurrentStage = 'base';
            break;
        default:
            break;
    }
    obsMoveState = 1;
    
    draw();
}

var spawnPointX = 120;
var spawnPointY = 250;
var baseBoundary = [100, 240, 200, 370];
var floor1Boundary = [200, 320, 250, 370];
var floor2Boundary = [250, 300, 300, 370];
var bfBoundary = [250, 100, 750, 300];
var floor3Boundary = [750, 100, 800, 150];

var obs_size = 35;
var obs_mrg = obs_size+5;
var obsX = 250;
var obsY = 100;
var obsX2 = obsX+500-obs_size;
var obs = [];
var obs_ord = [];
for (let i = 0; i < 5; i++) {
    obs.push(new Image());
    obs[i].src = 'images/obstacle/obs.png';
    if (i%2 == 0) {
        obs_ord.push({x:obsX, y:obsY+obs_mrg*i});
    } else {
        obs_ord.push({x:obsX2, y:obsY+obs_mrg*i});
    }
}
var obsMS = 6;
var obsMoveState;

var playerMS = 3;
var player1MoveState, player2MoveState, player3MoveState;
var player1CurrentStage, player2CurrentStage, player3CurrentStage;
var playerSize = 30;

function draw() {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(base, 100, 240);
    ctx.drawImage(bf, 250, 100);
    ctx.drawImage(target, 800, 100);
    ctx.drawImage(basePath1, floor1Boundary[0], floor1Boundary[1]);
    ctx.drawImage(basePath2, floor2Boundary[0], floor2Boundary[1]);
    ctx.drawImage(targetPath, 750, 100);
    if (player1) {
        ctx.drawImage(player1, player1_ord[0], player1_ord[1]);
        player1Move(player1MoveState);
        if(player1CurrentStage == 'base') {
            if (player1_ord[0] <= baseBoundary[0]+playerMS) {
                player1_ord[0] = baseBoundary[0]+playerMS;
            }
            if (player1_ord[0] > baseBoundary[2]-playerMS-playerSize ) {
                if (player1_ord[1] < floor1Boundary[1] && player1_ord[1] >= baseBoundary[1]+playerMS) {
                    player1_ord[0] = baseBoundary[2]-playerMS-playerSize;
                }
                else {
                    if (player1_ord[0] >= floor1Boundary[0]) {
                        player1CurrentStage = 'floor1';
                    }
                    else if (player1_ord[0]+playerSize > floor1Boundary[0]) {
                        if (player1_ord[1] <= floor1Boundary[1]+playerMS) {
                            player1_ord[1] = floor1Boundary[1]+playerMS;
                        }
                    }
                }
            }
            
            if (player1_ord[1] <= baseBoundary[1]+playerMS) {
                player1_ord[1] = baseBoundary[1]+playerMS;
            }
            if (player1_ord[1] >= baseBoundary[3]-playerMS-playerSize ) {
                player1_ord[1] = baseBoundary[3]-playerMS-playerSize;
            }
        }
        else if(player1CurrentStage == 'floor1') {
            if (player1_ord[0] <= floor1Boundary[0]+playerMS) {
                player1CurrentStage = 'base';
            }
            if (player1_ord[0] > floor2Boundary[0]+playerMS) {
                player1CurrentStage = 'floor2';
            }
            if (player1_ord[1] <= floor1Boundary[1]+playerMS) {
                player1_ord[1] = floor1Boundary[1]+playerMS;
            }
            if (player1_ord[1] >= floor1Boundary[3]-playerMS-playerSize ) {
                player1_ord[1] = floor1Boundary[3]-playerMS-playerSize;
            }
        }
        else if(player1CurrentStage == 'floor2') {
            if (player1_ord[0] <= floor2Boundary[0]+playerMS) {
                if (player1_ord[1] >= floor1Boundary[1] && player1_ord[1] <= floor1Boundary[3]-playerMS-playerSize) {
                    player1CurrentStage = 'floor1';
                } else {
                    player1_ord[0] = floor2Boundary[0]+playerMS;
                }
            }
            if (player1_ord[0] >= floor2Boundary[2]-playerMS-playerSize) {
                player1_ord[0] = floor2Boundary[2]-playerMS-playerSize;
            }
            if (player1_ord[1]+playerSize < floor2Boundary[1]) {
                player1CurrentStage = 'battlefield';
            }
            if (player1_ord[1] >= floor2Boundary[3]-playerMS-playerSize ) {
                player1_ord[1] = floor2Boundary[3]-playerMS-playerSize;
            }
        }
        else if(player1CurrentStage == 'battlefield') {
            if (player1_ord[0] <= bfBoundary[0]+playerMS) {
                player1_ord[0] = bfBoundary[0]+playerMS;
            }
            if (player1_ord[0] > bfBoundary[2]-playerMS-playerSize) {
                if (player1_ord[1] <= floor3Boundary[3]-playerMS-playerSize && player1_ord[1] >= floor3Boundary[1]) {
                    player1CurrentStage = 'floor3';
                } else {
                    player1_ord[0] = bfBoundary[2]-playerMS-playerSize;
                }
            }
            if (player1_ord[1] <= bfBoundary[1]+playerMS) {
                player1_ord[1] = bfBoundary[1]+playerMS;
            }
            if (player1_ord[1] >= bfBoundary[3]-playerMS-playerSize ) {
                if (player1_ord[0] <= floor2Boundary[2]-playerMS-playerSize && player1_ord[0] >= floor2Boundary[0]) {
                    player1CurrentStage = 'floor2';
                } else {
                    player1_ord[1] = bfBoundary[3]-playerMS-playerSize;
                }
            }
        }
        else if(player1CurrentStage == 'floor3') {
            if (player1_ord[0] <= floor3Boundary[0]+playerMS) {
                player1CurrentStage = 'battlefield';
            }
            if (player1_ord[0] > floor3Boundary[2]-playerMS-playerSize ) {
                player1CurrentStage = 'target';
            }
            if (player1_ord[1] <= floor3Boundary[1]+playerMS) {
                player1_ord[1] = floor3Boundary[1]+playerMS;
            }
            if (player1_ord[1] >= floor3Boundary[3]-playerMS-playerSize ) {
                player1_ord[1] = floor3Boundary[3]-playerMS-playerSize;
            }
        }
    
        for (let i = 0; i < obs_ord.length; i++) {
            if (((player1_ord[0] <= obs_ord[i].x+obs_size && player1_ord[0] >= obs_ord[i].x) && 
                (player1_ord[1] >= obs_ord[i].y && player1_ord[1] <= obs_ord[i].y+obs_size)) || 
                ((player1_ord[0]+playerSize >= obs_ord[i].x && player1_ord[0]+playerSize <= obs_ord[i].x+obs_size) &&
                (player1_ord[1]+playerSize >= obs_ord[i].y && player1_ord[1]+playerSize <= obs_ord[i].y+obs_size))) {
                player1_ord[0] = spawnPointX;
                player1_ord[1] = spawnPointY;
                player1CurrentStage = 'base';
                player1MoveState = 0;
            }
        }
    }
    if (player2) {
        ctx.drawImage(player2, player2_ord[0], player2_ord[1]);
        player2Move(player2MoveState);
        if(player2CurrentStage == 'base') {
            if (player2_ord[0] <= baseBoundary[0]+playerMS) {
                player2_ord[0] = baseBoundary[0]+playerMS;
            }
            if (player2_ord[0] > baseBoundary[2]-playerMS-playerSize ) {
                if (player2_ord[1] < floor1Boundary[1] && player2_ord[1] >= baseBoundary[1]+playerMS) {
                    player2_ord[0] = baseBoundary[2]-playerMS-playerSize;
                }
                else {
                    if (player2_ord[0] >= floor1Boundary[0]) {
                        player2CurrentStage = 'floor1';
                    }
                    else if (player2_ord[0]+playerSize > floor1Boundary[0]) {
                        if (player2_ord[1] <= floor1Boundary[1]+playerMS) {
                            player2_ord[1] = floor1Boundary[1]+playerMS;
                        }
                    }
                }
            }
            
            if (player2_ord[1] <= baseBoundary[1]+playerMS) {
                player2_ord[1] = baseBoundary[1]+playerMS;
            }
            if (player2_ord[1] >= baseBoundary[3]-playerMS-playerSize ) {
                player2_ord[1] = baseBoundary[3]-playerMS-playerSize;
            }
        }
        else if(player2CurrentStage == 'floor1') {
            if (player2_ord[0] <= floor1Boundary[0]+playerMS) {
                player2CurrentStage = 'base';
            }
            if (player2_ord[0] > floor2Boundary[0]+playerMS) {
                player2CurrentStage = 'floor2';
            }
            if (player2_ord[1] <= floor1Boundary[1]+playerMS) {
                player2_ord[1] = floor1Boundary[1]+playerMS;
            }
            if (player2_ord[1] >= floor1Boundary[3]-playerMS-playerSize ) {
                player2_ord[1] = floor1Boundary[3]-playerMS-playerSize;
            }
        }
        else if(player2CurrentStage == 'floor2') {
            if (player2_ord[0] <= floor2Boundary[0]+playerMS) {
                if (player2_ord[1] >= floor1Boundary[1] && player2_ord[1] <= floor1Boundary[3]-playerMS-playerSize) {
                    player2CurrentStage = 'floor1';
                } else {
                    player2_ord[0] = floor2Boundary[0]+playerMS;
                }
            }
            if (player2_ord[0] >= floor2Boundary[2]-playerMS-playerSize) {
                player2_ord[0] = floor2Boundary[2]-playerMS-playerSize;
            }
            if (player2_ord[1]+playerSize < floor2Boundary[1]) {
                player2CurrentStage = 'battlefield';
            }
            if (player2_ord[1] >= floor2Boundary[3]-playerMS-playerSize ) {
                player2_ord[1] = floor2Boundary[3]-playerMS-playerSize;
            }
        }
        else if(player2CurrentStage == 'battlefield') {
            if (player2_ord[0] <= bfBoundary[0]+playerMS) {
                player2_ord[0] = bfBoundary[0]+playerMS;
            }
            if (player2_ord[0] > bfBoundary[2]-playerMS-playerSize) {
                if (player2_ord[1] <= floor3Boundary[3]-playerMS-playerSize && player2_ord[1] >= floor3Boundary[1]) {
                    player2CurrentStage = 'floor3';
                } else {
                    player2_ord[0] = bfBoundary[2]-playerMS-playerSize;
                }
            }
            if (player2_ord[1] <= bfBoundary[1]+playerMS) {
                player2_ord[1] = bfBoundary[1]+playerMS;
            }
            if (player2_ord[1] >= bfBoundary[3]-playerMS-playerSize ) {
                if (player2_ord[0] <= floor2Boundary[2]-playerMS-playerSize && player2_ord[0] >= floor2Boundary[0]) {
                    player2CurrentStage = 'floor2';
                } else {
                    player2_ord[1] = bfBoundary[3]-playerMS-playerSize;
                }
            }
        }
        else if(player2CurrentStage == 'floor3') {
            if (player2_ord[0] <= floor3Boundary[0]+playerMS) {
                player2CurrentStage = 'battlefield';
            }
            if (player2_ord[0] > floor3Boundary[2]-playerMS-playerSize ) {
                player2CurrentStage = 'target';
            }
            if (player2_ord[1] <= floor3Boundary[1]+playerMS) {
                player2_ord[1] = floor3Boundary[1]+playerMS;
            }
            if (player2_ord[1] >= floor3Boundary[3]-playerMS-playerSize ) {
                player2_ord[1] = floor3Boundary[3]-playerMS-playerSize;
            }
        }
    
        for (let i = 0; i < obs_ord.length; i++) {
            if (((player2_ord[0] <= obs_ord[i].x+obs_size && player2_ord[0] >= obs_ord[i].x) && 
                (player2_ord[1] >= obs_ord[i].y && player2_ord[1] <= obs_ord[i].y+obs_size)) || 
                ((player2_ord[0]+playerSize >= obs_ord[i].x && player2_ord[0]+playerSize <= obs_ord[i].x+obs_size) &&
                (player2_ord[1]+playerSize >= obs_ord[i].y && player2_ord[1]+playerSize <= obs_ord[i].y+obs_size))) {
                player2_ord[0] = spawnPointX;
                player2_ord[1] = spawnPointY;
                player2CurrentStage = 'base';
                player2MoveState = 0;
            }
        }
    }
    if (player3) {
        ctx.drawImage(player3, player3_ord[0], player3_ord[1]);
        player3Move(player3MoveState);
        if(player3CurrentStage == 'base') {
            if (player3_ord[0] <= baseBoundary[0]+playerMS) {
                player3_ord[0] = baseBoundary[0]+playerMS;
            }
            if (player3_ord[0] > baseBoundary[2]-playerMS-playerSize ) {
                if (player3_ord[1] < floor1Boundary[1] && player3_ord[1] >= baseBoundary[1]+playerMS) {
                    player3_ord[0] = baseBoundary[2]-playerMS-playerSize;
                }
                else {
                    if (player3_ord[0] >= floor1Boundary[0]) {
                        player3CurrentStage = 'floor1';
                    }
                    else if (player3_ord[0]+playerSize > floor1Boundary[0]) {
                        if (player3_ord[1] <= floor1Boundary[1]+playerMS) {
                            player3_ord[1] = floor1Boundary[1]+playerMS;
                        }
                    }
                }
            }
            
            if (player3_ord[1] <= baseBoundary[1]+playerMS) {
                player3_ord[1] = baseBoundary[1]+playerMS;
            }
            if (player3_ord[1] >= baseBoundary[3]-playerMS-playerSize ) {
                player3_ord[1] = baseBoundary[3]-playerMS-playerSize;
            }
        }
        else if(player3CurrentStage == 'floor1') {
            if (player3_ord[0] <= floor1Boundary[0]+playerMS) {
                player3CurrentStage = 'base';
            }
            if (player3_ord[0] > floor2Boundary[0]+playerMS) {
                player3CurrentStage = 'floor2';
            }
            if (player3_ord[1] <= floor1Boundary[1]+playerMS) {
                player3_ord[1] = floor1Boundary[1]+playerMS;
            }
            if (player3_ord[1] >= floor1Boundary[3]-playerMS-playerSize ) {
                player3_ord[1] = floor1Boundary[3]-playerMS-playerSize;
            }
        }
        else if(player3CurrentStage == 'floor2') {
            if (player3_ord[0] <= floor2Boundary[0]+playerMS) {
                if (player3_ord[1] >= floor1Boundary[1] && player3_ord[1] <= floor1Boundary[3]-playerMS-playerSize) {
                    player3CurrentStage = 'floor1';
                } else {
                    player3_ord[0] = floor2Boundary[0]+playerMS;
                }
            }
            if (player3_ord[0] >= floor2Boundary[2]-playerMS-playerSize) {
                player3_ord[0] = floor2Boundary[2]-playerMS-playerSize;
            }
            if (player3_ord[1]+playerSize < floor2Boundary[1]) {
                player3CurrentStage = 'battlefield';
            }
            if (player3_ord[1] >= floor2Boundary[3]-playerMS-playerSize ) {
                player3_ord[1] = floor2Boundary[3]-playerMS-playerSize;
            }
        }
        else if(player3CurrentStage == 'battlefield') {
            if (player3_ord[0] <= bfBoundary[0]+playerMS) {
                player3_ord[0] = bfBoundary[0]+playerMS;
            }
            if (player3_ord[0] > bfBoundary[2]-playerMS-playerSize) {
                if (player3_ord[1] <= floor3Boundary[3]-playerMS-playerSize && player3_ord[1] >= floor3Boundary[1]) {
                    player3CurrentStage = 'floor3';
                } else {
                    player3_ord[0] = bfBoundary[2]-playerMS-playerSize;
                }
            }
            if (player3_ord[1] <= bfBoundary[1]+playerMS) {
                player3_ord[1] = bfBoundary[1]+playerMS;
            }
            if (player3_ord[1] >= bfBoundary[3]-playerMS-playerSize ) {
                if (player3_ord[0] <= floor2Boundary[2]-playerMS-playerSize && player3_ord[0] >= floor2Boundary[0]) {
                    player3CurrentStage = 'floor2';
                } else {
                    player3_ord[1] = bfBoundary[3]-playerMS-playerSize;
                }
            }
        }
        else if(player3CurrentStage == 'floor3') {
            if (player3_ord[0] <= floor3Boundary[0]+playerMS) {
                player3CurrentStage = 'battlefield';
            }
            if (player3_ord[0] > floor3Boundary[2]-playerMS-playerSize ) {
                player3CurrentStage = 'target';
            }
            if (player3_ord[1] <= floor3Boundary[1]+playerMS) {
                player3_ord[1] = floor3Boundary[1]+playerMS;
            }
            if (player3_ord[1] >= floor3Boundary[3]-playerMS-playerSize ) {
                player3_ord[1] = floor3Boundary[3]-playerMS-playerSize;
            }
        }
    
        for (let i = 0; i < obs_ord.length; i++) {
            if (((player3_ord[0] <= obs_ord[i].x+obs_size && player3_ord[0] >= obs_ord[i].x) && 
                (player3_ord[1] >= obs_ord[i].y && player3_ord[1] <= obs_ord[i].y+obs_size)) || 
                ((player3_ord[0]+playerSize >= obs_ord[i].x && player3_ord[0]+playerSize <= obs_ord[i].x+obs_size) &&
                (player3_ord[1]+playerSize >= obs_ord[i].y && player3_ord[1]+playerSize <= obs_ord[i].y+obs_size))) {
                player3_ord[0] = spawnPointX;
                player3_ord[1] = spawnPointY;
                player3CurrentStage = 'base';
                player3MoveState = 0;
            }
        }
    }
    for (let i = 0; i < obs.length; i++) {
        ctx.drawImage(obs[i], obs_ord[i].x, obs_ord[i].y);
    }
    if (obs_ord[0].x >= obsX+500-obs_size && obsMoveState == 1) {
        obsMoveState = 2;
    }
    else if (obs_ord[0].x <= 250 && obsMoveState == 2) {
        obsMoveState = 1;
    }
    obsMovement(obsMoveState);
    requestAnimationFrame(draw);
}

function obsMovement(state) {
    switch (state) {
        case 1:
            for (let i = 0; i < obs_ord.length; i++) {
                if (i%2 == 0) {
                    obs_ord[i].x += obsMS; 
                } else {
                    obs_ord[i].x -= obsMS;
                }
            }
            break;
        case 2:
            for (let i = 0; i < obs_ord.length; i++) {
                if (i%2 == 0) {
                    obs_ord[i].x -= obsMS; 
                } else {
                    obs_ord[i].x += obsMS;
                }
            }
            break;
    
        default:
            break;
    }
}

document.addEventListener('keydown', move);
function move(evt) {
    if (evt.keyCode == 37 || evt.keyCode == 38 || evt.keyCode == 39 || evt.keyCode == 40) {
        player1MoveState = evt.keyCode;
    } 
    else if (evt.keyCode == 65 || evt.keyCode == 87 || evt.keyCode == 68 || evt.keyCode == 83) {
        player2MoveState = evt.keyCode;
    }
    else if (evt.keyCode == 74 || evt.keyCode == 73 || evt.keyCode == 76 || evt.keyCode == 75) {
        player3MoveState = evt.keyCode;
    }
    else if (evt.keyCode == 16) {
        player1MoveState = 0;
    }
    else if (evt.keyCode == 88) {
        player2MoveState = 0;
    }
    else if (evt.keyCode == 77) {
        player3MoveState = 0;
    }
}
function player1Move(moveState) {
    switch (moveState) {
        case 37:
            player1_ord[0] -= playerMS;
            break;
        case 38:
            player1_ord[1] -= playerMS;
            break;
        case 39:
            player1_ord[0] += playerMS;
            break;
        case 40:
            player1_ord[1] += playerMS;
            break;
        default:
            break;
    }
}
function player2Move(moveState) {
    switch (moveState) {
        case 65:
            player2_ord[0] -= playerMS;
            break;
        case 87:
            player2_ord[1] -= playerMS;
            break;
        case 68:
            player2_ord[0] += playerMS;
            break;
        case 83:
            player2_ord[1] += playerMS;
            break;
        default:
            break;
    }
}
function player3Move(moveState) {
    switch (moveState) {
        case 74:
            player3_ord[0] -= playerMS;
            break;
        case 73:
            player3_ord[1] -= playerMS;
            break;
        case 76:
            player3_ord[0] += playerMS;
            break;
        case 75:
            player3_ord[1] += playerMS;
            break;
        default:
            break;
    }
}
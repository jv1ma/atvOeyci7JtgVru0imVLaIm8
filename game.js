const mutebuttoncanvas = document.getElementById('mbcanvas');
const mbctxt = mutebuttoncanvas.getContext('2d');
const menubuttoncanvas = document.getElementById('mnbcanvas');
const mnbctxt = menubuttoncanvas.getContext('2d');
mutebuttoncanvas.width = 96;
mutebuttoncanvas.height = 96;
menubuttoncanvas.width = 96;
menubuttoncanvas.height = 96;
const menu = document.getElementById('menu');
menu.height = document.body.clientHeight;

const sfxvol = document.getElementById('sfxvol');
const mscvol = document.getElementById('mscvol');
menu.style.visibility = 'hidden';


//SFX
const endsfx = new Audio();
endsfx.src = 'sfx/end.wav';
const pushsfx = new Audio();
pushsfx.src = 'sfx/push.wav';
const movesfx = new Audio();
movesfx.src = 'sfx/move.wav';
const errorsfx = new Audio();
errorsfx.src = 'sfx/error.wav';
const switchsfx = new Audio();
switchsfx.src = 'sfx/switch.wav';
const resetsfx = new Audio();
resetsfx.src = 'sfx/noise.wav';

//TRACKS
const ambience = new Audio();
ambience.src = 'tracks/ambience.wav';
ambience.loop = true;
ambience.volume = 0.8;
const track1 = new Audio();
track1.src = 'tracks/track1.wav';
track1.loop = true;
track1.volume = 0.6;
const track2 = new Audio();
track2.src = 'tracks/track2.wav';
track2.loop = true;
track2.volume = 0.6;
const track3 = new Audio();
track3.src = 'tracks/track3.wav';
track3.loop = true;
track3.volume = 0.6;

class Settings {
    constructor() {
        this.mute = 0;
    }
    menushow() {
        if (menu.style.visibility === 'hidden') {
            menu.style.visibility = 'visible';
        }
        else {
            menu.style.visibility = 'hidden';
        }
    }
    soundmute() {
        if (this.mute === 1) {
            this.mute = 0;
        }
        else {
            this.mute = 1;
        }
    }
    soundupdate() {
        if (this.mute === 0) {
            ambience.volume = mscvol.value * 0.8 / 10;
            track1.volume = mscvol.value * 0.6 / 10;
            track2.volume = mscvol.value * 0.6 / 10;
            track3.volume = mscvol.value * 0.6 / 10;

            endsfx.volume = sfxvol.value / 10;
            errorsfx.volume = sfxvol.value / 10;
            pushsfx.volume = sfxvol.value / 10;
            movesfx.volume = sfxvol.value / 10;
            resetsfx.volume = sfxvol.value / 10;
            switchsfx.volume = sfxvol.value / 10;
        }
        else {
            ambience.volume = 0;
            track1.volume = 0;
            track2.volume = 0;
            track3.volume = 0;

            endsfx.volume = 0;
            errorsfx.volume = 0;
            pushsfx.volume = 0;
            movesfx.volume = 0;
            resetsfx.volume = 0;
            switchsfx.volume = 0;
        }
    }
    render() {
        mbctxt.fillStyle = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`;
        mnbctxt.fillStyle = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`;
        mbctxt.clearRect(0, 0, 96, 96);
        mnbctxt.clearRect(0, 0, 96, 96);

        mnbctxt.fillRect(12, 16, 72, 12);
        mnbctxt.fillRect(12, 40, 72, 12);
        mnbctxt.fillRect(12, 64, 72, 12);

        if (this.mute === 1) {
            mbctxt.fillRect(12, 36, 18, 24);
            mbctxt.fillRect(30, 30, 6, 36);
            mbctxt.fillRect(36, 24, 6, 48);
            mbctxt.fillRect(42, 18, 12, 60);

            mbctxt.fillRect(60, 36, 6, 6);
            mbctxt.fillRect(78, 36, 6, 6);
            mbctxt.fillRect(60, 54, 6, 6);
            mbctxt.fillRect(78, 54, 6, 6);
            mbctxt.fillRect(66, 42, 12, 12);
        }
        else {
            mbctxt.fillRect(12, 36, 18, 24);
            mbctxt.fillRect(30, 30, 6, 36);
            mbctxt.fillRect(36, 24, 6, 48);
            mbctxt.fillRect(42, 18, 12, 60);

            mbctxt.fillRect(60, 36, 6, 6);
            mbctxt.fillRect(60, 54, 6, 6);
            mbctxt.fillRect(66, 42, 6, 12);

            mbctxt.fillRect(78, 36, 6, 24);

            mbctxt.fillRect(72, 30, 6, 6);
            mbctxt.fillRect(72, 60, 6, 6);
        }
    }
}
var settings = new Settings();

window.addEventListener('load', function(){
const noisevoid = document.getElementById('void');
const display = document.getElementById('screen');
const background = document.getElementById('background');
const wallc = document.getElementById('walls');
const wallcl = document.getElementById('wallslayer');
const contextnv = noisevoid.getContext('2d');
const contxt = display.getContext('2d');
const contxtbg = background.getContext('2d');
const contxtwall = wallc.getContext('2d');
const contxtwalll = wallcl.getContext('2d');
const rs = 64;
const fade = document.getElementById('fade');

noisevoid.height = document.body.clientHeight;
noisevoid.width = document.body.clientWidth;

boxindex = -1;
stg = 0;
if (document.cookie) stg = parseInt(document.cookie);
pushstate = 0;
colorstate = 0;
blocked = 0;
part_update = 0;
ka = 0;
kw = 0;
ks = 0;
kd = 0;
kr = 0;
kspc = 0;

class Box {
    constructor(boxx, boxy){
        this.x = boxx;
        this.y = boxy;
    }
    render(context) {
        context.fillRect(this.x*rs+8, this.y*rs+8, 48, 48);
        context.clearRect(this.x*rs+12, this.y*rs+12, 40, 40);
        context.fillRect(this.x*rs+16, this.y*rs+16, 32, 32);
        context.clearRect(this.x*rs+20, this.y*rs+20, 24, 24);
        for (let i = 0; i < 6; i++) {
            context.fillRect(this.x*rs+20+i*4, this.y*rs+20+i*4, 4, 4);
        }
        for (let i = 0; i < 3; i++) {
            context.fillRect(this.x*rs+20+i*4+12, this.y*rs+20+i*4, 4, 4);
        }
        for (let i = 0; i < 3; i++) {
            context.fillRect(this.x*rs+20+i*4, this.y*rs+20+i*4+12, 4, 4);
        }
    }
    empujar(i) {
        pushsfx.currentTime = 0;
        pushsfx.play();
        if (i === 'd') {
            this.x++;
        }
        if (i === 'a') {
            this.x--;
        }
        if (i === 'w') {
            this.y--;
        }
        if (i === 's') {
            this.y++;
        }
    }
}

function reset() {
    resetsfx.currentTime = 0;
    resetsfx.play();
    bga = 0;
    colorstate = 0;
    fadea = 1; 
    goala = 0;

    if (stg < 4) {
        ambience.play();
    }
    else {
        ambience.pause();
    }
    if (stg >= 4 && stg < 10) {
        track1.play();
    }
    else {
        track1.pause();
    }
    if (stg >= 10 && stg < 15) {
        track2.play();
    }
    else {
        track2.pause();
    }
    if (stg >= 15) {
        track3.play();
    }
    else {
        track3.pause();
    }

    level = levels.data[stg];

    SC_HEIGHT = display.height = background.height = wallc.height = wallcl.height = level.gridsize[1]*rs;
    SC_WIDTH = display.width = background.width = wallc.width = wallcl.width = level.gridsize[0]*rs;

    palette = [level.pal1, level.pal2]
    px = level.px;
    py = level.py;
    boxes = [];
    box_parts = [];

    class BoxGen {
        generation() {
            for (let r = 0; r < level.gridsize[1]; r++) {
                for (let c = 0; c < level.gridsize[0]; c++) {
                    if (level.box[r][c] === 1) {
                        boxes.push(new Box(c, r));
                    }
                }
            }
            console.log(boxes)
        }   
    }

    const boxgen = new BoxGen();
    boxgen.generation();
    console.log(stg);
}

reset();

//robar codigo es mi pasion
function hslToHex(h, s, l) { 
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

var seed = 1538;
function random() {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
//robo completado

class Input {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            console.log(e.key);
            if (    e.key === 'w' || 
                    e.key === 'a' || 
                    e.key === 's' || 
                    e.key === 'd' || 
                    e.key === 'r' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowDown' || 
                    e.key === 'ArrowRight' || 
                    e.key === ' ' && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
    }
}

class Player {
    update(input) {
        let blockbox = 0;
        boxindex = -1;
        for (let a = 0; a <= input.keys.length; a++) {
            if (input.keys[a] === 'r') {
                reset();
                kr = 15;
            }
            if (input.keys[a] === 's' || input.keys[a] === 'ArrowDown') {
                if (py < level.gridsize[1] - 1) {
                    if (level.walls[colorstate][py+1][px] === 0) {
                        boxes.forEach(box => {
                            if (box.y === py + 2 && box.x === px) {
                                blockbox = 1;
                            }
                        });
                        boxes.forEach(box => {
                            if (box.y === py + 1 && box.x === px) {
                                boxindex = boxes.indexOf(box);
                                if (py < level.gridsize[1] - 2 && level.walls[colorstate][py+2][px] === 0 && blockbox === 0) {
                                    pushstate = 1;
                                }
                                else {
                                    pushstate = 2;
                                }
                            }
                        });
                        if (pushstate !== 2) {
                            if (pushstate === 1) {
                                boxes[boxindex].empujar('s');
                            }
                            if (pushstate === 0) {
                                movesfx.currentTime = 0;
                                movesfx.play();
                            } 
                            py++;
                            ks = 15;
                        }
                        else {
                            errorsfx.currentTime = 0;
                            errorsfx.play();
                            blocked = 22;
                        }
                        pushstate = 0;
                    }
                    else {
                        errorsfx.currentTime = 0;
                        errorsfx.play();
                        blocked = 22;
                    }
                }
                else {
                    errorsfx.currentTime = 0;
                    errorsfx.play();
                    blocked = 22;
                }
            }
            if (input.keys[a] === 'w' || input.keys[a] === 'ArrowUp') {
                if (py > 0) {
                    if (level.walls[colorstate][py-1][px] === 0) {
                        boxes.forEach(box => {
                            if (box.y === py - 2 && box.x === px) {
                                blockbox = 1;
                            }
                        });
                        boxes.forEach(box => {
                            if (box.y === py - 1 && box.x === px) {
                                boxindex = boxes.indexOf(box);
                                if (py > 1 && level.walls[colorstate][py-2][px] === 0 && blockbox === 0) {
                                    pushstate = 1;
                                }
                                else {
                                    pushstate = 2;
                                }
                            }
                        });
                        if (pushstate !== 2) {
                            if (pushstate === 1) {
                                boxes[boxindex].empujar('w');
                            }
                            if (pushstate === 0) {
                                movesfx.currentTime = 0;
                                movesfx.play();
                            } 
                            py--;
                            kw = 15;
                        }
                        else {
                            errorsfx.currentTime = 0;
                            errorsfx.play();
                            blocked = 22;
                        }
                        pushstate = 0;
                    }
                    else {
                        errorsfx.currentTime = 0;
                        errorsfx.play();
                        blocked = 22;
                    }
                }
                else {
                    errorsfx.currentTime = 0;
                    errorsfx.play();
                    blocked = 22;
                }
            }
            if (input.keys[a] === 'a' || input.keys[a] === 'ArrowLeft') {
                if (px > 0) {
                    if (level.walls[colorstate][py][px-1] === 0) {
                        boxes.forEach(box => {
                            if (box.y === py && box.x === px - 2) {
                                blockbox = 1;
                            }
                        });
                        boxes.forEach(box => {
                            if (box.x === px - 1 && box.y === py) {
                                boxindex = boxes.indexOf(box);
                                if (px > 1 && level.walls[colorstate][py][px-2] === 0 && blockbox === 0) {
                                    pushstate = 1;
                                }
                                else {
                                    pushstate = 2;
                                }
                            }
                        });
                        if (pushstate !== 2) {
                            if (pushstate === 1) {
                                boxes[boxindex].empujar('a');
                            }
                            if (pushstate === 0) {
                                movesfx.currentTime = 0;
                                movesfx.play();
                            } 
                            px--;
                            ka = 15;
                        }
                        else {
                            errorsfx.currentTime = 0;
                            errorsfx.play();
                            blocked = 22;
                        }
                        pushstate = 0;
                    }
                    else {
                        errorsfx.currentTime = 0;
                        errorsfx.play();
                        blocked = 22;
                    }
                }
                else {
                    errorsfx.currentTime = 0;
                    errorsfx.play();
                    blocked = 22;
                }
            }
            if (input.keys[a] === 'd' || input.keys[a] === 'ArrowRight') {
                if (px < level.gridsize[0] - 1) {
                    if (level.walls[colorstate][py][px+1] === 0) {
                        boxes.forEach(box => {
                            if (box.y === py && box.x === px + 2) {
                                blockbox = 1;
                            }
                        });
                        boxes.forEach(box => {
                            if (box.x === px + 1 && box.y === py) {
                                boxindex = boxes.indexOf(box);
                                if (px < level.gridsize[0] - 2 && level.walls[colorstate][py][px+2] === 0 && blockbox === 0) {
                                    pushstate = 1;
                                }
                                else {
                                    pushstate = 2;
                                }
                            }
                        });
                        if (pushstate !== 2) {
                            if (pushstate === 1) {
                                boxes[boxindex].empujar('d');
                            }
                            if (pushstate === 0) {
                                movesfx.currentTime = 0;
                                movesfx.play();
                            } 
                            px++;
                            kd = 15;
                        }
                        else {
                            errorsfx.currentTime = 0;
                            errorsfx.play();
                            blocked = 22;
                        }
                        pushstate = 0;
                    }
                    else {
                        errorsfx.currentTime = 0;
                        errorsfx.play();
                        blocked = 22;
                    }
                }
                else {
                    errorsfx.currentTime = 0;
                    errorsfx.play();
                    blocked = 22;
                }
            }
            if (input.keys[a] === ' ') {
                kspc = 15;
                switchsfx.currentTime = 0;
                switchsfx.play();
                if (colorstate === 0) {
                    colorstate = 1;
                }
                else {
                    colorstate = 0;
                }
                fadea = 1;
            }
        }
    }
    render(context) {
        context.clearRect(0, 0, SC_WIDTH, SC_HEIGHT);
        context.fillStyle = 
        `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`;
        display.style.borderColor = 
        `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`;
        document.body.style.background = 
        `radial-gradient(100% 200% at center, ${hslToHex(palette[Math.abs(colorstate-1)].hsl[0], palette[Math.abs(colorstate-1)].hsl[1], palette[Math.abs(colorstate-1)].hsl[2])}, 
        ${hslToHex(palette[colorstate].hsl[0],palette[colorstate].hsl[1],palette[colorstate].hsl[2])}`;

        menu.style.backgroundColor = `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`
        menu.style.color = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`
        mscvol.style.background = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`
        sfxvol.style.background = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`

        fade.style.backgroundColor =
        `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, ${fadea})`;
        display.style.boxShadow = 
        `inset 0px 0px 0px 2px ${hslToHex(palette[colorstate].hsl[0],palette[colorstate].hsl[1],palette[colorstate].hsl[2])}`
        if (blocked > 0) {
            context.fillRect(px*rs+8, py*rs+8, 48, 48);
            context.clearRect(px*rs+12, py*rs+12, 40, 40);

            context.fillRect(px*rs+16, py*rs+16, 8, 8);
            context.fillRect(px*rs+20, py*rs+20, 8, 8);
            context.fillRect(px*rs+40, py*rs+16, 8, 8);
            context.fillRect(px*rs+36, py*rs+20, 8, 8);

            context.fillRect(px*rs+16, py*rs+40, 8, 8);
            context.fillRect(px*rs+20, py*rs+36, 8, 8);
            context.fillRect(px*rs+40, py*rs+40, 8, 8);
            context.fillRect(px*rs+36, py*rs+36, 8, 8);

            context.fillRect(px*rs+24, py*rs+24, 16, 16);

            blocked--;
        }
        else {
            if (kr > 0) {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+20, py*rs+20, 8, 24);
                context.fillRect(px*rs+28, py*rs+20, 12, 4);
                context.fillRect(px*rs+28, py*rs+32, 12, 4);
                context.fillRect(px*rs+36, py*rs+24, 8, 8);
                context.fillRect(px*rs+36, py*rs+36, 8, 8);
                context.fillRect(px*rs+32, py*rs+36, 4, 4);

                kr--;
            }
            else if (kspc > 0) {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+28, py*rs+20, 8, 16);
                context.fillRect(px*rs+28, py*rs+40, 8, 4);

                kspc--;
            }
            else if (kw > 0) {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+28, py*rs+20, 8, 24);
                context.fillRect(px*rs+20, py*rs+28, 24, 4);
                context.fillRect(px*rs+24, py*rs+24, 16, 4);

                kw--;
            }
            else if (ka > 0) {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+20, py*rs+28, 24, 8);
                context.fillRect(px*rs+28, py*rs+20, 4, 24);
                context.fillRect(px*rs+24, py*rs+24, 4, 16);

                ka--;
            }
            else if (ks > 0) {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+28, py*rs+20, 8, 24);
                context.fillRect(px*rs+20, py*rs+32, 24, 4);
                context.fillRect(px*rs+24, py*rs+36, 16, 4);

                ks--;
            }
            else if (kd > 0) {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+20, py*rs+28, 24, 8);
                context.fillRect(px*rs+32, py*rs+20, 4, 24);
                context.fillRect(px*rs+36, py*rs+24, 4, 16);

                kd--;
            }
            else {
                context.fillRect(px*rs+8, py*rs+8, 48, 48);
                context.clearRect(px*rs+12, py*rs+12, 40, 40);

                context.fillRect(px*rs+20, py*rs+24, 4, 8);
                context.fillRect(px*rs+24, py*rs+36, 4, 4);
                context.fillRect(px*rs+28, py*rs+32, 8, 4);
                context.fillRect(px*rs+36, py*rs+36, 4, 4);
                context.fillRect(px*rs+40, py*rs+24, 4, 8);
            }
        }
        if (fadea > 0) {
            fadea -= 0.05;
        }
    }
}

class Background {
    render(context) {
        if (bga === -35) {
            bga = 35;
        }
        context.clearRect(0, 0, SC_WIDTH, SC_HEIGHT);
        context.fillStyle = `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, ${Math.abs(bga)/70})`;
        for (let b = 0; b < level.gridsize[1]; b++) {
            for (let a = 0; a < level.gridsize[0]; a++) {
                context.fillRect(a*rs, b*rs, rs, rs);
                context.clearRect(a*rs+2, b*rs+2, 60, 60);
            }
        }
        bga--;
        for (let w = 0; w < SC_WIDTH / 4; w++) {
            for(let h = 0; h < SC_HEIGHT / 4; h++) {
                let alpha = Math.random() - 0.8;
                if (alpha >= 0) {
                    context.fillStyle = `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, ${alpha*Math.random()+0.1})`
                    context.fillRect(w*4, h*4, 4, 4);
                }
            }
        }
    }
}

class NoiseVoid {
    render(context) {
        context.clearRect(0, 0, noisevoid.width, noisevoid.height);
        context.fillStyle = `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, ${Math.abs(bga)/70*Math.random()})`;
        let g = 0;
        for (let i = 0; i < Math.floor(Math.random()*1000); i++) {
            g = Math.random() * Math.random() * 64;
            context.fillRect(Math.random()*noisevoid.width, Math.random()*noisevoid.height, g+1, g+1);
        }
    }
}

class SquareNoise {
    constructor() {
        this.x = Math.random() * noisevoid.width;
        this.y = Math.random() * noisevoid.height;
        this.a = Math.floor(100 * Math.random() - 30);
        this.part_s = Math.random() * 64;
        this.dir = [Math.random() * 8 - 4, Math.random() * 8 - 4];
    }
    render(context) {
        context.fillStyle = `hsla(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%, ${this.a/100})`;
        context.fillRect(this.x, this.y, this.part_s, this.part_s);
        context.clearRect(this.x+8, this.y+8, this.part_s-16, this.part_s-16);
        this.a--;
        if (part_update === 1) {
        this.x += this.dir[0];
        this.y += this.dir[1];
        }
    }
}

class End {
    detect(x, y) {
        if (x === px && y === py) {
            stg++;
            document.cookie = `${stg}; max-age=31536000`;
            endsfx.currentTime = 0;
            endsfx.play();
            reset();
        }
    }
    render(context) {
        context.fillStyle = `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`;
        context.fillRect(level.goal[0]*rs+16, level.goal[1]*rs+16, 32, 32);
        context.clearRect(level.goal[0]*rs+20, level.goal[1]*rs+20, 24, 24);
        context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+16, 4, 4);
        context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+16, 4, 4);
        context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+44, 4, 4);
        context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+44, 4, 4);
        goala--;
        if (goala === -1) {
            goala = 24;
        }
        if (goala <= 24 && goala > 20) {
            context.fillRect(level.goal[0]*rs+28, level.goal[1]*rs+28, 8, 8);

            context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+20, 4, 4);
            context.clearRect(level.goal[0]*rs+20, level.goal[1]*rs+44, 4, 4);
            context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+40, 4, 4);
            context.clearRect(level.goal[0]*rs+40, level.goal[1]*rs+16, 4, 4);
        }
        if (goala <= 20 && goala > 16) {
            context.fillRect(level.goal[0]*rs+28, level.goal[1]*rs+28, 8, 8);

            context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+24, 4, 4);
            context.clearRect(level.goal[0]*rs+24, level.goal[1]*rs+44, 4, 4);
            context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+36, 4, 4);
            context.clearRect(level.goal[0]*rs+36, level.goal[1]*rs+16, 4, 4);
        }
        if (goala <= 16 && goala > 12) {
            context.fillRect(level.goal[0]*rs+24, level.goal[1]*rs+24, 16, 16);
            context.clearRect(level.goal[0]*rs+28, level.goal[1]*rs+28, 8, 8);

            context.clearRect(level.goal[0]*rs+24, level.goal[1]*rs+24, 4, 4);
            context.clearRect(level.goal[0]*rs+36, level.goal[1]*rs+24, 4, 4);
            context.clearRect(level.goal[0]*rs+24, level.goal[1]*rs+36, 4, 4);
            context.clearRect(level.goal[0]*rs+36, level.goal[1]*rs+36, 4, 4);

            context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+28, 4, 4);
            context.clearRect(level.goal[0]*rs+28, level.goal[1]*rs+44, 4, 4);
            context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+32, 4, 4);
            context.clearRect(level.goal[0]*rs+32, level.goal[1]*rs+16, 4, 4);
        }
        if (goala <= 12 && goala > 8) {
            context.fillRect(level.goal[0]*rs+24, level.goal[1]*rs+24, 16, 16);
            context.clearRect(level.goal[0]*rs+28, level.goal[1]*rs+28, 8, 8);

            context.clearRect(level.goal[0]*rs+24, level.goal[1]*rs+24, 4, 4);
            context.clearRect(level.goal[0]*rs+36, level.goal[1]*rs+24, 4, 4);
            context.clearRect(level.goal[0]*rs+24, level.goal[1]*rs+36, 4, 4);
            context.clearRect(level.goal[0]*rs+36, level.goal[1]*rs+36, 4, 4);

            context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+32, 4, 4);
            context.clearRect(level.goal[0]*rs+32, level.goal[1]*rs+44, 4, 4);
            context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+28, 4, 4);
            context.clearRect(level.goal[0]*rs+28, level.goal[1]*rs+16, 4, 4);
        }
        if (goala <= 8 && goala > 4) {
            context.fillRect(level.goal[0]*rs+24, level.goal[1]*rs+24, 16, 16);
            context.clearRect(level.goal[0]*rs+28, level.goal[1]*rs+28, 8, 8);

            context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+36, 4, 4);
            context.clearRect(level.goal[0]*rs+36, level.goal[1]*rs+44, 4, 4);
            context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+24, 4, 4);
            context.clearRect(level.goal[0]*rs+24, level.goal[1]*rs+16, 4, 4);
        }
        if (goala <= 4) {
            context.fillRect(level.goal[0]*rs+24, level.goal[1]*rs+24, 16, 16);
            context.clearRect(level.goal[0]*rs+28, level.goal[1]*rs+28, 8, 8);

            context.clearRect(level.goal[0]*rs+16, level.goal[1]*rs+40, 4, 4);
            context.clearRect(level.goal[0]*rs+40, level.goal[1]*rs+44, 4, 4);
            context.clearRect(level.goal[0]*rs+44, level.goal[1]*rs+20, 4, 4);
            context.clearRect(level.goal[0]*rs+20, level.goal[1]*rs+16, 4, 4);
        }
    }
}

class Wall {
    render(context, context2) {
        context.clearRect(0, 0, SC_WIDTH, SC_HEIGHT);
        context2.clearRect(0, 0, SC_WIDTH, SC_HEIGHT);
        context.fillStyle = `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%`;
        for (let r = 0; r < level.gridsize[1]; r++) {
            for (let c = 0; c < level.gridsize[0]; c++) {
                if (level.walls[colorstate][r][c] === 1) {
                    context.fillRect(c*rs, r*rs, rs, rs);
                    context.clearRect(c*rs+8, r*rs+8, rs-16, rs-16);
                    if (r === 0 || level.walls[colorstate][r-1][c] === 1) {
                        context.clearRect(c*rs+8, r*rs, rs-16, 8);
                    }
                    if (r === level.gridsize[1]-1 || level.walls[colorstate][r+1][c] === 1) {
                        context.clearRect(c*rs+8, r*rs+56, rs-16, 8);
                    }
                    if (c === 0 || level.walls[colorstate][r][c-1] === 1) {
                        context.clearRect(c*rs, r*rs+8, 8, rs-16);
                    }
                    if (c === level.gridsize[0]-1 || level.walls[colorstate][r][c+1] === 1) {
                        context.clearRect(c*rs+56, r*rs+8, 8, rs-16);
                    }

                    if (r === 0 && c === 0) {
                        context.clearRect(c*rs, r*rs, 8, 8);
                    }
                    else if (r === level.gridsize[1]-1 && c === 0) {
                        context.clearRect(c*rs, r*rs+56, 8, 8);
                    }
                    else if (r === 0 && c === level.gridsize[0]-1) {
                        context.clearRect(c*rs+56, r*rs, 8, 8);
                    }
                    else if (r === level.gridsize[1]-1 && c === level.gridsize[0]-1) {
                        context.clearRect(c*rs+56, r*rs+56, 8, 8);
                    }

                    if (c === 0 && r !== 0 && level.walls[colorstate][r-1][c] === 1) {
                        context.clearRect(c*rs, r*rs, 8, 8);
                    }
                    if (r === 0 && c !== 0 && level.walls[colorstate][r][c-1] === 1) {
                        context.clearRect(c*rs, r*rs, 8, 8);
                    }
                    if (c !== 0 && r !== 0 && level.walls[colorstate][r][c-1] === 1 && level.walls[colorstate][r-1][c] === 1 && level.walls[colorstate][r-1][c-1] === 1) {
                        context.clearRect(c*rs, r*rs, 8, 8);
                    }

                    if (c === 0 && r !== level.gridsize[1]-1 && level.walls[colorstate][r+1][c] === 1) {
                        context.clearRect(c*rs, r*rs+56, 8, 8);
                    }
                    if (r === level.gridsize[1]-1 && c !== 0 && level.walls[colorstate][r][c-1] === 1) {
                        context.clearRect(c*rs, r*rs+56, 8, 8);
                    }
                    if (c !== 0 && r !== level.gridsize[1]-1 && level.walls[colorstate][r][c-1] === 1 && level.walls[colorstate][r+1][c] === 1 && level.walls[colorstate][r+1][c-1] === 1) {
                        context.clearRect(c*rs, r*rs+56, 8, 8);
                    }

                    if (r === 0 && c !== level.gridsize[0]-1 && level.walls[colorstate][r][c+1] === 1) {
                        context.clearRect(c*rs+56, r*rs, 8, 8);
                    }
                    if (c === level.gridsize[0]-1 && r !== 0 && level.walls[colorstate][r-1][c] === 1) {
                        context.clearRect(c*rs+56, r*rs, 8, 8);
                    }
                    if (r !== 0 && c !== level.gridsize[0]-1 && level.walls[colorstate][r][c+1] === 1 && level.walls[colorstate][r-1][c] === 1 && level.walls[colorstate][r-1][c+1] === 1) {
                        context.clearRect(c*rs+56, r*rs, 8, 8);
                    }

                    if (r === level.gridsize[1]-1 && c !== level.gridsize[0]-1 && level.walls[colorstate][r][c+1] === 1) {
                        context.clearRect(c*rs+56, r*rs+56, 8, 8);
                    }
                    if (c === level.gridsize[0]-1 && r !== level.gridsize[1]-1 && level.walls[colorstate][r+1][c] === 1) {
                        context.clearRect(c*rs+56, r*rs+56, 8, 8);
                    }
                    if (r !== level.gridsize[1]-1 && c !== level.gridsize[0]-1 && level.walls[colorstate][r][c+1] === 1 && level.walls[colorstate][r+1][c] === 1 && level.walls[colorstate][r+1][c+1] === 1) {
                        context.clearRect(c*rs+56, r*rs+56, 8, 8);
                    }

                    context2.fillStyle = `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, 0.3)`
                    let e = 0;
                    let ran = 0;
                    for (let i = 0; e < 16; i++) {
                        if (i === 8) {
                            i = 0;
                            e++;
                            if (e === 8) break;
                        }
                        seed = i * 2 * e + 64 + colorstate + seed;
                        ran = random();
                        if (ran >= 0.5) {
                            context2.fillRect(c*rs+8*i, r*rs+8*e, 8, 8);
                        }
                    }
                }
            }
        }
    }
}


function frame() {
    settings.soundupdate();
    end.detect(level.goal[0],level.goal[1]);
    noisy.render(contextnv);
    bg.render(contxtbg);
    wall.render(contxtwall, contxtwalll);
    player.render(contxt);
    player.update(input);
    end.render(contxt);
    box_parts.push(new SquareNoise());
    boxes.forEach(box => {
        box.render(contxt);
    });
    if (part_update === 0) {
        part_update = 4;
    } 
    else {
        part_update--;
    }
    box_parts.forEach(boxpart => {
        if (boxpart.a <= 0) {
            box_parts.splice(box_parts.indexOf(boxpart), 1);
        }
        else {
            boxpart.render(contextnv);
        }
    });
    input.keys.splice(0, input.keys.length);
    requestAnimationFrame(frame);
    settings.render();
}

const input = new Input();
const player = new Player();
const bg = new Background();
const end = new End();
const wall = new Wall();
const noisy = new NoiseVoid();
const squarnoise = new SquareNoise();
frame();
});

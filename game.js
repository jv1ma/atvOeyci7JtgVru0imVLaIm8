const mutebuttoncanvas = document.getElementById('mbcanvas');
const mbctxt = mutebuttoncanvas.getContext('2d');
const menubuttoncanvas = document.getElementById('mnbcanvas');
const mnbctxt = menubuttoncanvas.getContext('2d');
const resetbuttoncanvas = document.getElementById('rbcanvas');
const rbctxt = resetbuttoncanvas.getContext('2d');
const switchbuttoncanvas = document.getElementById('sbcanvas');
const sbctxt = switchbuttoncanvas.getContext('2d');

const endscreen = document.getElementById('endscreen');

const upbuttoncanvas = document.getElementById('uwcanvas');
const uwctxt = upbuttoncanvas.getContext('2d');
const downbuttoncanvas = document.getElementById('dscanvas');
const dsctxt = downbuttoncanvas.getContext('2d');
const leftbuttoncanvas = document.getElementById('lacanvas');
const lactxt = leftbuttoncanvas.getContext('2d');
const rightbuttoncanvas = document.getElementById('rdcanvas');
const rdctxt = rightbuttoncanvas.getContext('2d');

mutebuttoncanvas.width = menubuttoncanvas.width = switchbuttoncanvas.width = resetbuttoncanvas.height = 96;
mutebuttoncanvas.height = menubuttoncanvas.height = switchbuttoncanvas.height = resetbuttoncanvas.width = 96;
rightbuttoncanvas.width = leftbuttoncanvas.width = downbuttoncanvas.width = upbuttoncanvas.height = 96;
rightbuttoncanvas.height = leftbuttoncanvas.height = downbuttoncanvas.height = upbuttoncanvas.width = 96;

SC_HEIGHT = 0;
SC_WIDTH = 0;
palette = [{hsl:[0, 0, 100]}, {hsl:[0, 0, 0]}]
noiseen = 1;
solidbk = 0;

const menu = document.getElementById('menu');
menu.height = document.body.clientHeight;
const rstbut = document.getElementById('reset');

const sfxvol = document.getElementById('sfxvol');
const mscvol = document.getElementById('mscvol');
const rsopt = document.getElementById('resolution');
menu.style.visibility = 'hidden';

var rs = 64;
var pix = 4
var keys = [];

//SFX
const endsfx = new Audio();
endsfx.src = 'sfx/end.wav';
const pushsfx = new Audio();
pushsfx.src = 'sfx/push.wav';
const movesfx = new Audio();
movesfx.src = 'sfx/move.wav';
const errorsfx = new Audio();
errorsfx.src = 'sfx/error.wav';
const switch1sfx = new Audio();
switch1sfx.src = 'sfx/switch1.wav';
const switch2sfx = new Audio();
switch2sfx.src = 'sfx/switch2.wav';
const resetsfx = new Audio();
resetsfx.src = 'sfx/noise.wav';

//TRACKS
const ambience = new Audio();
ambience.src = 'tracks/ambience.mp3';
ambience.loop = true;
ambience.volume = 0.8;
const track1 = new Audio();
track1.src = 'tracks/track1.mp3';
track1.loop = true;
track1.volume = 0.6;
const track2 = new Audio();
track2.src = 'tracks/track2.mp3';
track2.loop = true;
track2.volume = 0.6;
const track3 = new Audio();
track3.src = 'tracks/track3.mp3';
track3.loop = true;
track3.volume = 0.6;
const track4 = new Audio();
track4.src = 'tracks/track4.mp3';
track4.loop = true;
track4.volume = 0.6;
const track5 = new Audio();
track5.src = 'tracks/track1_2.mp3';
track5.loop = true;
track5.volume = 0.6;

//CANVAS
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
const fade = document.getElementById('fade');

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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
//robo completado

class Settings {
    constructor() {
        this.mute = 0;
    }
    updateres() {
        if (document.getElementById('autosc').checked === true)
            rs = Math.pow(2, rsopt.value-1+level.sc[rsopt.value-1]) * 16;
        else
            rs = Math.pow(2, rsopt.value-1) * 16;
        pix = rs / 16;
        SC_HEIGHT = display.height = background.height = wallc.height = wallcl.height = level.gridsize[1]*rs;
        SC_WIDTH = display.width = background.width = wallc.width = wallcl.width = level.gridsize[0]*rs;
    }
    updatepal() {
        if (document.getElementById('owcol').checked === false) {
            palette = [level.pal1, level.pal2];
        }
        else {
            palette = [{hsl:[document.getElementById('hcol1').value, document.getElementById('scol1').value, document.getElementById('lcol1').value]}, 
                       {hsl:[document.getElementById('hcol2').value, document.getElementById('scol2').value, document.getElementById('lcol2').value]}]
        }
        
    }
    updatenoise() {
        if (document.getElementById('rmnoise').checked === false) {
            noisevoid.style.visibility = 'visible';
            noiseen = 1;
        }
        else {
            noisevoid.style.visibility = 'hidden';
            noiseen = 0;
        }
    }
    updatesolidbk (){
        if (document.getElementById('solidbk').checked === false) {
            solidbk = 0;
        }
        else {
            solidbk = 1;
        }
    }
    menushow() {
        if (menu.style.visibility === 'hidden') {
            menu.style.visibility = 'visible';
        }
        else {
            menu.style.visibility = 'hidden';
            document.getElementById('coloropt').style.visibility = 'collapse';
        }
    }
    soundmute(x) {
        if (x === 1) {
            this.mute = 1;
        }
        else if (this.mute === 1 || x === 2) {
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
            switch1sfx.volume = sfxvol.value / 10;
            switch2sfx.volume = sfxvol.value / 10;
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
            switch1sfx.volume = 0;
            switch2sfx.volume = 0;
        }
    }
    resetprog() {
        stg = 0;
        document.cookie = `stg=0; max-age=0`;
        reset();
    }
    coloropt(){
        if (document.getElementById('owcol').checked == true) {
            document.getElementById('coloropt').style.visibility = 'visible';
        }
        else {
            document.getElementById('coloropt').style.visibility = 'collapse';
        }
    }
    rbutton() {
        keys.push('r');
    }
    sbutton() {
        keys.push(' ');
    }
    uwbutton() {
        keys.push('w');
    }
    dsbutton() {
        keys.push('s');
    }
    labutton() {
        keys.push('a');
    }
    rdbutton() {
        keys.push('d');
    }
    render() {
        if (menu.style.visibility === 'visible') {
        mbctxt.fillStyle = mnbctxt.fillStyle = 
        `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`;
        }
        else {
            mbctxt.fillStyle = mnbctxt.fillStyle = 
            `hsl(${palette[(colorstate)].hsl[0]}, ${palette[(colorstate)].hsl[1]}%, ${palette[(colorstate)].hsl[2]}%)`;
        }
        rbctxt.fillStyle = sbctxt.fillStyle = uwctxt.fillStyle = dsctxt.fillStyle = lactxt.fillStyle = rdctxt.fillStyle = 
            `hsl(${palette[(colorstate)].hsl[0]}, ${palette[(colorstate)].hsl[1]}%, ${palette[(colorstate)].hsl[2]}%)`;
        mbctxt.clearRect(0, 0, 96, 96);
        mnbctxt.clearRect(0, 0, 96, 96);
        rbctxt.clearRect(0, 0, 96, 96);
        sbctxt.clearRect(0, 0, 96, 96);

        uwctxt.clearRect(0, 0, 96, 96);
        lactxt.clearRect(0, 0, 96, 96);
        rdctxt.clearRect(0, 0, 96, 96);
        dsctxt.clearRect(0, 0, 96, 96);

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
        if (document.getElementById('mbcon').checked === true) {
            sbctxt.fillRect(12, 12, 72, 72);
            sbctxt.clearRect(18, 18, 60, 60);
            sbctxt.fillRect(42, 30, 12, 24);
            sbctxt.fillRect(42, 60, 12, 6);

            rbctxt.fillRect(12, 12, 72, 72);
            rbctxt.clearRect(18, 18, 60, 60);
            rbctxt.fillRect(30, 30, 12, 36);
            rbctxt.fillRect(42, 30, 18, 6);
            rbctxt.fillRect(42, 48, 18, 6);
            rbctxt.fillRect(54, 36, 12, 12);
            rbctxt.fillRect(54, 54, 12, 12);
            rbctxt.fillRect(48, 54, 6, 6);

            uwctxt.fillRect(12, 12, 72, 72);
            uwctxt.clearRect(18, 18, 60, 60);
            uwctxt.fillRect(42, 30, 12, 36);
            uwctxt.fillRect(30, 42, 36, 6);
            uwctxt.fillRect(36, 36, 24, 6);

            lactxt.fillRect(12, 12, 72, 72);
            lactxt.clearRect(18, 18, 60, 60);
            lactxt.fillRect(30, 42, 36, 12);
            lactxt.fillRect(42, 30, 6, 36);
            lactxt.fillRect(36, 36, 6, 24);

            dsctxt.fillRect(12, 12, 72, 72);
            dsctxt.clearRect(18, 18, 60, 60);
            dsctxt.fillRect(42, 30, 12, 36);
            dsctxt.fillRect(30, 48, 36, 6);
            dsctxt.fillRect(36, 54, 24, 6);

            rdctxt.fillRect(12, 12, 72, 72);
            rdctxt.clearRect(18, 18, 60, 60);
            rdctxt.fillRect(30, 42, 36, 12);
            rdctxt.fillRect(48, 30, 6, 36);
            rdctxt.fillRect(54, 36, 6, 24);

            document.getElementById('movb').style.visibility = 'visible';
            document.getElementById('resetbutton').style.visibility = 'visible';
            document.getElementById('switchbutton').style.visibility = 'visible';
        }
        else {
            document.getElementById('movb').style.visibility = 'collapse';
            document.getElementById('resetbutton').style.visibility = 'collapse';
            document.getElementById('switchbutton').style.visibility = 'collapse';
        }
    }
}
var settings = new Settings();

class Box {
    constructor(boxx, boxy){
        this.x = boxx;
        this.y = boxy;
    }
    render(context) {
        context.fillRect(this.x*rs+(pix*2), this.y*rs+(pix*2), pix*12, pix*12);
        context.clearRect(this.x*rs+(pix*3), this.y*rs+(pix*3), pix*10, pix*10);
        context.fillRect(this.x*rs+(pix*4), this.y*rs+(pix*4), pix*8, pix*8);
        context.clearRect(this.x*rs+(pix*5), this.y*rs+(pix*5), pix*6, pix*6);
        for (let i = 0; i < 6; i++) {
            context.fillRect(this.x*rs+(pix*5)+i*pix, this.y*rs+(pix*5)+i*pix, pix, pix);
        }
        for (let i = 0; i < 3; i++) {
            context.fillRect(this.x*rs+(pix*5)+i*pix+(pix*3), this.y*rs+(pix*5)+i*pix, pix, pix);
        }
        for (let i = 0; i < 3; i++) {
            context.fillRect(this.x*rs+(pix*5)+i*pix, this.y*rs+(pix*5)+i*pix+(pix*3), pix, pix);
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
        ambience.currentTime = 0;
    }
    if (stg >= 4 && stg < 10) {
        track1.play();
    }
    else {
        track1.pause();
        track1.currentTime = 0;
    }
    if (stg >= 10 && stg < 15) {
        track2.play();
    }
    else {
        track2.pause();
        track2.currentTime = 0;
    }
    if (stg >= 15 && stg < 21) {
        track3.play();
    }
    else {
        track3.pause();
        track3.currentTime = 0;
    }
    if (stg > 20) {
        track3.pause();
        track3.currentTime = 0;
        settings.soundmute(1);
        endscreen.style.visibility = 'visible';
    }
    else {
        endscreen.style.visibility = 'hidden';
    }

    level = levels.data[stg];

    settings.updateres();
    settings.updatepal();
    settings.updatenoise();
    px = level.px;
    py = level.py;
    boxes = [];
    box_parts = [];

    const boxgen = new BoxGen();
    boxgen.generation();
    console.log(stg);
}

window.addEventListener('load', function() {

noisevoid.height = document.body.clientHeight;
noisevoid.width = document.body.clientWidth;

boxindex = -1;
stg = 0;
if (!!parseInt(getCookie('stg'))) stg = parseInt(getCookie('stg'));
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

reset();

class Input {
    constructor() {
        window.addEventListener('keydown', e => {
                console.log(e.key);
                if (        e.key === 'w' || 
                        e.key === 'a' || 
                        e.key === 's' || 
                        e.key === 'd' || 
                        (e.key === 'r' && !e.repeat) || 
                        e.key === 'ArrowUp' || 
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowDown' || 
                        e.key === 'ArrowRight' || 
                        (e.key === ' ' && keys.indexOf(e.key) === -1 && !e.repeat)) {
                    keys.push(e.key);
                }
        });
    }
}

class Player {
    update() {
        let blockbox = 0;
        boxindex = -1;
        for (let a = 0; a <= keys.length; a++) {
            if (keys[a] === 'r') {
                reset();
                kr = 15;
            }
            if (keys[a] === 's' || keys[a] === 'ArrowDown') {
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
            if (keys[a] === 'w' || keys[a] === 'ArrowUp') {
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
            if (keys[a] === 'a' || keys[a] === 'ArrowLeft') {
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
            if (keys[a] === 'd' || keys[a] === 'ArrowRight') {
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
            if (keys[a] === ' ') {
                kspc = 15;
                switch1sfx.currentTime = switch2sfx.currentTime = 0;
                if (colorstate === 0) {
                    colorstate = 1;
                    switch2sfx.pause();
                    switch1sfx.play();
                }
                else {
                    colorstate = 0;
                    switch1sfx.pause();
                    switch2sfx.play();
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
        if (solidbk === 0) {
        document.body.style.background = 
        `radial-gradient(100% 200% at center, ${hslToHex(palette[Math.abs(colorstate-1)].hsl[0], palette[Math.abs(colorstate-1)].hsl[1], palette[Math.abs(colorstate-1)].hsl[2])}, 
        ${hslToHex(palette[colorstate].hsl[0],palette[colorstate].hsl[1],palette[colorstate].hsl[2])}`;
        }
        else {
            document.body.style.background = `none`;
            document.body.style.backgroundColor = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`
        }

        menu.style.backgroundColor = `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`
        menu.style.color = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`
        rstbut.style.color = `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`
        rstbut.style.backgroundColor = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`;
        mscvol.style.background = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`
        sfxvol.style.background = `hsl(${palette[Math.abs(colorstate-1)].hsl[0]}, ${palette[Math.abs(colorstate-1)].hsl[1]}%, ${palette[Math.abs(colorstate-1)].hsl[2]}%)`

        fade.style.backgroundColor =
        `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, ${fadea})`;
        display.style.boxShadow = 
        `inset 0px 0px 0px ${rs/32}px ${hslToHex(palette[colorstate].hsl[0],palette[colorstate].hsl[1],palette[colorstate].hsl[2])}`
        if (blocked > 0) {
            context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
            context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

            context.fillRect(px*rs+(pix*4), py*rs+(pix*4), (pix*2), (pix*2));
            context.fillRect(px*rs+(pix*5), py*rs+(pix*5), (pix*2), (pix*2));
            context.fillRect(px*rs+(pix*10), py*rs+(pix*4), (pix*2), (pix*2));
            context.fillRect(px*rs+(pix*9), py*rs+(pix*5), (pix*2), (pix*2));

            context.fillRect(px*rs+(pix*4), py*rs+(pix*10), (pix*2), (pix*2));
            context.fillRect(px*rs+(pix*5), py*rs+(pix*9), (pix*2), (pix*2));
            context.fillRect(px*rs+(pix*10), py*rs+(pix*10), (pix*2), (pix*2));
            context.fillRect(px*rs+(pix*9), py*rs+(pix*9), (pix*2), (pix*2)); 

            context.fillRect(px*rs+(pix*6), py*rs+(pix*6), (pix*4), (pix*4));

            blocked--;
        }
        else {
            if (kr > 0) {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*5), py*rs+(pix*5), (pix*2), (pix*6));
                context.fillRect(px*rs+(pix*7), py*rs+(pix*5), (pix*3), pix);
                context.fillRect(px*rs+(pix*7), py*rs+(pix*8), (pix*3), pix);
                context.fillRect(px*rs+(pix*9), py*rs+(pix*6), (pix*2), (pix*2));
                context.fillRect(px*rs+(pix*9), py*rs+(pix*9), (pix*2), (pix*2));
                context.fillRect(px*rs+(pix*8), py*rs+(pix*9), pix, pix);

                kr--;
            }
            else if (kspc > 0) {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*7), py*rs+(pix*5), (pix*2), (pix*4));
                context.fillRect(px*rs+(pix*7), py*rs+(pix*10), (pix*2), pix);

                kspc--;
            }
            else if (kw > 0) {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*7), py*rs+(pix*5), (pix*2), (pix*6));
                context.fillRect(px*rs+(pix*5), py*rs+(pix*7), (pix*6), pix);
                context.fillRect(px*rs+(pix*6), py*rs+(pix*6), (pix*4), pix);

                kw--;
            }
            else if (ka > 0) {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*5), py*rs+(pix*7), (pix*6), (pix*2));
                context.fillRect(px*rs+(pix*7), py*rs+(pix*5), pix, (pix*6));
                context.fillRect(px*rs+(pix*6), py*rs+(pix*6), pix, (pix*4));

                ka--;
            }
            else if (ks > 0) {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*7), py*rs+(pix*5), (pix*2), (pix*6));
                context.fillRect(px*rs+(pix*5), py*rs+(pix*8), (pix*6), pix);
                context.fillRect(px*rs+(pix*6), py*rs+(pix*9), (pix*4), pix);

                ks--;
            }
            else if (kd > 0) {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*5), py*rs+(pix*7), (pix*6), (pix*2));
                context.fillRect(px*rs+(pix*8), py*rs+(pix*5), pix, (pix*6));
                context.fillRect(px*rs+(pix*9), py*rs+(pix*6), pix, (pix*4));

                kd--;
            }
            else {
                context.fillRect(px*rs+(pix*2), py*rs+(pix*2), (pix*12), (pix*12));
                context.clearRect(px*rs+(pix*3), py*rs+(pix*3), (pix*10), (pix*10));

                context.fillRect(px*rs+(pix*5), py*rs+(pix*6), pix, (pix*2));
                context.fillRect(px*rs+(pix*6), py*rs+(pix*9), pix, pix);
                context.fillRect(px*rs+(pix*7), py*rs+(pix*8), (pix*2), pix);
                context.fillRect(px*rs+(pix*9), py*rs+(pix*9), pix, pix);
                context.fillRect(px*rs+(pix*10), py*rs+(pix*6), pix, (pix*2));
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
                context.clearRect(a*rs+pix, b*rs+pix, (pix*14), (pix*14));
            }
        }
        bga--;
        if (noiseen === 1) {
            for (let w = 0; w < SC_WIDTH / pix; w++) {
                for(let h = 0; h < SC_HEIGHT / pix; h++) {
                    let alpha = Math.random() - 0.8;
                    if (alpha >= 0) {
                        context.fillStyle = `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, ${alpha*Math.random()+0.1})`
                        context.fillRect(w*pix, h*pix, pix, pix);
                    }
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
            document.cookie = `stg=${stg}; max-age=31536000; `;
            endsfx.currentTime = 0;
            endsfx.play();
            reset();
        }
    }
    render(context) {
        context.fillStyle = `hsl(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%)`;
        context.fillRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*4), (pix*8), (pix*8));
        context.clearRect(level.goal[0]*rs+(pix*5), level.goal[1]*rs+(pix*5), (pix*6), (pix*6));
        context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*4), pix, pix);
        context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*4), pix, pix);
        context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*11), pix, pix);
        context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*11), pix, pix);
        goala--;
        if (goala === -1) {
            goala = 24;
        }
        if (goala <= 24 && goala > 20) {
            context.fillRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*7), (pix*2), (pix*2));

            context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*5), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*5), level.goal[1]*rs+(pix*11), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*10), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*10), level.goal[1]*rs+(pix*4), pix, pix);
        }
        if (goala <= 20 && goala > 16) {
            context.fillRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*7), (pix*2), (pix*2));

            context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*6), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*11), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*9), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*9), level.goal[1]*rs+(pix*4), pix, pix);
        }
        if (goala <= 16 && goala > 12) {
            context.fillRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*6), (pix*4), (pix*4));
            context.clearRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*7), (pix*2), (pix*2));

            context.clearRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*6), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*9), level.goal[1]*rs+(pix*6), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*9), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*9), level.goal[1]*rs+(pix*9), pix, pix);

            context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*7), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*11), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*8), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*8), level.goal[1]*rs+(pix*4), pix, pix);
        }
        if (goala <= 12 && goala > 8) {
            context.fillRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*6), (pix*4), (pix*4));
            context.clearRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*7), (pix*2), (pix*2));

            context.clearRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*6), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*9), level.goal[1]*rs+(pix*6), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*9), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*9), level.goal[1]*rs+(pix*9), pix, pix);

            context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*8), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*8), level.goal[1]*rs+(pix*11), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*7), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*4), pix, pix);
        }
        if (goala <= 8 && goala > 4) {
            context.fillRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*6), (pix*4), (pix*4));
            context.clearRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*7), (pix*2), (pix*2));

            context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*9), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*9), level.goal[1]*rs+(pix*11), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*6), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*4), pix, pix);
        }
        if (goala <= 4) {
            context.fillRect(level.goal[0]*rs+(pix*6), level.goal[1]*rs+(pix*6), (pix*4), (pix*4));
            context.clearRect(level.goal[0]*rs+(pix*7), level.goal[1]*rs+(pix*7), (pix*2), (pix*2));

            context.clearRect(level.goal[0]*rs+(pix*4), level.goal[1]*rs+(pix*10), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*10), level.goal[1]*rs+(pix*11), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*11), level.goal[1]*rs+(pix*5), pix, pix);
            context.clearRect(level.goal[0]*rs+(pix*5), level.goal[1]*rs+(pix*4), pix, pix);
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
                if (c !== px || r !== py) {
                    if (level.walls[colorstate][r][c] === 1) {
                        context.fillRect(c*rs, r*rs, rs, rs);
                        context.clearRect(c*rs+(pix*2), r*rs+(pix*2), rs-(pix*4), rs-(pix*4));
                        if (r === 0 || level.walls[colorstate][r-1][c] === 1 && (r-1 !== py || c !==px)) {
                            context.clearRect(c*rs+(pix*2), r*rs, rs-(pix*4), (pix*2));
                        }
                        if (r === level.gridsize[1]-1 || level.walls[colorstate][r+1][c] === 1 && (r+1 !== py || c !==px)) {
                            context.clearRect(c*rs+(pix*2), r*rs+(pix*14), rs-(pix*4), (pix*2));
                        }
                        if (c === 0 || level.walls[colorstate][r][c-1] === 1 && (r !== py || c-1 !==px)) {
                            context.clearRect(c*rs, r*rs+(pix*2), (pix*2), rs-(pix*4));
                        }
                        if (c === level.gridsize[0]-1 || level.walls[colorstate][r][c+1] === 1 && (r !== py || c+1 !==px)) {
                            context.clearRect(c*rs+(pix*14), r*rs+(pix*2), (pix*2), rs-(pix*4));
                        }
    
                        if (r === 0 && c === 0) {
                            context.clearRect(c*rs, r*rs, (pix*2), (pix*2));
                        }
                        else if (r === level.gridsize[1]-1 && c === 0) {
                            context.clearRect(c*rs, r*rs+(pix*14), (pix*2), (pix*2));
                        }
                        else if (r === 0 && c === level.gridsize[0]-1) {
                            context.clearRect(c*rs+(pix*14), r*rs, (pix*2), (pix*2));
                        }
                        else if (r === level.gridsize[1]-1 && c === level.gridsize[0]-1) {
                            context.clearRect(c*rs+(pix*14), r*rs+(pix*14), (pix*2), (pix*2));
                        }
    
                        if (c === 0 && r !== 0 && !(py === r-1 && c === px) && level.walls[colorstate][r-1][c] === 1) {
                            context.clearRect(c*rs, r*rs, (pix*2), (pix*2));
                        }
                        if (r === 0 && c !== 0 && !(px === c-1 && r === py) && level.walls[colorstate][r][c-1] === 1) {
                            context.clearRect(c*rs, r*rs, (pix*2), (pix*2));
                        }
                        if (c !== 0 && r !== 0 && 
                            (level.walls[colorstate][r][c-1] === 1 && !(r === py && c-1 === px)) && 
                            (level.walls[colorstate][r-1][c] === 1 && !(c === px && r-1 === py)) && 
                            (level.walls[colorstate][r-1][c-1] === 1 && !(c-1 === px && r-1 === py))) {
                            context.clearRect(c*rs, r*rs, (pix*2), (pix*2));
                        }

                        if (c === 0 && r !== level.gridsize[1]-1 && !(py === r+1 && c === px) && level.walls[colorstate][r+1][c] === 1) {
                            context.clearRect(c*rs, r*rs+(pix*14), (pix*2), (pix*2));
                        }
                        if (r === level.gridsize[1]-1 && c !== 0 && !(px === c-1 && r === py) && level.walls[colorstate][r][c-1] === 1) {
                            context.clearRect(c*rs, r*rs+(pix*14), (pix*2), (pix*2));
                        }
                        if (c !== 0 && r !== level.gridsize[1]-1 && 
                            (level.walls[colorstate][r][c-1] === 1 && !(r === py && c-1 === px)) && 
                            (level.walls[colorstate][r+1][c] === 1 && !(c === px && r+1 === py)) && 
                            (level.walls[colorstate][r+1][c-1] === 1 && !(c-1 === px && r+1 === py))) {
                            context.clearRect(c*rs, r*rs+(pix*14), (pix*2), (pix*2));
                        }

                        if (r === 0 && c !== level.gridsize[0]-1 && !(px === c+1 && r === py) && level.walls[colorstate][r][c+1] === 1) {
                            context.clearRect(c*rs+(pix*14), r*rs, (pix*2), (pix*2));
                        }
                        if (c === level.gridsize[0]-1 && r !== 0 && !(py === r-1 && c === px) && level.walls[colorstate][r-1][c] === 1) {
                            context.clearRect(c*rs+(pix*14), r*rs, (pix*2), (pix*2));
                        }
                        if (r !== 0 && c !== level.gridsize[0]-1 && 
                            (level.walls[colorstate][r][c+1] === 1 && !(r === py && c+1 === px)) && 
                            (level.walls[colorstate][r-1][c] === 1 && !(c === px && r-1 === py)) && 
                            (level.walls[colorstate][r-1][c+1] === 1 && !(c+1 === px && r-1 === py))) {
                            context.clearRect(c*rs+(pix*14), r*rs, (pix*2), (pix*2));
                        }

                        if (r === level.gridsize[1]-1 && c !== level.gridsize[0]-1 && !(px === c+1 && r === py) && level.walls[colorstate][r][c+1] === 1) {
                            context.clearRect(c*rs+(pix*14), r*rs+(pix*14), (pix*2), (pix*2));
                        }
                        if (c === level.gridsize[0]-1 && r !== level.gridsize[1]-1 && !(py === r+1 && c === px) && level.walls[colorstate][r+1][c] === 1) {
                            context.clearRect(c*rs+(pix*14), r*rs+(pix*14), (pix*2), (pix*2));
                        }
                        if (r !== level.gridsize[1]-1 && c !== level.gridsize[0]-1 && 
                            (level.walls[colorstate][r][c+1] === 1 && !(r === py && c+1 === px)) && 
                            (level.walls[colorstate][r+1][c] === 1 && !(c === px && r+1 === py)) && 
                            (level.walls[colorstate][r+1][c+1] === 1 && !(c+1 === px && r+1 === py))) {
                            context.clearRect(c*rs+(pix*14), r*rs+(pix*14), (pix*2), (pix*2));
                        }

                        context2.fillStyle = `hsla(${palette[colorstate].hsl[0]}, ${palette[colorstate].hsl[1]}%, ${palette[colorstate].hsl[2]}%, 0.3)`
                        if (noiseen == 1) {
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
                                context2.fillRect(c*rs+(pix*2)*i, r*rs+(pix*2)*e, (pix*2), (pix*2));
                                }
                            }
                        }
                        else {
                            context2.fillRect(c*rs, r*rs, rs, rs);
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
    keys.splice(0, keys.length);
    requestAnimationFrame(frame);
    settings.render();
}

const input = new Input();
const player = new Player();
const bg = new Background();
const end = new End();
const wall = new Wall();
const noisy = new NoiseVoid();
frame();
});

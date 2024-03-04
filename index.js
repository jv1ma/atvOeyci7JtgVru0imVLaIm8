
const noisevoid = document.getElementById('void');
const contextnv = noisevoid.getContext('2d');

noisevoid.height = document.body.clientHeight;
noisevoid.width = document.body.clientWidth;

bga = 0;
part_update = 0;
box_parts = [];

class NoiseVoid {
    render(context) {
        context.clearRect(0, 0, noisevoid.width, noisevoid.height);
        context.fillStyle = `hsla(0, 0%, 80%, ${Math.abs(bga)/70*Math.random()})`;
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
        context.fillStyle = `hsla(0, 0%, 0%, ${this.a/100})`;
        context.fillRect(this.x, this.y, this.part_s, this.part_s);
        context.clearRect(this.x+8, this.y+8, this.part_s-16, this.part_s-16);
        this.a--;
        if (part_update === 1) {
        this.x += this.dir[0];
        this.y += this.dir[1];
        }
    }
}

function frame() {
    if (bga === -35) {
        bga = 35;
    }
    bga--;
    noisy.render(contextnv);
    box_parts.push(new SquareNoise());
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
    requestAnimationFrame(frame);
}

const noisy = new NoiseVoid();
const squarnoise = new SquareNoise();
frame();
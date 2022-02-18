//select elements
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const moveAmount = 20;

//setup canvas for drawing
const { width, height } = canvas;

let x = Math.floor(Math.random() * width );
let y = Math.floor(Math.random() * width );

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = moveAmount;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); //start drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw function
function draw({ key }) {
    //incrment hue
    hue += 10;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    console.log(key);
    // start path
    ctx.beginPath();
    ctx.moveTo(x, y);
    //x -= moveAmount; x = x -10
    //y -= moveAmount;

    //move x and y values
    switch (key) {
        case 'ArrowUp':
            y -= moveAmount;
            break;
        case 'ArrowDown':
            y += moveAmount;
            break;
        case 'ArrowLeft':
            x -= moveAmount;
            break;
        case 'ArrowRight':
            x += moveAmount;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

//handle for keys
function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key });
    }
}

//shake function
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(
        'animationend', function() {
            canvas.classList.remove('shake');
        }, 
        { once: true }
    );
}

//listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);

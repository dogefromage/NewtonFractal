

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const w = canvas.clientWidth;
const h = canvas.clientHeight;

let camera = new Camera(w, h, 0, 0, 200);;

// center camera
// camera.x = Math.PI / 2 * camera.zoom; 

camera.x = 150;

var aaa = new Complex(2.5, 0);
var imageData;

let phi = 0;

draw();
function draw()
{
    const data = ctx.getImageData(0, 0, w, h);

    for (let i = 0; i < data.data.length; i+=4)
    {
        const pixel = Math.floor(i / 4);
        const canvasPoint = 
        {
            x: pixel % w,
            y: Math.floor(pixel / w)
        };
        const worldPoint = camera.CanvasToWorld(canvasPoint);
        const z = new Complex(worldPoint.x, worldPoint.y)
        const color = newton(z);

        data.data[i + 0] = color.r;
        data.data[i + 1] = color.g;
        data.data[i + 2] = color.b;
        data.data[i + 3] = 255;
    }

    ctx.putImageData(data, 0, 0);

    phi+=0.05;
    aaa = new Complex(
        1 - Math.cos(phi),
        Math.sin(phi),
    );
}

function p(z)
{
    return z.pow(5).add(z.pow(3).sub(new Complex(1, 0)));
}

function p1(z)
{
    return z.pow(4).multScalar(5).add(z.pow(2).multScalar(3));
}

function sin(z)
{
    const eb = Math.exp(z.i);
    const emb = 1 / eb;
    const sin = Math.sin(z.r);
    const cos = Math.cos(z.r);

    // sin(z)
    const sinz = new Complex(
        +0.5 * sin * (emb + eb),
        -0.5 * cos * (emb - eb)
    );

    // sin'(z) = cos(z)
    const cosz = new Complex(
        +0.5 * cos * (emb + eb),
        -0.5 * sin * (emb - eb)
    );

    return {
        p: sinz,
        p1: cosz
    };
}

function newton(z)
{

    for (let n = 0; n < 50; n++)
    {
        const func = sin(z);

        const frac = func.p.add(new Complex(-10, 0)).div( func.p1 );
        z = z.sub( frac.mult(aaa) );
    }

    const angle = z.arg();
    return {
        r: Math.floor(127 * (Math.sin(angle) + 1)),
        g: Math.floor(127 * (Math.sin(angle + 2.09439) + 1)),
        b: Math.floor(127 * (Math.sin(angle - 2.09439) + 1)),
    }
}

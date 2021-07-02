class Camera 
{
    constructor(w, h, x = 0, y = 0, zoom = 1) 
    {
        this.w = w; // canvas width and height
        this.h = h;
        this.x = x; // camera offset in canvas coordinates
        this.y = y;
        this.zoom = zoom;

        this.oldX = 0;
        this.oldY = 0;
    }

    // translate world point to canvas point
    WorldToCanvas(worldCoords)
    {
        let canCoords = 
        {
            x: worldCoords.x * this.zoom - this.x + 0.5 * this.w,
            y: worldCoords.y * this.zoom - this.y + 0.5 * this.h
        };
        return canCoords;
    }

    // reverse
    CanvasToWorld(canCoords)
    {
        let worldCoords = 
        {
            x: (canCoords.x + this.x - 0.5 * this.w) / this.zoom,
            y: (canCoords.y + this.y - 0.5 * this.h) / this.zoom
        };
        return worldCoords;
    }

    // same but no offset
    WorldToCanvasVector(worldVector)
    {
        return { 
            x: this.WorldToCanvasScale(worldVector.x), 
            y: this.WorldToCanvasScale(worldVector.y)
        };
    }

    CanvasToWorldVector(canvasVector)
    {
        return { 
            x: this.CanvasToWorldScale(canvasVector.x), 
            y: this.CanvasToWorldScale(canvasVector.y)
        };
    }

    WorldToCanvasScale(worldScale)
    {
        return worldScale * this.zoom;
    }

    CanvasToWorldScale(canvasScale)
    {
        return canvasScale / this.zoom;
    }
}


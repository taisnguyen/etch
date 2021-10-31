/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the SketchFigureBoundingBox class
 */




/** 
 * represents a SketchFigureBoundingBox instance  
 */
 export class SketchFigureBoundingBox {

    constructor(minX, maxX, minY, maxY) {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.selected = false;
    }

    /**
     * @param {Object[]} sketchPoints
     * @returns {Object} minimum bounding rectangle coordinates with shape { minX: number, maxX: number, minY: number, maxY: number };
     */
    static getMinimumBoundingRectangle(sketchPoints) {
        if (sketchPoints.length === 0) return;

        let minX = sketchPoints[0].x; 
        let maxX = sketchPoints[0].x; 
        let minY = sketchPoints[0].y; 
        let maxY = sketchPoints[0].y;
        
        for (const sketchPoint of sketchPoints) {
            if (sketchPoint.x < minX) minX = sketchPoint.x;
            if (sketchPoint.x > maxX) maxX = sketchPoint.x;
            if (sketchPoint.y < minY) minY = sketchPoint.y;
            if (sketchPoint.y > maxY) maxY = sketchPoint.y;
        }

        return {
            minX: (maxX - minX < 14) ? minX - 7 : minX,
            maxX: (maxX - minX < 14) ? minX + 7 : maxX, 
            minY: (maxY - minY < 14) ? minY - 7 : minY, 
            maxY: (maxY - minY < 14) ? minY + 7 : maxY
        };
    }

    getArea() {
        return (this.maxX - this.minX) * (this.maxY - this.minY);
    }

    draw(canvasContext) {
        canvasContext.save();

        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = "black";
        
        canvasContext.beginPath();

        canvasContext.moveTo(Math.ceil(this.minX), Math.ceil(this.minY));
        canvasContext.lineTo(Math.ceil(this.minX), Math.ceil(this.maxY));
        canvasContext.lineTo(Math.ceil(this.maxX), Math.ceil(this.maxY));
        canvasContext.lineTo(Math.ceil(this.maxX), Math.ceil(this.minY));
        canvasContext.lineTo(Math.ceil(this.minX), Math.ceil(this.minY));

        canvasContext.stroke();

        canvasContext.restore();
    }


}
/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the SketchFigure class
 */




/** 
 * represents a SketchFigure instance  
 */
export class SketchFigure {

    /**
     * @param {Object[]} sketchPoints
     */     

    constructor(sketchPoints = [], color = "#4c4c4e") {
        this.sketchPoints = sketchPoints;
        this.color = color;
    }

    draw(canvasContext) {
        canvasContext.save();
        canvasContext.strokeStyle = this.color;
        canvasContext.beginPath();
        canvasContext.moveTo(this.sketchPoints[0].x, this.sketchPoints[0].y);
        
        // not enough points to compute bezier curve, draw a normal line for each SketchPoint
        if (this.sketchPoints.length < 6) {
            for (let i = 0; i < this.sketchPoints.length; i++) {
                canvasContext.lineTo(this.sketchPoints[i].x, this.sketchPoints[i].y);
            }
            canvasContext.stroke();

            return;
        }

        // using bezier curves, connect the points in the SketchFigure
        for (let i = 1; i < this.sketchPoints.length - 2; i++) {
            const averageX = (this.sketchPoints[i].x + this.sketchPoints[i + 1].x) / 2;
            const averageY = (this.sketchPoints[i].y + this.sketchPoints[i + 1].y) / 2;
            canvasContext.quadraticCurveTo(this.sketchPoints[i].x, this.sketchPoints[i].y, averageX, averageY);
        }
        canvasContext.stroke();
        canvasContext.restore();
    }


}
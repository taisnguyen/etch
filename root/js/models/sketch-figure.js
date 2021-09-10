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

    constructor(sketchPoints, color = "#000000") {
        this.sketchPoints = [];
    }

    drawFigure(canvasContext) {
        canvasContext.save();
        canvasContext.strokeStyle = color;

        canvasContext.beginPath();
        canvasContext.moveTo(this.sketchPoints[0].x, this.sketchPoints[0].y);

        

        canvasContext.restore();


    }


}
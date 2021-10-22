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
     * @returns {number[]} minimum bounding rectangle coordinates with shape { minX: number, maxX: number, minY: number, maxY: number };
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
            minX: minX, 
            maxX: maxX, 
            minY: minY, 
            maxY: maxY 
        };
    }

    draw(canvasContext) {
        canvasContext.save();
        canvasContext.strokeStyle = "green";
    
        


        canvasContext.restore();
    }


}
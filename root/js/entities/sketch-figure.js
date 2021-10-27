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


import { SketchFigureBoundingBox } from "./sketch-figure-bounding-box.js";
import { TextEditorCanvasDrawingServiceFactory } from "../services/text-editor-canvas-drawing-service-factory.js";




/** 
 * represents a SketchFigure instance  
 */
export class SketchFigure {

    /**
     * @param {Object[]} sketchPoints
     * @param {string} color
     */    
    constructor(sketchPoints = [], color = "#222222") {
        this._boundingBox = null;
        this._sketchPoints = sketchPoints;

        this.x = null;
        this.y = null;
        this.selected = false;
        this.color = color;
        
        this._initialize();
    }

    _initializeBoundingBox() {
        const minimumBoundingRectangle = SketchFigureBoundingBox.getMinimumBoundingRectangle(this.sketchPoints);
        if (minimumBoundingRectangle) {
            this._boundingBox = new SketchFigureBoundingBox(minimumBoundingRectangle.minX, minimumBoundingRectangle.maxX, minimumBoundingRectangle.minY, minimumBoundingRectangle.maxY);
            
            // get midpoint of minimumBoundingRectangle
            this.x = (minimumBoundingRectangle.minX + minimumBoundingRectangle.maxX) / 2 ;
            this.y = (minimumBoundingRectangle.minY + minimumBoundingRectangle.maxY) / 2 ;
        }
    }

    _initialize() {
        this._initializeBoundingBox();
    }

    draw(textEditorCanvas, saveToState = false) {
        const drawingService = TextEditorCanvasDrawingServiceFactory.getService(textEditorCanvas);
        
        const drawingFunction = (canvasContext) => {
            canvasContext.save();
            canvasContext.strokeStyle = this.color;
            canvasContext.beginPath();
            canvasContext.moveTo(this._sketchPoints[0].x, this._sketchPoints[0].y);
            
            // not enough points to compute bezier curve, draw a normal line for each SketchPoint
            if (this._sketchPoints.length < 6) {
                for (let i = 0; i < this._sketchPoints.length; i++) {
                    canvasContext.lineTo(this._sketchPoints[i].x, this._sketchPoints[i].y);
                }
                canvasContext.stroke();
                canvasContext.restore();
                return;
            }

            // using bezier curves, connect the points in the SketchFigure
            for (let i = 1; i < this._sketchPoints.length - 2; i++) {
                const averageX = (this._sketchPoints[i].x + this._sketchPoints[i + 1].x) / 2;
                const averageY = (this._sketchPoints[i].y + this._sketchPoints[i + 1].y) / 2;
                canvasContext.quadraticCurveTo(this._sketchPoints[i].x, this._sketchPoints[i].y, averageX, averageY);
            }
            canvasContext.stroke();
            canvasContext.restore();
        };

        if (saveToState)
            drawingService.drawSaveToState(drawingFunction);
        else
            drawingService.drawNoSaveToState(drawingFunction);
    }

    get boundingBox() {
        return this._boundingBox;
    }

    get sketchPoints() {
        return this._sketchPoints;
    }

}
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
     * @param {SketchPoint[]} sketchPoints
     * @param {string} color
     */    
    constructor(sketchPoints = [], color = "#222222") {
        this._boundingBox = null;
        this._sketchPoints = sketchPoints;

        this.x = null;
        this.y = null;
        this.selected = false;
        this.hovered = false;
        this.color = color;
        
        this._initialize();
    }

    /**
     * @param {number} mouseX
     * @param {number} mouseY
     * @param {SketchFigure[]} sketchFigures
     * @param {TextEditorCanvas} options
     */
    static checkForHoveredSketchFigures(mouseX, mouseY, sketchFigures, canvasContext) {
        let smallestHoveredSketchFigure = null;

        for (const sketchFigure of sketchFigures) {
            sketchFigure.hovered = false;
            if (mouseX >= sketchFigure.boundingBox.minX && mouseX <= sketchFigure.boundingBox.maxX && mouseY >= sketchFigure.boundingBox.minY && mouseY <= sketchFigure.boundingBox.maxY) {
                if (smallestHoveredSketchFigure === null)
                    smallestHoveredSketchFigure = sketchFigure;
                if (sketchFigure.boundingBox.getArea() < smallestHoveredSketchFigure.boundingBox.getArea())
                    smallestHoveredSketchFigure = sketchFigure;
            }
        }

        // mouse currently not hovering over any SketchFigure
        if (smallestHoveredSketchFigure === null) return;

        smallestHoveredSketchFigure.hovered = true;
        smallestHoveredSketchFigure.boundingBox.draw(canvasContext);
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

    move(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
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
            canvasContext.restore();
            return;
        }

        // using bezier curves, connect the points in the SketchFigure
        for (let i = 1; i < this.sketchPoints.length - 1; i++) {
            const averageX = (this.sketchPoints[i].x + this.sketchPoints[i + 1].x) / 2;
            const averageY = (this.sketchPoints[i].y + this.sketchPoints[i + 1].y) / 2;
            canvasContext.quadraticCurveTo(this.sketchPoints[i].x, this.sketchPoints[i].y, averageX, averageY);
        }

        canvasContext.stroke();
        canvasContext.restore();
    };

    get boundingBox() {
        return this._boundingBox;
    }

    get sketchPoints() {
        return this._sketchPoints;
    }

}
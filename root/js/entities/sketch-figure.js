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
        
        this._midpointX = null;
        this._midpointY = null;

        this._startingMidpointX = null;
        this._startingMidpointY = null;

        this.isDragged = false;
        this.draggedX = null;
        this.draggedY = null;

        this.isSelected = false;

        this.isHovered = false;
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

            if (sketchFigure.isDragged) {
                smallestHoveredSketchFigure = sketchFigure;
                break;
            }

            sketchFigure.isHovered = false;
            if (mouseX >= sketchFigure.boundingBox.minX && mouseX <= sketchFigure.boundingBox.maxX && mouseY >= sketchFigure.boundingBox.minY && mouseY <= sketchFigure.boundingBox.maxY) {
                if (smallestHoveredSketchFigure === null)
                    smallestHoveredSketchFigure = sketchFigure;
                if (sketchFigure.boundingBox.getArea() < smallestHoveredSketchFigure.boundingBox.getArea())
                    smallestHoveredSketchFigure = sketchFigure;
            }
        }

        // mouse currently not hovering over any SketchFigure
        if (smallestHoveredSketchFigure === null) return false;

        smallestHoveredSketchFigure.isHovered = true;
        smallestHoveredSketchFigure.boundingBox.draw(canvasContext);

        return true;
    }

    _initializeBoundingBox() {
        const minimumBoundingRectangle = SketchFigureBoundingBox.getMinimumBoundingRectangle(this.sketchPoints);
        if (minimumBoundingRectangle)
            this._boundingBox = new SketchFigureBoundingBox(minimumBoundingRectangle.minX, minimumBoundingRectangle.maxX, minimumBoundingRectangle.minY, minimumBoundingRectangle.maxY);
    }

    _setMidpoint() {
        if (this.boundingBox) {
            this._midpointX = (this.boundingBox.minX + this.boundingBox.maxX) / 2;
            this._midpointY = (this.boundingBox.minY + this.boundingBox.maxY) / 2;
        }
    }

    _initialize() {
        this._initializeBoundingBox();
        this._setMidpoint();
    }

    updateStartingProperties() {
        // update midpoint coordinates
        this._startingMidpointX = this._midpointX;
        this._startingMidpointY = this._midpointY;

        // update starting positions of sketchPoint objects
        for (const sketchPoint of this.sketchPoints) {
            sketchPoint.startingX = sketchPoint.x;
            sketchPoint.startingY = sketchPoint.y;
        }
    }

    move(mouseX, mouseY, textEditorCanvas) {
        for (const sketchPoint of this.sketchPoints) {
            sketchPoint.x = sketchPoint.startingX + mouseX - this.draggedX;
            sketchPoint.y = sketchPoint.startingY + mouseY - this.draggedY;
        }

        this._midpointX = this._startingMidpointX + mouseX - this.draggedX;
        this._midpointY = this._startingMidpointY + mouseY - this.draggedY;

        this._initializeBoundingBox();
    }

    rotate(angle, mouseX, mouseY, rotationPoint = null) {
        this.updateStartingProperties();
        this.draggedX = mouseX;
        this.draggedY = mouseY;

        if (rotationPoint === null) {
            rotationPoint = {
                x: this._midpointX,
                y: this._midpointY
            };
        }

        for (const sketchPoint of this.sketchPoints) {
            const magnitude = Math.sqrt(Math.pow(sketchPoint.x - rotationPoint.x, 2) + Math.pow(sketchPoint.y - rotationPoint.y, 2));
            let c = Math.atan2(sketchPoint.y - rotationPoint.y, sketchPoint.x - rotationPoint.x);
            if(c < 0) c += 2*Math.PI;

            sketchPoint.x = rotationPoint.x + magnitude * Math.cos(angle + c);
            sketchPoint.y = rotationPoint.y + magnitude * Math.sin(angle + c);
        }

        this.updateStartingProperties();
        this._initializeBoundingBox();
    }

    async drawRotateIndicator(canvasContext) {
        const rotateIndicatorImage = new Image();
        rotateIndicatorImage.src = "../images/indicator-rotate.png";

        // if rotateIndicatorImage is not cached, wait for it to load
        // (the image is cached after the first time it is loaded)
        if (!rotateIndicatorImage.complete)
            await new Promise(resolve => rotateIndicatorImage.onload = resolve).then(() => {
                canvasContext.drawImage(rotateIndicatorImage, Math.ceil(this.boundingBox.maxX) + 8, Math.ceil((this.boundingBox.minY + this.boundingBox.maxY) / 2) - 8, 16, 16);
            });
        else
            canvasContext.drawImage(rotateIndicatorImage, Math.ceil(this.boundingBox.maxX) + 8, Math.ceil((this.boundingBox.minY + this.boundingBox.maxY) / 2) - 8, 16, 16);
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

        // if selected, draw bounding box
        if (this.isSelected) {
            this.boundingBox.draw(canvasContext);
        }
    };

    delete() {
        for(const editor of window.globalVariables["editors"]) 
            editor.textEditorCanvas.sketchFigures.splice(editor.textEditorCanvas.sketchFigures.indexOf(this), 1);
    }

    get boundingBox() {
        return this._boundingBox;
    }

    get sketchPoints() {
        return this._sketchPoints;
    }

}
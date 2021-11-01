/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the TextEditorCanvasDrawingService class
 */


import { Service } from "../entities/service.js";




export class TextEditorCanvasDrawingService extends Service {

    constructor(textEditorCanvas) {
        // calls Service base class's constructor
        super("TextEditorCanvasDrawingService");

        this._textEditorCanvas = textEditorCanvas;
        this._canvasContext = textEditorCanvas.canvasContext;
    }

    drawAllDrawableObjects(drawableObjects) {
        const arraysOfDrawableObjects = Object.values(drawableObjects);
        for (const arrayOfDrawableObjects of arraysOfDrawableObjects) {
            for (const drawableObject of arrayOfDrawableObjects) {
                drawableObject.draw(this.canvasContext);
            }
        }
    }
    
    refresh() {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        this.drawAllDrawableObjects(this.textEditorCanvas.drawableObjects);
    }

    /**
     * @param {function(canvasContext : CanvasRenderingContext2D)} drawingFunction
     */
    draw(drawingFunction) {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        drawingFunction(this.canvasContext);
        this.drawAllDrawableObjects(this.textEditorCanvas.drawableObjects);
    }

    get textEditorCanvas() {
        return this._textEditorCanvas;
    }

    get canvasContext() {
        return this._canvasContext;
    }

    
}
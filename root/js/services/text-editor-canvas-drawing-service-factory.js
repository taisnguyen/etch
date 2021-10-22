/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * implements a service factory to return the appropriate TextEditorCanvasDrawingService instance,
 * a common interface for dependents of the drawing functionality of a TextEditorCanvas instance
 * 
 * such services are singleton (returns existing instance of this class if appropriate instance exists,
 * that is if the same TextEditorCanvas instance is provided multiple times)
 */


import { Service } from "./service.js";




class TextEditorCanvasDrawingService extends Service {

    constructor(textEditorCanvas) {
        // calls Service base class's constructor
        super("TextEditorCanvasDrawingService");

        this._textEditorCanvas = textEditorCanvas;
        this._canvasContext = textEditorCanvas.canvasContext;
        this._stateCanvasContext = null;
    
        this._initialize();
    }

    _initializeStateCanvasContext() {
        const stateCanvas = document.createElement("canvas");
    }

    _initialize() {

    }

    get textEditorCanvas() {
        return this._textEditorCanvas;
    }

    get canvasContext() {
        return this._canvasContext;
    }

}

export class TextEditorCanvasDrawingServiceFactory {

    static getService(textEditorCanvas) {
        // search if appropriate service instance already exists in the global service directory
        let service = window.globalVariables["services"].find((service) => {
            if (service.type !== "TextEditorCanvasDrawingService") return false;
            if (service.textEditorCanvas === textEditorCanvas) return true;
            return false;
        });

        // appropriate service instance exists, return that instance
        if (service !== undefined) return service;

        // otherwise, instantiate a new TextEditorCanvasDrawingService and return that instance
        service = new TextEditorCanvasDrawingService(textEditorCanvas);
        window.globalVariables["services"].push(service); // add new service instance to global service directory
        return service;
    }


}
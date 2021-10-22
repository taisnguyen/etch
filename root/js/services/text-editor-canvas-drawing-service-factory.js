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
 * that is if the same canvasContext is provided multiple times)
 */


import { Service } from "./service.js";




class TextEditorCanvasDrawingService extends Service {

    constructor(canvasContext) {
        // calls Service base class's constructor
        super("TextEditorCanvasDrawingService");

        this._canvasContext = canvasContext;
    }

    get canvasContext() {
        return this._canvasContext;
    }

}

export class TextEditorCanvasDrawingServiceFactory {

    static getService(canvasContext) {
        // search if appropriate service instance already exists in the global service directory
        let service = window.globalVariables["services"].find((service) => {
            if (service.type !== "TextEditorCanvasDrawingService") return false;
            if (service.canvasContext === canvasContext) return true;
            return false;
        });

        // appropriate service instance exists, return that instance
        if (service !== undefined) return service;

        // otherwise, instantiate a new TextEditorCanvasDrawingService and return that instance
        service = new TextEditorCanvasDrawingService(canvasContext);
        window.globalVariables["services"].push(service); // add new service instance to global service directory
        return service;
    }


}
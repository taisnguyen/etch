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


import { GlobalVariableRepositoryService } from "../services/global-variable-repository-service.js";
import { TextEditorCanvasDrawingService } from "./text-editor-canvas-drawing-service.js";




export class TextEditorCanvasDrawingServiceFactory {

    static getService(textEditorCanvas) {
        // search if appropriate service instance already exists in the global service directory
        let service = GlobalVariableRepositoryService.getGlobalVariable("services").find((service) => {
            if (service.type !== "TextEditorCanvasDrawingService") return false;
            if (service.textEditorCanvas === textEditorCanvas) return true;
            return false;
        });

        // appropriate service instance exists, return that instance
        if (service !== undefined) return service;

        // otherwise, instantiate a new TextEditorCanvasDrawingService and return that instance
        service = new TextEditorCanvasDrawingService(textEditorCanvas);
        GlobalVariableRepositoryService.getGlobalVariable("services").push(service); // add new service instance to global service directory
        return service;
    }


}

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


import { Service } from "./service.js";




class ProgramState {

}

export class ProgramStateRepositoryService extends Service {

    constructor(textEditorCanvas) {
        // calls Service base class's constructor
        super("ProgramStateRepositoryService");

        this._textEditorCanvas = textEditorCanvas;
        this._programStates = [];
    }


}
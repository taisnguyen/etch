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
import { IncrementalProgramStateFactory } from "../services/incremental-program-state-factory.js";



export class ProgramStateRepositoryService extends Service {

    constructor(textEditorCanvas) {
        // calls Service base class's constructor
        super("ProgramStateRepositoryService");

        this._textEditorCanvas = textEditorCanvas;
        this._incrementalProgramStates = [];
        this._incrementalProgramStatePointer = -1;
        this._fullProgramStateSnapshot = null;
    }

    _updateFullProgramStateSnapshot() {
        // deep copy object
        this._fullProgramStateSnapshot = JSON.parse(JSON.stringify(this._textEditorCanvas.drawableObjects));
    }

    appendState(incrementalProgramState) {
        incrementalProgramState.previousState = this.getTail();
        this._incrementalProgramStates.push(incrementalProgramState);
    }
    
    updateState() {
        if (this._textEditorCanvas.drawableObjects.length === 0) return;
        if (this._fullProgramStateSnapshot === null) this._updateFullProgramStateSnapshot();

        const incrementalProgramState = IncrementalProgramStateFactory.getInstance(this._fullProgramStateSnapshot, this._textEditorCanvas.drawableObjects);
        
        if (!incrementalProgramState.isEmpty()) {
            this.appendState(incrementalProgramState);
            this._updateFullProgramStateSnapshot();
        }
    }

    goToPreviousState() {
        // check if previous state exists

    }

    goToNextState() {
        // check if next state exists
        
    }

    getHead() {
        if (this.incrementalProgramStates.length == 0) return null;
        return this.incrementalProgramStates[0];
    }

    getTail() {
        if (this.incrementalProgramStates.length == 0) return null;
        return this.incrementalProgramStates[this.incrementalProgramStates.length - 1];
    }

    get textEditorCanvas() {
        return this._textEditorCanvas;
    }

    get incrementalProgramStates() {
        return this._incrementalProgramStates;
    }


}
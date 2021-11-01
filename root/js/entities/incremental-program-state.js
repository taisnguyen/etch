/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the ProgramState class
 *
 * a node to be appended into a linked list of the program state
 */




export class IncrementalProgramState {
    
    constructor(stateInstructions = [], previousState = null) {
        this._stateInstructions = stateInstructions;
        this.previousState = previousState;
    }

    isEmpty() {
        return this._stateInstructions.length === 0;
    }

    get stateInstructions() {
        return this._stateInstructions;
    }


}
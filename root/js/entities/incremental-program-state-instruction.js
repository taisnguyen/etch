/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the IncrementalProgramStateInstruction class
 * to be used in the IncrementalProgramState class to represent a single instruction
 */




export class IncrementalProgramStateInstruction {

    // instruction types
    static CREATE_SKETCHFIGURE = { name: "CREATE_SKETCHFIGURE", inverse: "DELETE_SKETCHFIGURE" };
    static DELETE_SKETCHFIGURE = { name: "DELETE_SKETCHFIGURE", inverse: "CREATE_SKETCHFIGURE" };
    static MOVE_SKETCHFIGURE = { name: "MOVE_SKETCHFIGURE", inverse: "MOVE_SKETCHFIGURE" };
    static ROTATE_SKETCHFIGURE = { name: "ROTATE_SKETCHFIGURE", inverse: "ROTATE_SKETCHFIGURE" };

    constructor(type = null, data = null) {
        this.type = type;
        this.data = data;
    }


}
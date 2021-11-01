/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * implements a factory to return an appropriate IncrementalProgramState instance,
 */


import { IncrementalProgramStateInstruction } from "../entities/incremental-program-state-instruction.js";
import { IncrementalProgramState } from "../entities/incremental-program-state.js";




export class IncrementalProgramStateFactory {

    /**
     * @param {Object} fromFullProgramStateSnapshot TextEditorCanvas.drawableObjects
     * @param {Object} toFullProgramStateSnapshot TextEditorCanvas.drawableObjects
     * @returns {IncrementalProgramState} an IncrementalProgramState instance with instructions to get from fromFullProgramStateSnapshot to toFullProgramStateSnapshot program state snapshots
     */
    static getInstance(fromFullProgramStateSnapshot, toFullProgramStateSnapshot) {
        
        // holds instructions for new IncrementalProgramState instance
        const stateInstructions = [];

        // compares SketchFigure objects

        const sortOnSketchFigureID = (a, b) => {
            if (parseInt(a.id) > parseInt(b.id)) return -1;
            else return 1;
        }

        const pushSketchFigureInstruction = (type, sketchFigure) => {
            const incrementalProgramStateInstruction = new IncrementalProgramStateInstruction(type);

            IncrementalProgramStateInstruction.data = {
                "sketchPoints": sketchFigure.sketchPoints,
                "rotation": sketchFigure.rotation,
                "color": sketchFigure.color
            };

            stateInstructions.push(incrementalProgramStateInstruction);
        }

        const fromSnapshotSketchFigures = fromFullProgramStateSnapshot["sketchFigures"].sort(sortOnSketchFigureID);
        const toSnapshotSketchFigures = toFullProgramStateSnapshot["sketchFigures"].sort(sortOnSketchFigureID);

        // use two pointers to iterate through both arrays
        let fromSnapshotPointer = 0;
        let toSnapshotPointer = 0;

        while (fromSnapshotPointer < fromSnapshotSketchFigures.length && toSnapshotPointer < toSnapshotSketchFigures.length) {
            const fromSketchFigure = fromSnapshotSketchFigures[fromSnapshotPointer];
            const toSketchFigure = toSnapshotSketchFigures[toSnapshotPointer];

            // TODO: fix id getter. temporary solution is to use _id 

            if (fromSketchFigure._id !== toSketchFigure._id) {

                //console.log(fromSketchFigure.id + " !== " + toSketchFigure.id);

                // check for deletion
                if (fromSketchFigure._id < toSketchFigure._id) {
                    // deletion
                    pushSketchFigureInstruction(IncrementalProgramStateInstruction.DELETE_SKETCHFIGURE.name, fromSketchFigure);
                    fromSnapshotPointer++;
                    continue;
                } 
                else {
                    // creation
                    pushSketchFigureInstruction(IncrementalProgramStateInstruction.CREATE_SKETCHFIGURE.name, toSketchFigure);
                    toSnapshotPointer++;
                    break;
                }

            }
            else {
                fromSnapshotPointer++;
                toSnapshotPointer++;
            }
        }

        // delete remaining SketchFigure objects
        while (fromSnapshotPointer < fromSnapshotSketchFigures.length) {
            // deletion
            pushSketchFigureInstruction(IncrementalProgramStateInstruction.DELETE_SKETCHFIGURE.name, fromSnapshotSketchFigures[fromSnapshotPointer]);
            fromSnapshotPointer++;
        }

        // create remaining SketchFigure objects
        while (toSnapshotPointer < toSnapshotSketchFigures.length) {
            //creation
            pushSketchFigureInstruction(IncrementalProgramStateInstruction.CREATE_SKETCHFIGURE.name, toSnapshotSketchFigures[toSnapshotPointer]);
            toSnapshotPointer++;
        }



        
        return new IncrementalProgramState(stateInstructions);
    }


}
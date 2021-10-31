/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the GlobalVariableRepositoryService class
 */




export class GlobalVariableRepositoryService {

    // store global variables
    static globalVariables = {};

    static getGlobalVariable(key) {
        return this.globalVariables[key];
    }

    static setGlobalVariable(key, value) {
        this.globalVariables[key] = value;
    }
 

}
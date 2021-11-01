/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the service base class
 * 
 * all service classes must derive from this class
 */


import { GlobalVariableRepositoryService } from "../services/global-variable-repository-service.js";




export class Service {

    /**
     * @param {string} type type of Service
     */
    constructor(type) {
        this.type = type;
    }

    // destroys the singleton Service, removing it from the global service directory
    destroy() {
        // TODO: add neccessary logic

        GlobalVariableRepositoryService.getGlobalVariable("services").splice(GlobalVariableRepositoryService.getGlobalVariable("services").indexOf(this), 1);
    }
} 
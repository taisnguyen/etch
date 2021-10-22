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

        window.globalVariables["services"].splice(window.globalVariables["services"].indexOf(this), 1);
    }
} 
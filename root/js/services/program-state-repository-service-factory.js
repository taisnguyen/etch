/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * implements a service factory to return the appropriate ProgramStateRepositoryService instance,
 * 
 * such services are singleton (returns existing instance of this class if appropriate instance exists,
 * that is if the same TextEditorCanvas instance is provided multiple times)
 */


import { GlobalVariableRepositoryService } from "../services/global-variable-repository-service.js";
import { ProgramStateRepositoryService } from "./program-state-repository-service.js";




export class ProgramStateRepositoryServiceFactory {
    static getService(textEditorCanvas) {
        // search if appropriate service instance already exists in the global service directory
        let service = GlobalVariableRepositoryService.getGlobalVariable("services").find((service) => {
            if (service.type !== "ProgramStateRepositoryService") return false;
            if (service.textEditorCanvas === textEditorCanvas) return true;
            return false;
        });

        // appropriate service instance exists, return that instance
        if (service !== undefined) return service;

        // otherwise, instantiate a new ProgramStateRepositoryService and return that instance
        service = new ProgramStateRepositoryService(textEditorCanvas);
        GlobalVariableRepositoryService.getGlobalVariable("services").push(service); // add new service instance to global service directory
        return service;
    }


}
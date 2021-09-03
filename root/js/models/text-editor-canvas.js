/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the TextEditorCanvas class
 */


import { SketchFigure } from "./sketch-figure.js";




/** 
 * represents a TextEditorCanvas instance  
 */
 export class TextEditorCanvas {

    /**
     * @param {Object} data an object containing key/value pairs of data
     * {
     *    textEditorDOMElement : reference to the DOM element representing the TextEditorCanvas
     * }
     */

     constructor(data) {
        this._data = data || {};
        this._DOMElement = null;

        this._initialize();
    }

    _initializeDOMElement() {
       
    }

    _initialize() {

    }

    

 }
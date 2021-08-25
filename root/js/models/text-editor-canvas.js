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




/** 
 * represents a TextEditorCanvas instance  
 */
 export class TextEditorCanvas {

    /**
     * @param {Object} data an object containing key/value pairs of data
     * {
     *    textEditorId         : id of the TextEditor
     *    textEditorDOMElement : reference to the DOM element representing the TextEditor
     *    text                 : text data in the TextEditor
     *    canvas               : reference to a TextEditorCanvas instance
     * }
     */

     constructor(data) {
        this._data = data || {};
        this._DOMElement = null;

        this._initialize();
    }

    

 }
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
    *    textEditorCanvasDOMElement : reference to the DOM element representing the TextEditorCanvas
    *    textEditorDOMElement       : reference to the DOM element of the parent TextEditor
    * }
    */

   constructor(data) {
      this._data = data || {};
      this._DOMElement = null;

      this._initialize();
   }

   _initializeDOMElement() {
      const textEditorCanvasWrapper = document.createElement("div");
      textEditorCanvasWrapper.innerHTML = '<canvas class="text-editor-canvas"></canvas>';
      textEditorCanvasWrapper.classList.add("text-editor-canvas-wrapper");

      this._DOMElement = textEditorCanvasWrapper;
   }

   _initialize() {
      // initialize DOMElement and replace TextEditorCanvas shell div
      this._initializeDOMElement();
      this.data["textEditorCanvasDOMElement"].replaceWith(this.DOMElement);
   }




   get data() {
      return this._data;
   }

   set data(data) {
      this._data = data;
   }

   get DOMElement() {
      return this._DOMElement;
   }

   set DOMElement(DOMElement) {
      this._DOMElement = DOMElement;
   }


}
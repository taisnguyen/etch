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
    *    textEditorDOMElement       : reference to the DOM element of a parent TextEditor if any
    * }
    */

   constructor(data) {
      this._data = data || {};
      this._DOMElement = null;
      this._canvasContext = null;
      
      this._drawnSketchFigures = [];

      this._initialize();
   }

   _attachToEventListeners() {
      window.addEventListener("resize", this._onResize.bind(this));
   }

   _initializeDOMElement() {
      const textEditorCanvasWrapper = document.createElement("div");
      textEditorCanvasWrapper.innerHTML = '<canvas class="text-editor-canvas"></canvas>';
      textEditorCanvasWrapper.classList.add("text-editor-canvas-wrapper");

      this._DOMElement = textEditorCanvasWrapper;

      // adjust canvas width and height
      this._DOMElement.querySelector("canvas").width = window.innerWidth;
      this._DOMElement.querySelector("canvas").height = window.innerHeight;
   }

   _initialize() {
      // initialize DOMElement and replace TextEditorCanvas shell div
      this._initializeDOMElement();
      this.data["textEditorCanvasDOMElement"].replaceWith(this.DOMElement);
      this.data["textEditorCanvasDOMElement"] = this.DOMElement;

      // assign canvas context
      this._canvasContext = this.DOMElement.querySelector("canvas").getContext("2d");

      // attach methods to event listeners
      this._attachToEventListeners();
   }

   /** ==================================== */
   /** methods to attach to event listeners */

   // canvas

   _adjustDimensions() {
      this.DOMElement.querySelector("canvas").width = window.innerWidth;
      this.DOMElement.querySelector("canvas").height = window.innerHeight;
   }

   _onResize() {
      // on resize, adjust the canvas's width and height
      this._adjustDimensions();
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

   get canvasContext() {
      return this._canvasContext;
   }

}
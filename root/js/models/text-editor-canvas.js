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
      this._canvas = null;
      this._canvasContext = null;
      this._sketchFigures = [];

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
   }

   _setCanvasContextSettings() {
      this.canvasContext.lineJoin = 'round';
      this.canvasContext.lineCap = 'round';
      this.canvasContext.lineWidth = 6;
   }

   _initialize() {
      // initialize DOMElement and replace TextEditorCanvas shell div
      this._initializeDOMElement();
      this.data["textEditorCanvasDOMElement"].replaceWith(this.DOMElement);
      //this.data["textEditorCanvasDOMElement"] = this.DOMElement;

      // assign canvas and canvas context
      this._canvas = this.DOMElement.querySelector("canvas");
      this._canvasContext = this.canvas.getContext("2d");

      // adjust canvas width and height
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // canvas context settings
      this._setCanvasContextSettings();

      // attach methods to event listeners
      this._attachToEventListeners();
   }

   _finishSketchFigure() {

   }


   sketch(event) {

   }

   drawSketchFigures() {
      for (const sketchFigure of this.sketchFigures) 
         sketchFigure.draw(this.canvasContext);
   }

   /** ==================================== */
   /** methods to attach to event listeners */

   // canvas

   _adjustDimensions() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this._setCanvasContextSettings();

      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawSketchFigures();
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

   get canvas() {
      return this._canvas;
   }

   get canvasContext() {
      return this._canvasContext;
   }

   get sketchFigures() {
      return this._sketchFigures;
   }

   set sketchFigures(sketchFigures) {
      this._sketchFigures = sketchFigures;
   }

}
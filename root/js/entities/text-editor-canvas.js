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


import { SketchPoint } from "./sketch-point.js";
import { SketchFigure } from "./sketch-figure.js";
import { TextEditorCanvasDrawingServiceFactory } from "../services/text-editor-canvas-drawing-service-factory.js";




/** 
 * represents a TextEditorCanvas instance  
 */
export class TextEditorCanvas {

   /**
    * @param {Object} data an object containing key/value pairs of data
    * {
    *    textEditorCanvasDOMElement : reference to the DOM element representing the TextEditorCanvas
    *    textEditorDOMElement       : reference to the DOM element of a parent TextEditor if any
    *    textEditor                 : reference to the TextEditor instance if any 
    * }
    */

   constructor(data) {
      this._data = data || {};
      this._DOMElement = null;
      this._canvas = null;
      this._canvasContext = null;

      // drawable objects (must have a draw method)
      this._drawableObjects = {
         "sketchFigures" : [],
      };

      this._inProgressSketchFigure = null;

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

   hideBlotGhost() {
      const drawingService = TextEditorCanvasDrawingServiceFactory.getService(this);
      drawingService.refresh();
   }

   showBlotGhost(event) {
      const drawingService = TextEditorCanvasDrawingServiceFactory.getService(this);

      // draw in blot ghost
      drawingService.draw((canvasContext) => {
         this.canvasContext.save();
         this.canvasContext.strokeStyle = "#4c4c4e"; /** TODO: add color argument when such a property exists */
         this.canvasContext.beginPath();
         this.canvasContext.lineTo(this.textEditor.mouseX, this.textEditor.mouseY);
         this.canvasContext.stroke();
         this.canvasContext.restore();
      });
   }

   finishSketching() {
      if (this._inProgressSketchFigure)
         this.sketchFigures.push(new SketchFigure(this._inProgressSketchFigure.sketchPoints)); /** TODO: add color argument when such a property exists */
      this._inProgressSketchFigure = null;
   }

   _drawInProgressSketchFigure() {
      if(this._inProgressSketchFigure !== null) 
         this._inProgressSketchFigure.draw(this.canvasContext);
   }

   sketch(event) {
      if (this._inProgressSketchFigure === null) 
         this._inProgressSketchFigure = new SketchFigure(); /** TODO: add color argument when such a property exists */

      this._inProgressSketchFigure.sketchPoints.push(new SketchPoint(this.textEditor.mouseX, this.textEditor.mouseY));
      this._drawInProgressSketchFigure();
   }

   /** ==================================== */
   /** methods to attach to event listeners */

   // canvas

   _adjustDimensions() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this._setCanvasContextSettings();
   }
   
   _onResize() {
      // 1. resize the TextEditorCanvas canvas
      this._adjustDimensions();

      // 2. since 1. clears the canvas, draw back all the drawable objects (by using refresh method)
      const drawingService = TextEditorCanvasDrawingServiceFactory.getService(this);
      drawingService.refresh();
   }

   get data() {
      return this._data;
   }

   set data(data) {
      this._data = data;
   }

   get textEditor() {
      return this.data["textEditor"];
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

   get drawableObjects() {
      return this._drawableObjects;
   }

   get sketchFigures() {
      return this._drawableObjects["sketchFigures"];
   }

   set sketchFigures(sketchFigures) {
      this._drawableObjects["sketchFigures"] = sketchFigures;
   }

}
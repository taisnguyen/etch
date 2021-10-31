/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * defines the TextEditor class
 */


import { TextEditorCanvas } from "./text-editor-canvas.js";
import { SketchFigure } from "./sketch-figure.js";
import { TextEditorCanvasDrawingServiceFactory } from "../services/text-editor-canvas-drawing-service-factory.js";




/** 
 * represents a TextEditor instance  
 */
export class TextEditor {

    /**
     * @param {Object} data an object containing key/value pairs of data
     * {
     *    textEditorId         : id of the TextEditor                                     (READ-ONLY)
     *    textEditorDOMElement : reference to the DOM element representing the TextEditor
     *    text                 : text data in the TextEditor
     * } 
     */
    constructor(data) {
        this._data = data || {};
        this._DOMElement = null;
        this._textEditorCanvas = null; 

        this._mouseDown = false;
        this.currentAction = "cursor"

        this.mouseX = null;
        this.mouseY = null;

        this._initialize();
    }

    _attachToEventListeners() {
        const textEditorTextArea = this.DOMElement.querySelector(".text-editor-textarea");

        // text editor
        textEditorTextArea.addEventListener("input", this._onInput.bind(this));
        textEditorTextArea.addEventListener("keydown", this._onKeyDown.bind(this));

        // text editor canvas
        this.DOMElement.addEventListener("mousedown", this._onMouseDown.bind(this));
        this.DOMElement.addEventListener("mousemove", this._onMouseMove.bind(this))
        this.DOMElement.addEventListener("mousewheel", this._onMouseWheel.bind(this));
        
        // window
        window.addEventListener("keydown", this._onKeyDownWindow.bind(this));
        window.addEventListener("mouseup", this._onMouseUp.bind(this));
    }

    _initializeDOMElement() {
        const textEditorWrapper = document.createElement("div");
        textEditorWrapper.innerHTML = '<div class="text-editor-content"><div class="line-numbers-wrapper"><span>1</span><span><br></span></div><textarea class="text-editor-textarea" spellcheck="false"></textarea><div id="text-editor-canvas"></div></div>';

        // increment global variable textEditorCount then set this.data["textEditorId"]
        this.data["textEditorId"] = ++window.globalVariables["textEditorCount"];
        textEditorWrapper.classList.add("text-editor-wrapper");
        textEditorWrapper.id = "text-editor" + this.data["textEditorId"];

        this._DOMElement = textEditorWrapper;
    }

    _initialize() {
        // initialize DOMElement and replace TextEditor shell div
        this._initializeDOMElement();
        this.data["textEditorDOMElement"].replaceWith(this.DOMElement);
        this.data["textEditorDOMElement"] = this.DOMElement;

        // instantiate TextEditorCanvas and assign its reference to this.canvas
        const textEditorContent = this.DOMElement.querySelector(".text-editor-content");
        this._textEditorCanvas = new TextEditorCanvas({ "textEditorCanvasDOMElement": textEditorContent.querySelector("#text-editor-canvas"), "textEditorDOMElement": this.data["textEditorDOMElement"], "textEditor": this });

        // attach methods to event listeners
        this._attachToEventListeners();
    }

    /** ==================================== */
    /** methods to attach to event listeners */

    // text editor

    _updateLineNumber() {
        const textEditorTextArea = this.DOMElement.querySelector(".text-editor-textarea");
        const textEditorLineNumbersWrapper = this.DOMElement.querySelector(".line-numbers-wrapper");

        /** TODO: change method since .match method is too slow at large values. */

        const lineBreaks = textEditorTextArea.value.match(/\n/gi) || [];
        const lineBreakCount = (lineBreaks.length == 0) ? 1 : lineBreaks.length + 1;
        const spanCount = textEditorLineNumbersWrapper.children.length - 1;
        const lineCountDifference = spanCount - lineBreakCount;

        // add spans
        if (lineCountDifference < 0) {
            textEditorLineNumbersWrapper.children[spanCount].remove();

            for (let i = 0; i < -lineCountDifference; i++) {
                const lineNumberSpan = document.createElement("span");
                lineNumberSpan.textContent = spanCount + i + 1;
                textEditorLineNumbersWrapper.append(lineNumberSpan);
            }

            // extra span to prevent content being pushed up by horizontal scrollbar issue
            const extraSpan = document.createElement("span");
            extraSpan.innerHTML = "<br>";
            textEditorLineNumbersWrapper.append(extraSpan);
        }

        // remove spans
        if (lineCountDifference > 0)
            for (let i = 0; i < lineCountDifference; i++)
                textEditorLineNumbersWrapper.children[spanCount - i - 1].remove();

    }

    _addTab() {
        const textEditorTextArea = this.DOMElement.querySelector(".text-editor-textarea");

        const tabSpaceAmount = window.userPreferences["editor.tabSpaceAmount"];
        const selectionStart = textEditorTextArea.selectionStart;

        let beforeSelectionText = textEditorTextArea.value.substring(0, selectionStart);
        const afterSelectionText = textEditorTextArea.value.substring(selectionStart);

        // add spaces in between before and after texts
        for (let i = 0; i < tabSpaceAmount; i++)
            beforeSelectionText += " ";

        textEditorTextArea.value = beforeSelectionText + afterSelectionText;

        // move caret to end of inserted tab
        textEditorTextArea.selectionStart = textEditorTextArea.selectionEnd = selectionStart + tabSpaceAmount;
    }

    _preventHighlight(event) {
        event.preventDefault();
    }

    unselectAllSketchFigureObjects() {
        // disable isSelected property of all SketchFigure objects
        for (const sketchFigure of this.textEditorCanvas.sketchFigures) {
            sketchFigure.isSelected = false;
            // refresh canvas
            TextEditorCanvasDrawingServiceFactory.getService(this.textEditorCanvas).refresh();
        }
    }

    _onMouseDown(event) {
        if (!this._mouseDown) {
            this._mouseDown = true;
            this._mouseDownButton = event["button"];

            // cursor action logic
            if (this.currentAction === "cursor") {

                this.unselectAllSketchFigureObjects();
                
                // check for hovered SketchFigure objects and draw their bounding boxes
                SketchFigure.checkForHoveredSketchFigures(this.mouseX, this.mouseY, this.textEditorCanvas.sketchFigures, this.textEditorCanvas.canvasContext)
                
                // logic to be able to select hovered SketchFigure objects
                for (const sketchFigure of this.textEditorCanvas.sketchFigures) {
                    if (sketchFigure.isHovered) {
                        sketchFigure.isDragged = true;
                        sketchFigure.draggedX = this.mouseX;
                        sketchFigure.draggedY = this.mouseY;
                        sketchFigure.isSelected = true;

                        sketchFigure.drawRotateIndicator(this.textEditorCanvas.canvasContext);

                        // unselect all selected text
                        if (window.getSelection) {window.getSelection().removeAllRanges();}
                        else if (document.selection) {document.selection.empty();}
                        
                        break;
                    }
                }

            }

            // pencil action logic
            if (this.currentAction === "pencil") {
                this.textEditorCanvas.sketch(event);
            }

        }
    }

    _onMouseUp(event) {
        // allow text hightlighting in editor textarea again
        this.DOMElement.querySelector("textarea").removeEventListener("mousedown", this._preventHighlight);

        if (this._mouseDownButton === event["button"]) {
            this._mouseDown = false;

            if (this.currentAction === "pencil") {
                this.textEditorCanvas.finishSketching();
            }

        }

        // disable isDragged property of all SketchFigure objects
        for (const sketchFigure of this.textEditorCanvas.sketchFigures) {
            sketchFigure.updateStartingProperties();
            sketchFigure.isDragged = false;
        }

        // refresh canvas
        TextEditorCanvasDrawingServiceFactory.getService(this.textEditorCanvas).refresh();
    }

    _onMouseMove(event) {

        const rect = this.textEditorCanvas.canvas.getBoundingClientRect();
        this.mouseX = event.pageX - rect.left;
        this.mouseY = event.pageY - rect.top;

        // cursor action logic
        if (this.currentAction === "cursor") {

            // refresh canvas
            TextEditorCanvasDrawingServiceFactory.getService(this.textEditorCanvas).refresh();

            // check for hovered SketchFigure objects and draw their bounding boxes
            if (SketchFigure.checkForHoveredSketchFigures(this.mouseX, this.mouseY, this.textEditorCanvas.sketchFigures, this.textEditorCanvas.canvasContext)) {
                // disable text highlighting in editor textarea
                this.DOMElement.querySelector("textarea").addEventListener("mousedown", this._preventHighlight);
            }

            // drag and move selected SketchFigure objects
            if (this._mouseDown) {
                if (this._mouseDownButton === 0) {
                    for (const sketchFigure of this.textEditorCanvas.sketchFigures) {
                        if (sketchFigure.isDragged) {

                            sketchFigure.drawRotateIndicator(this.textEditorCanvas.canvasContext);
                            sketchFigure.move(this.mouseX, this.mouseY, this.textEditorCanvas);

                        }
                    }
                }
            }


        } 

        // pencil action logic 
        if (this.currentAction === "pencil") {
            this.textEditorCanvas.showBlotGhost(event);

            if(this._mouseDown)
                this.textEditorCanvas.sketch(event);
        }

    }

    _onMouseWheel(event) {
        const rect = this.textEditorCanvas.canvas.getBoundingClientRect();

        // cursor action logic
        if (this.currentAction === "cursor") {

            // rotate selected SketchFigure objects
            for (const sketchFigure of this.textEditorCanvas.sketchFigures) 
                if (sketchFigure.isDragged)
                    if (event.deltaY > 0)
                        sketchFigure.rotate(0.1, this.mouseX, this.mouseY);
                    else
                        sketchFigure.rotate(-0.1, this.mouseX, this.mouseY);
        }

        // refresh canvas
        TextEditorCanvasDrawingServiceFactory.getService(this.textEditorCanvas).refresh();

        // iterate through SketchFigure objects and check for mouse hover
        SketchFigure.checkForHoveredSketchFigures(this.mouseX, this.mouseY, this.textEditorCanvas.sketchFigures, this.textEditorCanvas.canvasContext);
        
        for (const sketchFigure of this.textEditorCanvas.sketchFigures)
            if (sketchFigure.isDragged) 
                sketchFigure.drawRotateIndicator(this.textEditorCanvas.canvasContext);
    }

    _onInput(event) {
        // update line number
        this._updateLineNumber();
    }

    _onKeyDown(event) {
        // add tab 
        if (event.key === "Tab") {
            event.preventDefault();
            this._addTab();
        }

    }

    _onKeyDownWindow(event) {
        // delete selected SketchFigure object
        if (event.key === "Delete") {
            event.preventDefault();
            for (let i = this.textEditorCanvas.sketchFigures.length - 1; i >= 0; i--) {
                if (this.textEditorCanvas.sketchFigures[i].isSelected) {
                    this.textEditorCanvas.sketchFigures[i].delete();

                    // refresh canvas
                    TextEditorCanvasDrawingServiceFactory.getService(this.textEditorCanvas).refresh();
                }
            }
        }

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

    get textEditorCanvas() {
        return this._textEditorCanvas;
    }


}
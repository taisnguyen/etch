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
     *    canvas               : reference to a TextEditorCanvas instance
     * } 
     */

    constructor(data) {
        this._data = data || {};
        this._DOMElement = null;

        this._initialize();
    }

    _attachToEventListeners() {
        const textEditorWrapper = document.querySelector("#text-editor" + this.data["textEditorId"]);
        const textEditorContent = textEditorWrapper.querySelector(".text-editor-content");
        const textEditorTextArea = textEditorContent.querySelector(".text-editor-textarea");

        textEditorTextArea.addEventListener("input", this._onInput.bind(this));
    }

    _initializeDOMElement() {
        const textEditorWrapper = document.createElement("div");
        textEditorWrapper.innerHTML = '<div class="text-editor-content"><div class="line-numbers-wrapper"><span>1</span><span><br></span></div><textarea class="text-editor-textarea" spellcheck="false"></textarea></div>';

        // increment global variable textEditorCount and set this.data["textEditorId"]
        this.data["textEditorId"] = ++window.globalVariables["textEditorCount"];
        textEditorWrapper.classList.add("text-editor-wrapper");
        textEditorWrapper.id = "text-editor" + this.data["textEditorId"];

        this._DOMElement = textEditorWrapper;
    }

    _initialize() {
        // initialize DOMElement and replace TextEditor shell div
        this._initializeDOMElement();
        this.data["textEditorDOMElement"].replaceWith(this.DOMElement);

        this._attachToEventListeners();
    }

    /** ==================================== */
    /** methods to attach to event listeners */

    // text editor

    _updateLineNumber() {
        const textEditorWrapper = document.querySelector("#text-editor" + this.data["textEditorId"]);
        const textEditorContent = textEditorWrapper.querySelector(".text-editor-content");
        const textEditorTextArea = textEditorContent.querySelector(".text-editor-textarea");
        const textEditorLineNumbersWrapper = textEditorContent.querySelector(".line-numbers-wrapper");

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
            for(let i = 0; i < lineCountDifference; i++)
                textEditorLineNumbersWrapper.children[spanCount - i - 1].remove();

    }

    _addTab() {

    }

    _onInput(event) {
        this._updateLineNumber();
    }

    _onKeyDown(event) {
        // if tab 
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
/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * implementation of nav bar logic
 */




// state variables

var selectedAction = "";


function clearState() {

    selectedAction = "";

    // remove styles

    document.querySelector(".nav-bar-item-cursor").style.backgroundColor = "var(--nav-bar-background-color)";
    document.querySelector(".nav-bar-item-cursor").style.backgroundImage = 'url("../images/nav-bar-item-cursor.png")';
    document.querySelector(".nav-bar-item-cursor").style.pointerEvents = "auto";
    document.querySelector(".nav-bar-item-cursor").onmouseover = (event) => { event.target.style.backgroundColor = "var(--nav-bar-item-background-color-hover)"; };
    document.querySelector(".nav-bar-item-cursor").onmouseout = (event) => { event.target.style.backgroundColor = "var(--nav-bar-background-color)"; };

    document.querySelector(".nav-bar-item-pencil").style.backgroundColor = "var(--nav-bar-background-color)";
    document.querySelector(".nav-bar-item-pencil").style.backgroundImage = 'url("../images/nav-bar-item-pencil.png")';
    document.querySelector(".nav-bar-item-pencil").style.pointerEvents = "auto";
    document.querySelector(".nav-bar-item-pencil").onmouseover = (event) => { event.target.style.backgroundColor = "var(--nav-bar-item-background-color-hover)"; };
    document.querySelector(".nav-bar-item-pencil").onmouseout = (event) => { event.target.style.backgroundColor = "var(--nav-bar-background-color)"; };
    
    for(const editor of window.globalVariables["editors"]) 
        editor.textEditorCanvas.hideBlotGhost();

    document.querySelector(".nav-bar-item-eraser").style.backgroundColor = "var(--nav-bar-background-color)";
    document.querySelector(".nav-bar-item-eraser").style.backgroundImage = 'url("../images/nav-bar-item-eraser.png")';
    document.querySelector(".nav-bar-item-eraser").style.pointerEvents = "auto";
    document.querySelector(".nav-bar-item-eraser").onmouseover = (event) => { event.target.style.backgroundColor = "var(--nav-bar-item-background-color-hover)"; };
    document.querySelector(".nav-bar-item-eraser").onmouseout = (event) => { event.target.style.backgroundColor = "var(--nav-bar-background-color)"; };
}

export function onSelectCursorAction() {
    if (selectedAction === "cursor") return;

    clearState();

    selectedAction = "cursor";

    document.querySelector(".nav-bar-item-cursor").style.backgroundColor = "var(--nav-bar-item-background-color-selected)";
    document.querySelector(".nav-bar-item-cursor").style.backgroundImage = 'url("../images/nav-bar-item-cursor-highlighted.png")';
    document.querySelector(".nav-bar-item-cursor").style.pointerEvents = "none";
    document.querySelector(".nav-bar-item-cursor").onmouseover = (event) => {};
    document.querySelector(".nav-bar-item-cursor").onmouseout = (event) => {};


    for(const editor of window.globalVariables["editors"]) {
        editor.currentAction = "cursor";
        editor.DOMElement.querySelector(".text-editor-content").style.cursor = "text";
        editor.DOMElement.querySelector(".line-numbers-wrapper").style.cursor = "default";
        editor.DOMElement.querySelector(".text-editor-textarea").style.pointerEvents = "initial";
    }
}

export function onSelectPencilAction() {
    if (selectedAction === "pencil") return;

    clearState();

    selectedAction = "pencil";

    document.querySelector(".nav-bar-item-pencil").style.backgroundColor = "var(--nav-bar-item-background-color-selected)";
    document.querySelector(".nav-bar-item-pencil").style.backgroundImage = 'url("../images/nav-bar-item-pencil-highlighted.png")';
    document.querySelector(".nav-bar-item-pencil").style.pointerEvents = "none";
    document.querySelector(".nav-bar-item-pencil").onmouseover = (event) => {};
    document.querySelector(".nav-bar-item-pencil").onmouseout = (event) => {};


    for(const editor of window.globalVariables["editors"]) {
        editor.currentAction = "pencil"
        editor.DOMElement.querySelector(".text-editor-content").style.cursor = 'url("../images/cursor-pencil.png"), url("../images/cursor-pencil.png"), default';
        editor.DOMElement.querySelector(".line-numbers-wrapper").style.cursor = 'url("../images/cursor-pencil.png"), url("../images/cursor-pencil.png"), default';
        editor.DOMElement.querySelector(".text-editor-textarea").style.pointerEvents = "none";
    }
}

export function onSelectEraserAction() {
    if (selectedAction === "eraser") return;

    clearState();

    selectedAction = "eraser";

    document.querySelector(".nav-bar-item-eraser").style.backgroundColor = "var(--nav-bar-item-background-color-selected)";
    document.querySelector(".nav-bar-item-eraser").style.backgroundImage = 'url("../images/nav-bar-item-eraser-highlighted.png")';
    document.querySelector(".nav-bar-item-eraser").style.pointerEvents = "none";
    document.querySelector(".nav-bar-item-eraser").onmouseover = (event) => {};
    document.querySelector(".nav-bar-item-eraser").onmouseout = (event) => {};
    

    for(const editor of window.globalVariables["editors"]) {
        editor.currentAction = "eraser"
        editor.DOMElement.querySelector(".text-editor-content").style.cursor = 'url("../images/cursor-eraser.png"), url("../images/cursor-eraser.png"), default';
        editor.DOMElement.querySelector(".line-numbers-wrapper").style.cursor = 'url("../images/cursor-eraser.png"), url("../images/cursor-eraser.png"), default';
        editor.DOMElement.querySelector(".text-editor-textarea").style.pointerEvents = "none";
    }
}
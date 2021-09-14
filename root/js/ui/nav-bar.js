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




function clearState() {
    // remove styles

    document.querySelector(".nav-bar-item-cursor").style.borderLeft = "none";
    document.querySelector(".nav-bar-item-cursor").style.backgroundImage = 'url("../images/nav-bar-item-cursor.png")';

    document.querySelector(".nav-bar-item-pencil").style.borderLeft = "none";
    document.querySelector(".nav-bar-item-pencil").style.backgroundImage = 'url("../images/nav-bar-item-pencil.png")';

    document.querySelector(".nav-bar-item-eraser").style.borderLeft = "none";
    document.querySelector(".nav-bar-item-eraser").style.backgroundImage = 'url("../images/nav-bar-item-eraser.png")';

    // remove event listeners
}

export function onSelectCursorAction() {
    clearState();

    document.querySelector(".nav-bar-item-cursor").style.borderLeft = "1px solid var(--editor-textarea-background-color)";
    document.querySelector(".nav-bar-item-cursor").style.backgroundImage = 'url("../images/nav-bar-item-cursor-highlighted.png")';
    
    for(const editor of window.globalVariables["editors"]) {
        editor.currentAction = "cursor";
        editor.DOMElement.querySelector(".text-editor-content").style.cursor = "text";
        editor.DOMElement.querySelector(".line-numbers-wrapper").style.cursor = "default";
        editor.DOMElement.querySelector(".text-editor-textarea").style.pointerEvents = "initial";
    }
}

export function onSelectPencilAction() {
    clearState();

    document.querySelector(".nav-bar-item-pencil").style.borderLeft = "1px solid var(--editor-textarea-background-color)";
    document.querySelector(".nav-bar-item-pencil").style.backgroundImage = 'url("../images/nav-bar-item-pencil-highlighted.png")';

    for(const editor of window.globalVariables["editors"]) {
        editor.currentAction = "pencil"
        editor.DOMElement.querySelector(".text-editor-content").style.cursor = 'url("../images/cursor-pencil.png"), url("../images/cursor-pencil.png"), default';
        editor.DOMElement.querySelector(".line-numbers-wrapper").style.cursor = 'url("../images/cursor-pencil.png"), url("../images/cursor-pencil.png"), default';
        editor.DOMElement.querySelector(".text-editor-textarea").style.pointerEvents = "none";
    }
}

export function onSelectEraserAction() {
    clearState();

    document.querySelector(".nav-bar-item-eraser").style.borderLeft = "1px solid var(--editor-textarea-background-color)";
    document.querySelector(".nav-bar-item-eraser").style.backgroundImage = 'url("../images/nav-bar-item-eraser-highlighted.png")';

    for(const editor of window.globalVariables["editors"]) {
        editor.currentAction = "eraser"
        editor.DOMElement.querySelector(".text-editor-content").style.cursor = 'url("../images/cursor-eraser.png"), url("../images/cursor-eraser.png"), default';
        editor.DOMElement.querySelector(".line-numbers-wrapper").style.cursor = 'url("../images/cursor-eraser.png"), url("../images/cursor-eraser.png"), default';
        editor.DOMElement.querySelector(".text-editor-textarea").style.pointerEvents = "none";
    }
}
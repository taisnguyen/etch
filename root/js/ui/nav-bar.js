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
    console.log("cursor");
}

export function onSelectPencilAction() {
    clearState();

    document.querySelector(".nav-bar-item-pencil").style.borderLeft = "1px solid var(--editor-textarea-background-color)";
    document.querySelector(".nav-bar-item-pencil").style.backgroundImage = 'url("../images/nav-bar-item-pencil-highlighted.png")';
    console.log("pencil");
}

export function onSelectEraserAction() {
    clearState();

    document.querySelector(".nav-bar-item-eraser").style.borderLeft = "1px solid var(--editor-textarea-background-color)";
    document.querySelector(".nav-bar-item-eraser").style.backgroundImage = 'url("../images/nav-bar-item-eraser-highlighted.png")';
    console.log("eraser");
}
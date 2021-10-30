/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * startup script that gets called first when user-interface.html loads up
 * 
 * initializes global variables (objects attached to the global window variable)
 */


import { onSelectCursorAction, onSelectPencilAction, onSelectEraserAction } from "./ui/nav-bar.js";
import { SketchFigure } from "./entities/sketch-figure.js";
import { TextEditor } from "./entities/text-editor.js";




// window variable to hold global variables
window.globalVariables = {
    textEditorCount: 0,
    userCurrentAction: "cursor",
    services: [],
    editors: []
};

// window variable to hold editor preferences
window.userPreferences = window.userPreferencesAPI.read();


// initialize global css style variables from userPreferences
document.documentElement.style.setProperty("--editor-textarea-background-color", window.userPreferences["style.editorTextAreaBackgroundColor"]);
document.documentElement.style.setProperty("--editor-textarea-text-font-family", window.userPreferences["style.editorTextAreaTextFontFamily"]);
document.documentElement.style.setProperty("--editor-textarea-text-font-size", window.userPreferences["style.editorTextAreaTextFontSize"]);
document.documentElement.style.setProperty("--editor-textarea-text-color", window.userPreferences["style.editorTextAreaTextColor"]);
document.documentElement.style.setProperty("--editor-textarea-text-background-color-highlight", window.userPreferences["style.editorTextAreaTextBackgroundColorHighlight"]);
document.documentElement.style.setProperty("--editor-line-numbers-text-color", window.userPreferences["style.editorLineNumbersTextColor"]);

document.documentElement.style.setProperty("--nav-bar-background-color", window.userPreferences["style.navBarBackgroundColor"]);
document.documentElement.style.setProperty("--nav-bar-item-background-color-hover", window.userPreferences["style.navBarItemBackgroundColorHover"]);
document.documentElement.style.setProperty("--nav-bar-item-background-color-selected", window.userPreferences["style.navBarItemBackgroundColorSelected"]);

document.documentElement.style.setProperty("--title-bar-background-color", window.userPreferences["style.titleBarBackgroundColor"]);
document.documentElement.style.setProperty("--title-bar-button-text-font-family", window.userPreferences["style.titleBarButtonTextFontFamily"]);
document.documentElement.style.setProperty("--title-bar-button-text-color", window.userPreferences["style.titleBarButtonTextColor"]);
document.documentElement.style.setProperty("--title-bar-button-background-color-hover", window.userPreferences["style.titleBarButtonBackgroundColorHover"]);

document.documentElement.style.setProperty("--scroll-bar-thumb-background-color", window.userPreferences["style.scrollBarThumbBackgroundColor"]);
document.documentElement.style.setProperty("--scroll-bar-thumb-background-color-hover", window.userPreferences["style.scrollBarThumbBackgroundColorHover"]);


// assign methods to event listeners on nav bar buttons

onSelectCursorAction(); // default seletcted action

document.querySelector(".nav-bar-item-cursor").addEventListener("click", onSelectCursorAction);
document.querySelector(".nav-bar-item-pencil").addEventListener("click", onSelectPencilAction);
document.querySelector(".nav-bar-item-eraser").addEventListener("click", onSelectEraserAction);


// keyboard shortcuts

(() => {
    const keysPressed = [];

    document.addEventListener("keyup", (event) => {
        keysPressed.splice(keysPressed.indexOf(event.key.toLowerCase()), 1);
    }); 

    document.addEventListener("keydown", (event) => {
        if (!keysPressed.includes(event.key.toLowerCase()))
            keysPressed.push(event.key.toLowerCase());

        // shortcut declarations

        // Cursor Tool : CTRL+1
        if (keysPressed[0] === "control" && keysPressed[1] === "1") {
            for(const editor of window.globalVariables["editors"]) 
                editor.textEditorCanvas.finishSketching();
            
            onSelectCursorAction();

            for(const editor of window.globalVariables["editors"]) 
                SketchFigure.checkForHoveredSketchFigures(editor.mouseX, editor.mouseY, editor.textEditorCanvas.sketchFigures, editor.textEditorCanvas.canvasContext);

            return;   
        }

        // Pencil Tool : CTRL+2
        if (keysPressed[0] === "control" && keysPressed[1] === "2") {
            onSelectPencilAction();
            return;   
        }

        // Eraser Tool : CTRL+3
        if (keysPressed[0] === "control" && keysPressed[1] === "3") {
            for(const editor of window.globalVariables["editors"]) 
                editor.textEditorCanvas.finishSketching();
            
            onSelectEraserAction();
            return;
        }

        if (keysPressed.length >= 2)
            keysPressed.splice(1, 1);

    });    
})();


// main TextEditor instance
window.globalVariables["editors"].push(new TextEditor({ "textEditorDOMElement": document.querySelector("#text-editor") }));

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


import { GlobalVariableRepositoryService } from "./services/global-variable-repository-service.js";
import { onSelectCursorAction, onSelectPencilAction, onSelectEraserAction} from "./ui/nav-bar.js";
import { SketchFigure } from "./entities/sketch-figure.js";
import { TextEditor } from "./entities/text-editor.js";




// set global variables
GlobalVariableRepositoryService.setGlobalVariable("textEditorCount", 0);
GlobalVariableRepositoryService.setGlobalVariable("userCurrentAction", "cursor");
GlobalVariableRepositoryService.setGlobalVariable("services", []);
GlobalVariableRepositoryService.setGlobalVariable("editors", []);
GlobalVariableRepositoryService.setGlobalVariable("userPreferences", window.userPreferencesAPI.read());


// initialize global css style variables from userPreferences
document.documentElement.style.setProperty("--editor-textarea-background-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.editorTextAreaBackgroundColor"]);
document.documentElement.style.setProperty("--editor-textarea-text-font-family", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.editorTextAreaTextFontFamily"]);
document.documentElement.style.setProperty("--editor-textarea-text-font-size", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.editorTextAreaTextFontSize"]);
document.documentElement.style.setProperty("--editor-textarea-text-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.editorTextAreaTextColor"]);
document.documentElement.style.setProperty("--editor-textarea-text-background-color-highlight", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.editorTextAreaTextBackgroundColorHighlight"]);
document.documentElement.style.setProperty("--editor-line-numbers-text-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.editorLineNumbersTextColor"]);

document.documentElement.style.setProperty("--nav-bar-background-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.navBarBackgroundColor"]);
document.documentElement.style.setProperty("--nav-bar-item-background-color-hover", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.navBarItemBackgroundColorHover"]);
document.documentElement.style.setProperty("--nav-bar-item-background-color-selected", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.navBarItemBackgroundColorSelected"]);

document.documentElement.style.setProperty("--title-bar-background-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.titleBarBackgroundColor"]);
document.documentElement.style.setProperty("--title-bar-button-text-font-family", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.titleBarButtonTextFontFamily"]);
document.documentElement.style.setProperty("--title-bar-button-text-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.titleBarButtonTextColor"]);
document.documentElement.style.setProperty("--title-bar-button-background-color-hover", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.titleBarButtonBackgroundColorHover"]);

document.documentElement.style.setProperty("--scroll-bar-thumb-background-color", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.scrollBarThumbBackgroundColor"]);
document.documentElement.style.setProperty("--scroll-bar-thumb-background-color-hover", GlobalVariableRepositoryService.getGlobalVariable("userPreferences")["style.scrollBarThumbBackgroundColorHover"]);


// assign methods to event listeners on nav bar buttons

onSelectCursorAction(); // default seletcted action

document.querySelector(".nav-bar-item-cursor").addEventListener("click", onSelectCursorAction);
document.querySelector(".nav-bar-item-pencil").addEventListener("click", onSelectPencilAction);
document.querySelector(".nav-bar-item-eraser").addEventListener("click", onSelectEraserAction);


// keyboard shortcuts

//(() => {
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
        for (const editor of GlobalVariableRepositoryService.getGlobalVariable("editors"))
            editor.textEditorCanvas.finishSketching();

        onSelectCursorAction();

        for (const editor of GlobalVariableRepositoryService.getGlobalVariable("editors"))
            SketchFigure.checkForHoveredSketchFigures(editor.mouseX, editor.mouseY, editor.textEditorCanvas.sketchFigures, editor.textEditorCanvas.canvasContext);

        return;
    }

    // OVERRIDE CLOSE-PROGRAM SHORTCUT : CTRL+W
    if (keysPressed[0] === "control" && keysPressed[1] === "w") {
        event.preventDefault();
        return;
    }

    // OVERRIDE RELOAD-PROGRAM SHORTCUT : CTRL+W
    if (keysPressed[0] === "control" && keysPressed[1] === "r") {
        //event.preventDefault(); // TODO: uncomment this line to prevent reloading the page
        return;
    }

    // Pencil Tool : CTRL+2
    if (keysPressed[0] === "control" && keysPressed[1] === "2") {
        onSelectPencilAction();
        return;
    }

    // Eraser Tool : CTRL+3
    if (keysPressed[0] === "control" && keysPressed[1] === "3") {
        for (const editor of GlobalVariableRepositoryService.getGlobalVariable("editors"))
            editor.textEditorCanvas.finishSketching();

        onSelectEraserAction();
        return;
    }

    // Undo : CTRL+Z
    if (keysPressed[0] === "control" && keysPressed[1] === "z") {
        event.preventDefault();
        console.log("undo");
    }


});


//})();


// main TextEditor instance
GlobalVariableRepositoryService.getGlobalVariable("editors").push(new TextEditor({
    "textEditorDOMElement": document.querySelector("#text-editor")
}));
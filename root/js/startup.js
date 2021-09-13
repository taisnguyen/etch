/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * startup script that gets called first when user-interface.html loads up
 */


import { onSelectCursorAction, onSelectPencilAction, onSelectEraserAction } from "./ui/nav-bar.js";
import { TextEditor } from "./models/text-editor.js";
import { SketchFigure } from "./models/sketch-figure.js";
import { SketchPoint } from "./models/sketch-point.js";




// window variable to hold global variables
window.globalVariables = {
    textEditorCount: 0,
    userCurrentAction: "cursor"
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
document.documentElement.style.setProperty("--title-bar-background-color", window.userPreferences["style.titleBarBackgroundColor"]);
document.documentElement.style.setProperty("--title-bar-button-text-font-family", window.userPreferences["style.titleBarButtonTextFontFamily"]);
document.documentElement.style.setProperty("--title-bar-button-text-color", window.userPreferences["style.titleBarButtonTextColor"]);
document.documentElement.style.setProperty("--title-bar-button-background-color-hover", window.userPreferences["style.titleBarButtonBackgroundColorHover"]);
document.documentElement.style.setProperty("--scroll-bar-thumb-background-color", window.userPreferences["style.scrollBarThumbBackgroundColor"]);
document.documentElement.style.setProperty("--scroll-bar-thumb-background-color-hover", window.userPreferences["style.scrollBarThumbBackgroundColorHover"]);

// main TextEditor instance
const textEditor = new TextEditor({ "textEditorDOMElement": document.querySelector("#text-editor") });

// assign methods to event listeners on nav bar buttons

onSelectCursorAction(); // default seletcted action

document.querySelector(".nav-bar-item-cursor").addEventListener("click", onSelectCursorAction);
document.querySelector(".nav-bar-item-pencil").addEventListener("click", onSelectPencilAction);
document.querySelector(".nav-bar-item-eraser").addEventListener("click", onSelectEraserAction);




const sketch = new SketchFigure();

textEditor.DOMElement.addEventListener("mousemove", (event) => {
    const rect = textEditor.textEditorCanvas.canvas.getBoundingClientRect();
    const mousePosition = [ event.pageX - rect.left, event.pageY - rect.top ];

    textEditor.textEditorCanvas.canvasContext.clearRect(0, 0, textEditor.textEditorCanvas.canvas.width, textEditor.textEditorCanvas.canvas.height);
    textEditor.textEditorCanvas.canvasContext.fillRect(mousePosition[0], mousePosition[1], 2, 2);
    sketch.sketchPoints.push(new SketchPoint(mousePosition[0], mousePosition[1]));
    textEditor.textEditorCanvas.sketchFigures[0] = sketch;
    textEditor.textEditorCanvas.canvasContext.fillRect(mousePosition[0], mousePosition[1], 1, 1);
    textEditor.textEditorCanvas.drawSketchFigures(textEditor.textEditorCanvas.canvasContext);
});

import { TextEditor } from "./models/text-editor.js";

// window variable to hold global variables
window.globalVariables = {
    textEditorCount: 0
};

// window variable to hold editor preferences
window.userPreferences = window.userPreferencesAPI.read();

// initialize global css style variables from userPreferences
document.documentElement.style.setProperty("--editor-textarea-background-color", window.userPreferences["style.editorTextAreaBackgroundColor"]);
document.documentElement.style.setProperty("--editor-textarea-text-font-family", window.userPreferences["style.editorTextAreaTextFontFamily"])
document.documentElement.style.setProperty("--editor-textarea-text-color", window.userPreferences["style.editorTextAreaTextColor"])
document.documentElement.style.setProperty("--editor-line-numbers-text-color", window.userPreferences["style.editorLineNumbersTextColor"])
document.documentElement.style.setProperty("--title-bar-background-color", window.userPreferences["style.titleBarBackgroundColor"])
document.documentElement.style.setProperty("--title-bar-button-text-font-family", window.userPreferences["style.titleBarButtonTextFontFamily"])
document.documentElement.style.setProperty("--title-bar-button-text-color", window.userPreferences["style.titleBarButtonTextColor"])
document.documentElement.style.setProperty("--title-bar-button-background-color-hover", window.userPreferences["style.titleBarButtonBackgroundColorHover"])
document.documentElement.style.setProperty("--scroll-bar-thumb-background-color", window.userPreferences["style.scrollBarThumbBackgroundColor"])
document.documentElement.style.setProperty("--scroll-bar-thumb-background-color-hover", window.userPreferences["style.scrollBarThumbBackgroundColorHover"])

const textEditor = new TextEditor({ "textEditorDOMElement": document.querySelector("#text-editor") });


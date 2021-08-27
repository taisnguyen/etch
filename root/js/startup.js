import { TextEditor } from "./models/text-editor.js";

// window variable to hold global variables
window.globalVariables = {
    textEditorCount: 0
};

// window variable to hold editor preferences
window.editorPreferences = window.editorPreferencesAPI.read();

const textEditor = new TextEditor({ "textEditorDOMElement": document.querySelector("#text-editor") });


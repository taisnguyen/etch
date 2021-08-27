const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

console.log("preload");

// preferences config file
contextBridge.exposeInMainWorld("editorPreferencesAPI", {
        
    // read and return editorPreferences data
    read: () => {
        // windows
        if (process.platform === "win32") {
            try {
                const data = fs.readFileSync(process.env.APPDATA + "\\Etch\\editorPreferences.json", "utf8");
                return JSON.parse(data);
            } catch (error) {
                /** TODO: handle error */
                return;
            }
        }
        
    }
});
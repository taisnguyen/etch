const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

console.log("preload");

// user preferences config file
contextBridge.exposeInMainWorld("userPreferencesAPI", {
        
    // read and return userPreferences data
    read: () => {
        // windows
        if (process.platform === "win32") {
            try {
                const data = fs.readFileSync(process.env.APPDATA + "\\Etch\\userPreferences.json", "utf8");
                return JSON.parse(data);
            } catch (error) {
                /** TODO: handle error */
                console.log(error);
                return;
            }
        }
        
    }
});
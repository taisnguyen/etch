/**
 * AUTHOR:	TAI . SANH . NGUYEN
 *
 * [E] 
 *  [T] 
 *   [C] 
 *    [H] 
 *
 * app entry point
 */


const { app, BrowserWindow } = require("electron");
const path = require("path");




function createWindow() {
    const window = new BrowserWindow({
        width: 1400,
        height: 900,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            devTools: true, // dev
            preload: path.join(__dirname, "js", "preload.js")
        }
    });

    window.loadFile(path.join(__dirname, "html", "user-interface.html"));
}

app.whenReady().then(() => {
    createWindow();

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
    });
});
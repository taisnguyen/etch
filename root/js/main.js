const { app, BrowserWindow } = require("electron");
const path = require("path");




function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            devTools: true, // dev
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile(path.join(__dirname, "..", "html", "user-interface.html"));
}

app.whenReady().then(() => {
    createWindow();

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") app.quit();
    });
});
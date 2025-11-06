const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

async function createWindow() {
  // 2. Importación dinámica de electron-is-dev
  const { default: isDev } = await import("electron-is-dev");

  mainWindow = new BrowserWindow({
    // ... tu configuración de BrowserWindow
    width: 950,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // ...
      //preload: path.join(__dirname, "preload.js"),
    },
  });

  const startUrl = isDev
    ? "http://localhost:3000" // Modo Desarrollo: carga el servidor de React
    : url.format({
        pathname: path.join(__dirname, "build/index.html"), // Modo Producción: carga el build estático
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(startUrl);

  // Abrir DevTools solo en desarrollo para debugging
  if (isDev) {
    //mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');

let mainWindow;

app.whenReady().then(() => {
    const server = express();
    server.use(express.static(path.join(__dirname, 'out')));
    server.listen(3001, () => console.log("Servidor rodando em http://localhost:3001"));

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL('http://localhost:3001'); // Agora o Next.js roda em localhost
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

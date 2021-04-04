import { BrowserWindow } from 'electron';
const path = require('path');
export default () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1200,
        webPreferences: { preload: path.join(__dirname, '../preload/instagram.js') }
    });
    mainWindow.webContents.setWindowOpenHandler(({ url }) => { return { action: url.startsWith('https://instagram.com/') ? 'allow' : 'deny' } });

    mainWindow.loadURL('https://instagram.com');

    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('did-create-window', (childWindow) => {
        childWindow.webContents.on('will-navigate', (e) => { e.preventDefault(); });
    });
}
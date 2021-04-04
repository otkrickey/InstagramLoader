import { app, BrowserWindow } from 'electron';
const path = require('path');

import MenuBar from './base/MenuBar';
import createMainWindow from './window/mainWindow';
import DataIO from './base/DataIO';

app.whenReady().then(() => {
    createMainWindow();
    MenuBar();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createMainWindow(); } });
    DataIO();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit(); } });
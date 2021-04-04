import { Menu, MenuItem } from 'electron';
export default () => {
    const template = [
        // { role: 'fileMenu' }
        // { label: 'File', submenu: [{ role: 'quit' }] },
        new MenuItem({ label: 'File', submenu: [{ role: 'quit' }] }),
        // { role: 'editMenu' }
        // { label: 'Edit', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }] },
        new MenuItem({ label: 'Edit', submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }] }),
        // { role: 'viewMenu' }
        // { label: 'View', submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { type: 'separator' }, { role: 'togglefullscreen' }] },
        new MenuItem({ label: 'View', submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }, { type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' }, { type: 'separator' }, { role: 'togglefullscreen' }] }),
        // { role: 'windowMenu' }
        // { label: 'Window', submenu: [{ role: 'minimize' }, { role: 'maximize' }, { role: 'zoom' }, { role: 'close' }] }
        new MenuItem({ label: 'Window', submenu: [{ role: 'minimize' }, { role: 'togglefullscreen' }, { role: 'toggleDevTools', accelerator: 'F12' }, { role: 'zoom' }, { role: 'close' }] })
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
import { ipcMain } from 'electron';
import DownloadHandler from '../plugin/DownloadHandler';

export default () => {
    ipcMain.handle('article-data', (event, message) => {
        DownloadHandler(message);
        return 'accepted';
    });
}
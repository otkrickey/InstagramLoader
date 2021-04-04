import * as fs from 'fs';
import * as path from 'path';
import ImageDownloader from './ImageDownloader';

const DownloadPath = path.join(__dirname, '../../../../../kyk/instagram');

export default (data) => {
    const { images = [], url = '', type = '' }: { images: string[], url: string, type: string } = data;
    const username = path.basename(url)
    if (!fs.existsSync(path.join(DownloadPath, username))) { fs.mkdirSync(path.join(DownloadPath, username)); }
    for (const image of images) { const filepath = path.join(DownloadPath, username, (type ? `${type}-` : '') + (username ? `${username}-` : '') + path.basename(image).substring(0, path.basename(image).indexOf('?'))); ImageDownloader(image, filepath); }
}
import { get } from 'https';
import * as fs from 'fs';
import * as path from 'path';

export default (url: string, path2save: string) => {
    get(url, (res) => {
        const fileStream = fs.createWriteStream(path2save);
        res.pipe(fileStream);
        fileStream.on('error', console.log);
        fileStream.on('finish', fileStream.close);
        console.log('SAVED', path2save);
    });
}
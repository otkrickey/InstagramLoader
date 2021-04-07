import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

interface data {
    images: string[]
    videos: string[]
    url: string
    type: 'instagram-post' | 'instagram-story'
}

export default (data: string) => {
    const type = (JSON.parse(data) as data).type;
    const username = (JSON.parse(data) as data).url.replace('https://www.instagram.com/explore/tags/', 'tag-').replace('https://www.instagram.com/', '').replace('/', '');
    for (const image of (JSON.parse(data) as data).images) {
        const filepath = FileSystem.documentDirectory + '/' + (type ? `${type}-` : '') + (username ? `${username}-` : '') + image.substring(image.lastIndexOf('/') + 1, image.indexOf('?'));
        FileSystem.downloadAsync(image, filepath).then(({ uri }) => { saveFile(uri); })
    }
    for (const video of (JSON.parse(data) as data).videos) {
        const filepath = FileSystem.documentDirectory + '/' + (type ? `${type}-` : '') + (username ? `${username}-` : '') + video.substring(video.lastIndexOf('/') + 1, video.indexOf('?'));
        FileSystem.downloadAsync(video, filepath).then(({ uri }) => { saveFile(uri); })
    }
}


const saveFile = async (fileUri: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync(`Instagram_dl`, asset, false)
    }
}

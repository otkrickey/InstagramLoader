import React, { Component } from 'react';
import { StyleProp, View, ViewStyle, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import downloadFile from '../plugin/ScriptLoader';

export interface Props {
    style?: StyleProp<ViewStyle>
}

type asd = {
    state: Readonly<{}>
}

export default class playground extends Component<Props> implements asd {
    constructor(props: Props) {
        super(props);
        this.state = { webViewUrl: 'https://www.instagram.com' };
    }
    render() {
        const defaultStyle: StyleProp<ViewStyle> = { marginTop: 20 }
        const script = `
const ct = (t, post, story) => { return t === 'post' ? post : t === 'story' ? story : undefined }
function a(t) {
    const b = document.querySelectorAll(ct(t, 'div.MEAGs button.wpO6b', 'div.kj3W4 button.dCJp8.afkep'));
    for (const c of b) d(c, t);
}
function d(c, t) {
    const e = c.cloneNode(true);
    c.parentNode.replaceChild(e, c);
    e.onclick = (e) => { f(e, t); }
}
function f(e, t) {
    const g = ct(t, e.currentTarget.parentNode.parentNode, e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
    const h = g.querySelector(ct(t, 'a.kIKUG', 'a.kIKUG'));
    const i = { images: [...g.querySelectorAll(ct(t, 'img.FFVAD', 'img.y-yJ5'))].map(j => j.src), videos: [...g.querySelectorAll(ct(t, 'video.tWeCl', 'video.y-yJ5'))].map(j => j.src === '' ? j.childNodes[0].src : j.src), url: h ? h.href : null, type: ct(t, 'instagram-post', 'instagram-story') };
    window.ReactNativeWebView.postMessage(JSON.stringify(i));
}
window.addEventListener('load', () => {
    setInterval(() => { a('post'); a('story'); }, 1000);
});
`
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: 'https://www.instagram.com' }}
                    injectedJavaScript={script}
                    style={Object.assign(defaultStyle, this.props.style)}
                    onMessage={event => downloadFile(event.nativeEvent.data)}
                />
            </View>
        );
    }
}
import React, { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

export interface Props {
    style?: StyleProp<ViewStyle>
}

export default class playground extends Component<Props>{
    render() {
        const defaultStyle: StyleProp<ViewStyle> = { marginTop: 20 }
        return (
            <WebView
                source={{ uri: 'https://www.instagram.com' }}
                onError={event => alert(`Webview ERROR ${event.nativeEvent.description}`)}
                injectedJavaScript={'console.log("Hello")'}
                style={Object.assign(defaultStyle, this.props.style)}
            />
        );
    }
}
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WebView_Component from './src/screens/sample';

export default class App extends Component {
    render() {
        return (
            <WebView_Component style={{ marginTop: 30 }} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
    webview: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
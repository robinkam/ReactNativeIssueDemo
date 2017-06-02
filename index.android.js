/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import NativeModuleUnresponsiveDemo from './js/NativeModuleUnresponsive/index';

export default class ReactNativeIssueDemo extends Component {
  render() {
    return (
      <NativeModuleUnresponsiveDemo/>
    );
  }
}

AppRegistry.registerComponent('ReactNativeIssueDemo', () => ReactNativeIssueDemo);

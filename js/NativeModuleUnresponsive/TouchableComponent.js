import React, {PureComponent} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import BaseComponent from './BaseComponent'

const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class TouchableComponent extends BaseComponent {
	renderBody() {
		const {calculatedHeight} = this.props;
		const height = calculatedHeight && {height:calculatedHeight};
		return (
			<TouchableWithoutFeedback onPress={()=>{
				RCTDeviceEventEmitter.emit('card_action', {action_type:0});
			}}>
				<View style={[styles.border, height]}>
					{this.renderContent()}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	renderContent(){
		return null; //should be overridden by subclasses
	}
}

const styles = StyleSheet.create({
	border: {
		borderWidth:1
	}
});
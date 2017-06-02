import React, {Component, PureComponent} from 'react';
import {Platform, View, Text, ActivityIndicator, ProgressBarAndroid, ActivityIndicatorIOS} from 'react-native';

export default class RefreshControl extends PureComponent {
	_renderActivityIndicator() {
		const commonProps = {
			style: {marginRight: 10,},
			color: 'green',
			styleAttr: 'Small',
		};
		return ActivityIndicator ? (
			<ActivityIndicator animating={true} {...commonProps} />
		) : Platform.OS == 'android' ? (
			<ProgressBarAndroid {...commonProps} />
		) : (
			<ActivityIndicatorIOS animating={true} {...commonProps} />
		)
	}
	render(){
		return (
			<View style={{
				height: 60,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'transparent',
			}}>
				{this.props.animated && this._renderActivityIndicator()}
				<Text style={{color:'green'}}>{this.props.title}</Text>
			</View>
		)
	}
}
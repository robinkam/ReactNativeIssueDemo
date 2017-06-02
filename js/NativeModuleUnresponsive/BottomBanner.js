import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';

import BaseComponent from './BaseComponent'
import Block from './Block';

export default class BottomBanner extends BaseComponent {
	getName(){
		return "BottomBanner"
	}
	render() {
		const { blocks} = this.props;
		return (
			<View style={[this.props.style]}>
				{ blocks && blocks.map((block, i)=>{ return <Block key={i} {...block}/> }) }
			</View>
		)
	}
}

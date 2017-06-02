import React, {PureComponent} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import BaseComponent from './BaseComponent'

export default class Mark extends BaseComponent {
	renderBody() {
		return (
			<View style={this.props.style}>
				{this._renderMarker()}
			</View>
		);
	}
	_renderMarker(){
		const { t, t_color, img, w, h,} = this.props;

		if(t){
			const textStyle = t_color ? [styles.text, {color:t_color}] : styles.text;
			return <Text style={textStyle}>{t}</Text>
		}else if(img){
			const source = {uri:'https://cdn-images-1.medium.com/letterbox/36/36/50/50/1*lKN9xV1YEin-2wfAiGySBA.png'};
			return <Image source={source} style={{width:w, height:h}}/>;
		}else{
			return null;
		}
	}
}

const styles = StyleSheet.create({
	text:{color:'white', fontSize:10, padding: 5, backgroundColor: 'rgba(0, 0, 0, 0.5)'}
});
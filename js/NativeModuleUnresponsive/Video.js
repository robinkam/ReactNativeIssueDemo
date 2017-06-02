import React from 'react'
import {StyleSheet, View, requireNativeComponent} from 'react-native';
import StyleManager from "./StyleManager";
import Image from './Image';
import Button from './Button';
import TouchableComponent from './TouchableComponent';

export default class Video extends TouchableComponent {
	renderContent() {
		const {
			images, 
			buttons, 
		} = this.props;
		return (
			<View style={this.props.style}>
				<View style={styles.margin}>
					{images && images.length>0 && <Image {...images[0]} style={styles.image}/>}
					{buttons && buttons.length>0 && <Button {...buttons[0]}/>}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	video:{margin:10},
	image:{width:StyleManager.ScreenWidth-20, height:(StyleManager.ScreenWidth-20)/16*9}
});
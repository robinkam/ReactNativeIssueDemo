import React, {PureComponent} from 'react'
import {View, Image, Platform, StyleSheet} from 'react-native'
import TouchableComponent from './TouchableComponent'
import Mark from './Mark'
import StyleManager from './StyleManager'

export default class CardImage extends TouchableComponent {
	renderContent() {
		const { marks, width, url} = this.props;
		const source = {uri: "http://blog.techbridge.cc/img/kdchang/react-native-logo.png"};
		let height = 0;
		if(width==StyleManager.ScreenWidth){
			height = width/4*3;
		}else{
			height = width/3*4;
		}
		const imageSize = {width, height};
		const imageBoxSize = {width:width+styles.imageMargin.margin*2, height:height+styles.imageMargin.margin*2};
		return (
			<View style={imageBoxSize}>
				<View style={styles.imageMargin}>
					<Image style={imageSize} source={source}/>
					{marks && marks.lu_mark && <Mark style={styles.luMark} {...marks.lu_mark}/>}
					{marks && marks.ld_mark && <Mark style={styles.ldMark} {...marks.ld_mark}/>}
					{marks && marks.ru_mark && <Mark style={styles.ruMark} {...marks.ru_mark}/>}
					{marks && marks.rd_mark && <Mark style={styles.rdMark} {...marks.rd_mark}/>}
					{marks && marks.bt_mark && <Mark style={styles.btMark} {...marks.bt_mark}/>}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	imageMargin:{margin:0},
	luMark:{position:'absolute', left:0, top:0},
	ldMark:{position:'absolute', left:0, bottom:0},
	ruMark:{position:'absolute', right:0, top:0},
	rdMark:{position:'absolute', right:0, bottom:0},
	btMark:{position:'absolute', bottom:0, flex:1},
});
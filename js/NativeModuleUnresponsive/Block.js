import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import TouchableComponent from './TouchableComponent';
import Image from './Image'
import Meta from './Meta'
import Button from './Button'
import Video from './Video'

export default class Block extends TouchableComponent {
	// getName(){
	// 	return "Block";
	// }
	renderContent() {
		const {blockId, images, metas, buttons, videos, width} = this.props;
		return (
			<View style={this.props.style}>
				{images && images.map((item, i)=>{return <Image key={i} {...item} width={width}/>})}
				{metas && metas.map((item, i)=>{return <Meta key={i} {...item} width={width}/>}) }
				{buttons && buttons.map((item, i)=>{return <Button key={i} {...item} width={width}/>}) }
				{videos && videos.map((item, i)=>{return <Video key={i} {...item} width={width}/>}) }
			</View>
		);
	}
}
import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import TouchableComponent from './TouchableComponent'
import Span from './Span';

export default class Meta extends TouchableComponent {
	renderContent() {
		const {
			text, 
			icon_url, 
			icon_pos=0, 
			spans, 
			actions, 
		} = this.props;
		const alignItems = !!icon_url && (icon_pos==0 || icon_pos==1) ? {alignItems:'center'} : {}; 
		return (
			<View style={[this.props.style, styles.meta, alignItems]}>
				{ !!icon_url && icon_pos==0 && <Image source={{uri:icon_url}} style={styles.icon}/> }
				{ this._renderText(spans, text) }
				{ !!icon_url && icon_pos==1 && <Image source={{uri:icon_url}} style={styles.icon}/> }
			</View>
		)
	}

	_renderText(spans, text) {
		if(spans && spans.length>0){
			return spans.map((span, i)=>{
				return <Span key={i} {...span}/>
			})
		}else if(text){
			return <Text>{text}</Text>;
		}else{
			return null;
		}
	}
}

const styles = StyleSheet.create({
	icon:{width:15, height:15},
	meta: {flexDirection:'row', overflow:'hidden', backgroundColor:'transparent'}
});

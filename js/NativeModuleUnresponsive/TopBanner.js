import React from 'react'
import {StyleSheet, View} from 'react-native';

import BaseComponent from "./BaseComponent";
import Block from './Block';

export default class TopBanner extends BaseComponent {
	renderBlocks(blocks){
		return blocks && blocks.map((block, index)=>{
			const style = blocks==this.props.m_blocks ? {flex:1, justifyContent:'center', alignItems:'center'} : {flex:0};
			return <Block style={style} key={index} {...block}/>
		})
	}
	renderBody(){
		const {
			l_blocks, 
			m_blocks, 
			r_blocks, 
		} = this.props;
		return (
			<View style={styles.banner}>
				{this.renderBlocks(l_blocks)}
				{this.renderBlocks(m_blocks)}
				{this.renderBlocks(r_blocks)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	banner:{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}
});
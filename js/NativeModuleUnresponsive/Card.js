import React, {PureComponent} from 'react'
import {StyleSheet, View, ScrollView, Text} from 'react-native'

import BaseComponent from './BaseComponent'
import TopBanner from './TopBanner'
import BottomBanner from './BottomBanner'
import Block from './Block';
import StyleManager from './StyleManager'

export default class Card extends BaseComponent {
	// getName(){
	// 	return "Card";
	// }
	renderBody(){
		const {
			card_class,
			top_banner,
			bottom_banner,
		} = this.props;

		const layout = StyleManager.getInstance().layouts[card_class];

		return (
			<View style={styles.fullWidth}>
				{!!top_banner && <TopBanner {...top_banner}/>}
				<View>
					{this._renderRows()}
				</View>
				{!!bottom_banner && <BottomBanner {...bottom_banner}/>}
			</View>
		)
	}

	_renderRows(){
		const { card_type, card_class, blocks } = this.props;
		if(!blocks){
			return null;
		}
		let blocksToRender = blocks;
		const layout = StyleManager.getInstance().layouts[card_class];
		let currentPos = 0, output = [];
		layout.rows.forEach((row, i)=>{
			const {
				block_count, 
				ratio,	
				row_margin_style, 
				block_gap_style, 
				repeat, 
			} = row;
			const showNumberOfBlocks = blocksToRender.length;
			do{
				const start = currentPos;
				const numberOfBlocksInTheRow = block_count=='N' ? showNumberOfBlocks : parseInt(block_count);
				currentPos += numberOfBlocksInTheRow;
				const blocksInTheRow = blocksToRender.slice(start, currentPos);
				if(block_count=='N' && repeat!='true' && card_type!=6){
					output.push(
						<View key={row_margin_style+' : '+start}>
							<ScrollView horizontal={true} style={[{flex:1}, rowMarginStyle]}>
								{this._renderBlocks(blocksInTheRow, ratio)}
							</ScrollView>
						</View>
					);
				}else{
					output.push(
						<View key={row_margin_style+' : '+start} style={{flexDirection:'row'}}>
							{this._renderBlocks(blocksInTheRow, ratio)}
						</View>
					);
				}
			}while(repeat=='true' && currentPos<showNumberOfBlocks);
		});
		return output;
	}
	_renderBlocks(blocks, ratio){
		const flexWidthList = ratio && ratio.split(':');
		const screenWidth = this.props.width || StyleManager.ScreenWidth;
		return blocks.reduce((result, block, i)=>{
			let flexWidth = flexWidthList && flexWidthList.length>i ? parseInt(flexWidthList[i]) : 100;
			if(flexWidth==33){
				flexWidth = 100/3;
			}
			const width = Math.floor(screenWidth * flexWidth/100);
			const style = blocks.length==1 ? {flex:1} : (flexWidth==100 ? {} : {width});
			result.push(<Block width={width} key={i} style={style} {...block}/>);
			if(i<blocks.length-1){
				result.push(<View style={{width:5}} key={'gap'+i}/>);
			}
			return result;
		}, [])
	}
}

const styles = StyleSheet.create({
	fullWidth:{flex:1}
});
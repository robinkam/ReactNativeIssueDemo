import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, AppRegistry} from 'react-native'

export default class InteractionConflict extends Component {
	static propTypes = {};

	constructor(props) {
		super(props);
		this.state = {
			count:0
		}
	}

	render() {
		return (
			<View style={styles.containerView}>
				<TouchableOpacity onPress={()=>{this.setState({count:this.state.count+1})}}>
					<View style={[styles.containerView, styles.touchableView]}>
						<Text>{this.state.count}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	containerView:{alignItems:'center', justifyContent:'center'},
	touchableView:{width:100, height:100, backgroundColor:'yellow'},
});

AppRegistry.registerComponent('InteractionConflict', () => InteractionConflict);

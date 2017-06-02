import React, {PureComponent} from 'react'
import {StyleSheet, View, Text} from 'react-native'

export default class BaseComponent extends PureComponent {
	render() {
		return (
			<View style={styles.fullWidth}>
				{this.getName() && <Text>{this.getName()}</Text>}
				{this.renderBody()}
			</View>
		);
	}

	getName(){
		return null; //should be overridden by subclasses.
	}

	renderBody(){
		return null;  //should be overridden by subclasses.
	}
}

const styles = StyleSheet.create({
	fullWidth:{flex:1}
});
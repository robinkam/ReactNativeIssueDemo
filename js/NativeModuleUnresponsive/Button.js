import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import TouchableComponent from './TouchableComponent';

export default class Button extends TouchableComponent {
	renderContent() {
		const {icon_url, text} = this.props;
		return (
			<View>
				{ !!icon_url && (
					<View>
						<Image style={styles.image} source={{uri: icon_url}}/>
					</View>
				) }
				{ !!text && <Text>{text}</Text>}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	image:{width:15, height:15}
});
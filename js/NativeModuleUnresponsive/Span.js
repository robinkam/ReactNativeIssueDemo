import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import BaseComponent from "./BaseComponent";

export default class Span extends BaseComponent {
	renderBody() {
		const {
			content,
			content_type, 
		} = this.props;
		switch (content_type) {
			case '0': return <Text numberOfLines={1}>{content}</Text>;
			case '1': return <Image style={styles.image} source={{uri:content}}/>;
			case '2': return <Text>[emoji]</Text>;
			case '3': return <Image style={styles.image} source={{uri:content}}/>;
			default: return null;
		}
	}
}

const styles = StyleSheet.create({
	image:{width:15, height:15}
});
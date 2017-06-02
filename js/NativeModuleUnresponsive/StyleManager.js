import {Dimensions, PixelRatio} from 'react-native';
import layoutData from './sample-data/layout'

export default class StyleManager {
	static ScreenWidth = Dimensions.get('window').width;
	static ScreenHeight = Dimensions.get('window').height;
	static ScreenScale = Dimensions.get('window').scale;

	static getInstance() {
		if (!StyleManager.instance) {
			StyleManager.instance = new StyleManager();
			StyleManager.instance.init();
		}
		return StyleManager.instance;
	}

	init(){
		this.layouts = layoutData.layouts;
		return this;
	}
}

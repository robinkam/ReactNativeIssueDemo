import React, {Component, PropTypes} from 'react'
import {
	AppRegistry,
	Platform,
	StyleSheet,
	ListView,
	View,
	Text,
	TouchableWithoutFeedback,
	InteractionManager,
	NativeModules
} from 'react-native'
import Card from './Card'
import CardService from "./CardService"
import RefreshControl from './RefreshControl'

// import Perf from 'react-addons-perf'
import Perf from 'ReactPerf'

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var NativeModule = NativeModules.NativeModule;

let loadMoreMeasurements = [];

export default class Page extends Component {
	constructor(props){
		super(props);
		this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			disableRefresh: false,
			hasNext: true,
			isEndReached: false,
			titleBar: null,
			cards:[],
			error:null,
		};
	}

	componentDidMount(){
		this._addEventListener();
		this._onRefresh();
	}

	componentDidUpdate(){
		console.log('Page did update');
	}

	componentWillUnmount(){
		this._removeEventListener();
	}

	render(){
		const dataSource = this._ds.cloneWithRows(this.state.cards || []);

		return  (
			<ListView ref={(component)=>{this._listView = component;}}
			          stickyHeaderIndices={[]}
			          enableEmptySections={true}
			          removeClippedSubviews={true}
			          dataSource={dataSource}
			          renderRow={(rowData, sectionID, rowID, highlightRow)=>this._renderRow(rowData, sectionID, rowID, highlightRow)}
			          renderFooter={()=>{return this._renderLoadMore()}}
			          onEndReached={() => { this._onLoadMore() }}
			          onEndReachedThreshold={1200}
			          initialListSize={1}
			          pageSize={1}
			          scrollRenderAheadDistance={1200}
			/>
		)
	}

	_startPerf(){
		console.log('Perf.start()');
		Perf.start();
	}

	_stopPerf(){
		console.log('Perf.stop()');
		Perf.stop();
		const measurements = Perf.getLastMeasurements();
		var stats = Perf.getInclusive();
		var table = stats.filter(item => {
			return /> (Card|FakeCard)$/.test(item.key);
		}).map((item)=>{
			var {key, instanceCount, inclusiveRenderDuration, renderCount} = item;
			return {
				'Owner > Component': key,
				'Avg. render time (ms)': inclusiveRenderDuration/renderCount,
				'Inclusive render time (ms)': inclusiveRenderDuration,
				'Instance count': instanceCount,
				'Render count': renderCount,
			};
		});
		// Perf.printInclusive(measurements);
		// Perf.printWasted(measurements);
		// console.table(table);
		// this._printLoadMoreMeasurement();
	}

	_renderRow(rowData, sectionID, rowID, highlightRow) {
		rowData.sectionID = sectionID;
		rowData.rowID = rowID;
		return <Card key={rowData.cardId} {...rowData}/>;
	}

	_renderLoadMore(){
		if(this.state.cards.length>0){
			if(this.state.hasNext){
				return ( <RefreshControl animated title={"loading..."}/> );
			}else{
				return ( <RefreshControl title={"No more content"}/> );
			}
		}else{
			return null;
		}
	}

	_onRefresh () {
		if(!this._isRefreshing){
			this._isRefreshing = true;
			CardService.loadPage().then((response)=>{
				if(__DEV__){
					this._startPerf();
				}
				this._isRefreshing = false;
				console.log('Refresh succeeded with '+response.cards.length+' cards');
				const cards = this._refreshUrl ? response.cards.concat(this.state.cards) : response.cards;
				this._updateState(response, cards);
			}).catch((error)=>{
				this._isRefreshing = false;
				console.warn('Refresh failed', error);
			});
		}
	};

	_onLoadMore () {
		if(!this._isLoading && this.state.cards.length>0){
			this._isLoading = true;
			const beginTimestamp = Date.now();
			CardService.loadMore().then((response)=>{
				loadMoreMeasurements.push(Date.now() - beginTimestamp);
				this._isLoading = false;
				console.log('LoadMore succeeded with '+response.cards.length+' cards');
				this._updateState(response, this.state.cards.concat(response.cards));
			}).catch((error)=>{
				this._isLoading = false;
				console.warn('LoadMore failed', error);
			});
		}
	};

	_updateState(response, cards){
		if(response.code==0 && response.base){
			const {disable_refresh, has_next, next_url, title_bar} = response.base;
			if(!has_next){
				this._printLoadMoreMeasurement();
			}
			this.setState({
				disableRefresh:disable_refresh==1,
				hasNext:has_next==1,
				isEndReached: false,
				titleBar:title_bar,
				cards:cards,
				error:null,
			});
			this._nextUrl = next_url;
		}else{
			this.setState({error:response.errorReason});
		}
	}

	_printLoadMoreMeasurement(){
		const totalMillisecondsSpent = loadMoreMeasurements.reduce((result, millisecondsSpent)=>{
			result += millisecondsSpent;
			return result;
		}, 0);
		console.log('★★★★★ Avg. time spent by load more (ms)', loadMoreMeasurements.length && totalMillisecondsSpent/loadMoreMeasurements.length);
	}

	_cardActionHandler(action){
		if(__DEV__){
			this._stopPerf();
		}

		if(NativeModule && typeof NativeModule.handleEvent === 'function'){
			console.log("NativeModule.handleEvent(action)");
			NativeModule.handleEvent(action);
		}
	}

	_addEventListener(){
		RCTDeviceEventEmitter.addListener('card_action', this._cardActionHandler.bind(this));
	}

	_removeEventListener(){
		RCTDeviceEventEmitter.removeAllListeners('card_action');
	}
}
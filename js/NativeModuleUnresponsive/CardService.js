import { Platform, NativeModules } from 'react-native';

var NativeModule = NativeModules.NativeModule;

const pages = [
	require('./sample-data/page0'),
	require('./sample-data/page1'),
	require('./sample-data/page2'),
	require('./sample-data/page3'),
	require('./sample-data/page4'),
	require('./sample-data/page5'),
	require('./sample-data/page6'),
	require('./sample-data/page7'),
];

let currentPageNumber = 0;

const ignoredProperties = ['page_t', 'page_st', 'page_name', 'layout_files', 'statistics', 'internal_attrs', 'exp_time',
	'next_url', 'latest_layouts', 'actions', 'kv_pair', 'lang_map', 'play_control', 'alias_name', 'req_sn'];

export default class CardService {
	static loadPage(pageNumber) {
		currentPageNumber = pageNumber || 0;
		if (currentPageNumber >= pages.length){
			return Promise.resolve({base:{has_next:0}, cards:[]});
		}
		if (NativeModule && typeof NativeModule.loadData === 'function') {
			console.log('NativeModule.loadData() with URL: ');
			return NativeModule.loadData("http://mock.data/?pn="+currentPageNumber).then((response)=> {
				const pageData = pages[currentPageNumber];
				// const pageData = this.getTransformedData(pages[currentPageNumber]);
				// console.log(JSON.stringify(pageData));
				currentPageNumber++;
				return Promise.resolve(pageData);
			}, (error)=> {
				console.warn(error);
				return Promise.reject(error);
			})
		}else{
			return Promise.reject("loadPage failed");
		}
	}
	static loadMore(){
		return this.loadPage(currentPageNumber+1);
	}

	static getTransformedData(data){
		if(Array.isArray(data)){
			return data.map((item)=>{return this.getTransformedData(item)})
		}else if(typeof data === 'object'){
			return Object.keys(data).filter((key)=>{
				return ignoredProperties.indexOf(key)<=0
			}).reduce((result, key)=>{
				const value = data[key];
				if(Array.isArray(value) || typeof value === 'object'){
					result[key] = this.getTransformedData(value);
				}else if(typeof value === 'string'){
					var urlRegex = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
					var chineseRegex = /[\u4e00-\u9fa5]/g;
					result[key] = value.replace(chineseRegex, 'X').replace(urlRegex, '')
				}else{
					result[key] = value;
				}
				return result;
			}, {});
		}
	}
}
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Dimensions, Image, Text, View, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
var MODELS_PER_ROW = 2;
var models = [
	{
		name:'Model 1',
		path:require('./../assets/images/icon.png'),
	},{
		name:'Model 1',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 1',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 1',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 1',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 1',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 1',
		path:require('./../assets/images/icon.png')

	},
]

export default function ModelsScreen() {
  return (
    <ScrollView style={styles.container}>
		{renderRows(models)}
    </ScrollView>
  );
}

function calculatedSize(){
	var size = windowWidth / MODELS_PER_ROW
	return {width: size, height: size}
}

function scale(){
	return {transform:[{scale:0.9}]}
}

function renderRow(models){
	return models.map((model,i)=>{
		console.log(model);
		return (
			<TouchableOpacity key={i} style={[styles.modelButton]} activeOpacity={0.6}>
				<Image source={model.path} style={[styles.modelImage, calculatedSize(), scale()]}></Image>
				{/* <Text style={styles.modelTitle}>{model.name}</Text> */}
			</TouchableOpacity>
		)
	});
}

function renderRows(models) {

	let rows = []
	for(let i=0;i<models.length;i+=2){
		let modelsForRow = [models[i]];
		if (models[i+1] != undefined) modelsForRow.push(models[i+1]);
		rows.push(
			<View style={styles.row} key={i}>
				{renderRow(modelsForRow)}
			</View>
		)
	}
	return rows;
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	flexDirection:'column',
    backgroundColor: 'black',
  },
  row:{
	flexDirection:'row',
  },
  modelButton:{
	backgroundColor:"#111111",
	paddingBottom:10,
  },
  modelTitle:{
	color:'rgb(1,170,250)',
	fontSize:20,
	fontWeight:'bold',
	textAlign:'center'
  },
  modelImage:{
	opacity:0.4,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

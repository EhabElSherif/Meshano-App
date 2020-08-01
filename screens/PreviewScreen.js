import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Dimensions, Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
var IMAGES_PER_ROW = 4;
var images = [
	{
		name:'Model 1',
		path:require('./../assets/images/icon.png'),
	},{
		name:'Model 2',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 3',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 4',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 5',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 6',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 7',
		path:require('./../assets/images/icon.png')

	},{
		name:'Model 7',
		path:require('./../assets/images/icon.png')

	},
]

function acceptedNumber(imagesCount){
	if (imagesCount >= 10){
		return {backgroundColor:"seagreen",color:"#3d3d3d"}
	}else{
		return {backgroundColor:"crimson",color:"#cccccc"}
	}
}
export default function ModelsScreen(props) {
  	return (
		<View style={styles.container}>
				<ScrollView>
					{renderRows(images)}
				</ScrollView>
				<Text style={[styles.imagesCount, acceptedNumber(images.length)]}>{images.length}/10</Text>	
				<TouchableOpacity style={[styles.submitButton]} activeOpacity={0.8}>
					<Ionicons style={styles.submitButtonIcon} name="md-checkmark"></Ionicons>
				</TouchableOpacity>
		</View>
  	);
}

function calculatedSize(){
	var size = windowWidth / IMAGES_PER_ROW
	return {width: size, height: size}
}

function scale(){
	return {transform:[{scale:0.9}]}
}

function renderRow(images){
	return images.map((model,i)=>{
		return (
			<Image key={i} source={model.path} style={[styles.imageElement, calculatedSize(), scale()]}></Image>
		)
	});
}
function renderRows(images) {

	let numberOfRows = Math.floor(images.length / IMAGES_PER_ROW);
	let rows = []
	for (let i = 0; i < numberOfRows; i++) {
		let modelsForRow = images.slice(i*IMAGES_PER_ROW,IMAGES_PER_ROW*(i+1))
		rows.push(
			<View style={styles.row} key={i}>
				{renderRow(modelsForRow)}
			</View>
		)
	}

	if(images.length%IMAGES_PER_ROW != 0){
		let modelsForRow = images.slice(numberOfRows*IMAGES_PER_ROW,images.length)
		rows.push(
			<View style={styles.row} key={numberOfRows*IMAGES_PER_ROW}>
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
		backgroundColor: '#111111',
	},
	row:{
		flexDirection:'row',
	},
	modelButton:{
		backgroundColor:"#33333355",
		paddingBottom:10,
	},
	modelTitle:{
		color:'rgb(1,170,250)',
		fontSize:30,
		fontWeight:'bold',
		textAlign:'center'
	},
	imageElement:{
		opacity:1,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:"#FFFFFF55",
	},
	imagesCount:{
		position:'absolute',
		top:"85%",
		fontSize:15,
		width:50,
		height:40,
		fontWeight:"bold",
		borderRadius:100,
		alignSelf:"center",
		textAlign:"center",
		textAlignVertical:"center",
		opacity:0.5,
	},
	submitButton:{
		position:'absolute',
		top:"85%",
		right:20,
		width:50,
		height:50,
		alignSelf:"flex-end",
		alignItems:"center",
		justifyContent:"center",
		borderRadius:100,
		backgroundColor:"rgb(1,175,250)",
	},
	submitButtonIcon:{
		fontSize:25,
		fontWeight:'900',
		color:"#111111",
	},
});

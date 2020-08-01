import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Button, Dimensions, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

function acceptedNumber(imagesCount){
	if (imagesCount >= 10){
		return {backgroundColor:"seagreen"}
	}else{
		return {backgroundColor:"crimson"}
	}
}

export default function CameraScreen({navigation}) {
	const [camera, setCamera] = useState({
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
	});
	const isFocused = useIsFocused();
	const [cameraRef, setCameraRef] = useState(null);
	const [recording, setRecording] = useState(false)
	const [audio, setAudio] = useState(true)
	const [capturedImages, addImage] = useState(Array(0))

	useEffect(()=>{
		if(!isFocused)
			addImage(Array(0))
	},[])

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setCamera(prevState => ({ ...prevState, hasCameraPermission: status === 'granted'}));
		})();
	},[]);
	
	useEffect(() => {
		(async () => {
			const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
			setAudio(prevState => ({ ...prevState, audio: status === 'granted'}));
		})();
	}, []);
	
	if (camera.hasCameraPermission === null) {
		return <View />;
	} else if (camera.hasCameraPermission === false) {
		return <Text>No access to camera</Text>;
	} else {
		return (
			<View style={styles.cameraContainer}>
				{isFocused ? 
					<View style={{position:'relative',flex:1}}>
						<Camera style={styles.cameraComponent} type={camera.type} ref={ref => {setCameraRef(ref) ;}}></Camera>
						<TouchableOpacity style={styles.reverseButton}
							activeOpacity={0.8}
							onPress={() => {
								setCamera({
									type: camera.type === Camera.Constants.Type.back ? 
										Camera.Constants.Type.front
										:
										Camera.Constants.Type.back
									});
								}}>
							<Ionicons style={{fontSize:30,color:"white"}} name="md-reverse-camera" ></Ionicons>
						</TouchableOpacity>
						<View style={styles.previewButton}>
							<Image style={styles.previewButtonImage} resizeMode="stretch" resizeMethod="resize" source={require('./../assets/images/icon.png')}></Image>
							<Text style={[styles.previewButtonText, acceptedNumber(capturedImages.length)]}>{capturedImages.length}/10</Text>
						</View>
						<TouchableOpacity style={styles.captureButton} activeOpacity={0.6}
							onPress={() => {
								const { uri, width, height, exif, base64 } = cameraRef.takePictureAsync({
									'quality':0,
									'exif':true,
								})
								const codec = 'jpg'
								const type = `image/${codec}`;
								
								// const data = new FormData();
								// data.append("image",{
								// 	name: "mobile-image-upload",
								// 	type,
								// 	uri
								// });
								// try {
								// 	await fetch("http://192.168.43.36:5000/sendimages", {
								// 		method: "post",
								// 		headers:{
								// 			Accept: 'application/json',
								// 			'Content-Type': 'multipart/form-data'
								// 		},
								// 		body: data
								// 	}).then(response=>
								// 		response.json()
								// 	).then(responseJSON=>
								// 		console.log(responseJSON['message'])
								// 	).catch(error => {
								// 		console.error(error);
								// 	});
								// } catch (e) {
								// 	console.error(e);
								// }
								let newImage = uri;
								
								addImage(capturedImages.concat([newImage]))

								// if(!recording){
								// 	setRecording(true)
								// 	const { uri, codec = "mp4" } = await cameraRef.recordAsync({
								// 		'quality':'480p',
								// 		'mute':true
								// 	});
								// 	const type = `video/${codec}`;

								// 	const data = new FormData();
								// 	data.append("video",{
								// 		name: "mobile-video-upload",
								// 		type,
								// 		uri
								// 	});
								// 	console.log(data)
								// 	try {
								// 		await fetch("http://192.168.43.36:5000/sendvideo", {
								// 			method: "post",
								// 			headers:{
								// 				Accept: 'application/json',
								// 				'Content-Type': 'multipart/form-data'
								// 			},
								// 			body: data
								// 		}).then(response=>
								// 			response.json()
								// 		).then(responseJSON=>
								// 			console.log(responseJSON['message'])
								// 		).catch(error => {
								// 			console.error(error);
								// 		});
								// 	} catch (e) {
								// 		console.error(e);
								// 	}
								// } else {
								// 	setRecording(false)
								// 	cameraRef.stopRecording()
								// }
							}}
						>
						<Ionicons style={{fontSize:30,color:"rgb(1,175,250)"}} name="md-camera"></Ionicons>
						</TouchableOpacity>
					</View>
				:	
				<ActivityIndicator style={{alignSelf:"center",flex:1,backgroundColor:"#111111",width:"100%"}} size="large" color="rgb(1,175,250)"></ActivityIndicator>
				}
			</View>
		);
	}  
}
const styles = StyleSheet.create({
	s:{
		position:'absolute',
		width:25,
		height:25,
		backgroundColor:"red",
	},
	cameraContainer:{
		flex: 1 ,
		position:'relative',
		backgroundColor:"#111111"

	},
	cameraComponent:{
		width:'100%',
		height:'100%',
		backgroundColor:"#111111"
	},
	reverseButton:{
		position:"absolute",
		top:25,
		left:Dimensions.get('window').width - 75,
		width:50,
		height:50,
		borderRadius:100,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'rgba(0,0,0,0.5)'
	},
	captureButton:{
		position:'absolute',
		top:"85%",
		justifyContent:"center",
		alignItems:"center",
		alignSelf:'center',
		width:60,
		height:60,
		borderRadius:100,
		borderWidth:2,
		borderColor:'rgb(255,255,255)',
		backgroundColor:'rgba(0,0,0,0.5)'
	},
	previewButton:{
		position:"absolute",
		top:"85%",
		left:"5%",
		width:70,
		height:70,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"#00000099",
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:"#FFFFFF55",
		borderRadius:15,
		overflow:"hidden",
	},
	previewButtonImage:{
		width:"100%",
		height:"100%",
		overflow:"hidden"
	},
	previewButtonText:{
		fontSize:15,
		marginTop:-20,
		color:"white",
		width:"100%",
		margin:0,
		textAlign:"center",
	}
})
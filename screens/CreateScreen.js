import * as React from 'react';
import { View, StyleSheet,PixelRatio } from 'react-native';
import Constants from 'expo-constants';
import CameraScreen from '../screens/CameraScreen';
import PreviewScreen from '../screens/PreviewScreen';

const INITIAL_ROUTE_NAME = 'Home';

export default class CreateScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
            <Stack.Navigator style={styles.container} initialRouteName={INITIAL_ROUTE_NAME}>
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Preview" component={PreviewScreen} />
            </Stack.Navigator>
        );
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:"#111111",
	},
	viewer:{
		width:"80%",
		height:"80%",
	}
});
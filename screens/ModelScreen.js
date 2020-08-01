import * as React from 'react';
import { View, StyleSheet,PixelRatio } from 'react-native';
import Constants from 'expo-constants';

import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import ExpoTHREE from 'expo-three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'
// import ExpoTHREE from 'expo-three';
import * as THREE from 'three'
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Color,
  Object3D,
  ImmediateRenderObject
} from 'three';
export default class ModelScreen extends React.Component {
	constructor(props) {
		super(props);
		let timeout;
		this.state= {
			loadingCompleted:true,
		}
	}

	componentDidMount(){
		THREE.suppressExpoWarnings(true)
		clearTimeout(this.timeout)
	}
	componentWillUnmount(){
		clearTimeout(this.timeout)
	}

	render() {
		return (
			<View style={styles.container}>
				<GLView
				style={styles.viewer}
				onContextCreate={async (gl: ExpoWebGLRenderingContext) => {
					const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
					const sceneColor = '#111111';
					const scale = PixelRatio.get();

					// Create a WebGLRenderer without a DOM element
					const renderer = new Renderer({ gl });
					renderer.capabilities.maxVertexUniforms = 52502;
					renderer.setSize(width/scale, height/scale);
					renderer.setPixelRatio(scale);
					renderer.setClearColor(sceneColor);

					const camera = new PerspectiveCamera(45, width / height, 1, 1000);
					camera.position.set(0, 2, 5);
					camera.lookAt(0,0,0);
			
					const scene = new Scene();
					scene.fog = new Fog(sceneColor, 1, 1000);
					// scene.add(new GridHelper(10, 10));

					const ambientLight = new AmbientLight(0x101010);
					scene.add(ambientLight);
			
					const pointLight = new PointLight(0xffffff, 2, 1000, 1);
					pointLight.position.set(0, 200, 200);
					scene.add(pointLight);
			
					const spotLight = new SpotLight(0xffffff, 0.5);
					spotLight.position.set(0, 500, 100);
					spotLight.lookAt(scene.position);
					scene.add(spotLight);
					var object = null;
					
					// let x = require('./thomas/thomas.obj')
					// console.log(x)
					// const objLoader = new THREE.ObjectLoader();
					// objLoader.load(
					// 	'./thomas/thomas.obj',
					// 	function(obj) {
					// 		object = obj
					// 		scene.add(object)
					// 	},
					// 	// called when loading is in progresses
					// 	function ( xhr ) {
					// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
					// 	},
					// 	// called when loading has errors
					// 	function ( error ) {
					// 		console.log(error );
					// 	}
					// )
					
					// const model = {
					// 	'thomas.obj': require('./../assets/models/thomas/thomas.obj'),
					// 	'thomas.mtl': require('./../assets/models/thomas/thomas.mtl'),
					// 	'thomas.png': require('./../assets/models/thomas/thomas.png'),
					// };
					// // Load model!
					// await ExpoTHREE.loadAsync(
					// 	[model['thomas.obj'], model['thomas.mtl']],
					// 	null,
					// 	name => model[name],
					// ).then((obj)=>{
					// 	// // Update size and position
					// 	// ExpoTHREE.utils.scaleLongestSideToSize(obj, 5);
					// 	// ExpoTHREE.utils.alignMesh(obj, { y: 1 });
					// 	// Smooth mesh
					// 	ExpoTHREE.utils.computeMeshNormals(obj.children[0]);
					// 	// Add the mesh to the scene
					// 	scene.add(obj.children[0]);
					// }).catch((error)=>{
					// 	console.log(error);
					// });
					
					console.log(scene.children.length)
					const cube = new IconMesh();
					scene.add(cube);
					object = cube;
					
					function update() {
						if (scene.children.length == 4)
							scene.children[3].rotateY(0.03);
					}
					
					// Setup an animation loop
					const render = () => {
						this.timeout = requestAnimationFrame(render);
						update();
						renderer.render(scene, camera);
						gl.endFrameEXP();
					};
					render();
				}}
				/>
			</View>
		);
	}
}

class IconMesh extends Mesh {
	constructor() {
	  super(
		new BoxBufferGeometry(1.0, 1.0, 1.0),
		new MeshStandardMaterial({
		  map: new TextureLoader().load(require('./../assets/images/icon.png')),
		  // color: 0xff0000
		})
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
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
          <Image
          source={require('../assets/images/icon.png')}
          style={styles.welcomeImage}
          />
          <Text style={styles.welcomeText}>
            Welcome to Meshano
          </Text>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
    backgroundColor:'#111111'
  },
  welcomeImage: {
    width: "50%",
    height: "50%",
    resizeMode: 'contain',
  },
  welcomeText:{
	color:'rgb(1,175,250)',
	fontSize:20,
	fontWeight:'bold'  
  },
});

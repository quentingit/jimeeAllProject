/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Platform, StatusBar, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/HeaderAction';
import JimeeButton from '../../components/JimeeButton';
import { LinearGradient } from 'expo-linear-gradient';

export default class BoostScreen extends React.Component {
  constructor(props){
    super(props);
    this.heart = 'md-heart-empty';
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <ScrollView style={styles.AndroidSafeArea}>
        <Header title="Boost" this={this}/>

        <View style={{padding: 15}}>
          <TouchableOpacity style={{width: '100%'}} activeOpacity = { 0.8 } onPress={ () => { this.heart == 'md-heart'?this.heart = 'md-heart-empty':this.heart = 'md-heart'; this.forceUpdate(); }}>
            <LinearGradient
            style = {{ paddingTop: 12, paddingBottom: 12, borderRadius: 12 }}
            colors={['#f58524', '#f92b7f']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            >
              <Text style={{color: '#fff', fontSize: 14, marginLeft: 20}}> Booster ma publication </Text>
              <Text style={{color: '#fff', fontSize: 32, marginLeft: 20}}> 1/1 </Text>
              <Ionicons name={this.heart} size={54} style={{color: '#fff', position: 'absolute', right: 20, top: 10}}/>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={{fontStyle: 'italic', color: '#bbb', fontSize: 14, marginTop: 15}}>Booster ma publication est une action qui envoi des likes a tes followers. Cela aide fortement tes followers a venir liker ta publication.</Text>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6, 
    borderColor: '#ccc',
    margin: 5,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  titre: {
    fontFamily: 'josefin',
    fontSize: 17,
    color: '#3e3f68',
    padding: 20
  },
  feed: {
    margin: 20,
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  }
});

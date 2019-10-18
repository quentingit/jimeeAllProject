/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Platform, StatusBar, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props);

  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <ScrollView style={styles.AndroidSafeArea}>
        <Header title="Action" this={this}/>

        <View style={{padding: 5, flexDirection: 'column' }}>
          <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{backgroundColor: '#b7143c', borderRadius: 15, height: 250, width: '48%'}}>
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate('HashtagsScreen')}}>
                <ImageBackground source={require('../assets/images/action3.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 15}}>
                  <View style={{padding: 10, borderRadius: 10}}>
                    <Text style={{color: '#fff', fontSize: 25, alignItems: 'center'}}>Hashtags</Text>
                    <View style={{borderTopWidth:1, width: '100%', borderColor: '#fff', marginTop: 5, marginBottom: 5}}></View>
                    <Text style={{color: '#fff'}}>Génère des Hashtags personnalisés</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
        
            <View style={{backgroundColor: '#e6a500', borderRadius: 15, height: 250, width: '48%'}}>
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate('BoostScreen')}}>
                <ImageBackground source={require('../assets/images/action2.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 15}}>
                <View style={{padding: 10, borderRadius: 10}}>
                  <Text style={{color: '#fff', fontSize: 25, alignItems: 'center'}}>Boost</Text>
                  <View style={{borderTopWidth:1, width: '100%', borderColor: '#fff', marginTop: 5, marginBottom: 5}}></View>
                  <Text style={{color: '#fff'}}>Boost ta dernière publication</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>

            <View style={{backgroundColor: '#46b0f0', borderRadius: 15, height: 250, width: '48%'}}>
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate('AnalyseScreen')}}>
                <ImageBackground source={require('../assets/images/action1.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 15}}>
                  <View style={{padding: 10, borderRadius: 10}}>
                    <Text style={{color: '#fff', fontSize: 25, alignItems: 'center'}}>Analyse</Text>
                    <View style={{borderTopWidth:1, width: '100%', borderColor: '#fff', marginTop: 5, marginBottom: 5}}></View>
                    <Text style={{color: '#fff'}}>Analyse des influenceurs</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor: '#f0a146', borderRadius: 15, height: 250, width: '48%'}}>
              <TouchableOpacity onPress={ () => { this.props.navigation.navigate('FakeScreen')}}>
                <ImageBackground source={require('../assets/images/action4.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 15}}>
                  <View style={{padding: 10, borderRadius: 10}}>
                    <Text style={{color: '#fff', fontSize: 25, alignItems: 'center'}}>Fake</Text>
                    <View style={{borderTopWidth:1, width: '100%', borderColor: '#fff', marginTop: 5, marginBottom: 5}}></View>
                    <Text style={{color: '#fff'}}>Analyse tes abonnées</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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

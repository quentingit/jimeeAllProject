/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Platform, StatusBar, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox, Button } from 'react-native-elements';
import Header from '../components/HeaderAction';
import SwitchSelector from 'react-native-switch-selector';
import { getSettings, getSettings2, setSettings, setSettings2 } from '../api';

export default class EditScreen extends React.Component {
  constructor(props){
    super(props);
    this.saveChecked = [ true ];
    console.log("getsettings: "+getSettings());
    this.initial = 0;
    if( getSettings() ) this.initial = (getSettings()-1);
    if(getSettings2()) this.saveChecked = getSettings2();

  }
  static navigationOptions = {
    header: null,
  };

  render() {
    return(
      <ScrollView style={styles.AndroidSafeArea}>
        <Header title="Editer" this={this}/>
        <View style={{marginTop: 0, }}>
          <Text style={styles.titre}>Ma Catégorie</Text>

          <View style={{padding: 20}}>
            <SwitchSelector 
              options={[{ label: 'Photo', value: '1' },{ label: 'Fitness', value: '2' },{ label: 'Food', value: '3' }]} 
              buttonColor='#f66445'
              initial={this.initial} 
              onPress={value => {this.mode = value; setSettings(value); console.log("value "+value); this.forceUpdate();}} />
          </View>

          <Text style={styles.titre}>Mes intérêts</Text>

          <View style={{padding: 20}}>
            <View style={{flexDirection: 'row', padding: 0}}>
              <View style={{width: '45%', height: 130, marginRight: 20}}>
                    <ImageBackground source={require('../assets/images/interet1.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 5}}>
                        <TouchableOpacity onPress={ () => {this.saveChecked[0]=!this.saveChecked[0];setSettings2(this.saveChecked);this.forceUpdate();}} style={{flex: 1, flexDirection: 'row'}}>
                          <CheckBox 
                          uncheckedColor='#f66445'
                          checkedColor='#f66445' 
                          checked={this.saveChecked[0]} 
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          size={20}
                          onPress={ () => {this.saveChecked[0]=!this.saveChecked[0]; setSettings2(this.saveChecked); this.forceUpdate();}}/>
                        </TouchableOpacity>
                    </ImageBackground>
              </View>

              <View style={{width: '45%', height: 130}}>
                    <ImageBackground source={require('../assets/images/interet2.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 5}}>
                        <TouchableOpacity onPress={ () => {this.saveChecked[1]=!this.saveChecked[1];setSettings2(this.saveChecked);this.forceUpdate();}} style={{flex: 1, flexDirection: 'row'}}>
                          <CheckBox 
                          uncheckedColor='#f66445'
                          checkedColor='#f66445' 
                          checked={this.saveChecked[1]} 
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          size={20}
                          onPress={ () => {this.saveChecked[1]=!this.saveChecked[1];setSettings2(this.saveChecked);this.forceUpdate();}}/>
                        </TouchableOpacity>
                    </ImageBackground>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{width: '45%', height: 130, marginRight: 20}}>
                    <ImageBackground source={require('../assets/images/interet3.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 5}}>
                        <TouchableOpacity onPress={ () => {this.saveChecked[2]=!this.saveChecked[2];setSettings2(this.saveChecked);this.forceUpdate();}} style={{flex: 1, flexDirection: 'row'}}>
                          <CheckBox 
                          uncheckedColor='#f66445'
                          checkedColor='#f66445' 
                          checked={this.saveChecked[2]} 
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          size={20}
                          onPress={ () => {this.saveChecked[2]=!this.saveChecked[2];setSettings2(this.saveChecked);this.forceUpdate();}}/>
                        </TouchableOpacity>
                    </ImageBackground>
              </View>

              <View style={{width: '45%', height: 130}}>
                    <ImageBackground source={require('../assets/images/interet4.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 5}}>
                        <TouchableOpacity onPress={ () => {this.saveChecked[3]=!this.saveChecked[3];setSettings2(this.saveChecked);this.forceUpdate();}} style={{flex: 1, flexDirection: 'row'}}>
                          <CheckBox 
                          uncheckedColor='#f66445'
                          checkedColor='#f66445' 
                          checked={this.saveChecked[3]} 
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          size={20}
                          onPress={ () => {this.saveChecked[3]=!this.saveChecked[3];setSettings2(this.saveChecked);this.forceUpdate();}}/>
                        </TouchableOpacity>
                    </ImageBackground>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{width: '45%', height: 130, marginRight: 20}}>
                    <ImageBackground source={require('../assets/images/interet5.png')} style={{width: '100%', height: '100%', opacity: 0.8}} imageStyle={{ borderRadius: 5}}>
                        <TouchableOpacity onPress={ () => {this.saveChecked[4]=!this.saveChecked[4];setSettings2(this.saveChecked);this.forceUpdate();}} style={{flex: 1, flexDirection: 'row'}}>
                          <CheckBox 
                          uncheckedColor='#f66445'
                          checkedColor='#f66445' 
                          checked={this.saveChecked[4]} 
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          size={20}
                          onPress={ () => {this.saveChecked[4]=!this.saveChecked[4];setSettings2(this.saveChecked);this.forceUpdate();}}/>
                        </TouchableOpacity>
                    </ImageBackground>
              </View>

            </View>

          </View>
        </View>

        <View style={{height: 200}}></View>
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
    height: 200,
    width: 200,
  },
  bloc: {
    width: 350,
    height: 120,
    color: '#fff',
  }
});

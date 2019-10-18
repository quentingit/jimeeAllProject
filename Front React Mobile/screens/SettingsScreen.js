/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpoConfigView } from '@expo/samples';
import { api } from '../api';
import { Button } from 'react-native-elements';
let pkg = require('../package.json');

export default class SettingsScreen extends React.Component {
  constructor(props){
    super(props);

  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <ScrollView>
        <View style={styles.AndroidSafeArea}>
          <View style={{marginTop: 35, alignItems: 'center', }}>
            <Ionicons name='ios-beer' size={42} color='#ddd'/>
            <Text>Fonctionnalité à venir prochainement.</Text>
          </View>
          <View>
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
});

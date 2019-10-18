/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Platform, StatusBar, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/HeaderAction';
import JimeeButton from '../../components/JimeeButton';

export default class FakeScreen extends React.Component {
  constructor(props){
    super(props);

  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <ScrollView style={styles.AndroidSafeArea}>
        <Header title="Fake" this={this}/>

        <View style={{padding: 15}}>
          <JimeeButton title='Connaitre mon score' onPress={() => { this.loading=1; this.forceUpdate(); setTimeout(() => {this.loading=2; this.forceUpdate();}, 1500); }}/>

          <Text style={{fontStyle: 'italic', color: '#bbb', fontSize: 14, marginTop: 5, marginBottom: 15}}>Permet de savoir combien de vos followers sont des vrais abonnés</Text>

          { this.loading==1 && 
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Image style={{height: 90, width: 90, alignItems: 'center'}} source={require('../../assets/images/load2.gif')} />
            </View>
          }
          { this.loading==2 && 
            <View style={{flexDirection: 'column', borderRadius: 15, height: 125, width: '100%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, justifyContent: 'center'}}>
             <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10, paddingBottom: 5 }}>
               <Ionicons name="md-stats" style={{color: "#fff"}} size={25} />
             </View>
             <Text style={{fontWeight: 'bold', fontSize: 36}}>78%</Text>
             <Text style={{fontSize: 10}}>Taux de vrais abonnés</Text>
           </View>
          }
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

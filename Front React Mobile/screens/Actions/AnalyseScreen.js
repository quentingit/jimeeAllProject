/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, TouchableOpacity, Platform, StatusBar, Image, ImageBackground, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/HeaderAction';
import JimeeButton from '../../components/JimeeButton';
import { LinearGradient } from 'expo-linear-gradient';

export default class AnalyseScreen extends React.Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <ScrollView style={styles.AndroidSafeArea}>
        <Header title="Analyse Profil" this={this}/>

        <View style={{padding: 15}}>

        <TextInput
            style={{borderRadius: 12, fontSize: 30, padding: 10, borderColor: '#ccc', borderWidth: 1, height: 70}}
            placeholder="Rechercher un profil"
            autoCapitalize = 'none'
            underlineColorAndroid = "transparent"
            //onChangeText={(text) => this.setState({text})}
            //ref={this.recherche}
          />
          <JimeeButton title="Rechercher" style={{position: 'absolute', top: 0, right: 17, width: 140}} onPress={ () => {  this.loading=1; this.forceUpdate(); setTimeout(() => {this.loading=2; this.forceUpdate();}, 1500); } } />


        { this.loading==1 && 
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <Image style={{height: 90, width: 90, alignItems: 'center'}} source={require('../../assets/images/load2.gif')} />
          </View>
        }
        { this.loading==2 && 
          <View style={{ 
            width: '100%',
            borderRadius: 12, 
            borderColor: '#aaa',
            borderWidth: 1,
            shadowRadius: 4, 
            shadowColor: '#000', 
            shadowOffset: {  width: 0,  height: 4,  }, 
            marginTop: 10,
            }}>
            <View style={{marginLeft: 25, marginTop: 25}}>
            <Image source={require('../../assets/images/Analysis1.png')} style={{borderRadius: 25}} />
              <Text style={{color: '#777', fontSize: 16}}>Larry Lachance</Text>
              <View style={{flex: 1, flexDirection: 'row', width: '50%', position: 'absolute', right: 10, top: 10}}>
                <View style={{alignItems: 'center', padding: 10}}>
                  <Text style={{fontSize: 28, fontWeight: 'bold'}}>4500</Text>
                  <Text style={{fontSize: 12 }}>followers</Text>
                </View>
                <View style={{alignItems: 'center', padding: 10}}>
                  <Text style={{fontSize: 28, fontWeight: 'bold'}}>627</Text>
                  <Text style={{fontSize: 12 }}>followings</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{margin: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 15, alignItems: 'center'}}>
                  <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10 }}>
                    <Ionicons name="md-heart" style={{color: "#fff"}} size={30} />
                  </View>
                  <Text style={{fontSize: 28, fontWeight: 'bold'}}>230</Text>
                  <Text style={{fontSize: 8}}>Likes reçus par posts</Text>
                </View>
                <View style={{margin: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 15, alignItems: 'center'}}>
                  <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10 }}>
                    <Ionicons name="md-chatboxes" style={{color: "#fff"}} size={30} />
                  </View>
                  <Text style={{fontSize: 28, fontWeight: 'bold'}}>22</Text>
                  <Text style={{fontSize: 8}}>Commentaires reçus par posts</Text>
                </View>
              </View>
            </View>
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

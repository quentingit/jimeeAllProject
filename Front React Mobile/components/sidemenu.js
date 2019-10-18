/* Nicolas BAPTISTA - V1.0 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, ToastAndroid, Image, Linking, 
AsyncStorage, TouchableWithoutFeedback, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { getUserInsta, getInstaAccount, getUserInstaID, getInstaAccountList, countInstaAccountList, 
getUserID, setUserInsta, api, getToken, setInstaAccountList } from '../api';

class SideMenu extends Component {
  constructor(props){
    super(props);

    this.state = { 
      valueArray: [], 
      valueArray2: [], 
    };
    this.index = 0; this.index2 = 0;
    this.instaAccountsContent = [];
    this.instaAccountsContentID = [];
    this.logInput = React.createRef();
    this.passInput = React.createRef();
    this.addAccount = 0;

    this.getInstaAccounts();
  }
  async _storeInstaAccount(key,name) {
    this.props.navigation.closeDrawer();
    console.log("Saving ActiveInstaAccount ("+key+" ["+name+"])...")
    try {
      await AsyncStorage.setItem('ActiveInstaAccount:'+getUserID(),key+'');
      this.props.navigation.navigate('Accounts'); // hard reset
      setUserInsta(key,name);
      this.props.navigation.navigate('App');
    } catch (error) {
      console.log("Error storing:"+error);
    }
  };
  addInstaAccount() {
    console.log("Adding instaAccount action...");
    this.addAccount = 0;
    var command = "instaAccounts";
    if(!this.logInput.current._lastNativeText || !this.passInput.current._lastNativeText) {
      Alert.alert("Veuillez entrer votre login et mot de passe Instagram.");
      return;
    }
    console.log("request -> POST "+api+command);
    fetch(api+command,  {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getToken(),
      },
      body: JSON.stringify({
        instauser: this.logInput.current._lastNativeText,
        instapass: this.passInput.current._lastNativeText,
        userID: getUserID(),
      })
    }).then((response) => response.json()).then((responseJson) => {
    }).catch((error) =>{
      console.log("ERROR ADD INSTA ACCOUNT : "+error);
    });
    fetch(api+command,  {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getToken(),
      }
    }).then((response) => response.json()).then((responseJson) => {

      //this.InstaAccountcount = Object.keys(responseJson).length;
      console.log("got respons!! set InstaAcc to : ");
      console.log(responseJson);
      setInstaAccountList(responseJson);
      this.getInstaAccounts();
      this.setState({ addAccount: false });
    });
  }
  getInstaAccounts() {
    // On vide les variables
    this.instaAccountsContent = []; this.instaAccountsContentID = []; this.state.valueArray = []; this.state.valueArray2 = [];
    this.index2 = 0; this.index = 0;

    for(var i=0;i<(countInstaAccountList());i++) {
      console.log('side list adding to valueArray2');
      if(getInstaAccountList()[i].user && getInstaAccountList()[i].user != getUserInsta())this.state.valueArray2.push(getInstaAccountList()[i].instauser_id);
    }     
    this.loading = 0;
    console.log("side list valuearray is now:");
    console.log(this.state.valueArray2);
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
      let accountList = this.state.valueArray2.map(( data, key ) =>
      {
        return(
          <TouchableOpacity key = { key } activeOpacity = { 0.4 }  onPress={ () => { this._storeInstaAccount(data,getInstaAccount(data).user); }} style={{zIndex: 3, width: '100%', height: 60, }}>
            <View style={{alignItems: 'center',  marginLeft: 25, flex:1, flexDirection:'row'}}>
              <View style={{borderWidth: 1, borderRadius: 50, borderColor: '#ccc', backgroundColor: '#fff', width: 45, height: 45, shadowRadius: 8, shadowColor: '#455b63', shadowOffset: {  width: 4,  height: 4,  }, shadowOpacity: 0.9, elevation: 1,}}>
                {<Image style={{height: 45, width: 45, borderRadius: 50, }} source={{uri: getInstaAccount(data).avatar}}/>}
              </View>
              <View style={{textAlign: 'center', marginTop: 0, fontWeight: '300', fontSize: 16, marginLeft: 10, width: '60%'}}>
                <Text style={{fontSize: 12}} numberOfLines={1}>{ getInstaAccount(data).user }</Text>
                <Text style={{fontSize: 14, color: '#ccc'}} numberOfLines={1}>@{ getInstaAccount(data).user }</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    return (
      <View style={styles.container}>
        <ScrollView style={{marginTop: 25}}>
          { getUserInsta() != "" && 
          <View styles={{flex: 1, flexDirection: 'row', marginLeft: 38}}>
            <View>
              <Image
                style={{
                  width: 85, 
                  height: 85, 
                  marginLeft: 25,
                  marginBottom: 25,
                  borderWidth: 1, 
                  borderRadius: 10, 
                  borderColor: '#ccc', 
                  shadowRadius: 8, 
                  shadowColor: '#455b63', 
                  shadowOffset: {  width: 4,  height: 4,  }, 
                  shadowOpacity: 0.9
                }}
                source={{uri: getInstaAccount(getUserInstaID()).avatar}}
              />
              <View style={{flex: 1, flexDirection: 'column', position: 'absolute', top: 20, left: 130, width: '45%' }}>
                <Text style={{fontSize: 24, fontWeight: '200', fontFamily: 'Roboto', width: '100%'}} numberOfLines={1}>{getUserInsta()}</Text>
                <Text style={{fontSize: 14, color: '#bbb', fontFamily: 'Roboto', width: '100%'}} numberOfLines={1}>@{getUserInsta()}</Text>
              </View>
            </View>

            <View>
                  {accountList}
                { /* AJOUTER UN COMPTE */ this.addAccount==0 && 
                <TouchableOpacity activeOpacity = { 0.4 }  onPress={ () => { this.addAccount=1; this.setState({ addAccount: true }); }} style={{zIndex: 3, width: '100%', height: 60 }}>
                  <View style={{alignItems: 'center',  marginLeft: 25, flex:1, flexDirection:'row'}}>
                    <View style={{borderWidth: 1, borderRadius: 50, borderColor: '#ccc', backgroundColor: '#f68770', width: 45, height: 45, alignItems: 'center', justifyContent: 'center', shadowRadius: 8, shadowColor: '#455b63', shadowOffset: {  width: 4,  height: 4,  }, shadowOpacity: 0.9, elevation: 1,}}>
                      {<Ionicons name='md-add' size={20} color='#fff' style={{}} />}
                    </View>
                    <Text style={{textAlign: 'center', marginTop: 0, fontWeight: '300', fontSize: 12, marginLeft: 10}}>ajouter un compte</Text>
                  </View>
                </TouchableOpacity>
                }
                { ( this.addAccount==1 ) && // PAS DE COMPTE, CREATION
                  <TouchableWithoutFeedback onPress={ () => { this.addAccount=0; }}>                    
                   <View style={{top: -150, left: 0, backgroundColor: '#fff', opacity: 0.7, width: '100%', height: '150%', zIndex: 3}}>
                    <View style={{backgroundColor: '#fff', borderRadius: 10, marginRight: '10%', marginLeft: '10%', top: 200, width: '80%', zIndex: 9999, borderWidth: 1, borderColor: '#ccc', shadowRadius: 8, shadowColor: '#455b63', shadowOffset: {  width: 4,  height: 4,  }, shadowOpacity: 0.9, elevation: 9999,}}>
                      <Text style={{fontSize: 17, padding: 3, elevation: 10}}>Ajouter un compte Instagram existant</Text>
                      <TextInput
                        style={ styles.textBox }
                        placeholder="Login du compte"
                        ref={this.logInput}
                      />
                      <TextInput
                        style={ styles.textBox }
                        placeholder="Mot de passe"
                        underlineColorAndroid = "transparent"
                        secureTextEntry = { this.state.hidePassword }
                        ref={this.passInput}
                      />
                      <View style={{position: 'relative', alignSelf: 'stretch',}}>
                        <Button onPress={ () => { this.loading=1; this.addInstaAccount();}} title="AJOUTER CE COMPTE"/>
                      </View>
                    </View>
                    </View>
                  </TouchableWithoutFeedback>
                }
            </View>
          </View>
          }
          <View style={{borderTopWidth: 1, borderTopColor: '#ccc', paddingLeft: 38, marginTop: 15}}>
            {/*
            <TouchableOpacity ref={this.valider} activeOpacity = { 0.6 }  onPress = { () => { Linking.openURL('https://jimee.fr') } }>      
              <Text style={styles.sectionHeadingStyle2}>
                A Propos
              </Text>
            </TouchableOpacity>
            */}
            <TouchableOpacity ref={this.valider} activeOpacity = { 0.6 }  onPress = { () => { this.props.navigation.navigate('Auth');} }>     
              <Text style={styles.sectionHeadingStyle2}>
                Se Déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Image style={{width: '100%', height: 100}} source={require('../assets/images/jimee-white.png')} />
          <Text>Jimee 2.0.8</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#8C87FC',
    fontSize: 22,
  },
  sectionHeadingStyle2: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#73798B',
    fontSize: 22,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
});

export default SideMenu;
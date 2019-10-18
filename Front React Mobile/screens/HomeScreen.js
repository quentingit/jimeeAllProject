/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, 
TouchableWithoutFeedback, View, Alert, Animated, TextInput, ToastAndroid,
AsyncStorage, Switch, StatusBar, Dimensions } from 'react-native';
//import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox, Button } from 'react-native-elements';
//import { MonoText } from '../components/StyledText';
import { api, getToken, getUserID, setUserID, getUserInstaID, getUserInsta, 
setUserInsta, getInstaAccount, setConfigUserInsta } from '../api';
import Header from '../components/Header';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import JimeeButton from '../components/JimeeButton';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import SwitchSelector from 'react-native-switch-selector';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);

    // Obtension de l'ID de l'utilisateur + nettoyage token
    //this.getID();


    this.likesChecked = false;
    this.commentsChecked = false;
    this.followChecked = false;
    this.unfollowChecked = false;

    this.accountFollowers = 0;
    this.accountPosts = 0;
    this.accountFollowing = 0;
    this.accountPictureId = 0;

    this.state = { valueArray: [], valueArray2: [], Badges: [], hidePassword: true, showPassword: false };
    this.index = 0; this.index2 = 0;
    this.logcontent = [];
    this.instaAccountsContent = [];
    this.instaAccountsContentID = [];
    this.animatedValue = new Animated.Value(0);

    this.showOverlay = 0;
    this.InstaAccountcount = 0;
    this.InstaAccountList = "";
    this.logInput = React.createRef();
    this.passInput = React.createRef();
    this.addAccount = 0;

    this.valider = React.createRef();
    this.boost = React.createRef();

    //this.logscount = -1;

    this.loading = 1;
    this.request(); 

    // Chart -----------
    this.chartSize = 6;
    this.data1 = [0,0,0,0,0,0];
    this.data2 = [50,60,70,20,50,40];
    this.chartData = "";
    this.timeline = ['January', 'February', 'March', 'April', 'May', 'June'];
    this.loading = 1;
    this.maxSize = 6; 
    this.mode = 1; // flwings / flwers
    this.modetype = 1; // linechart / barchart

    this.getChart();
    this.getBadges();
  }
  getChart() {
    if(!this.chartData) // cache
    {
      command = "statsGraphics?userID="+getUserInstaID();
      console.log("request -> GET "+api+command);
      fetch(api+command,  {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+getToken(),
        },
      }).then((response) => response.json()).then((responseJson) => {
        // On vide
        this.data1 = [];
        this.data2 = [];
        this.timeline = [];

        this.chartData = responseJson;
        console.log("taille: "+responseJson.length)
        this.maxSize = responseJson.length;
        if(responseJson.length >= 12) this.maxSize = 12;
        for(var i=0;i<this.chartSize;i++){
          console.log("stats "+i);
          console.log(responseJson[i].n_followers);
          this.data1.unshift(responseJson[i].n_followers);
          console.log(responseJson[i].n_followings);
          this.data2.unshift(responseJson[i].n_followings);
          console.log(responseJson[i].log_date);
          var log_date = responseJson[i].log_date.split("T")[0].split("-")[2]+"/"+responseJson[i].log_date.split("-")[1];
          this.timeline.unshift(log_date);
        }
        this.loading=0;
        this.forceUpdate();
      }).catch((error) =>{
        console.log("ERROR "+command+" : "+error);
      });
    }
    else
    {
      console.log("taking cache:")
      console.log(this.chartData)
      // On vide
      this.data1 = [];
      this.data2 = [];
      this.timeline = [];

      for(var i=0;i<this.chartSize;i++)
      {
        console.log("---");
        console.log(this.chartData[i]);
        this.data1.unshift(this.chartData[i].n_followers);
        this.data2.unshift(this.chartData[i].n_followings);
        var log_date = this.chartData[i].log_date.split("T")[0].split("-")[2]+"/"+this.chartData[i].log_date.split("-")[1];
        if(this.chartSize>9) log_date = this.chartData[i].log_date.split("T")[0].split("-")[2];
        this.timeline.unshift(log_date);
      }
      this.forceUpdate();
    }
  }
  getBadges() {
    var command = "badges?userID="+getUserInstaID();
    console.log("request -> GET "+api+command);
    fetch(api+command,  {
		  method: 'GET',
		  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getToken(),
      },
		}).then((response) => response.json()).then((responseJson) => {
      console.log("badges:")
      console.log(responseJson)
      this.setState({Badges: responseJson});
      this.forceUpdate();
    }).catch((error) =>{
      console.log("ERROR "+command+" : "+error);
    });
  }
  request() {

    if(getInstaAccount(getUserInstaID()).n_followers>0) this.accountFollowers = getInstaAccount(getUserInstaID()).n_posts; else this.accountFollowers = "-";
    if(getInstaAccount(getUserInstaID()).n_posts>0) this.accountPosts = getInstaAccount(getUserInstaID()).n_posts; else this.accountPosts = "-";
    if(getInstaAccount(getUserInstaID()).n_followings>0) this.accountFollowing = getInstaAccount(getUserInstaID()).n_followings; else this.accountFollowing = "-";
 
    command = "configUserInsta?userInstaID="+getUserInstaID();
    console.log("request -> GET "+api+command);
    fetch(api+command,  {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getToken(),
      },
    }).then((response) => response.json()).then((responseJson) => {
      console.log("CongifUserInsta:")
      console.log(responseJson[0]);
      if(responseJson.error) {
        console.log("=========\n!!ERREUR CongifUserInsta!! :\n=========")
        console.log(responseJson);
      }

      setConfigUserInsta(responseJson[0]); // cache pour config
      if(responseJson[0].follows>0) this.followChecked = true; else this.followChecked = false;
      if(responseJson[0].unfollows>0) this.unfollowChecked = true; else this.unfollowChecked = false;
      if(responseJson[0].comments>0) this.commentsChecked = true; else this.commentsChecked = false;
      if(responseJson[0].likes>0) this.likesChecked = true; else this.likesChecked = false;
      this.loading = 0;
      this.forceUpdate();
    }).catch((error) =>{
      console.log("ERROR "+command+" : "+error);
    });
  }
  updateCheck() {
    this.valider.disabled=1;
    this.boost.disabled=1;
    var command = "configUserInsta";
    console.log("request -> POST "+api+command);
    fetch(api+command,  {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getToken(),
      },
      body: JSON.stringify({
        follows: Number(this.followChecked), 
        unfollows: Number(this.unfollowChecked),
        comments: Number(this.commentsChecked),
        likes: Number(this.likesChecked),
        userInstaID: getUserInstaID(),
      })
    }).then((response) => response.json()).then((responseJson) => {
      if(responseJson){
        console.log("Réponse du processus python:");
        console.log(responseJson);
        if( responseJson.body == "Okay")
        {  
          ToastAndroid.show("Processus lancé avec succès !",ToastAndroid.LONG);
        } else {
          ToastAndroid.show("Erreur, le processus ne s'est pas lancé.",ToastAndroid.LONG);
        }
      }
    }).catch((error) =>{
      console.log("ERROR "+command+" : "+error);
    });
  }
  renderImage(imageUrl) {
    return (
      <View>
        <Image source={{uri: imageUrl}} style={{margin: 15, padding: 15, width: 40, height: 40}}/>
      </View>
    );
  }
  static navigationOptions = {
    header: null,
  };
  render() {
    let badges = this.state.Badges.map(img => this.renderImage(img));
    return (
      <ScrollView style={styles.AndroidSafeArea}>
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Header title="Accueil" this={this}/>
          { this.loading==1 && 
            <View style={{textAlign: 'center', alignItems: 'center'}}>
              <Image style={{height: 120, width: 120, alignItems: 'center'}} source={require('../assets/images/load2.gif')} />
            </View>
          }
          { this.loading==0 && 
          <View>
            <View style={{padding: 20}}>
              <View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 10}}>
                {/*
                <View style={{left: 0, top: 0, padding: 25, position: 'absolute',}}>
                  { accountIcon } 
                </View>
                <View style={{left: 165, right: 15, top: 15, borderColor: '#ccc', backgroundColor: '#fff', padding: 15, position: 'absolute', borderBottomColor: '#eee', width: '50%' }}>
                  <Text style={{fontWeight: 'bold', fontSize: 23, marginBottom: 3}} numberOfLines={1}>{getUserInsta()}</Text>
                  <Text style={{fontSize: 15, fontFamily: 'Roboto', color: '#bbb'}} numberOfLines={1}>@{getUserInsta()}</Text>
                
                  <View style={{height: 60, width: '100%', flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10, marginTop: 10}}>
                    <View style={{borderRightColor: '#eee', borderRightWidth: 1, width: '50%', height: '90%' }}>
                      <Text style={{fontWeight: '600', marginLeft: 12, fontFamily: 'Roboto', fontSize: 18}} numberOfLines={1}>{getInstaAccount(getUserInstaID()).n_followers}</Text>
                      <View style={{bottom: 0, left: 12, padding: '2%'}}>
                        <Text style={{fontSize: 11, color: '#bbb', fontFamily: 'Roboto'}}>followers</Text>
                        <Text style={{fontWeight: '600', marginLeft: 12, fontFamily: 'Roboto', fontSize: 12, color: '#4ad991'}} numberOfLines={1}><Ionicons name='md-arrow-round-up' size={18} color='#4ad991' style={{}} /> 0</Text>
                      </View>
                    </View>
                    <View style={{ width: '50%', height: '90%' }}>
                      <Text style={{fontWeight: '600', marginLeft: 13, fontFamily: 'Roboto', fontSize: 18}} numberOfLines={1}>{getInstaAccount(getUserInstaID()).n_followings}</Text>
                      <View style={{bottom: 0, left: 12, padding: '2%', flex: 1, flexDirection: 'column'}}>
                        <Text style={{fontSize: 11, color: '#bbb', fontFamily: 'Roboto'}}>followings</Text>
                        <Text style={{fontWeight: '600', marginLeft: 12, fontFamily: 'Roboto', fontSize: 12, color: '#4ad991'}} numberOfLines={1}><Ionicons name='md-arrow-round-up' size={18} color='#4ad991' style={{}} /> 0</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',padding: 10,zIndex:1,marginTop: '45%', width: '85%', borderTopWidth: 1, borderTopColor: '#eee', }}>
                  <Switch thumbColor='#3800bf' trackColor={{true:'#8F8BFF', false: null}} onValueChange = { () => {this.likesChecked=!this.likesChecked; this.forceUpdate();}} value={this.likesChecked} />
                  <Switch thumbColor='#3800bf' trackColor={{true:'#8F8BFF', false: null}} onValueChange = { () => {this.commentsChecked=!this.commentsChecked; this.forceUpdate();}} value={this.commentsChecked} />
                  <Switch thumbColor='#3800bf' trackColor={{true:'#8F8BFF', false: null}} onValueChange = { () => {this.followChecked=!this.followChecked;this.forceUpdate();}} value={this.followChecked} />
                  <Switch thumbColor='#3800bf' trackColor={{true:'#8F8BFF', false: null}} onValueChange = { () => {this.unfollowChecked=!this.unfollowChecked;this.forceUpdate();}} value={this.unfollowChecked} />
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', zIndex:1,width:'100%', paddingLeft: '12%', paddingRight: '12%', paddingBottom: '12%', paddingTop: '5%', }}>
                  <Text style={styles.getStartedText}>like</Text>
                  <Text style={styles.getStartedText}>comments</Text>
                  <Text style={styles.getStartedText}>follow</Text>
                  <Text style={styles.getStartedText}>unfollow</Text>
                </View>
                <Text style={{position: 'absolute', bottom: 9, right: 9, fontSize: 10, color: '#aaa'}}>Config 1 ></Text>
                </View>*/}
                <View style={{backgroundColor: '#5ed2a0', width: 100, height: 100, borderRadius: 50, textAlign: 'center', alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text style={{fontSize: 38, color: '#fff'}}>80</Text><Text style={{fontSize: 10, color: '#fff', marginTop: 20}}>%</Text>
                  </View>
                  <Text style={{fontSize: 12, color: '#fff'}}>super</Text>
                </View>
                <View style={{width: 100, height: 100, flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center',}}>
                  <Text style={{fontWeight: '600', fontSize: 28}}>{getInstaAccount(getUserInstaID()).n_followers}</Text>
                  <Text style={{fontSize: 12}}>followers</Text>
                </View>
                <View style={{width: 100, height: 100, flexDirection: 'column', textAlign: 'center', alignItems: 'center', justifyContent: 'center',}}>
                  <Text style={{fontWeight: '600', fontSize: 28}}>{getInstaAccount(getUserInstaID()).n_followings}</Text>
                  <Text style={{fontSize: 12}}>followings</Text>
                </View>
            </View>

            <View style={{padding: 0}}>
              <JimeeButton title='Editer Profil' onPress={ () => { this.props.navigation.navigate('EditScreen') } }/>

              <Text style={styles.titre}>Statistiques</Text>

              <View style={{padding: 5, flexDirection: 'column' }}>
                <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{flexDirection: 'column', borderRadius: 15, height: 125, width: '48%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, justifyContent: 'center'}}>
                    <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10, paddingBottom: 7 }}>
                      <Ionicons name="md-heart" style={{color: "#fff"}} size={25} />
                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 36}}>350</Text>
                    <Text style={{fontSize: 10}}>Likes reçus par Post</Text>
                  </View>
              
                  <View style={{flexDirection: 'column', borderRadius: 15, height: 125, width: '48%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, justifyContent: 'center'}}>
                    <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10, paddingBottom: 7 }}>
                      <Ionicons name="md-chatboxes" style={{color: "#fff"}} size={25} />
                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 36}}>22</Text>
                    <Text style={{fontSize: 10}}>Commentaires reçus par post</Text>
                  </View>
                  
                </View>
                <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{flexDirection: 'column', borderRadius: 15, height: 125, width: '48%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, justifyContent: 'center'}}>
                    <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10, paddingBottom: 7 }}>
                      <Ionicons name="md-stats" style={{color: "#fff"}} size={25} />
                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 36}}>7%</Text>
                    <Text style={{fontSize: 10}}>Taux interaction par Post</Text>
                  </View>

                  <View style={{flexDirection: 'column', borderRadius: 15, height: 125, width: '48%', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, justifyContent: 'center'}}>
                    <View style={{ backgroundColor: '#f00', borderRadius: 25, padding: 10, paddingBottom: 7 }}>
                      <Ionicons name="md-list-box" style={{color: "#fff"}} size={25} />
                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 36}}>350</Text>
                    <Text style={{fontSize: 10}}>Nombre de Posts</Text>
                  </View>
                </View>
              </View>

              {/*<View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                { this.logscount==-1 &&
                  <View>
                    <Text>Récupération de l'historique des actions...</Text>
                    <Image style={{height: 120, width: 120, alignItems: 'center'}} source={require('../assets/images/load2.gif')} />
                  </View>
                }
                { this.logscount==0 &&
                  <View style={{width: '90%', marginBottom: 30}}>
                    <Image style={{right: 5, top: 5, height: 50, width: 50, position: 'absolute'}} source={require('../assets/images/load2.gif')} />
                    <Text style={{fontWeight: 'bold'}}>Aucune action à afficher</Text>
                  </View>
                }
                { this.logscount>0 &&
                  <View style={{width: '90%', marginBottom: 30}}>
                    <Image style={{right: 5, top: 5, height: 50, width: 50, position: 'absolute'}} source={require('../assets/images/load2.gif')} />
                    <Text style={{fontWeight: 'bold'}}>Dernières actions</Text>
                    <View style={{zIndex: 1}}>
                      {rows}
                    </View>
                  </View>
                }
              </View>
              */}

              <View style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  padding: 10,
                }}>
                  <SwitchSelector 
                  options={[{ label: 'followers', value: '1' },{ label: 'followings', value: '2' }]} 
                  buttonColor='#f66445'
                  initial={0} 
                  onPress={value => {this.mode = value; console.log("value "+value); this.forceUpdate();}} />
                  <MultiSlider
                    values={[
                      this.chartSize
                    ]}
                    trackStyle={{backgroundColor:'#f49953'}}
                    selectedStyle={{backgroundColor:'#f74663'}}
                    markerStyle={{backgroundColor:'#f74663',height: 20, width: 20, borderRadius: 15}}
                    pressedMarkerStyle={{height: 40, width: 40}}
                    sliderLength={(Dimensions.get('window').width-(Dimensions.get('window').width*0.2))}
                    onValuesChange={ (data) => { this.chartSize = data[0]; this.forceUpdate(); this.getChart(); }}
                    min={2}
                    max={this.maxSize}
                    step={1}
                    touchDimensions={{height: 250,width: 250,borderRadius: 15,slipDisplacement: 200}}
                    allowOverlap
                    snapped
                  />
                  { this.mode==1 &&
                    <View>
                    { this.modetype==1 &&
                    <BarChart
                      data={{
                        labels: this.timeline,
                        datasets: [{
                          data: this.data1
                        }
                      ]}}
                      width={(Dimensions.get('window').width-Math.round(Dimensions.get('window').width*0.15))} // voir ici si erreur conversion float
                      height={(Dimensions.get('window').height-Math.round(Dimensions.get('window').height*0.6))} // voir ici si erreur conversion float
                      yAxisLabel={''}
                      chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `#f66445`,
                        labelColor: (opacity = 1) => `#f66445`,
                        style: {
                          borderRadius: 16
                        }
                      }}
                    />
                    }
                    { this.modetype>=2 &&
                      <LineChart
                        data={{
                          labels: this.timeline,
                          datasets: [{
                            data: this.data1
                          }
                        ]}}
                        width={(Dimensions.get('window').width-Math.round(Dimensions.get('window').width*0.15))} // voir ici si erreur conversion float
                        height={(Dimensions.get('window').height-Math.round(Dimensions.get('window').height*0.6))} // voir ici si erreur conversion float
                        yAxisLabel={''}
                        chartConfig={{
                          backgroundColor: '#fff',
                          backgroundGradientFrom: '#fff',
                          backgroundGradientTo: '#fff',
                          decimalPlaces: 2, // optional, defaults to 2dp
                          color: (opacity = 1) => `#f66445`,
                          labelColor: (opacity = 1) => `#f66445`,
                          style: {
                            borderRadius: 16
                          }
                        }}
                        bezier={ this.modetype==3 ? true : false }
                      />
                    }
                    </View>
                }
                { this.mode==2 &&
                  <View>
                  { this.modetype==1 &&
                    <BarChart
                    data={{
                      labels: this.timeline,
                      datasets: [{
                        data: this.data2
                      }
                    ]}}
                    width={(Dimensions.get('window').width-Math.round(Dimensions.get('window').width*0.15))} // voir ici si erreur conversion float
                    height={(Dimensions.get('window').height-Math.round(Dimensions.get('window').height*0.6))} // voir ici si erreur conversion float
                    yAxisLabel={''}
                    chartConfig={{
                      backgroundColor: '#fff',
                      backgroundGradientFrom: '#fff',
                      backgroundGradientTo: '#fff',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `#f66445`,
                      labelColor: (opacity = 1) => `#f66445`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    />
                  }
                  { this.modetype>=2 &&
                    <LineChart
                    data={{
                      labels: this.timeline,
                      datasets: [{
                        data: this.data2
                      }
                    ]}}
                    width={(Dimensions.get('window').width-Math.round(Dimensions.get('window').width*0.15))} // voir ici si erreur conversion float
                    height={(Dimensions.get('window').height-Math.round(Dimensions.get('window').height*0.6))} // voir ici si erreur conversion float
                    yAxisLabel={''}
                    chartConfig={{
                      backgroundColor: '#fff',
                      backgroundGradientFrom: '#fff',
                      backgroundGradientTo: '#fff',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `#f66445`,
                      labelColor: (opacity = 1) => `#f66445`,
                      style: {
                        borderRadius: 16
                      }
                    }}
                    bezier={ this.modetype==3 ? true : false }
                    />
                  }
                  </View>
                }
              <SwitchSelector 
                  options={[{ label: 'bar chart', value: '1' },{ label: 'line chart', value: '2' },{ label: 'line bezier chart', value: '3' }]} 
                  buttonColor='#f66445'
                  initial={0} 
                  onPress={value => {this.modetype = value; this.forceUpdate();}} />
            </View>

            <Text style={styles.titre}>Machine Learning</Text>

            <View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', padding: 20, marginRight: 10}}>
              <Text>
               Sur instagram, les profils similaires au votre  ont 200 likes par post et gagnent en moyenne 400 followers en 6 mois.
              </Text>
            </View>

            <Text style={styles.titre}>Posts récents populaires</Text>

            <ScrollView horizontal={true}>
              <View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', padding: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: 140, marginRight: 10}}>
                  <Image source={require('../assets/images/album1.png')}/>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>637</Text>
                    <View style={{ backgroundColor: '#f00', borderRadius: 10, padding: 4, marginLeft: 4 }}>
                      <Ionicons name="md-heart" style={{color: "#fff"}} size={8} />
                    </View>
                  </View>
              </View>
              <View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', padding: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: 140, marginRight: 10}}>
                  <Image source={require('../assets/images/album2.png')}/>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>610</Text>
                    <View style={{ backgroundColor: '#f00', borderRadius: 10, padding: 4, marginLeft: 4 }}>
                      <Ionicons name="md-heart" style={{color: "#fff"}} size={8} />
                    </View>
                  </View>
              </View>
              <View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', padding: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: 140, marginRight: 10}}>
                  <Image source={require('../assets/images/album3.png')}/>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>587</Text>
                    <View style={{ backgroundColor: '#f00', borderRadius: 10, padding: 4, marginLeft: 4 }}>
                      <Ionicons name="md-heart" style={{color: "#fff"}} size={8} />
                    </View>
                  </View>
              </View>
            </ScrollView>

            <Text style={styles.titre}>Badges</Text>

            <View style={{borderWidth: 1, borderRadius: 10, borderColor: '#ccc', backgroundColor: '#fff', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              {badges}
            </View>
          </View>
        </View>

        </View>
        }
        </View>
        <View style={{height: 100}}></View>
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
  textBox: {
	  marginBottom: 6,
    fontSize: 18,
    alignSelf: 'stretch',
    height: 35,
    padding: 4,
    margin: 5,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    marginTop: 50,
    marginLeft: 25,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 13,
    color: '#999',
    lineHeight: 15,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    //flexDirection: 'row', 
    backgroundColor: '#fbfbfb',
    paddingVertical: 2,
    zIndex: 1,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  instaNumbers: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginTop: -40,
  },
  instaActions: {
    fontSize: 16, 
  },
  titre: {
    fontFamily: 'josefin',
    fontSize: 17,
    color: '#3e3f68',
    padding: 20
  },
});

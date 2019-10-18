/* Nicolas BAPTISTA - V1.0 */
import React from 'react';
import { ScrollView, StyleSheet, View , Text, Animated, Alert, TouchableOpacity, 
TouchableWithoutFeedback, TextInput, Button, Platform, StatusBar, Image, Slider,
Dimensions, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { api, getToken, getUserInstaID, setArticle } from '../api';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../components/Header';

export default class CoursScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {selectedTab: 1, cours: []};

    this.getCours();
  }
  getCours() {
    var command = "cours";
    console.log("request -> GET "+api+command);
    fetch(api+command,  {
		  method: 'GET',
		  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+getToken(),
      },
		}).then((response) => response.json()).then((responseJson) => {
      console.log("cours:")
      console.log(responseJson.cours)
      this.setState({cours: responseJson.cours});
      this.forceUpdate();
    }).catch((error) =>{
      console.log("ERROR "+command+" : "+error);
    });
  }
  renderCours(item) {
    return(
      <TouchableOpacity onPress={ () => { setArticle(item.id_cours); this.props.navigation.navigate('ViewArticleScreen', {id: item.id_cours, titre: item.titre}) } }>
        <View style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, borderWidth: 1, borderColor: '#ccc', padding: 5}}>
          <Image source={{uri: item.image}} style={{borderTopLeftRadius: 15, borderTopRightRadius: 15, width: '100%', height: 250}} />
          <View style={{padding: 12}}>
            <Text style={{fontSize: 16, marginBottom: 5}}>{item.titre}</Text>
            <Text style={{fontSize: 9}}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
static navigationOptions = {
  header: null,
};
  render() {
    let courses = this.state.cours.map(item => this.renderCours(item));
    return (
      <ScrollView style={styles.AndroidSafeArea}>
        <Header title="Cours" this={this}/>

        <View style={{marginBottom: 55}}>
          <ScrollView horizontal={true}>
            <TouchableOpacity onPress={ () => { this.setState({selectedTab: 1}); }}>
              <View style={{flexDirection: 'column', marginLeft: 25}}>
                <Text style={{color: '#3e3f68', fontSize: 25}}>Récent</Text>
                { this.state.selectedTab == 1 && <View style={{borderTopColor: '#e67e22', borderTopWidth: 5}}></View> }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => { this.setState({selectedTab: 2}); }}>
            <View style={{flexDirection: 'column', marginLeft: 25}}>
              <Text style={{color: '#3e3f68', fontSize: 25}}>Instagram</Text>
              { this.state.selectedTab == 2 && <View style={{borderTopColor: '#e67e22', borderTopWidth: 5}}></View> }
            </View>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={ () => { this.setState({selectedTab: 3}); }}>
            <View style={{flexDirection: 'column', marginLeft: 25}}>
              <Text style={{color: '#3e3f68', fontSize: 25}}>Algorithme</Text>
              { this.state.selectedTab == 3 && <View style={{borderTopColor: '#e67e22', borderTopWidth: 5}}></View> }
            </View>
            </TouchableOpacity>*/}
          </ScrollView>

          <View style={{padding: 20}}>

            {courses} 

          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    marginBottom: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    marginLeft: '5%',
    width: '90%', 
    padding: '5%',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titre: {
    fontSize: 14,
    fontWeight: '500',
  },
  titregauche: {
    fontSize: 14,
    fontWeight: '500',
    position: 'absolute',
    right: 12,
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
  },
});


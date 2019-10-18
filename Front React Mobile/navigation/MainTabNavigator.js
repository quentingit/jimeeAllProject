import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AlgoScreen from '../screens/AlgoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TrickScreen from '../screens/TricksScreen';
import ActionScreen from '../screens/ActionScreen';
import CoursScreen from '../screens/CoursScreen';

import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import JimeeButton from '../components/JimeeButton';

var IconSize = 25;

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Accueil',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={IconSize}
      color={tintColor}
      name={'ios-home'}
    />
  )
};

const LinksStack = createStackNavigator({
  Links: AlgoScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Algo',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={IconSize}
      color={tintColor}
      name={'md-cog'}
    />
  ),
};

const ActionStack = createStackNavigator({
  Settings: ActionScreen,
});

ActionStack.navigationOptions = {
  tabBarLabel: ' ',
  tabBarIcon: ({ tintColor }) => (
    <TouchableOpacity style={{width: '100%', justifyContent: 'center', alignItems: 'center'}} activeOpacity = { 0.8 }>
      <LinearGradient
      style = {{ borderRadius: 20, padding: 5, width: 50, justifyContent: 'center', alignItems: 'center' }}
      colors={['#f58524', '#f92b7f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      >
        <Icon
          size={27}
          color='#fff'
          name='md-add'
        />
      </LinearGradient>
    </TouchableOpacity>
  ),
};

const StatsStack = createStackNavigator({
  Settings: CoursScreen,
});

StatsStack.navigationOptions = {
  tabBarLabel: 'Cours',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={IconSize}
      color={tintColor}
      name={'md-school'}
    /> 
  ),
};

const MissionsStack = createStackNavigator({
  Settings: TrickScreen,
});

MissionsStack.navigationOptions = {
  tabBarLabel: 'Conseils',
  tabBarIcon: ({ tintColor }) => (
    <Icon
      size={IconSize}
      color={tintColor}
      name={'md-paper'}
    />
  ),
};

export default createMaterialTopTabNavigator({
  HomeStack,
  StatsStack,
  ActionStack,
  MissionsStack,
  LinksStack,
}, {
  initialRouteName: 'HomeStack',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    pressColor: '#f58524',
    showIcon: true,
    activeTintColor: '#f58524',
    inactiveTintColor: '#d1d8eb',
    style: {
      backgroundColor: 'white',
      color: '#ccc',
    },
    labelStyle: {
      fontSize: 0,
      fontFamily: 'Roboto',
    },
    indicatorStyle: {
      backgroundColor: '#f58524',
      color: '#f58524',
    }
  }
});

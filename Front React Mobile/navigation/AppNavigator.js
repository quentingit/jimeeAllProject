import React from 'react';
import { AppRegistry, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AccountsScreen from '../screens/AccountsScreen';

import HashtagsScreen from '../screens/Actions/HashtagsScreen';
import BoostScreen from '../screens/Actions/BoostScreen';
import AnalyseScreen from '../screens/Actions/AnalyseScreen';
import FakeScreen from '../screens/Actions/FakeScreen';

import EditScreen from '../screens/EditScreen';

import ViewArticleScreen from '../screens/ViewArticleScreen';

import SideMenu from '../components/sidemenu'

console.disableYellowBox = true; // désactive les warnings (pas pro si ça arrive)

const AuthStack = createStackNavigator({ SignIn: LoginScreen });
const RegisterStack = createStackNavigator({ Register: RegisterScreen });
const AccountsStack = createStackNavigator({ Accounts: AccountsScreen });

const drawernav = createDrawerNavigator({
  Item1: {
      screen: AccountsStack,
    }
  }, {
    contentComponent: SideMenu, 
});

const drawernavtab = createDrawerNavigator({
  Item1: {
      screen: MainTabNavigator,
    }
  }, {
    contentComponent: SideMenu, 
});

export default createAppContainer(createSwitchNavigator({
  Auth: AuthStack,
  Accounts: drawernav,
  App: drawernavtab,
  Register: RegisterStack,
  HashtagsScreen: HashtagsScreen,
  BoostScreen: BoostScreen,
  AnalyseScreen: AnalyseScreen,
  EditScreen: EditScreen,
  FakeScreen: FakeScreen,
  ViewArticleScreen: ViewArticleScreen,
}));
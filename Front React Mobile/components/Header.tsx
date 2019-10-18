import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getInstaAccount, getUserInstaID } from '../api';

export default class Header extends Component {
    render() {
        return(
            <View style={{marginBottom: 55}}>
                <TouchableOpacity onPress={ () => { this.props.this.props.navigation.openDrawer(); } } style={{width: 50, height: 50, position: 'absolute', top: 15, left: 20}}>
                    <Image source={require('../assets/images/menu.png')} />
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: '700', position: 'absolute', top: 10, left: 85, fontFamily: 'Roboto'}}>{this.props.title}</Text>
                
                {/*<TouchableOpacity onPress={ () => { this.props.this.props.navigation.navigate('Accounts'); } } >
                    <Image
                    style={{width: 50, height: 50, borderWidth: 1, borderRadius: 25, borderColor: '#ccc', position: 'absolute', top: 8, right: 10 }}
                    source={{uri: getInstaAccount(getUserInstaID()).avatar}}
                    />
                   <Image style={{width: 22, height: 22, position: 'absolute', top: 20, right: 3, borderWidth: 0, borderColor: '#fff', borderRadius: 20}} source={require('../assets/images/instaIcon.png')} />
                </TouchableOpacity>*/}
            </View>
        );
    }
}
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getInstaAccount, getUserInstaID } from '../api';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends Component {
    render() {
        return(
            <View style={{marginBottom: 55}}>
                <TouchableOpacity onPress={ () => { this.props.this.props.navigation.navigate('App'); } } style={{width: 50, height: 50, position: 'absolute', top: 15, left: 20}}>
                    <Ionicons name='md-arrow-back' size={24}/>
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: '700', position: 'absolute', top: 7, left: 85, fontFamily: 'Roboto'}}>{this.props.title}</Text>
                {/*<Image
                style={{width: 50, height: 50, borderWidth: 1, borderRadius: 25, borderColor: '#ccc', position: 'absolute', top: 8, right: 10 }}
                source={{uri: getInstaAccount(getUserInstaID()).avatar}}
                />
                <Image style={{width: 22, height: 22, position: 'absolute', top: 20, right: 3, borderWidth: 0, borderColor: '#fff', borderRadius: 20}} source={require('../assets/images/instaIcon.png')} />*/}
            </View>
        );
    }
}
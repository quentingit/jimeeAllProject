import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class JimeeButton extends Component {
    render() {
        return(
            <TouchableOpacity style={ this.props.style?this.props.style:{width: '100%'} } activeOpacity = { 0.8 } onPress={this.props.onPress}>
                <LinearGradient
                style = { styles.loginButton }
                colors={['#f58524', '#f92b7f']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                >
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}> {this.props.title} </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    loginButton: {
        borderColor: '#fff', 
        borderRadius: 12, 
        backgroundColor: '#3800bf', 
        borderWidth: 1, 
        height: 64, 
        textAlign: 'center', 
        justifyContent: 'center', 
        alignSelf: 'stretch',
        marginTop: 18,
        marginBottom: 18,
        paddingLeft: 15,
      }
});
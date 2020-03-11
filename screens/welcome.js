import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import backgroundImage from '../assets/background.png';

const Welcome = ({navigation}) => {
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImage}>
            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.欢迎}>欢迎</Text>
                    <Text style={styles.start}>Welcome</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    欢迎: {
        textAlign: 'center',
        fontSize: 140,
    },
    start: {
        textAlign: 'center',
        fontSize: 70,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover', // or 'stretch'
    },
});

export default Welcome;

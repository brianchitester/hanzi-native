import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
} from 'react-native';
import backgroundImage from '../assets/background.png';
import Head from '../components/head';

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const Study = ({navigation}) => {
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImage}>
            <SafeAreaView>
                <Head />
                <View>
                    <Text>欢迎</Text>
                    <Text>Read the docs to discover what to do next</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    menuIcon: {
        marginTop: 30,
        marginLeft: 30,
        fontSize: 30,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
});

export default Study;

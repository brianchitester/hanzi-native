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

const Home = ({navigation}) => {
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImage}>
            <SafeAreaView>
                <TouchableOpacity
                    style={styles.menuIcon}
                    onPress={() => navigation.openDrawer()}>
                    <Text>三</Text>
                </TouchableOpacity>
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
        margin: 10,
        fontSize: 32,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
});

export default Home;

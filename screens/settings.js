import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Button,
    Switch,
    TouchableHighlight,
    View,
} from 'react-native';
import backgroundImage from '../assets/background.png';
import AsyncStorage from '@react-native-community/async-storage';
import Head from '../components/head';

const updateSetting = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
};

const getSetting = async (key, setStateFunction, defaultValue) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            setStateFunction(value);
        } else if (defaultValue) {
            setStateFunction(defaultValue);
        }
    } catch (e) {
        console.error(e);
        setStateFunction(defaultValue);
    }
};

const Settings = ({navigation, switch1Value, toggleSwitch1}) => {
    const [characterCount, setCharacterCount] = useState('1000');
    const [switchVlaue, toggleSwitch] = useState(false);
    useEffect(() => {
        getSetting('@CharacterCount', setCharacterCount);
    }, []);
    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.backgroundImage}>
            <SafeAreaView>
                <Head />
                <ScrollView>
                    <Text
                        style={{
                            marginLeft: 20,
                        }}>
                        Character Count
                    </Text>
                    <TextInput
                        style={{
                            margin: 20,
                            width: 200,
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                        }}
                        onChangeText={text => setCharacterCount(text)}
                        onEndEditing={e => {
                            let text = e.nativeEvent.text;
                            let count = parseInt(text, 10);
                            if (count > 1000) text = '1000';
                            updateSetting('@CharacterCount', text);
                            setCharacterCount(text);
                        }}
                        maxLength={4}
                        value={characterCount}
                        keyboardType="numeric"
                        clearTextOnFocus
                    />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableHighlight
                            style={{
                                alignItems: 'center',
                                backgroundColor: switchVlaue
                                    ? '#DDDDDD'
                                    : '#111',
                                padding: 10,
                            }}
                            onPress={() => toggleSwitch(!switchVlaue)}>
                            <Text
                                style={{
                                    color: switchVlaue ? '#111' : '#DDDDDD',
                                }}>
                                {' '}
                                Touch Here{' '}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{
                                alignItems: 'center',
                                backgroundColor: switchVlaue
                                    ? '#111'
                                    : '#DDDDDD',
                                padding: 10,
                            }}
                            onPress={() => toggleSwitch(!switchVlaue)}>
                            <Text
                                style={{
                                    color: switchVlaue ? '#DDDDDD' : '#111',
                                }}>
                                {' '}
                                Touch Here{' '}
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View
                        style={{
                            margin: 20,
                            width: 200,
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                        }}>
                        <Button
                            title="Press me"
                            onPress={() => console.log('Simple Button pressed')}
                        />
                    </View>
                    <Button
                        title="Press me"
                        onPress={() => console.log('Simple Button pressed')}
                    />
                    <Switch onValueChange={toggleSwitch} value={switchVlaue} />
                </ScrollView>
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

export default Settings;

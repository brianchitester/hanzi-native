import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Head = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                Keyboard.dismiss();
                navigation.openDrawer();
            }}>
            <Text style={styles.menuIcon}>三</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuIcon: {
        marginTop: 30,
        marginLeft: 30,
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default Head;

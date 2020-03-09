import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const renderItems = items => {
    return items.map(item => {
        return (
            <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
        );
    });
};

const Sandbox = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.items}>
                {renderItems(['one', 'two', 'three', 'four'])}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    items: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 5,
        width: '100%',
        flexGrow: 1,
        flexShrink: 0,
    },
    item: {
        width: 200,
        borderWidth: 1,
        padding: 20,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 45,
    },
});

export default Sandbox;

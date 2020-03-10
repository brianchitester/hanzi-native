import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
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
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        padding: 5,
    },
    item: {
        width: Dimensions.get('window').width / 2 - 20,
        borderWidth: 1,
    },
    itemText: {
        fontSize: 25,
        padding: 20,
        textAlign: 'center',
    },
});

export default Sandbox;

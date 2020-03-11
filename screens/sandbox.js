import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Dimensions,
    FlatList,
    View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Head from '../components/head';

const Sandbox = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <Head />
            <View style={styles.items}>
                <FlatList
                    data={['one slightly longer one', 'two', 'three', 'four']}
                    numColumns={2}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.item}>
                            <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    itemText: {
        width: Dimensions.get('window').width / 2 - 20,
        height: 120,
        fontSize: 26,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 20,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default Sandbox;

import React from 'react';
import {StyleSheet} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Study from '../screens/study';
import Settings from '../screens/settings';
import Sandbox from '../screens/sandbox';

const Drawer = createDrawerNavigator();

const Main = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Study"
            drawerStyle={styles.drawer}
            drawerContentOptions={{
                activeTintColor: '#000',
                itemStyle: {padding: 10},
                labelStyle: {fontSize: 24},
            }}>
            <Drawer.Screen name="Study" component={Study} />
            <Drawer.Screen name="Profile" component={Study} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Sandbox" component={Sandbox} />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#eee',
    },
});

export default Main;

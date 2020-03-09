import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/welcome';
import Main from './Main';

const Stack = createStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome" headerMode="none">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    );
};

export default WelcomeStack;

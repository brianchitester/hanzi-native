import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeStack from './navigators/WelcomeStack';

const App = () => {
    return (
        <NavigationContainer>
            <WelcomeStack />
        </NavigationContainer>
    );
};

export default App;

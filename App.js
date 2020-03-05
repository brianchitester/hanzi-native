import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Text>Learn More</Text>
          <Text>Read the docs to discover what to do next:</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: 'white',
  },
});

export default App;

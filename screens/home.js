import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Text>欢迎</Text>
          <Text>Read the docs to discover what to do next</Text>
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

export default Home;

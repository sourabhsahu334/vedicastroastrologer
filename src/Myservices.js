import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import BackgroundService from 'react-native-background-actions';

const Myservices = () => {
  const statService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await sleep(delay);
        if (i == 10) {
          console.log('end chat');
          BackgroundService.stop();
        }
      }
    });
  };
  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  useEffect(() => {
    statService();
  }, []);

  return (
    <View>
      <Text>Myservices</Text>
    </View>
  );
};

export default Myservices;

const styles = StyleSheet.create({});

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const InfoBox = ({ message, duration = 3000, color = '#ff0000' }) => {
  const position = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.timing(position, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      slideOut();
    }, duration);

    slideIn();

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: color, // Define a cor do container dinamicamente
          transform: [
            {
              translateX: position.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 50],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '90%',
    left: 20,
    padding: 10,
    borderRadius: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default InfoBox;

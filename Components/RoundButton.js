import React, {useCallback, useRef} from 'react';
import {TouchableWithoutFeedback, StyleSheet, Animated} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes, faHeart} from '@fortawesome/free-solid-svg-icons';

const RoundButton = ({name, size, color,onPress}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animatedScale = useCallback(
    newVal => {
      Animated.spring(scale, {
        toValue: newVal,
        friction: 4,
        useNativeDriver: true,
      }).start();
    },
    [scale],
  );

  if (name === 'like') {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          animatedScale(0.8);
        }}
        onPressOut={() => {
          animatedScale(1);
          onPress();
        }}
        delayPressIn={0}
        delayPressOut={110}
      >
        <Animated.View style={[styles.container, {transform: [{scale}]}]}>
          <FontAwesomeIcon icon={faHeart} size={size} color={color} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          animatedScale(0.8);
        }}
        onPressOut={() => {
          animatedScale(1);
          onPress();
        }}
        delayPressIn={0}
        delayPressOut={110}>
        <Animated.View style={[styles.container, {transform: [{scale}]}]}>
          <FontAwesomeIcon icon={faTimes} size={size} color={color} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RoundButton;

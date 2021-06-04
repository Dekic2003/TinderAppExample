import React, {useCallback} from 'react';
import {Image, Text, View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ACTIONS_OFFSET, CARD} from '../data/constants';
import Choice from './Choice';

const ProfileCard = ({name, age,image, isFirst, swipe, tiltSign, ...rest}) => {
  const rotate = Animated.multiply(swipe.x,tiltSign).interpolate({
    inputRange: [-ACTIONS_OFFSET, 0, ACTIONS_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate}],
  };
  const likeOpacity=swipe.x.interpolate({
    inputRange:[30,ACTIONS_OFFSET],
    outputRange:[0,1],
    extrapolate:'clamp'
  })
  const nopeOpacity=swipe.x.interpolate({
    inputRange:[-ACTIONS_OFFSET,-30],
    outputRange:[1,0],
    extrapolate:'clamp'
  })

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View style={[styles.choiceContainer, styles.likeContainer,{opacity:likeOpacity}]}>
          <Choice type={'like'} />
        </Animated.View>
        <Animated.View style={[styles.choiceContainer, styles.nopeContainer, {opacity:nopeOpacity}]}>
          <Choice type={'nope'} />
        </Animated.View>
      </>
    );
  }, [likeOpacity,nopeOpacity]);
  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}>
      <Image style={styles.image} source={image} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />
      <Text style={styles.name}>{name}, {age}</Text>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 45,
  },
  image: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
  },
  name: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: CARD.BORDER_RADIUS,
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{rotate: '-30deg'}],
  },
  nopeContainer: {
    right: 45,
    transform: [{rotate: '30deg'}],
  },
});

export default ProfileCard;

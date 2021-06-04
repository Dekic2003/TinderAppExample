import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  PanResponder,
} from 'react-native';
import {users} from './data/data';
import ProfileCard from './Components/ProfileCard';
import Footer from './Components/Footer';
import {ACTIONS_OFFSET, CARD} from './data/constants';

const App = () => {
  const [profiles, setProfiles] = useState(users);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!profiles.length) {
      setProfiles(users);
    }
  }, [profiles.length]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTIONS_OFFSET;
      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCRREN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setProfiles(prevState => prevState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);
  const handleChoice = useCallback(
    direction => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCRREN,
        duration: 2000,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x],
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {profiles
        .map(({name, age, image}, i) => {
          const isFirst = i === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return (
            <ProfileCard
              key={i}
              name={name}
              age={age}
              image={image}
              isFirst={isFirst}
              {...dragHandlers}
              swipe={swipe}
              tiltSign={tiltSign}
            />
          );
        })
        .reverse()}
      <Footer handleChoice={handleChoice} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
});

export default App;

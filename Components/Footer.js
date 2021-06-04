import React from 'react';
import {View,StyleSheet} from 'react-native';
import RoundButton from './RoundButton';
import {COLORS} from '../data/constants';

const Footer = ({handleChoice}) => {
  return (
    <View style={styles.container}>
      <RoundButton name={'nope'} size={40} color={COLORS.nope} onPress={()=>handleChoice(-1)}/>
      <RoundButton name={'like'} size={34} color={COLORS.like} onPress={()=>handleChoice(1)}/>
    </View>
  );
};
const styles=StyleSheet.create({
  container:{
    position:'absolute',
    bottom:15,
    width:170,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    zIndex:-1
  },

})
export default Footer;

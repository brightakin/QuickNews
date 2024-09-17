import React from 'react';
import {StyleSheet, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const CardView = ({children, customStyles, colors}: any): JSX.Element => {
  return (
    <View style={[styles.card, customStyles, {backgroundColor: colors.card}]}>
      {children}
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    height: heightPercentageToDP(30),
    paddingVertical: heightPercentageToDP(2),
  },
});

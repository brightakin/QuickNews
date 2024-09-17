import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CUSTOMFONT_REGULAR} from '../../constants/fonts';
import {COLORS} from '../../constants/theme';
import {Text} from 'react-native';
import {fontPixel, heightPixel} from '../../utils/normalize';
import React from 'react';
// import {trigger} from 'react-native-haptic-feedback';

// Optional configuration
// const options = {
//   enableVibrateFallback: true,
//   ignoreAndroidSystemSettings: false,
// };

const Button = ({
  colors,
  title,
  loading,
  dark,
  customStyles,
  onPress,
  titleStyles,
  disabled,
  children,
}: any): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={() => {
        if (loading) {
          return;
        } else {
          onPress();
          // trigger('impactMedium', options);
        }
      }}
      style={[
        styles.bgContainer,
        {
          backgroundColor: disabled
            ? 'rgba(40, 167, 69, 0.39)'
            : COLORS.primaryOrange,
        },
        customStyles,
      ]}>
      {!loading && (
        <Text style={[styles.primaryText, {color: 'white'}, titleStyles]}>
          {title} {children ?? children}
        </Text>
      )}
      {loading && <ActivityIndicator size="small" color="white" />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
  },
  primaryText: {
    fontSize: fontPixel(16),
    fontFamily: CUSTOMFONT_REGULAR,
    textAlign: 'center',
    lineHeight: 16.13,
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: heightPercentageToDP(1.2),
    fontFamily: CUSTOMFONT_REGULAR,
    textAlign: 'center',
  },
  bgContainer: {
    backgroundColor: COLORS.primaryGreen,
    paddingHorizontal: heightPixel(15),
    paddingVertical: heightPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});

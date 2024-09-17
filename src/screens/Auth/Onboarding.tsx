import {StyleSheet, Text} from 'react-native';
import {CUSTOMFONT_REGULAR} from '../../constants/fonts';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {fontPixel, heightPixel, widthPixel} from '../../utils/normalize';
import {COLORS} from '../../constants/theme';
import Button from '../../components/shared/Button';
import {LOGIN, SIGNUP} from '../../navigation/routes';

const OnboardingScreen = ({navigation}: any): JSX.Element => {
  return (
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={[styles.container, {backgroundColor: COLORS.primaryOrange}]}>
      <Text
        style={[
          styles.secondaryText,
          {
            color: COLORS.white,
            fontSize: fontPixel(70),
            marginTop: heightPercentageToDP(2),
            fontFamily: CUSTOMFONT_REGULAR,
          },
        ]}>
        Follow latest tech news
      </Text>
      <Text
        style={[
          styles.secondaryText,
          {
            color: COLORS.white,
            fontSize: fontPixel(75),
            fontWeight: '700',
            fontFamily: CUSTOMFONT_REGULAR,
          },
        ]}>
        easily & quickly
      </Text>
      <Text
        style={[
          styles.secondaryText,
          {
            color: COLORS.greyTextLight,
            fontSize: fontPixel(13.33),
            fontWeight: '300',
            fontFamily: CUSTOMFONT_REGULAR,
            width: widthPixel(250),
            marginTop: heightPixel(10),
          },
        ]}>
        Our news app is the perfect way to stay on top of all tech news
      </Text>
      <Button
        title="Create an account"
        onPress={() => {
          navigation.navigate(SIGNUP);
        }}
        customStyles={[
          {
            marginTop: heightPixel(100),
            backgroundColor: COLORS.white,
          },
        ]}
        titleStyles={[{color: COLORS.greyText}]}
      />
      <Button
        title="I already have an account"
        onPress={() => {
          navigation.navigate(LOGIN);
        }}
        customStyles={[
          {
            marginTop: heightPercentageToDP(4),
            backgroundColor: COLORS.primaryOrange,
            borderWidth: 1,
            borderColor: COLORS.white,
          },
        ]}
        titleStyles={[{color: COLORS.white}]}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: heightPercentageToDP(2.5),
    paddingTop: heightPercentageToDP(4),
  },
  flexContainer: {
    flexDirection: 'row',
  },
  noDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    height: 90,
  },
  primaryText: {
    fontSize: heightPercentageToDP(1.9),
    fontFamily: CUSTOMFONT_REGULAR,
    fontWeight: 600,
  },
  secondaryText: {
    fontSize: heightPercentageToDP(1.2),
    fontFamily: CUSTOMFONT_REGULAR,
  },
});

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import {CUSTOMFONT_REGULAR} from '../../constants/fonts';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/shared/Header';
import React from 'react';
import {fontPixel, heightPixel} from '../../utils/normalize';
import Button from '../../components/shared/Button';
import {logoutUser} from '../../redux/slices/auth';
import {useAppDispatch} from '../../hooks/reduxHooks';

const About = ({navigation, route}: any): JSX.Element => {
  const {colors}: any = useTheme();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={[styles.container, {backgroundColor: colors.homeBg}]}>
      <Header title={'About Me'} navigation={navigation} colors={colors} />
      <Text
        style={[
          styles.secondaryText,
          {
            color: colors.text,
            fontSize: fontPixel(16),
            marginTop: heightPercentageToDP(2),
            fontWeight: '300',
            lineHeight: 23,
          },
        ]}>
        My name is Akinkuotu Bright, I am a software engineer who has focused on
        developing efficient and impactful react native applications for more
        than three years. I have worked across industries and sectors leaving my
        mark everytime i write a line of code. I have also impacted junior
        developers when I was given leadership roles ensuring the progress and
        success of the company even when I am not there anymore. Due to my
        unending love for new challenges and making an impact across countries,
        I decided that a role at Quickcheck would be a good step in my career
        and will also serve as a testament to my mantra of making an impact.
        Additionally I’m a highly motivated, diligent, hardworking and honest
        young man enthusiastic about contributing towards achieving outlined
        objectives and team success, through thoughtful approaches driven by
        utmost passion for excellence. I would welcome the opportunity to be a
        part of your outstanding workforce. Thank you for your time and
        consideration, I look forward to hearing from you.
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logoutUser());
        }}
        customStyles={[
          {
            marginTop: heightPixel(30),
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default About;

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

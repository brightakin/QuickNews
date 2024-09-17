import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';

// Styles && Constants && SVGs
import Styles from './styles';
import {COLORS} from '../../constants/theme';
import styles from './styles';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CUSTOMFONT_REGULAR} from '../../constants/fonts';
import Feather from 'react-native-vector-icons/Feather';
import {CustomTextInputProps} from '../../@types/defaultProps';

const CustomInput = ({
  children,
  touched,
  error,
  direction,
  icon,
  onPress,
  rtlIcon,
  conduit,
  colors,
  dark,
  customStyle,
  placeholderText,
  email,
  setLoading,
  setOtp,
  ...props
}: CustomTextInputProps): JSX.Element => {
  let borderColor;
  if (touched && error) {
    borderColor = 'red';
  } else if (touched && !error) {
    borderColor = COLORS.primaryGreen;
  } else {
    borderColor = colors.card;
  }

  if (direction === 'password') {
    return (
      <View
        style={[
          Styles.container,
          {
            backgroundColor: colors.card,
            borderRightWidth: heightPercentageToDP(0.5),
            borderRightColor: borderColor,
          },
        ]}>
        <View style={[Styles.innerField]}>
          <View style={[Styles.input]}>
            <TextInput
              underlineColorAndroid="transparent"
              textAlign="left"
              placeholderTextColor={colors.text}
              placeholder={placeholderText}
              // secure
              style={[
                {
                  fontFamily: CUSTOMFONT_REGULAR,
                  padding: heightPercentageToDP(1),
                  color: colors.text,
                  fontWeight: '300',
                },
              ]}
              {...props}
            />
          </View>
          <TouchableOpacity onPress={onPress}>
            <Feather
              name={icon}
              size={heightPercentageToDP(2)}
              color={COLORS.darkGray}
              style={[{marginHorizontal: heightPercentageToDP(1)}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (direction === 'default') {
    return (
      <View
        style={[
          Styles.container,
          {
            backgroundColor: colors.card,
            borderRightWidth: heightPercentageToDP(0.5),
            borderRightColor: borderColor,
          },
          customStyle,
        ]}>
        <View style={[Styles.innerField]}>
          <View style={[Styles.input]}>
            <TextInput
              underlineColorAndroid="transparent"
              textAlign="left"
              placeholderTextColor={colors.text}
              placeholder={placeholderText}
              // secure
              style={[
                {
                  fontFamily: CUSTOMFONT_REGULAR,
                  padding: heightPercentageToDP(1),
                  color: colors.text,
                  fontWeight: '300',
                },
              ]}
              {...props}
            />
          </View>
        </View>
      </View>
    );
  }

  if (direction === 'phone') {
    return (
      <View
        style={[
          Styles.container,
          {
            backgroundColor: colors.card,
            borderRightWidth: heightPercentageToDP(0.5),
            borderRightColor: borderColor,
          },
          customStyle,
        ]}>
        <View style={[Styles.innerField]}>
          <View style={[Styles.input]}>
            <View style={[styles.flexContainer]}>
              <View style={[{marginRight: heightPercentageToDP(0.1)}]}></View>
              <Text
                style={[
                  {
                    fontSize: heightPercentageToDP(1.8),
                    marginRight: heightPercentageToDP(0.2),
                    color: colors.text,
                  },
                ]}>
                +1
              </Text>
              <AntDesign
                name={'down'}
                size={heightPercentageToDP(2)}
                color={COLORS.darkGray}
                style={[{marginHorizontal: heightPercentageToDP(1)}]}
              />
              <TextInput
                underlineColorAndroid="transparent"
                textAlign="left"
                placeholderTextColor={colors.text}
                placeholder={placeholderText}
                // secure
                style={[
                  {
                    fontFamily: CUSTOMFONT_REGULAR,
                    padding: heightPercentageToDP(1),
                    color: colors.text,
                    fontWeight: '300',
                  },
                ]}
                {...props}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return <View></View>;
};

export default CustomInput;

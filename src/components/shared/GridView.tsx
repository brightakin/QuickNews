import React, {memo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {WEBVIEW} from '../../navigation/routes';
import {fontPixel, heightPixel, widthPixel} from '../../utils/normalize';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GridView = ({item, navigation}: any) => {
  const {colors}: any = useTheme();

  return (
    <View
      style={[
        {
          marginVertical: heightPixel(10),
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lineGrey,
          paddingVertical: heightPixel(10),
          width: widthPixel(380),
        },
      ]}>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
        onPress={(): any => {
          navigation.navigate(WEBVIEW, {
            title: item?.title,
            url: item?.url,
          });
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.textDesc, {color: colors.text}]}>
          {item.title}
        </Text>
        <AntDesign name={'right'} color={''} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(GridView);

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: heightPercentageToDP(18),
    marginHorizontal: heightPercentageToDP(2),
  },
  cardGrid: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 11,
    marginVertical: heightPercentageToDP(2),
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageGrid: {
    width: '100%',
    minHeight: 156,
    marginBottom: 6,
    flex: 1,
    marginTop: heightPercentageToDP(2),
  },
  imageList: {
    width: 72,
    height: 71,
  },
  image: {
    width: heightPercentageToDP(40),
    height: heightPercentageToDP(18),
  },
  textDesc: {
    fontFamily: 'Muli-SemiBold',
    fontSize: fontPixel(16),
    fontWeight: '300',
  },
  textInfo: {
    fontFamily: 'Muli-SemiBold',
  },
  activeHours: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  hoursText: {
    fontFamily: 'Muli-SemiBold',
    textAlign: 'center',
  },
  cardTextContainer: {
    marginLeft: 15,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

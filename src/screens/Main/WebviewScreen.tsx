import {SafeAreaView, StyleSheet, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {WebView} from 'react-native-webview';
import {CUSTOMFONT_REGULAR} from '../../constants/fonts';
import {useTheme} from '@react-navigation/native';
import Header from '../../components/shared/Header';
import React from 'react';
import {heightPixel} from '../../utils/normalize';

const WebViewScreen = ({navigation, route}: any) => {
  const url = route.params.url;
  const title = route.params.title;
  1;
  const {colors}: any = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: heightPercentageToDP(2),
          marginTop: heightPercentageToDP(4),
        }}>
        <Header
          title={title?.slice(0, 30)}
          navigation={navigation}
          colors={colors}
        />
      </View>
      <WebView
        source={{uri: url}}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{marginTop: 0}}
        allowFileAccess={true}
        scalesPageToFit={true}
        onNavigationStateChange={() => {}}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: heightPixel(30),
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryText: {
    fontSize: heightPercentageToDP(2.3),
    fontFamily: CUSTOMFONT_REGULAR,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: heightPercentageToDP(1.2),
    fontFamily: CUSTOMFONT_REGULAR,
    textAlign: 'center',
  },
  networkContainer: {
    width: heightPercentageToDP(20),
    height: heightPercentageToDP(3),
    backgroundColor: 'rgba(95, 161, 213, 0.2)',
    alignSelf: 'center',
    marginVertical: heightPercentageToDP(4),
    borderRadius: 50,
  },
});

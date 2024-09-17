import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CUSTOMFONT_REGULAR} from '../../constants/fonts';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {FORGOTPASSWORD, SIGNUP} from '../../navigation/routes';
import {loginUserSuccess} from '../../redux/slices/auth';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {COLORS} from '../../constants/theme';
import React from 'react';
import {useToggleVisibility} from '../../hooks/passwordVisibility';
import {LoginSchema} from '../../schemas';
import {Formik} from 'formik';
import {fontPixel, heightPixel} from '../../utils/normalize';
import CustomInput from '../../components/CustomInput';
import Button from '../../components/shared/Button';
import {getDBConnection, signIn} from '../../utils/dbService';

const LoginScreen = ({navigation}: any): JSX.Element => {
  const {isPasswordVisible, Icon, togglePasswordVisibility} =
    useToggleVisibility();
  const [loading, setLoading]: any = useState();
  const {colors, dark}: any = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View>
            <Text style={[styles.primaryText, {color: colors.text}]}>
              Welcome Back✌🏽
            </Text>
            <Text
              style={[
                styles.primaryText,
                {
                  fontSize: fontPixel(13),
                  color: COLORS.greyText,
                  lineHeight: 20,
                  fontWeight: '300',
                },
              ]}>
              Log into your account to continue from where you stopped
            </Text>
          </View>
          <Formik
            validationSchema={LoginSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={async (values, actions): Promise<void> => {
              setLoading(true);
              try {
                const db = await getDBConnection();
                const [response] = await signIn(
                  db,
                  values.email,
                  values.password,
                );

                if (response.rows.length > 0) {
                  dispatch(loginUserSuccess(values.email));
                } else {
                  Alert.alert(
                    'Error',
                    'Login details are invalid. Check and try again',
                  );
                }
              } catch (error: any) {
                Alert.alert(
                  'Error',
                  'Login details are invalid. Check and try again',
                );
              }

              setLoading(false);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
            }) => (
              <>
                <View style={[{marginTop: heightPercentageToDP(5)}]}>
                  <Text
                    style={[
                      styles.primaryText,
                      {
                        fontSize: fontPixel(13),
                        color: colors.text,
                        lineHeight: 20,
                        marginBottom: heightPixel(7),
                        fontWeight: '300',
                      },
                    ]}>
                    Email
                  </Text>
                  <CustomInput
                    conduit={''}
                    direction="default"
                    dark={dark}
                    customStyle={[]}
                    colors={colors}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onBlur={handleBlur('email')}
                    touched={touched.email}
                    error={errors.email}
                    returnKeyType="next"
                    enablesReturnKeyAutomatically={true}
                    placeholderText={'Email Address'}
                  />
                </View>
                <View style={[{marginTop: heightPercentageToDP(4)}]}>
                  <Text
                    style={[
                      styles.primaryText,
                      {
                        fontSize: fontPixel(13),
                        color: colors.text,
                        lineHeight: 20,
                        marginBottom: heightPixel(7),
                        fontWeight: '300',
                      },
                    ]}>
                    Password
                  </Text>
                  <CustomInput
                    conduit={''}
                    direction="password"
                    dark={dark}
                    customStyle={[{}]}
                    colors={colors}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    autoCapitalize="none"
                    keyboardType="default"
                    onBlur={handleBlur('password')}
                    touched={touched.password}
                    error={errors.password}
                    returnKeyType="next"
                    icon={Icon}
                    secureTextEntry={isPasswordVisible}
                    enablesReturnKeyAutomatically={true}
                    onPress={togglePasswordVisibility}
                    placeholderText={'Password'}
                  />
                </View>
                <Button
                  title="Sign In"
                  onPress={handleSubmit}
                  loading={loading}
                  customStyles={[
                    {
                      marginTop: heightPixel(62),
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(FORGOTPASSWORD);
                  }}>
                  <Text
                    style={[
                      styles.secondaryText,
                      {
                        color: COLORS.primaryOrange,
                        textAlign: 'center',
                        marginTop: heightPixel(28),
                      },
                    ]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(SIGNUP);
                  }}>
                  <Text
                    style={[
                      styles.secondaryText,
                      {
                        color: COLORS.greyText,
                        fontSize: heightPercentageToDP(1.5),
                        flex: 1,
                        textAlign: 'center',
                        marginTop: heightPixel(30),
                      },
                    ]}>
                    Don't have an account?<Text> </Text>
                    <Text style={{color: COLORS.primaryOrange}}>Sign Up</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: heightPercentageToDP(2.5),
    paddingVertical: heightPercentageToDP(4),
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryText: {
    fontSize: heightPercentageToDP(3),
    fontFamily: CUSTOMFONT_REGULAR,
    fontWeight: '700',
  },
  secondaryText: {
    fontSize: heightPercentageToDP(2),
    fontFamily: CUSTOMFONT_REGULAR,
    fontWeight: '300',
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

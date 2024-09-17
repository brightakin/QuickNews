import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyboardAvoidingView from '../../components/shared/KeyboardAvoidingView';
import {CUSTOMFONT_BOLD, CUSTOMFONT_REGULAR} from '../../constants/fonts';
import CustomInput from '../../components/CustomInput';
import {SignupSchema} from '../../schemas';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import {useToggleVisibility} from '../../hooks/passwordVisibility';
import Button from '../../components/shared/Button';
import {Formik} from 'formik';
import {LOGIN} from '../../navigation/routes';
import {COLORS} from '../../constants/theme';
import React from 'react';
import {getDBConnection, signUp} from '../../utils/dbService';
import {fontPixel, heightPixel, widthPixel} from '../../utils/normalize';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const SignUpScreen = ({navigation}: any): JSX.Element => {
  const [loading, setLoading]: any = useState();
  const {colors, dark}: any = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {isPasswordVisible, Icon, togglePasswordVisibility} =
    useToggleVisibility();
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const renderPasswordCriteria = () => (
    <View style={styles.criteriaContainer}>
      {Object.entries(passwordCriteria).map(([key, value]) => (
        <View
          key={key}
          style={[styles.criteriaItem, value && styles.criteriaItemMet]}>
          <Text
            style={[
              styles.criteriaText,
              {color: dark ? COLORS.backgroundGray : '#4D4D4D'},
              value && styles.criteriaTextMet,
            ]}>
            {key === 'length' && 'At least 8 characters'}
            {key === 'uppercase' && 'One uppercase letter'}
            {key === 'number' && 'One number'}
            {key === 'specialChar' && 'One special character (e.g., !@#$%)'}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View
            style={[
              {alignItems: 'center', marginTop: heightPercentageToDP(4)},
            ]}>
            <Text
              style={[
                styles.primaryText,
                {marginTop: heightPercentageToDP(4), color: colors.text},
              ]}>
              Sign up with email
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {
                  marginTop: heightPixel(4),
                  color: colors.text,
                  textAlign: 'center',
                },
              ]}>
              Get started today with the best and most recent tech stories
            </Text>
          </View>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              firstName: '',
              lastName: '',
              emailAddress: '',
              password: '',
            }}
            onSubmit={async (values: any, actions: any): Promise<void> => {
              setLoading(true);
              try {
                const user = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.emailAddress,
                  password: values.password,
                };
                const db = await getDBConnection();
                const response = await signUp(db, user);
                if (response) {
                  navigation.navigate(LOGIN);
                }
              } catch (error: any) {
                Alert.alert('Error', 'User alredy exists');
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
                <View
                  style={[
                    {marginTop: heightPercentageToDP(8)},
                    styles.flexContainer,
                  ]}>
                  <CustomInput
                    conduit={''}
                    direction="default"
                    dark={dark}
                    customStyle={[{width: '48%'}]}
                    colors={colors}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    autoCapitalize="none"
                    keyboardType="default"
                    onBlur={handleBlur('firstName')}
                    touched={touched.firstName}
                    error={errors.firstName}
                    returnKeyType="next"
                    enablesReturnKeyAutomatically={true}
                    placeholderText={'First Name'}></CustomInput>
                  <CustomInput
                    conduit={''}
                    direction="default"
                    dark={dark}
                    customStyle={[{width: '48%'}]}
                    colors={colors}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    autoCapitalize="none"
                    keyboardType="default"
                    onBlur={handleBlur('lastName')}
                    touched={touched.lastName}
                    error={errors.lastName}
                    returnKeyType="next"
                    enablesReturnKeyAutomatically={true}
                    placeholderText={'Last Name'}></CustomInput>
                </View>

                <View style={[{marginTop: heightPercentageToDP(4)}]}>
                  <CustomInput
                    conduit={''}
                    direction="default"
                    dark={dark}
                    customStyle={[{}]}
                    colors={colors}
                    value={values.emailAddress}
                    onChangeText={handleChange('emailAddress')}
                    autoCapitalize="none"
                    keyboardType="default"
                    onBlur={handleBlur('emailAddress')}
                    touched={touched.emailAddress}
                    error={errors.emailAddress}
                    returnKeyType="next"
                    icon={Icon}
                    enablesReturnKeyAutomatically={true}
                    placeholderText={'Email Address'}></CustomInput>
                </View>
                <View style={[{marginTop: heightPercentageToDP(4)}]}>
                  <CustomInput
                    conduit={''}
                    direction="password"
                    dark={dark}
                    customStyle={[{}]}
                    colors={colors}
                    value={values.password}
                    onChangeText={text => {
                      handleChange('password')(text);
                      validatePassword(text);
                    }}
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
                    placeholderText={'Password'}></CustomInput>
                </View>
                {renderPasswordCriteria()}
                <Button
                  title="Done"
                  onPress={handleSubmit}
                  loading={loading}
                  customStyles={[
                    {
                      marginTop: heightPercentageToDP(4),
                    },
                  ]}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(LOGIN);
                  }}>
                  <Text
                    style={[
                      styles.secondaryText,
                      {
                        color: colors.text,
                        fontSize: heightPercentageToDP(1.5),
                        flex: 1,
                        textAlign: 'center',
                        marginTop: heightPercentageToDP(2),
                        fontWeight: '300',
                      },
                    ]}>
                    Don't have an account?<Text> </Text>
                    <Text style={{color: COLORS.primaryOrange}}>Login</Text>
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

export default SignUpScreen;

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
    fontSize: fontPixel(23.33),
    fontFamily: CUSTOMFONT_REGULAR,
    fontWeight: '600',
  },
  secondaryText: {
    fontSize: heightPercentageToDP(1.5),
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
  headerContainer: {
    marginTop: heightPixel(50),
  },
  headerText: {
    fontSize: fontPixel(23.04),
    fontWeight: '500',
    lineHeight: 23.22,
    marginBottom: heightPixel(8),
  },
  subHeaderText: {
    fontSize: fontPixel(11.11),
    lineHeight: 16,
    fontFamily: CUSTOMFONT_REGULAR,
    fontWeight: '300',
  },
  inputContainer: {
    marginTop: heightPixel(32),
  },
  input: {
    width: '100%',
  },
  criteriaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: heightPixel(32),
  },
  criteriaItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: hp(1),
    margin: hp(0.75),
  },
  criteriaItemMet: {
    borderColor: COLORS.primaryOrange,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  criteriaText: {
    fontSize: fontPixel(11.11),
    fontFamily: CUSTOMFONT_REGULAR,
    color: '#666',
    lineHeight: 11.23,
  },
  criteriaTextMet: {
    color: COLORS.primaryOrange,
  },
  referralText: {
    fontSize: hp(1.4),
    fontFamily: CUSTOMFONT_REGULAR,
    marginBottom: hp(2.5),
  },
  submitButton: {
    marginTop: heightPixel(80),
  },
  termsContainer: {
    marginTop: heightPixel(60),
    alignItems: 'center',
  },
  termsText: {
    fontSize: fontPixel(11.11),
    fontFamily: CUSTOMFONT_REGULAR,
    textAlign: 'center',
    color: COLORS.greyText,
    lineHeight: 11.23,
  },
  highlightText: {
    color: COLORS.primaryOrange,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 42, 42, 0.50)',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  modalContent: {
    backgroundColor: COLORS.darkBackgroundGray,
    padding: heightPixel(23),
    borderRadius: 10,
    width: widthPixel(345),
  },
  congratulationsContainer: {
    alignItems: 'center',
  },
  successText: {
    fontSize: fontPixel(23.04),
    lineHeight: 23.22,
    fontFamily: CUSTOMFONT_BOLD,
    marginTop: heightPixel(23.7),
    color: COLORS.white,
  },
  successSubText: {
    fontSize: fontPixel(16),
    marginTop: heightPixel(19),
    fontFamily: CUSTOMFONT_BOLD,
    color: COLORS.white,
    lineHeight: 16.17,
    fontWeight: '300',
  },
  successMuteText: {
    fontSize: fontPixel(11.11),
    lineHeight: 23,
    fontFamily: CUSTOMFONT_REGULAR,
    color: COLORS.greyTextLight,
    fontWeight: '300',
  },
  loginButton: {
    backgroundColor: COLORS.primaryOrange,
    paddingVertical: heightPixel(15),
    borderRadius: 24,
    alignItems: 'center',
    width: '100%',
    marginTop: heightPixel(17),
  },
  loginButtonText: {
    color: 'white',
    fontFamily: CUSTOMFONT_BOLD,
    fontSize: fontPixel(16),
  },
  label: {
    paddingBottom: heightPercentageToDP(1),
    fontSize: fontPixel(13.33),
    lineHeight: 13.47,
    fontWeight: '300',
  },
  signInText: {
    fontFamily: CUSTOMFONT_REGULAR,
    fontSize: fontPixel(13.33),
    textAlign: 'center',
    marginTop: heightPixel(16),
    lineHeight: 13.47,
    fontWeight: '300',
    color: COLORS.greyText,
  },
  signInHighlight: {
    color: COLORS.primaryOrange,
  },
});

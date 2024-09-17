import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/Auth/SignUp';
import LoginScreen from '../screens/Auth/Login';
import {FORGOTPASSWORD, LOGIN, ONBOARDING, SIGNUP} from './routes';
import OnboardingScreen from '../screens/Auth/Onboarding';
import ForgotPassword from '../screens/Auth/ForgotPassword';

const AuthStack: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{
          gestureEnabled: false,
        }}
        name={ONBOARDING}
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
        }}
        name={LOGIN}
        component={LoginScreen}
      />

      <Stack.Screen
        options={{
          gestureEnabled: false,
        }}
        name={SIGNUP}
        component={SignUpScreen}
      />

      <Stack.Screen
        options={{
          gestureEnabled: false,
        }}
        name={FORGOTPASSWORD}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

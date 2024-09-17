import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import AuthStack from './authStack';
import {useAppSelector} from '../hooks/reduxHooks';
import {authentication} from '../redux/slices/auth';
import MainStack from './mainStack';

const AppNavigation = (): JSX.Element => {
  const Stack = createStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const {authenticated} = useAppSelector(authentication);

  return (
    <PaperProvider theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        {authenticated ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigation;

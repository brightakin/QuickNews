import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BOTTOMTABS, NEWSDETAILS, WEBVIEW} from './routes';
import NewsDetailsScreen from '../screens/Main/NewsDetails';
import BottomStack from './BottomStack';
import WebViewScreen from '../screens/Main/WebviewScreen';

const MainStack: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={BOTTOMTABS} component={BottomStack} />
      <Stack.Screen name={NEWSDETAILS} component={NewsDetailsScreen} />
      <Stack.Screen name={WEBVIEW} component={WebViewScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

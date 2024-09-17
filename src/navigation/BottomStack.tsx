import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../constants/theme';
import {useTheme} from 'react-native-paper';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {ABOUT, NEWSLISTING} from './routes';
import NewsListingScreen from '../screens/Main/NewsListing';
import About from '../screens/Main/About';

const BottomStack: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const BottomTab = createMaterialBottomTabNavigator();

  return (
    <BottomTab.Navigator
      initialRouteName={NEWSLISTING}
      barStyle={{backgroundColor: theme.colors.background}}
      activeColor={isDarkMode ? COLORS.bottomWhite : COLORS.black}
      inactiveColor={COLORS.bottomNeutral}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: any;

          if (route.name === NEWSLISTING) {
            iconName = 'home';
          } else if (route.name === ABOUT) {
            iconName = 'user';
          }
          // You can return any component that you like here!
          return (
            <TouchableOpacity onPress={() => {}}>
              <AntDesign
                name={iconName}
                color={
                  isDarkMode
                    ? focused
                      ? COLORS.bottomWhite
                      : COLORS.bottomNeutral
                    : focused
                    ? COLORS.black
                    : COLORS.bottomNeutral
                }
                size={25}
              />
            </TouchableOpacity>
          );
        },
      })}>
      <BottomTab.Screen name={NEWSLISTING} component={NewsListingScreen} />
      {/* <BottomTab.Screen name={LEADERBOARD} component={LeaderBoard} /> */}
      <BottomTab.Screen name={ABOUT} component={About} />
    </BottomTab.Navigator>
  );
};

export default BottomStack;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import NewsScreen from "../screens/NewsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Provider } from "react-native-paper";
import {
    ThemeDark,
    ThemeLight,
    ThemeDarkNavigation,
    ThemeLightNavigation,
  } from "../config/theme";
  import { useTheme } from "../contexts/ThemeContexts";
  import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LocationScreen from "../screens/LocationScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isDarkTheme } = useTheme();

    const theme = isDarkTheme ? ThemeDark : ThemeLight;
    const themeNavigation = isDarkTheme
      ? ThemeDarkNavigation
      : ThemeLightNavigation;

  return (
    <Provider theme={theme}>
    <NavigationContainer theme={themeNavigation}>
      <Stack.Navigator>
        <Stack.Screen
         name="Login"
          component={LoginScreen} />
        <Stack.Screen
         name="News"
          component={NewsScreen} 
          />
        <Stack.Screen
         name="Register"
         component={RegisterScreen}
        />
        <Stack.Screen 
         name="Home"
         component={TabsNavigation}
         />
         <Stack.Screen 
         name="Location"
         component={LocationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const Tabs = createMaterialBottomTabNavigator();

export function TabsNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={TabsNavigation} />
    </Tabs.Navigator>
  );
}
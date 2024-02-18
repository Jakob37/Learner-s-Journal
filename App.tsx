import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';

const ds = {
  colors: {
    primary: 'blue',
  },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    dark: ds.colors.primary,
    light: ds.colors.primary,
    background: ds.colors.primary,
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Test() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

function Main() {
  return (
    <View>
      <Text>Main</Text>
    </View>
  );
}

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen name="main" component={Main}></Stack.Screen>
      <Stack.Screen name="test" component={Test}></Stack.Screen>
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={MyTheme}>
      <Navigation></Navigation>
    </NavigationContainer>
  );
}

export default App;

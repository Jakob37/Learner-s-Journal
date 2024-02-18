import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';

const ds = {
  colors: {
    primary: 'darkred',
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

type RootStackParamList = {
  Home: undefined; // no params expected to be passed to route named Home
  Main: { itemId: number; otherParam: string }; // Details expects an object with itemId and otherParam
  Test: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
  route: RouteProp<RootStackParamList, 'Main'>;
};

// const Stack = createStackNavigator();

function Test() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

function Main({ navigation }: Props) {
  return (
    <View>
      <Button
        title="Go to test"
        onPress={() => {
          navigation.navigate('Test');
        }}></Button>
    </View>
  );
}

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main}></Stack.Screen>
      <Stack.Screen name="Test" component={Test}></Stack.Screen>
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

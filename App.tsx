import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DefaultTheme,
  NavigationContainer,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';

const ds = {
  colors: {
    primary: 'darkred',
  },
};

type Card = {
  id: number;
  title: string;
  body: string;
};

const dummyCards: Card[] = [
  { id: 1, title: 'Card A', body: 'My body is a cage' },
  { id: 2, title: 'Card B', body: 'My body is a cage' },
  { id: 3, title: 'Card C', body: 'My body is a cage' },
  { id: 4, title: 'Card D', body: 'My body is a cage' },
];

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
  JournalEntry: { card: Card };
};

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
  route: RouteProp<RootStackParamList, 'Main'>;
};

// const Stack = createStackNavigator();

function JournalEntry() {
  const route = useRoute<RouteProp<RootStackParamList, 'JournalEntry'>>();
  const { card } = route.params;

  return (
    <View>
      <Text>{card.title}</Text>
      <Text>{card.body}</Text>
    </View>
  );
}

function Main({ navigation }: Props) {
  return (
    <View>
      <FlatList
        data={dummyCards}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title={item.title}
              onPress={() => {
                navigation.navigate('JournalEntry', { card: item });
              }}></Button>
          </View>
        )}></FlatList>
    </View>
  );
}

function Navigation() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="JournalEntry" component={JournalEntry}></Stack.Screen>
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

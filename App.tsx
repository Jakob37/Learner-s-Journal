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
import React, { createContext, useContext, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const ds = {
  colors: {
    primary: '#B83B5E',
    secondary: '#0F4C75',
  },
  text: {
    header: 30,
    body: 20,
  },
  size: {
    s: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    fontSize: 20,
    padding: 10,
    margin: 10,
  },
  button: {
    color: '#6A2C70',
  },
};

interface JournalContextType {
  cards: Card[];
  addCard: (card: Card) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

const JournalProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(dummyCards);

  const addCard = (card: Card) => {
    setCards(currentCards => [...currentCards, card]);
  };

  return (
    <JournalContext.Provider value={{ cards, addCard }}>
      {children}
    </JournalContext.Provider>
  );
};

function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('Context error, likely a dev bug');
  }
  return context;
}

type Card = {
  id: string;
  title: string;
  body: string;
};

const dummyCards: Card[] = [
  {
    id: '1',
    title: 'Best color combinations',
    body: 'Delve into the intricacies of new Chinese grammar, where structure meets fluidity. As the language evolves, so do its rules, adapting to contemporary usage and communication needs. Learn about the latest grammatical trends that simplify learning, making it more accessible to beginners and advanced learners alike, bridging traditional foundations with modern expressions.',
  },
  {
    id: '2',
    title: 'New Chinese grammar',
    body: 'Delve into the intricacies of new Chinese grammar, where structure meets fluidity. As the language evolves, so do its rules, adapting to contemporary usage and communication needs. Learn about the latest grammatical trends that simplify learning, making it more accessible to beginners and advanced learners alike, bridging traditional foundations with modern expressions.',
  },
  {
    id: '3',
    title: 'African culture',
    body: 'African culture is a tapestry of diversity, rich in tradition, art, and community spirit. From the rhythmic beats of the djembe to the intricate patterns of kente cloth, every element tells a story of heritage and identity. Explore the vast array of languages, customs, and cuisines that make up this vibrant continent, celebrating a legacy that continues to influence global culture.',
  },
  {
    id: '4',
    title: 'How to clean dishwasher',
    body: 'Keeping your dishwasher clean ensures it runs efficiently and your dishes sparkle. Start by removing and rinsing the filter under running water. Monthly, run a hot cycle with a cup of white vinegar placed upright on the top rack to remove grease and odors. For stubborn stains, sprinkle baking soda on the bottom overnight before running a cycle. Regular maintenance keeps your machine in top condition, providing spotless results every time.',
  },
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
  Home: undefined;
  Main: undefined;
  JournalEntry: { card: Card };
  // NewJournalEntry: { addCard: (card: Card) => void };
  // JournalEntry: undefined;
  NewJournalEntry: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

type NavigationPropsMain = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>;
  route: RouteProp<RootStackParamList, 'Main'>;
};

type NavigationPropsNewJournalEntry = {
  navigation: StackNavigationProp<RootStackParamList, 'NewJournalEntry'>;
  route: RouteProp<RootStackParamList, 'NewJournalEntry'>;
};

// const Stack = createStackNavigator();

function JournalEntry() {
  const route = useRoute<RouteProp<RootStackParamList, 'JournalEntry'>>();
  const { card } = route.params;

  return (
    <View>
      <Text style={{ fontSize: ds.text.header, padding: ds.size.s }}>
        {card.title}
      </Text>
      <Text style={{ fontSize: ds.text.body, padding: ds.size.s }}>
        {card.body}
      </Text>
    </View>
  );
}

function NewJournalEntry({ navigation }: NavigationPropsNewJournalEntry) {
  // const route = useRoute<RouteProp<RootStackParamList, 'NewJournalEntry'>>();
  // const { addCard } = route.params;

  const { addCard } = useJournal();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  return (
    <View>
      <TextInput
        placeholder="Title"
        style={ds.input}
        onChangeText={text => setTitle(text)}></TextInput>
      <TextInput
        placeholder="Body"
        style={{
          ...ds.input,
          minHeight: 300,
          textAlignVertical: 'top',
        }}
        onChangeText={text => setBody(text)}></TextInput>
      <View style={{ margin: ds.size.s }}>
        <Button
          title="Save"
          color={ds.button.color}
          onPress={() => {
            const card = {
              id: String(new Date()),
              title,
              body,
            };
            addCard(card);
            navigation.navigate('Main');
          }}></Button>
      </View>
    </View>
  );
}

function Main({ navigation }: NavigationPropsMain) {
  // const [cards, setCards] = useState<Card[]>(dummyCards);
  const { cards } = useJournal();

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={cards}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ paddingLeft: ds.size.s, paddingTop: ds.size.s }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('JournalEntry', { card: item });
              }}>
              <Text style={{ fontSize: ds.text.header }}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}></FlatList>
      <View
        style={{
          width: '33%',
          position: 'absolute',
          bottom: ds.size.s,
          right: ds.size.s,
        }}>
        <Button
          title="+"
          color={ds.button.color}
          onPress={() => {
            navigation.navigate('NewJournalEntry');
          }}></Button>
      </View>
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
      <Stack.Screen
        name="NewJournalEntry"
        component={NewJournalEntry}></Stack.Screen>
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={MyTheme}>
      <JournalProvider>
        <Navigation></Navigation>
      </JournalProvider>
    </NavigationContainer>
  );
}

export default App;

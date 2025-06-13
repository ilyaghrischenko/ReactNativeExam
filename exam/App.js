import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ListsScreen from './screens/ListsScreen';
import ListDetailScreen from './screens/ListDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ShoppingListProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Lists"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#6200ee',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Lists"
              component={ListsScreen}
              options={{
                title: 'Списки покупок',
              }}
            />
            <Stack.Screen
              name="ListDetail"
              component={ListDetailScreen}
              options={{
                title: 'Список покупок',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ShoppingListProvider>
  );
}

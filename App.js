import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotesProvider } from './NotesContext';
import { TasksProvider } from './TasksContext';

//Screens
import Home from './screens/Home';
import Login from './screens/Login';
import NotesScreen from './screens/NotesScreen';
import CalendarScreen from './screens/CalendarScreen';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <TasksProvider>
      <NotesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Home" component={Home} />
            <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Calendar" component={CalendarScreen} />
            <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Profile" component={Profile} />
            <Stack.Screen options={{headerShown: false, gestureEnabled: false}} name="Notes" component={NotesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NotesProvider>
    </TasksProvider>
  )
}

export default App

const styles = StyleSheet.create({})
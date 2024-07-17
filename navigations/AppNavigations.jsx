import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
// importing components
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import Person from '../screens/Person';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator()

const AppNavigations = () => {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Movie" options={{ headerShown: false }} component={Movie} />
          <Stack.Screen name="Person" options={{ headerShown: false }} component={Person} />
          <Stack.Screen name="Search" options={{headerShown:false}} component={Search}/>
        </Stack.Navigator>
      </NavigationContainer>

  )
}

export default AppNavigations

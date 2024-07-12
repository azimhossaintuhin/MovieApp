
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
// importing compoenets
import Home from '../screens/Home'
const Stack = createNativeStackNavigator()

const AppNavigations = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        </Stack.Navigator>
        </NavigationContainer>
     
  )
}

export default AppNavigations
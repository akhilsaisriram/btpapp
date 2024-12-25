import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './src/profile';
import HomeScreen from './src/home';
import Login from './src/auth/login';
import Reg from './src/auth/register';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
      <Stack.Screen name="home" component={HomeScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="login" component={Login}  options={{ headerShown: false }}/>
        <Stack.Screen name="reg" component={Reg}  options={{ headerShown: false }}/>
        <Stack.Screen name="profile" component={Profile}  options={{
        headerShown: false
          }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


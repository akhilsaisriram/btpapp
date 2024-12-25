import { View, Text, Button } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./screens/home";
import Analysis from "./screens/analaysis";
import Profilepage from "./screens/profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Corrected import
import Socket from "./screens/socket";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          paddingBottom: 10, // Adjust the bottom padding here
          backgroundColor: '#040720',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} /> // Adjusted icon name
          ),
        }}
      />
      <Tab.Screen name="Socket" component={Socket}  options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' size={size} color={color} /> // Adjusted icon name
          ),
        }}/>
      <Tab.Screen name="Analysis" component={Analysis}  options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='analytics' size={size} color={color} /> // Adjusted icon name
          ),
        }}/>

      <Tab.Screen name="Profilepage" component={Profilepage}  options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' size={size} color={color} /> // Adjusted icon name
          ),
        }}/>
           
    </Tab.Navigator>
    </GestureHandlerRootView>
  );
}

import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
export default function HomeScreen() {
  const navigation = useNavigation();

  // State to track whether the token is retrieved
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  // useEffect hook to retrieve the token when the component mounts
  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          console.log('Retrieved token:', token);
          setShow(true);  // Token is present, show "profile"
          navigation.replace("profile");  // Use replace to remove Home from the stack
        } else {
          console.log('No token found');
          setShow(false); // No token, show "login"
          navigation.replace("login");  // Use replace to remove Home from the stack
        }
      } catch (error) {
        console.error('Failed to retrieve the token', error);
      } finally {
        setIsLoading(false); // Token check is complete, stop showing the loader
      }
    };

    retrieveToken(); // Call the function to retrieve the token
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Show a loading indicator while retrieving the token
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  // Optionally render something if needed during the token retrieval process
  return (
    <View className="flex-1 items-center justify-center bg-white">
      {show ? <Text>Profile Screen</Text> : <Text>Login Screen</Text>}
    </View>
  );
}

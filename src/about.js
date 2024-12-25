import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

export default function About() {
  const navigation = useNavigation();

  const handlePress = async () => {
    const token = 'akhil'; // Replace with your actual token value
    try {
      await SecureStore.setItemAsync('userToken', token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Failed to save the token', error);
    }

    navigation.navigate("profile"); // Navigate to the profile screen after storing the token
  };

  return (
    <View className="flex-1 items-center justify-center bg-white ">
      <Text>About Page</Text>
      <Button
        title="button"
        onPress={handlePress}
      />
    </View>
  );
}

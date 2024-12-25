import { View, Text, Button } from "react-native";
import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profilepage() {
  const navigation = useNavigation();

  const handleRemoveToken = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      console.log("Token removed successfully");
      navigation.replace("login");
    } catch (error) {
      console.error("Failed to remove the token", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Profile Page</Text>
        <Button
          title="Remove Token"
          onPress={handleRemoveToken} // Call the function when the button is pressed
        />
      </View>
    </SafeAreaView>
  );
}

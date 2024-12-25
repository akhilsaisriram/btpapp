import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library
import axios from "axios";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Add state for password visibility
  const navigation = useNavigation();

  const handlePress = async () => {
    // const token = "akhil"; // Replace with your actual token value
    // try {
    //   await SecureStore.setItemAsync("userToken", token);
    //   console.log("Token saved successfully");
    // } catch (error) {
    //   console.error("Failed to save the token", error);
    // }

    try {
     

   
        // const token = response.data.token; // Assuming the server returns a token in the response
        // await SecureStore.setItemAsync("userToken", token);
        console.log(response.data.token);
        await SecureStore.setItemAsync("userToken", response.data.token);
        navigation.replace("profile");
    
    } catch (error) {
      console.error("Failed to register", error);
      navigation.replace("profile");

    }
    // Navigate to the profile screen after storing the token
  };

  return (
    <SafeAreaView className="flex-1 bg-[#040720]">
      <StatusBar barStyle="light-content" backgroundColor="#040720" />

      {/* Video Background */}
      <View style={StyleSheet.absoluteFillObject}>
        <Video
          source={{
            uri: "https://cdn.pixabay.com/video/2024/06/07/215697_large.mp4",
          }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          shouldPlay
          isLooping
          isMuted
        />
      </View>

      {/* Content */}
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-4/5 mb-6">
          <Text className="text-white text-2xl mb-8 self-start pl-4">
            Login Page
          </Text>
        </View>
        {/* Username Input */}
        <TextInput
          className={`w-4/5 h-12 px-4 mb-5 text-base text-white rounded-lg 
            ${
              isUsernameFocused
                ? "bg-[rgba(4,7,32,0)] border-white shadow-md"
                : "bg-[rgba(4,7,32,1)] border-[#6b682e]"
            }
            border-2 shadow-[#040720]/30`}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          value={username}
          onChangeText={setUsername}
          onFocus={() => setIsUsernameFocused(true)}
          onBlur={() => setIsUsernameFocused(false)}
          style={styles.textInput}
        />

        {/* Password Input */}
        <View className="relative w-4/5 justify-between align-middle items-center">
          <TextInput
            className={`w-full h-12 px-4 mb-5 text-base text-white rounded-lg 
              ${
                isPasswordFocused
                  ? "bg-[rgba(4,7,32,0)] border-white shadow-md"
                  : "bg-[rgba(4,7,32,1)] border-[#6b682e]"
              }
              border-2 shadow-[#040720]/30`}
            placeholder="Password"
            placeholderTextColor="#aaaaaa"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            style={styles.textInput}
          />
          <TouchableOpacity
            className="absolute right-4 top-3 transform -translate-y-1/2"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#aaaaaa"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handlePress}
          className="w-4/5 h-12 bg-white rounded-lg justify-center items-center mt-3"
        >
          <Text className="text-black text-base">Login</Text>
        </TouchableOpacity>
        <View className=" flex-row w-4/5 mb-6 justify-center items-center">
          <Text className="text-white mt-5">Don't Have the accunt? </Text>
          <Text
          className="text-white   mt-5"
            onPress={() => navigation.navigate("reg")}
            style={{ color: "#fcc203" }}
          >
            Sign up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

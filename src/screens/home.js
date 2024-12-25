import {
  Text,
  View,
  StatusBar,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from "react-native";
import React, { useEffect, useState ,useCallback} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function Homepage() {
  const [scaleAnim] = useState(new Animated.Value(1)); // Initial scale value
  const [data, setData] = useState(null);
  const [powerSocketOn, setPowerSocketOn] = useState(true); // Initialize the toggle state
  const [loading, setLoading] = useState(true); // Loading state
  const [isRefreshing, setIsRefreshing] = useState(false); // Refreshing state

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.5, // Scale up to 150%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      useNativeDriver: true,
    }).start();
  };

  const togglePowerSocket = async () => {
    const firebaseUrl =
      "https://btpsem7-4f58e-default-rtdb.firebaseio.com/3DkQ5qLoQkdq0M72hxOIE4S4mYE3/applences/POWER/inputValues/0.json"; // Update with the correct path

    try {
      const newState = !powerSocketOn; // Toggle the current state

      // Update the state in Firebase
      await axios.patch(firebaseUrl, {
        toggleOn: newState, // Update the toggleOn property in Firebase
      });

      console.log("Power socket state updated in Firebase:", newState);
      setPowerSocketOn(newState);
    } catch (error) {
      console.error("Error updating power socket state in Firebase:", error);
      // Optionally, you can revert the local state if there's an error
    }
  };

  const loadData = async () => {
    const firebaseUrl =
      "https://btpsem7-4f58e-default-rtdb.firebaseio.com/3DkQ5qLoQkdq0M72hxOIE4S4mYE3/applences.json";

    try {
      const response = await axios.get(firebaseUrl);
      const fetchedData = response.data;
      console.log("ll", fetchedData["POWER"].inputValues[0]["toggleOn"]);

      setPowerSocketOn(fetchedData["POWER"].inputValues[0]["toggleOn"]);
      setData(fetchedData); // Set fetched data
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched or an error occurs
      setIsRefreshing(false); // Stop refreshing
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDragEnd = ({ data }) => {
    // Handle the new data order after dragging
    console.log("New data order:", data);
    // Update your state or handle the new order as needed
    // setData(data); // Optionally, update the state with the new order
  };

  
  const toggleItemSwitch = async (itemKey, idx, newValue) => {
    try {
      // connectWebSocket();
      const firebaseUrl = `https://btpsem7-4f58e-default-rtdb.firebaseio.com/3DkQ5qLoQkdq0M72hxOIE4S4mYE3/applences/${itemKey}/inputValues/${idx}.json`;

      // Update the toggle state in Firebase
      await axios.patch(firebaseUrl, {
        toggleOn: newValue,
      });
      // Update the local data state to reflect the change
      const updatedData = { ...data };
      updatedData[itemKey].inputValues[idx].toggleOn = newValue;
      setData(updatedData);
    } catch (error) {
      console.error("Error updating switch state in Firebase:", error);
    }

  };

  const renderHeader = () => (
    <View className="justify-center">
      {/* Display Loading Indicator while data is loading */}
      {loading ? (
        <View className="mt-4">
          <ActivityIndicator size="large" color="#00ff00" />
          <Text className="text-center text-white mt-2">Loading...</Text>
        </View>
      ) : (
        <>
          <Text className="text-2xl text-left mt-2 mx-2 text-white">
            Appliances
          </Text>
          <View className="justify-center items-center mt-9">
            <Text className="text-white">
              Main Power is{" "}
              <Text>
                {powerSocketOn ? (
                  <Text className="text-green-500">ON</Text>
                ) : (
                  <Text className="text-red-600">Off</Text>
                )}
              </Text>
            </Text>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={togglePowerSocket} // Toggle power socket on press
            >
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Ionicons
                  name="power"
                  size={90}
                  color={powerSocketOn ? "white" : "red"} // Conditional color
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#040720]">
      <StatusBar barStyle="light-content" backgroundColor="#040720" />

      <DraggableFlatList
        data={
          data
            ? Object.keys(data).map((key) => ({
                key,
                ...data[key],
              }))
            : []
        }
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View className="border border-gray-300 rounded-lg p-4 shadow-2xl mx-2 mt-5">
              <Text className="text-lg text-white">{item.key}:</Text>
              {Array.isArray(item.inputValues) ? (
                item.inputValues.map((value, idx) => (
                  <View key={idx} className="flex-row justify-between mt-2">
                    <Text className="text-white">{value.text}</Text>
                    <Switch
                      value={value.toggleOn} // Use the correct state for each switch
                      onValueChange={(newValue) =>
                        toggleItemSwitch(item.key, idx, newValue)
                      } // Update Firebase and local state when switch is toggled
                    />
                  </View>
                ))
              ) : (
                <Text className="text-white">
                  {JSON.stringify(item.inputValues, null, 2)}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        onDragEnd={handleDragEnd}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text className="text-white text-center">No Data Available</Text>
        }
      />
    </SafeAreaView>
  );
}

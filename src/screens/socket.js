import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, View, Text, Alert, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from "react-native";
import six from "../data/dataa.js";
import one from "../data/one.js";
import five from "../data/five.js";
import three from "../data/three.js";
import three_other from "../data/three_other.js";

export default function Socket() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to connect to WebSocket
  const connectWebSocket = useCallback(() => {
    const newSocket = new WebSocket("ws://192.168.171.30:3001");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    newSocket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error.message);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    // Initially connect to WebSocket
    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  // Handle pull-down refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!isConnected) {
      connectWebSocket(); // Reconnect if disconnected
    }
    setRefreshing(false);
  }, [isConnected, connectWebSocket]);

  const sendCsvData = async (aa) => {
    if (socket && isConnected) {
      try {
        // Load the CSV file from assets
        console.log(aa.length);

        const csvData = aa.join(',');

        // Send the CSV data via WebSocket
        console.log(csvData.length);
        socket.send(csvData);
        console.log("CSV data sent");
      } catch (error) {
        console.error('Error sending CSV data:', error);
        Alert.alert('Error', 'Failed to send CSV data.');
      }
    } else {
      console.error("WebSocket not connected");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>WebSocket Client</Text>
          <Text style={styles.status}>{isConnected ? "Connected to server" : "Disconnected"}</Text>

          <TouchableOpacity style={styles.button} onPress={() => sendCsvData(one)}>
            <Text style={styles.buttonText}>Send CSV Data 1 Flexion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendCsvData(three)}>
            <Text style={styles.buttonText}>Send CSV Data 3 Pointing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendCsvData(three_other)}>
            <Text style={styles.buttonText}>Send CSV Data 3 Pointing Other</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendCsvData(five)}>
            <Text style={styles.buttonText}>Send CSV Data 5 Wave out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendCsvData(six)}>
            <Text style={styles.buttonText}>Send CSV Data 6 double</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

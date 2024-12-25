import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

const MappingApp = () => {
  const [keysArray, setKeysArray] = useState(["fan", "fan1", "light1"]);
  const [staticList, setStaticList] = useState(["flexion", "pointing", "waveout", "double"]);
  const [selectedMappings, setSelectedMappings] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState("");

  const openMappingModal = (key) => {
    setCurrentKey(key);
    setModalVisible(true);
  };

  // const updateMapping = (key, mapping) => {
  //   setSelectedMappings((prevMappings) => {
  //     const updatedMappings = {
  //       ...prevMappings,
  //       [key]: mapping,
  //     };

  //     // Log the updated mappings to the console
  //     console.log("Updated Mappings:", updatedMappings);

  //     return updatedMappings;
  //   });

  //   setModalVisible(false);
  //   setCurrentKey("");
  // };
  const updateMapping = (key, mapping) => {
    // Update local state with new mapping
    setSelectedMappings((prevMappings) => {
      const updatedMappings = {
        ...prevMappings,
        [key]: mapping,
      };
  
      // Log the updated mappings to the console
      console.log("Updated Mappings:", updatedMappings);
  
      // Prepare the URL for the Firebase Realtime Database
      const firebaseUrl = "https://btpsem7-4f58e-default-rtdb.firebaseio.com/map.json";
  
      // Send the updated mappings to Firebase using fetch
      fetch(firebaseUrl, {
        method: "PATCH", // Use PATCH to update existing data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMappings),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update mapping in Firebase");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Mapping successfully updated in Firebase:", data);
        })
        .catch((error) => {
          console.error("Error updating mapping in Firebase:", error);
        });
  
      return updatedMappings;
    });
  
    // Close the modal and reset current key after updating
    setModalVisible(false);
    setCurrentKey("");
  };
  
  const renderMappingItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.deviceTitle}>Key: {item}</Text>
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => openMappingModal(item)}
      >
        <Text style={styles.mapButtonText}>Select Mapping</Text>
      </TouchableOpacity>
      {selectedMappings[item] && (
        <Text style={styles.mappingText}>Mapped to: {selectedMappings[item]}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mapping App</Text>

      <FlatList
        data={keysArray}
        renderItem={renderMappingItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
      />

      {modalVisible && currentKey && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <ScrollView>
                {staticList.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => updateMapping(currentKey, item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  listContainer: {
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  mapButton: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  mapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  mappingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#6200ee",
    padding: 8,
    borderRadius: 4,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MappingApp;

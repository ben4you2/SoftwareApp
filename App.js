/*import React from "react";

function App() {
  return (
    <div>
      <h1>Welcome to the React Interface</h1>
      <p>This is the new React-based interface migrated from the original HTML.</p>
    </div>
  );
}

export default App;*/


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const App = () => {
  const [count, setCount] = useState(6);
  const [max, setMax] = useState(49);
  const [numbers, setNumbers] = useState([]);
  const [selectedFruits, setSelectedFruits] = useState([]);

  const fruits = [
    { text: "Apple", value: "apple" },
    { text: "Apricot", value: "apricot" },
    { text: "Banana", value: "banana" },
    { text: "Blackberry", value: "blackberry" },
    { text: "Blueberry", value: "blueberry" },
  ];

  const generateNumbers = () => {
    if (count > max) {
      Alert.alert("Error", "Number of picks cannot exceed the maximum number!");
      return;
    }

    let generatedNumbers = [];
    while (generatedNumbers.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (!generatedNumbers.includes(num)) {
        generatedNumbers.push(num);
      }
    }
    generatedNumbers.sort((a, b) => a - b); // Sort in ascending order
    setNumbers(generatedNumbers);
  };

  const handleFruitSelection = (value) => {
    if (selectedFruits.includes(value)) {
      setSelectedFruits(selectedFruits.filter((fruit) => fruit !== value));
    } else {
      setSelectedFruits([...selectedFruits, value]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mobile Lotto Generator</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text>Numbers to Pick:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(count)}
          onChangeText={(value) => setCount(Number(value))}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Max Number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(max)}
          onChangeText={(value) => setMax(Number(value))}
        />
      </View>

      <Button title="Generate Numbers" onPress={generateNumbers} />
      <Text style={styles.numbers}>
        Your Numbers: {numbers.join(", ")}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Select Your Favorite Fruits:</Text>
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.fruitItem,
              selectedFruits.includes(item.value) && styles.selectedFruit,
            ]}
            onPress={() => handleFruitSelection(item.value)}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.selectedFruits}>
        Selected Fruits: {selectedFruits.join(", ")}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
    width: 80,
    textAlign: "center",
  },
  numbers: {
    fontSize: 18,
    marginVertical: 10,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fruitItem: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedFruit: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  selectedFruits: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default App;
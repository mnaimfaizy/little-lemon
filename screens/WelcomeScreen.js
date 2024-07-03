import * as React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3E524B",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
});

const WelcomeScreen = ({ navigation }) => {
  // Add welcome screen code here.
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={styles.container}>
        <Image
          source={require("./../assets/little-lemon-logo.png")}
          style={styles.image}
        />
        <Text style={styles.title}>
          Little Lemon, your local Mediterranean Bistro
        </Text>
      </View>
      <View style={{ flex: 0.25, justifyContent: "flex-end" }}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Subscribe")}
        >
          <Text style={styles.buttonText}>Newsletter</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomeScreen;

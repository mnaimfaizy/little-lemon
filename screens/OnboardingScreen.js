import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { validateEmail } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
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
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 10,
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

const OnboardingScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Enable button when both fields are filled
  const handleInputChange = () => {
    if (validateEmail(email) && firstName.trim().length > 0) {
      setIsButtonEnabled(true);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    await AsyncStorage.setItem("firstName", firstName);
    await AsyncStorage.setItem("email", email);
    // Navigate to the Profile screen
    navigation.navigate("Profile");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, padding: 30 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Let us get to know you!</Text>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              handleInputChange();
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              handleInputChange();
            }}
            keyboardType="email-address"
          />
          <Text
            style={
              showErrorMessage
                ? { display: "flex", color: "red", fontSize: 16 }
                : { display: "none" }
            }
          >
            Please enter valid email address and FirstName.
          </Text>
        </View>
        <View style={{ flex: 0.25, justifyContent: "flex-end" }}>
          <Pressable
            style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
            onPress={completeOnboarding}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

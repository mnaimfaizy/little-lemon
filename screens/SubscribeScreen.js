import * as React from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { validateEmail } from "../utils";

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

const SubscribeScreen = () => {
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  const hanldeEmailChange = (newEmail) => {
    if (validateEmail(newEmail)) {
      setIsValidEmail(true);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleSubscribe = () => {
    Alert.alert("Thanks for subscribing, stay tuned!");
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={styles.container}>
        <Image
          source={require("./../assets/little-lemon-logo.png")}
          style={styles.image}
        />
        <Text style={styles.title}>
          Subscribe to our newsletter for our latest delicious recipes!
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your email"
          onChangeText={hanldeEmailChange}
          keyboardType="email-address"
        />
        <Text
          style={
            showErrorMessage
              ? { display: "flex", color: "red", fontSize: 16 }
              : { display: "none" }
          }
        >
          Please enter valid email address.
        </Text>
      </View>
      <View style={{ flex: 0.25, justifyContent: "flex-end" }}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            !isValidEmail ? styles.buttonDisabled : {},
            pressed && styles.buttonPressed, // Assuming you have a style for when the button is pressed
          ]}
          onPress={handleSubscribe}
          disabled={!isValidEmail}
        >
          <Text style={styles.buttonText}>Subscribe</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SubscribeScreen;

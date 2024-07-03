import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CheckBox from "expo-checkbox";
import { MaskedTextInput } from "react-native-mask-text";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderStatuses, setOrderStatuses] = useState(false);
  const [passwordChanges, setPasswordChanges] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const validatePhoneNumber = () => {
    const regex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!regex.test(phoneNumber)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid US phone number."
      );
      return false;
    }
    return true;
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const logout = async () => {
    await AsyncStorage.setItem("onBoardingCompleted", "false");
    await AsyncStorage.removeItem("firstName");
    await AsyncStorage.removeItem("email");

    navigation.navigate("Home");
  };

  const saveChanges = async () => {
    if (validatePhoneNumber()) {
      // Proceed with saving changes
    }
  };

  const discardChanges = () => {
    // Implement discard logic here
    // For example, reset state to initial values or navigate away
  };

  useEffect(() => {
    const getProfileData = async () => {
      const firstName = await AsyncStorage.getItem("firstName");
      const email = await AsyncStorage.getItem("email");
      setEmail(email);
      setFirstName(firstName);
    };

    getProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.row}>
        <Image
          source={{ uri: imageUri || "https://via.placeholder.com/150" }}
          style={styles.image}
        />
        <View>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text>Change Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeImage} style={styles.button}>
            <Text>Remove Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text>FirstName:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="Enter your first name"
        />
        <Text>LastName:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Enter your last name"
        />
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <Text>PhoneNumber:</Text>
        <MaskedTextInput
          mask="(999) 999-9999"
          onChangeText={(text, rawText) => {
            setPhoneNumber(rawText);
          }}
          value={phoneNumber}
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="(123) 456-7890"
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text>Email Notifications:</Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={orderStatuses}
            onValueChange={setOrderStatuses}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Order statuses</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={passwordChanges}
            onValueChange={setPasswordChanges}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Password changes</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={specialOffers}
            onValueChange={setSpecialOffers}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Special Offers</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={newsletter}
            onValueChange={setNewsletter}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Newsletter</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
          <Text>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={discardChanges} style={styles.discardButton}>
          <Text>Discard Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: "#FF6347", // Tomato color for logout
    padding: 10,
  },
  saveButton: {
    backgroundColor: "#90EE90", // Light green for save
    padding: 10,
  },
  discardButton: {
    backgroundColor: "#FFD700", // Gold for discard
    padding: 10,
  },
});

export default ProfileScreen;

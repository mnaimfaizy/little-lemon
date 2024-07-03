import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
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
    await AsyncStorage.clear();

    navigation.navigate("Home");
  };

  const saveChanges = async () => {
    if (validatePhoneNumber()) {
      // Proceed with saving changes
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("phoneNumber", phoneNumber);
      await AsyncStorage.setItem("imageUri", imageUri ?? "");

      Alert.alert("Changes Saved", "Your changes have been saved.");
    }
  };

  const discardChanges = () => {
    setLastName("");
    setPhoneNumber("");
    setOrderStatuses(false);
    setPasswordChanges(false);
    setSpecialOffers(false);
    setNewsletter(false);
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.row}>
          <Image
            source={{ uri: imageUri || "https://via.placeholder.com/150" }}
            style={styles.image}
          />
          <View>
            <TouchableOpacity
              onPress={pickImage}
              style={{
                ...styles.button,
                backgroundColor: "gray",
              }}
            >
              <Text>Change Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={removeImage}
              style={{ ...styles.button, backgroundColor: "#DDDDDD" }}
            >
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
              setPhoneNumber(text);
            }}
            value={phoneNumber}
            keyboardType="numeric"
            style={styles.textInput}
            placeholder="(123) 456-7890"
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ fontSize: 16 }}>Email Notifications:</Text>
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
        <View style={{ width: "100%", marginTop: 20, marginBottom: 20 }}>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
            <Text>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={discardChanges}
            style={styles.discardButton}
          >
            <Text>Discard Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    width: 130,
    height: 130,
    borderRadius: 75,
    marginRight: 20,
  },
  button: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    height: 35,
    marginVertical: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: "100%",
  },
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sectionContainer: {
    marginTop: 20,
    width: "100%",
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#90EE90",
    padding: 10,
    borderRadius: 5,
  },
  discardButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;

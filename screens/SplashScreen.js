import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../assets/little-lemon-logo.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A90E2", // Example background color
  },
  logo: {
    width: 200, // Adjust based on your logo's aspect ratio
    height: 200, // Adjust based on your logo's aspect ratio
  },
});

export default SplashScreen;

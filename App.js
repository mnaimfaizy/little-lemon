import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";

// App.js is already setup by wrapping NavigationContainer around Root Navigator
export default function App() {
  let [fontsLoaded] = useFonts({
    MarkaziText: require("./assets/Fonts/MarkaziText-Regular.ttf"),
    Karla: require("./assets/Fonts/Karla-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import { GlobalStateProvider } from "./context/globalStateContext";

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
    <GlobalStateProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GlobalStateProvider>
  );
}

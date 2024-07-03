import { View, Image } from "react-native";

const Header = () => {
  return (
    <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/Logo.png")}
        style={{
          width: 200,
          marginBottom: 10,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default Header;

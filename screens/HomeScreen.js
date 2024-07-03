import React, { useEffect, useState } from "react";

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useDatabase } from "../hooks/useDatabase";

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const windowHeight = useWindowDimensions().height;

  const {
    initializeDatabase,
    filterMenuItemsByCategoriesAndName,
    storeDataInDb,
  } = useDatabase(setMenuItems);

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedSearch = debounce((searchText) => {
    filterMenuItemsByCategoriesAndName(
      selectedCategories,
      searchText,
      (filteredItems) => {
        setMenuItems(filteredItems);
      }
    );
  }, 500);

  const handleCategoryPress = (value) => {
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value)
      : [...selectedCategories, value];
    setSelectedCategories(updatedCategories);
  };

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText, selectedCategories]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      filterMenuItemsByCategoriesAndName(
        selectedCategories,
        "",
        (filteredItems) => {
          setMenuItems(filteredItems);
        }
      );
    } else {
      // Optionally, fetch all menu items or handle the empty state
    }
  }, [selectedCategories]);

  return (
    <View style={(styles.container, [{ minHeight: Math.round(windowHeight) }])}>
      <View style={{ flex: 0.6 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("./../assets/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("./../assets/Profile.png")}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Hero Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.mainTitle}>Little Lemon</Text>
          <Text style={styles.subTitle}>Chicago</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.descriptionText}>
              Welcome to Little Lemon, your go-to place for fresh and delicious
              treats!
            </Text>
            <Image
              source={require("./../assets/HeroImage.png")}
              style={styles.sectionImage}
            />
          </View>
          <View style={styles.searchBar}>
            <Image
              source={require("./../assets/searchIcon.webp")}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search dishes..."
              placeholderTextColor="#FFF"
              style={styles.searchInput}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        </View>
        {/* Order Section */}
        <View style={styles.deliverySection}>
          <Text style={styles.deliveryTitle}>ORDER FOR DELIVERY!</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={
                selectedCategories.includes("starters")
                  ? { ...styles.button, backgroundColor: "#F4CE14" }
                  : { ...styles.button, backgroundColor: "#EDEFEE" }
              }
              onPress={() => handleCategoryPress("starters")}
            >
              <Text style={styles.buttonText}>Starters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedCategories.includes("mains")
                  ? { ...styles.button, backgroundColor: "#F4CE14" }
                  : { ...styles.button, backgroundColor: "#EDEFEE" }
              }
              onPress={() => handleCategoryPress("mains")}
            >
              <Text style={styles.buttonText}>Mains</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedCategories.includes("desserts")
                  ? { ...styles.button, backgroundColor: "#F4CE14" }
                  : { ...styles.button, backgroundColor: "#EDEFEE" }
              }
              onPress={() => handleCategoryPress("desserts")}
            >
              <Text style={styles.buttonText}>Desserts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedCategories.includes("drinks")
                  ? { ...styles.button, backgroundColor: "#F4CE14" }
                  : { ...styles.button, backgroundColor: "#EDEFEE" }
              }
              onPress={() => handleCategoryPress("drinks")}
            >
              <Text style={styles.buttonText}>Drinks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedCategories.includes("specials")
                  ? { ...styles.button, backgroundColor: "#F4CE14" }
                  : { ...styles.button, backgroundColor: "#EDEFEE" }
              }
              onPress={() => handleCategoryPress("specials")}
            >
              <Text style={styles.buttonText}>Specials</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {/* Menu Section */}
      <View style={{ flex: 0.4 }}>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuSection}>
              <Image source={{ uri: item.imageUrl }} style={styles.dishImage} />
              <View style={styles.dishContent}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishDescription}>{item.description}</Text>
                <Text style={styles.dishPrice}>${item.price}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 80,
  },
  logoContainer: {
    flex: 0.85,
    alignItems: "center",
  },
  logo: {
    width: "100%",
  },
  profileImage: {
    width: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#495E57",
    padding: 20,
  },
  mainTitle: {
    color: "#F4CE14",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "MarkaziText",
  },
  subTitle: {
    color: "white",
    fontSize: 30,
    fontFamily: "Karla",
  },
  contentContainer: {
    fle: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    flex: 0.5,
    color: "white",
    fontSize: 16,
    marginBottom: 5,
    marginRight: 15,
  },
  sectionImage: {
    flex: 0.5,
    height: 170,
    resizeMode: "cover",
    borderRadius: 16,
    marginLeft: 15,
    marginTop: -50,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 15,
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
  },
  deliverySection: {
    marginTop: 20,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  deliveryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginRight: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#495E57",
    fontSize: 16,
  },
  menuSection: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 20,
  },
  dishContent: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dishDescription: {
    fontSize: 14,
    color: "#666",
    flexWrap: "wrap",
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
});

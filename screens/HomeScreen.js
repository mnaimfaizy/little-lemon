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
} from "react-native";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists menu (id integer primary key not null, name text, description text, price text, imageUrl text);",
        [],
        () => {
          loadData();
        },
        (t, error) => {
          console.log("Error creating table", error);
        }
      );
    });
  };

  const loadData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from menu;",
        [],
        (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            fetchMenuData();
          } else {
            setMenuItems(_array);
          }
        },
        (t, error) => {
          console.log("Error fetching from database", error);
        }
      );
    });
  };

  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const data = await response.json();
      const updatedMenuItems = data.menu.map((item) => ({
        ...item,
        imageUrl: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
      }));
      setMenuItems(updatedMenuItems);
      storeDataInDb(updatedMenuItems);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const storeDataInDb = (menuItems) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          "insert into menu (name, description, price, imageUrl) values (?, ?, ?, ?);",
          [item.name, item.description, item.price, item.imageUrl]
        );
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.75 }}>
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
              placeholder="Search..."
              placeholderTextColor="#FFF"
              style={styles.searchInput}
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Starters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Mains</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Desserts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Drinks</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {/* Menu Section */}
      <View style={{ flex: 0.25 }}>
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
    fontSize: 45,
    fontWeight: "bold",
    fontFamily: "MarkaziText",
  },
  subTitle: {
    color: "white",
    fontSize: 35,
    fontFamily: "Karla",
  },
  contentContainer: {
    fle: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  descriptionText: {
    flex: 0.5,
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    marginRight: 15,
  },
  sectionImage: {
    flex: 0.5,
    height: 180,
    resizeMode: "cover",
    borderRadius: 16,
    marginLeft: 15,
    marginTop: -30,
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
    backgroundColor: "#EDEFEE",
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

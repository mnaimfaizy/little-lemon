import { useEffect } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

export const useDatabase = (setMenuItems) => {
  const initializeDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists menu (id integer primary key not null, name text, description text, price text, imageUrl text, category text);",
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

  const fetchMenuData = async () => {
    // Fetch data from API
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

  const filterMenuItemsByCategoriesAndName = (
    categories,
    searchText,
    callback
  ) => {
    let sql = `SELECT * FROM menu WHERE 1=1`;
    let params = [];

    if (categories.length > 0) {
      let placeholders = categories.map(() => "?").join(", ");
      sql += ` AND category IN (${placeholders})`;
      params = params.concat(categories);
    }

    if (searchText) {
      sql += ` AND name LIKE ?`;
      params.push(`%${searchText}%`);
    }

    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, { rows }) => callback(rows._array),
        (_, error) => console.error(error)
      );
    });
  };

  const storeDataInDb = (menuItems) => {
    db.transaction((tx) => {
      menuItems.forEach((item) => {
        tx.executeSql(
          "insert into menu (name, description, price, imageUrl, category) values (?, ?, ?, ?, ?);",
          [
            item.name,
            item.description,
            item.price,
            item.imageUrl,
            item.category,
          ]
        );
      });
    });
  };

  return {
    initializeDatabase,
    filterMenuItemsByCategoriesAndName,
    storeDataInDb,
  };
};

import React, { useEffect, useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import ProfileScreen from "./../screens/ProfileScreen";
import HomeScreen from "./../screens/HomeScreen";
import { useGlobalState } from "./../context/globalStateContext";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isOnboardingCompleted, setIsOnboardingCompleted } = useGlobalState();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      setIsOnboardingCompleted(onboardingStatus === "true");
    };

    checkOnboardingStatus();
  }, []);

  if (isOnboardingCompleted === null) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {isOnboardingCompleted ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

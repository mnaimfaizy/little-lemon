import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import ProfileScreen from "./../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);

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
        <Stack.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

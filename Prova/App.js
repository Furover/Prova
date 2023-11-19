import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { app_auth } from "./firebaseConfig";

import Routes from "./app/routes/stackRouter";

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

export default function App() {
  const [user, SetUser] = useState();

  useEffect(() => {
    onAuthStateChanged(app_auth, (user) => {
      SetUser(user);
     
    });
  }, []);

  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Entypo } from '@expo/vector-icons';

import { Initial } from "../screens/initial";
import { Register } from "../screens/register";
import { Login } from "../screens/login";
import { Home } from "../screens/home";
import { ForgotPswd } from "../screens/forgotpswd";
import { Details } from "../screens/details";
import { Cart } from "../screens/cart";
import { Thanks } from "../screens/thanks";
import { Search } from "../screens/search";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Initial">
      <Stack.Screen
        name="Initial"
        component={Initial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPswd"
        component={ForgotPswd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Thanks"
        component={Thanks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
    
  );
}

const Tab = createBottomTabNavigator();

/*export function TabNavigatior() {
  return(
   <Tab.Navigator>
    <Tab.Screen name = "Home" component={Home}  options={{headerShown: false, tabBarIcon: ({color, size})=>(
      <Ionicons name="home" size={24} color="black" />
    )}}/>
    <Tab.Screen name = "Perfil" component={Profile} options={{headerShown: false, tabBarIcon: ({color, size})=>(
      <Ionicons name="person-sharp" size={24} color="black" />
    )}}/>
    {/*<Tab.Screen name = "Trilhas" component={Fetch}options={{headerShown: false}}/>*/
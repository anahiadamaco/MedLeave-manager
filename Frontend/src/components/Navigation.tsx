// components/Navigation.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Pantallas Alumno
import A_Register from "../screens/A_Register";
import A_Login from "../screens/A_Login";
import A_Home from "../screens/A_Home";
import A_SubirLicencia from "../screens/A_SubirLicencia";
// import A_Historial from "../screens/A_Historial";
// import A_PreguntasFrecuentes from "../screens/A_PreguntasFrecuentes";

// Pantallas Profesor
import P_Login from "../screens/P_Login";
import P_Home from "../screens/P_Home";
// import P_Historial from "../screens/P_Historial";
// import P_PreguntasFrecuentes from "../screens/P_FyQ";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="A_Login" screenOptions={{ headerShown: false }}>
        {/* Alumno */}
        <Stack.Screen name="A_Register" component={A_Register} />
        <Stack.Screen name="A_Login" component={A_Login} />
        <Stack.Screen name="A_Home" component={A_Home} />
        <Stack.Screen name="A_SubirLicencia" component={A_SubirLicencia} />
        {/*
        <Stack.Screen name="A_Historial" component={A_Historial} />
        <Stack.Screen name="A_PreguntasFrecuentes" component={A_PreguntasFrecuentes} />
        */}

        {/* Profesor */}
        <Stack.Screen name="P_Login" component={P_Login} />
        <Stack.Screen name="P_Home" component={P_Home} />
        {/*
        <Stack.Screen name="P_Historial" component={P_Historial} />
        <Stack.Screen name="P_PreguntasFrecuentes" component={P_PreguntasFrecuentes} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// components/Navigation.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Pantallas Alumno
import A_Register from "../screens/A_Register";
import A_Login from "../screens/A_Login";
import A_Home from "../screens/A_home";
import A_SubirLicencia from "../screens/A_SubirLicencia";
import A_Historial from "../screens/A_Historial";
import A_HistorialRamo from "../screens/A_HistorialRamo";
import A_FyQ from "../screens/A_FyQ";

// Pantallas Profesor
import P_Login from "../screens/P_Login";
import P_Home from "../screens/P_Home";
import P_Historial from "../screens/P_Historial";
import P_HistorialRamo from "../screens/P_HistorialRamo";
import P_FyQ from "../screens/P_FyQ";

// Pantallas Funcionario
import F_Home from "../screens/F_Home";

// Pantallas Admin
import Admin_Home from "../screens/Admin_Home";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
            <Stack.Navigator initialRouteName="P_Login" screenOptions={{ headerShown: false }}>
        {/* Alumno */}
        <Stack.Screen name="A_Register" component={A_Register} />
        <Stack.Screen name="A_Login" component={A_Login} />
        <Stack.Screen name="A_Home" component={A_Home} />
        <Stack.Screen name="A_SubirLicencia" component={A_SubirLicencia} />
        <Stack.Screen name="A_Historial" component={A_Historial} />
        <Stack.Screen name="A_HistorialRamo" component={A_HistorialRamo} />
        <Stack.Screen name="A_FyQ" component={A_FyQ} />

        {/* Profesor */}
        <Stack.Screen name="P_Login" component={P_Login} />
        <Stack.Screen name="P_Home" component={P_Home} />
        <Stack.Screen name="P_Historial" component={P_Historial} />
        <Stack.Screen name="P_HistorialRamo" component={P_HistorialRamo} />
        <Stack.Screen name="P_FyQ" component={P_FyQ} />

        {/* Funcionario */}
        <Stack.Screen name="F_Home" component={F_Home} />
        
        {/* Admin */}
        <Stack.Screen name="Admin_Home" component={Admin_Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// components/Navigation.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Pantallas Alumno
import A_Register from "../screens/A_Register";
import A_Home from "../screens/A_home";
import A_SubirLicencia from "../screens/A_SubirLicencia";
import A_Historial from "../screens/A_Historial";
import A_HistorialRamo from "../screens/A_HistorialRamo";
import A_FyQ from "../screens/A_FyQ";
import A_Mensajes from "../screens/A_Mensajes";
import A_ProfileUser from "../screens/A_ProfileUser";

// Pantallas Profesor
import P_Login from "../screens/P_Login";
import P_Home from "../screens/P_Home";
import P_Historial from "../screens/P_Historial";
import P_HistorialRamo from "../screens/P_HistorialRamo";
import P_FyQ from "../screens/P_FyQ";
import P_Mensajes from "../screens/P_Mensajes";
import P_ProfileUser from "../screens/P_ProfileUser";

// Pantallas Funcionario
import F_Home from "../screens/F_Home";

// Pantallas Admin
import Admin_Home from "../screens/Admin_Home";
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
            <Stack.Navigator 
        initialRouteName="P_Login" 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#E6F2FF' },
        }}
      >
        {/* Alumno */}
        <Stack.Screen 
          name="A_Register" 
          component={A_Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="A_home" 
          component={A_Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="A_SubirLicencia" 
          component={A_SubirLicencia}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="A_Historial" 
          component={A_Historial}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="A_HistorialRamo" 
          component={A_HistorialRamo}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="A_FyQ" 
          component={A_FyQ}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="A_Mensajes" 
          component={A_Mensajes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="A_ProfileUser" 
          component={A_ProfileUser}
          options={{ headerShown: false }}
        />

        {/* Profesor */}
        <Stack.Screen 
          name="P_Login" 
          component={P_Login}
          options={{ headerShown: false, cardStyle: { backgroundColor: '#E6F2FF' } }}
        />
        <Stack.Screen 
          name="P_Home" 
          component={P_Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="P_Historial" 
          component={P_Historial}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="P_HistorialRamo" 
          component={P_HistorialRamo}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="P_FyQ" 
          component={P_FyQ}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="P_Mensajes" 
          component={P_Mensajes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="P_ProfileUser" 
          component={P_ProfileUser}
          options={{ headerShown: false }}
        />

        {/* Funcionario */}
        <Stack.Screen 
          name="F_Home" 
          component={F_Home}
          options={{ headerShown: false }}
        />
        
        {/* Admin */}
        <Stack.Screen 
          name="Admin_Home" 
          component={Admin_Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
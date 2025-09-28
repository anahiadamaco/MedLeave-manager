import React from "react";
import { StatusBar, useColorScheme, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Rutas Alumno
import A_Login from "./src/screens/A_Login";
import A_Home from "./src/screens/A_Home";
//import A_SubirLicencia from "./src/screens/A_SubirLicencia";
//import A_Historial from "./src/screens/A_Historial";
//import A_HistorialRamo from "./src/screens/A_HistorialRamo";
import A_PreguntasFrecuentes from "./src/screens/A_FyQ";

// Rutas Profesor
//import P_Login from "./src/screens/P_Login";
//import P_Home from "./src/screens/P_Home";
//import P_SubirLicencia from "./src/screens/P_SubirLicencia";
//import P_Historial from "./src/screens/P_Historial";
//import P_HistorialRamo from "./src/screens/P_HistorialRamo";
//import P_PreguntasFrecuentes from "./src/screens/P_FyQ";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <ScrollView>
        {/* Rutas Alumnos */}
        <A_Login />
        <A_Home />
        {/* <A_SubirLicencia /> */}
        {/* <A_Historial /> */}
        {/* <A_HistorialRamo /> */}
        <A_PreguntasFrecuentes />

        {/* Rutas Profesor */}
        {/* <P_Login /> */}
        {/* <P_Home /> */}
        {/* <P_SubirLicencia /> */}
        {/* <P_Historial /> */}
        {/* <P_HistorialRamo /> */}
        {/* <P_PreguntasFrecuentes /> */}
      </ScrollView>
    </SafeAreaProvider>
  );
}

export default App;

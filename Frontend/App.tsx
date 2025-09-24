import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Rutas Alumno
import A_Login from "./src/screens/A_Login";

// Rutas Profesor

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <A_Login />
    </SafeAreaProvider>
  );
}

export default App;

// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // Cargar valor guardado al iniciar la app
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("theme:isDark");
        if (saved !== null) {
          setIsDark(saved === "true");
        }
      } catch (e) {
        console.log("Error leyendo tema:", e);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    try {
      const newValue = !isDark;
      setIsDark(newValue);
      await AsyncStorage.setItem("theme:isDark", String(newValue));
    } catch (e) {
      console.log("Error guardando tema:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

//Hook para usar más fácil en los componentes
export function useTheme() {
  return useContext(ThemeContext);
}

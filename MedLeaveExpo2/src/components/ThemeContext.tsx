// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


//Definicion del contexto
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void; //cambiar de modo
};

const ThemeContext = createContext<ThemeContextType>({ //Valor por defecto
  isDark: false, //modo claro por defecto
  toggleTheme: () => {}, //vacia por defecto
});


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false); //estado que se guardará

  //Cargar valor guardado al iniciar la app
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

  //Función para cambiar tema y guardarlo
  const toggleTheme = async () => { 
    try {
      const newValue = !isDark;  //invierte el valor
      setIsDark(newValue); //actualizar estado 
      await AsyncStorage.setItem("theme:isDark", String(newValue)); //guarda el estado
    } catch (e) {
      console.log("Error guardando tema:", e);
    }
  };

  return (
    //Proveer el contexto a los componentes 
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

//Hook para usar más fácil en los componentes
export function useTheme() {
  return useContext(ThemeContext);
}

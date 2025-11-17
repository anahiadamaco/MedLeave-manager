import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/components/Navegation';
import { ThemeProvider } from "./src/components/ThemeContext";

// Import NativeWind stylesheet globally to enable Tailwind CSS
import './global.css';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

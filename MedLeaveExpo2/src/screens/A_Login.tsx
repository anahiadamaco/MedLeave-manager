import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function A_Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Correo:", email);
    console.log("Contraseña:", password);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>
            (aquí va el logo)
          </Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          Bienvenido a{"\n"}MedLeave Manager
        </Text>

        <Text style={styles.inputLabel}>Correo:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Ingrese su correo"
          placeholderTextColor="#ccc"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Contraseña:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#ccc"
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ea5e9', // sky-500
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  logoCircle: {
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 100,
    padding: 40
  },
  logoText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  },
  formContainer: {
    backgroundColor: '#0ea5e9', // sky-500
    borderWidth: 1,
    borderColor: '#facc15', // yellow-400
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 350
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24
  },
  inputLabel: {
    color: 'white',
    marginBottom: 4,
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#facc15', // yellow-400
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    color: 'black'
  },
  loginButton: {
    backgroundColor: '#0284c7', // sky-600
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#facc15' // yellow-400
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600'
  }
});

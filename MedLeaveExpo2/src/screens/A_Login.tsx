import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ea5e9', // sky-500
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBorder: {
    borderWidth: 4,
    borderColor: '#ffffff',
    borderRadius: 999,
    padding: 40,
  },
  logoText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 18,
  },
  formContainer: {
    backgroundColor: '#0ea5e9', // sky-500
    borderWidth: 1,
    borderColor: '#facc15', // yellow-400
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    color: '#ffffff',
    marginBottom: 4,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#facc15', // yellow-400
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    color: '#000000',
  },
  passwordInput: {
    backgroundColor: '#facc15', // yellow-400
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
    color: '#000000',
  },
  button: {
    backgroundColor: '#0369a1', // sky-600
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#facc15', // yellow-400
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '600',
  },
  registerLink: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default function A_Login({ navigation }: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa correo y contraseña");
      return;
    }

    setLoading(true);

    try {
      // IMPORTANTE: Cambia esta URL a tu IP local y puerto del backend
      // Ej: http://192.168.1.100:3000 (obtén tu IP con: ipconfig getifaddr en0)
      const API_BASE_URL = "http://192.168.100.223:3000"; // ← CAMBIAR A TU IP:PUERTO
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_usuario: email,
          contrasena: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error de autenticación", data.message || "Credenciales inválidas");
        return;
      }

      // ✅ Login exitoso — Guardar datos del usuario en AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      await AsyncStorage.setItem("isLoggedIn", "true");
      
      console.log("Usuario autenticado:", data.data);
      Alert.alert("Éxito", `Bienvenido ${data.data.nombre}`);
      
      // Navegar a pantalla principal después del login exitoso
      if (navigation) {
        navigation.navigate("A_Home");
      }
    } catch (error: any) {
      console.error("Error de conexión:", error);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose y la URL sea correcta."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBorder}>
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

        <Text style={styles.label}>Correo:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Ingrese su correo"
          placeholderTextColor="#999"
          style={styles.input}
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#999"
          style={styles.passwordInput}
          editable={!loading}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>
              Iniciar sesión
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // Navegar a pantalla de registro
            if (navigation) {
              navigation.navigate("A_Register");
            }
          }}
        >
          <Text style={styles.registerLink}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

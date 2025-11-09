import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { AUTH_ROUTES } from "../config/api";

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

  // Validar formato de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validación básica
    console.log("📝 [1] Iniciando proceso de login...");
    
    if (!email || !password) {
      console.log("❌ [2] Campos vacíos:", { email, password });
      Alert.alert("Error", "Por favor ingresa correo y contraseña");
      return;
    }
    
    console.log("✅ [2] Campos no vacíos - Correo:", email);

    if (!isValidEmail(email)) {
      console.log("❌ [3] Email inválido:", email);
      Alert.alert("Error", "El correo no tiene un formato válido");
      return;
    }
    
    console.log("✅ [3] Email válido");

    if (password.length < 8) {
      console.log("❌ [4] Contraseña muy corta:", password.length, "caracteres");
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }
    
    console.log("✅ [4] Contraseña válida");

    setLoading(true);
    console.log("⏳ [5] Iniciando fetch a:", AUTH_ROUTES.LOGIN);

    try {
      console.log("📡 [6] Enviando solicitud POST...");
      
      const response = await fetch(AUTH_ROUTES.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_usuario: email,
          contrasena: password,
        }),
      });

      console.log("📬 [7] Respuesta recibida - Status:", response.status);
      
      const data = await response.json();
      console.log("📦 [8] JSON parseado:", data);

      if (!response.ok || !data.success) {
        console.log("❌ [9] Error en respuesta:", data.message);
        Alert.alert("Error de autenticación", data.message || "Credenciales inválidas");
        return;
      }
      
      console.log("✅ [9] Respuesta exitosa (success: true)");

      // ✅ Validar que existan los datos del usuario
      if (!data.data || !data.data.id_usuario) {
        console.log("❌ [10] Datos del usuario inválidos:", data.data);
        Alert.alert("Error", "Respuesta inválida del servidor");
        return;
      }
      
      console.log("✅ [10] Datos del usuario válidos:", data.data);

      // ✅ Login exitoso — Guardar datos del usuario en AsyncStorage
      console.log("💾 [11] Guardando usuario en AsyncStorage...");
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      await AsyncStorage.setItem("isLoggedIn", "true");
      
      console.log("✅ [12] Datos guardados en AsyncStorage");
      console.log("👤 [13] Usuario autenticado:", data.data);
      Alert.alert("Éxito", `Bienvenido ${data.data.nombre}`);
      
      console.log("🚀 [14] Navegando a A_Home...");
      // Navegar a pantalla principal después del login exitoso
      if (navigation) {
        navigation.navigate("A_Home");
        console.log("✅ [15] Navegación completada");
      }
    } catch (error: any) {
      console.error("❌ [ERROR] Error de conexión:", error);
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
      );
    } finally {
      setLoading(false);
      console.log("🏁 [16] Proceso de login finalizado");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

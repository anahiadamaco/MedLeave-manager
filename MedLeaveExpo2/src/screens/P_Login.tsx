import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ROUTES } from "../config/api";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F2FF",
    alignItems: "center",
  },
  header: {
    width: "100%",
    backgroundColor: "#0089E0",
    alignItems: "center",
    paddingVertical: 40,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    tintColor: "#0089E0",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#FFB700",
    borderRadius: 12,
    width: "85%",
    marginTop: 32,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
  },
  userIconBg: {
    backgroundColor: "#E6F2FF",
    borderRadius: 999,
    padding: 10,
    marginBottom: 12,
  },
  userIcon: {
    width: 40,
    height: 40,
    tintColor: "#0089E0",
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "600",
    color: "#000000",
    marginTop: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#B9DCFA",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 4,
    color: "#000000",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    fontSize: 12,
    color: "#444444",
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0089E0",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFB700",
    width: "100%",
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// 🔐 Mapeo de roles a pantallas de inicio
const getRoleHomeScreen = (id_rol: number): string => {
  switch (id_rol) {
    case 1: // Profesor
      return "P_Home";
    case 2: // Estudiante
      return "A_home";
    case 3: // Funcionario
      return "F_Home";
    case 4: // Admin
      return "Admin_Home";
    default:
      throw new Error(`❌ Rol inválido: ${id_rol}. El usuario no tiene un rol asignado válido.`);
  }
};

// 📝 Mapeo de roles a nombres legibles
const getRoleName = (id_rol: number): string => {
  switch (id_rol) {
    case 1:
      return "Profesor";
    case 2:
      return "Estudiante";
    case 3:
      return "Funcionario";
    case 4:
      return "Admin";
    default:
      return "Usuario";
  }
};

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Validar formato de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validación básica
    console.log("📝 [1] Iniciando proceso de login universal...");

    if (!correo || !password) {
      console.log("❌ [2] Campos vacíos:", { correo, password });
      Alert.alert("Error", "Por favor ingresa correo y contraseña");
      return;
    }

    console.log("✅ [2] Campos no vacíos - Correo:", correo);

    if (!isValidEmail(correo)) {
      console.log("❌ [3] Email inválido:", correo);
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
          correo_usuario: correo,
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

      // 🔍 Determinar el rol del usuario
      let roleHomeScreen: string;
      let roleName: string;
      
      try {
        roleHomeScreen = getRoleHomeScreen(data.data.id_rol);
        roleName = getRoleName(data.data.id_rol);
      } catch (roleError: any) {
        console.log("❌ [11]", roleError.message);
        Alert.alert("Error de acceso", roleError.message);
        return;
      }
      
      console.log("👤 [11] Rol detectado:", roleName, "- Pantalla destino:", roleHomeScreen);

      // ✅ Login exitoso — Guardar datos del usuario en AsyncStorage
      console.log("💾 [12] Guardando usuario en AsyncStorage...");
      await AsyncStorage.setItem("user", JSON.stringify(data.data));
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userRole", data.data.id_rol.toString());

      console.log("✅ [13] Datos guardados en AsyncStorage");
      console.log("👤 [14] Usuario autenticado:", data.data.nombre, "(" + roleName + ")");
      Alert.alert("Éxito", `Bienvenido ${data.data.nombre}`);

      console.log("🚀 [15] Navegando a", roleHomeScreen + "...");
      // Navegar según el rol del usuario
      if (navigation) {
        navigation.navigate(roleHomeScreen);
        console.log("✅ [16] Navegación completada");
      }
    } catch (error: any) {
      console.error("❌ [ERROR] Error de conexión:", error);
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);

      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose."
      );
    } finally {
      setLoading(false);
      console.log("🏁 [FIN] Proceso de login finalizado");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bienvenido</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/Logo_normal.png")}
              style={styles.logo}
            />
          </View>
        </View>

        {/* FORMULARIO */}
        <View style={styles.formContainer}>
          <View style={styles.userIconBg}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userIcon}
            />
          </View>

          <Text style={styles.label}>Correo:</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            placeholder="Ingrese su correo"
            placeholderTextColor="#9EC9E8"
            editable={!loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#9EC9E8"
            editable={!loading}
          />

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("A_Register")}>
            <Text style={styles.forgotPassword}>¿No tienes cuenta? Regístrate aquí</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Ingresar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

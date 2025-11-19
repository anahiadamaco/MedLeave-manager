import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { AUTH_ROUTES } from "../config/api";
import { styles } from "../styles/ResetPassword.styles";

export default function ResetPassword({ route, navigation }: any) {
  const [token, setToken] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtener el token de los parámetros de la ruta o URL
    if (route?.params?.token) {
      setToken(route.params.token);
    }
  }, [route?.params?.token]);

  const handleResetPassword = async () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (passwords.newPassword.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      console.log("[RESET_PASSWORD] Enviando request con token:", token);
      const response = await fetch(AUTH_ROUTES.RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          contrasena: passwords.newPassword,
        }),
      });

      const data = await response.json();
      console.log("[RESET_PASSWORD] Response:", data);

      if (!response.ok || !data.success) {
        Alert.alert("Error", data.message || "No se pudo restablecer la contraseña");
        return;
      }

      Alert.alert("✅ Éxito", "Tu contraseña ha sido restablecida correctamente.", [
        {
          text: "Ir a login",
          onPress: () => navigation.navigate("P_Login"),
        },
      ]);
    } catch (error: any) {
      console.error("[RESET_PASSWORD] Error:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restablecer Contraseña</Text>
        <View style={styles.divider} />
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔐</Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.instructionText}>
          Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta.
        </Text>

        <Text style={styles.label}>Nueva Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          value={passwords.newPassword}
          onChangeText={(text) => setPasswords({ ...passwords, newPassword: text })}
          secureTextEntry
          editable={!loading}
        />

        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite la contraseña"
          value={passwords.confirmPassword}
          onChangeText={(text) => setPasswords({ ...passwords, confirmPassword: text })}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Restablecer Contraseña</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("P_Login")}>
          <Text style={styles.backLink}>← Volver a inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

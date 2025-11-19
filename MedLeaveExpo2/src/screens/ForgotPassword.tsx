import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { AUTH_ROUTES } from "../config/api";
import { styles } from "../styles/ForgotPassword.styles";

export default function ForgotPassword({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Ingresa un correo válido");
      return;
    }

    setLoading(true);

    try {
      console.log("[FORGOT_PASSWORD] Enviando request...");
      const response = await fetch(`${AUTH_ROUTES.FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo_usuario: email }),
      });

      const data = await response.json();
      console.log("[FORGOT_PASSWORD] Response:", data);

      if (!response.ok || !data.success) {
        Alert.alert("Error", data.message || "No se pudo procesar la solicitud");
        return;
      }

      setSuccessMessage(
        "✅ Se envió un enlace de recuperación a tu correo. Revisa tu bandeja de entrada."
      );
      setEmail("");

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error: any) {
      console.error("[FORGOT_PASSWORD] Error:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recuperar Contraseña</Text>
        <View style={styles.divider} />
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔑</Text>
        </View>
      </View>

      {/* Mensaje de éxito */}
      {successMessage ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}

      {/* Formulario */}
      <View style={styles.formContainer}>
        <Text style={styles.instructionText}>
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </Text>

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleForgotPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Enviar Enlace de Recuperación</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>← Volver a inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ROUTES } from "../config/api";
import { styles } from "../styles/A_Register.styles";

export default function A_Register({ navigation }: any) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    console.log("[REGISTER] Iniciando registro...");
    console.log("[REGISTER] Datos:", formData);
    
    // Validaciones
    if (!formData.nombres || !formData.apellidos || !formData.correo || !formData.contrasena) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (formData.contrasena.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      console.log("[REGISTER] Enviando fetch a:", AUTH_ROUTES.REGISTER);
      const response = await fetch(AUTH_ROUTES.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: `${formData.nombres} ${formData.apellidos}`,
          correo_usuario: formData.correo,
          contrasena: formData.contrasena,
          id_rol: 2, // 2 = estudiante (ajusta según tu DB)
        }),
      });

      console.log("[REGISTER] Response status:", response.status);
      const data = await response.json();
      console.log("[REGISTER] Response data:", data);
      console.log("[REGISTER] Response errors:", data.errors);
      
      // Mostrar errores en detalle
      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e: any) => `${e.field}: ${e.message}`).join('\n');
        console.log("[REGISTER] Error details:", errorMessages);
      }

      if (!response.ok || !data.success) {
        Alert.alert("Error en registro", data.message || data.error || "No se pudo registrar");
        return;
      }

      // ✅ Registro exitoso
      Alert.alert("✅ Éxito", "Cuenta creada correctamente. Ahora inicia sesión.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("P_Login"),
        },
      ]);
    } catch (error: any) {
      console.error("[REGISTER] Error de conexión:", error);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Regístrate</Text>
        <View style={styles.divider} />
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📝</Text>
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.input}
              value={formData.nombres}
              onChangeText={(value) => handleInputChange("nombres", value)}
              editable={!loading}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              value={formData.apellidos}
              onChangeText={(value) => handleInputChange("apellidos", value)}
              editable={!loading}
            />
          </View>
        </View>

        <Text style={styles.spacedLabel}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={formData.correo}
          onChangeText={(value) => handleInputChange("correo", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.spacedLabel}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={formData.contrasena}
          onChangeText={(value) => handleInputChange("contrasena", value)}
          secureTextEntry
          editable={!loading}
        />

        <Text style={styles.spacedLabel}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmarContrasena}
          onChangeText={(value) => handleInputChange("confirmarContrasena", value)}
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (navigation) {
              navigation.navigate("P_Login");
            }
          }}
        >
          <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
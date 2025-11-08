import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../components/Footer";
import { AUTH_ROUTES } from "../config/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
  },
  header: {
    backgroundColor: '#0088dc',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    marginTop: 16,
    width: 80,
    height: 1,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginTop: 24,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 24,
    marginTop: -40,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  label: {
    color: '#999999',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e3f2fd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
  },
  spacedLabel: {
    color: '#999999',
    marginTop: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#0088dc',
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    textAlign: 'center',
    color: '#0088dc',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

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

      const data = await response.json();

      if (!response.ok || !data.success) {
        Alert.alert("Error en registro", data.message || "No se pudo registrar");
        return;
      }

      // ✅ Registro exitoso
      Alert.alert("Éxito", "Cuenta creada exitosamente. Inicia sesión ahora.");
      
      // Navegar de vuelta a login
      if (navigation) {
        navigation.navigate("A_Login");
      }
    } catch (error: any) {
      console.error("Error de conexión:", error);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con el servidor."
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
              navigation.navigate("A_Login");
            }
          }}
        >
          <Text style={styles.loginLink}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}

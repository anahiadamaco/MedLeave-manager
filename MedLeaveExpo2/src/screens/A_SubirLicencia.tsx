import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { LICENCIA_ROUTES } from "../config/api";
import { styles } from "../styles/A_SubirLicencia.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

export default function A_SubirLicencia({ navigation }: any) {
  const { isDark } = useTheme();

  const [formData, setFormData] = React.useState({
    nombres: "",
    apellidos: "",
    fechaEmision: "",
    inicioLicencia: "",
    terminoLicencia: "",
    cursosJustificar: "",
    seccion: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // Validaciones
    if (
      !formData.nombres ||
      !formData.apellidos ||
      !formData.fechaEmision ||
      !formData.inicioLicencia ||
      !formData.terminoLicencia ||
      !formData.cursosJustificar ||
      !formData.seccion
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(LICENCIA_ROUTES.CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          fecha_emision: formData.fechaEmision,
          inicio_licencia: formData.inicioLicencia,
          termino_licencia: formData.terminoLicencia,
          cursos_justificar: formData.cursosJustificar,
          seccion: formData.seccion,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        Alert.alert("Error", data.message || "No se pudo enviar la licencia");
        return;
      }

      Alert.alert("Éxito", "Licencia enviada correctamente");

      setFormData({
        nombres: "",
        apellidos: "",
        fechaEmision: "",
        inicioLicencia: "",
        terminoLicencia: "",
        cursosJustificar: "",
        seccion: "",
      });
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
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Subir licencia médica
        </Text>
      </View>

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.description, isDark && styles.blackDescription]}>
          En esta sección podrás ingresar tu licencia médica de forma digital,
          adjuntar los documentos necesarios y enviarlos para su revisión rápida
          y segura.
        </Text>

        {/* Campo: Nombres */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Nombres:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.nombres}
            onChangeText={(value) => handleInputChange("nombres", value)}
            editable={!loading}
          />
        </View>

        {/* Campo: Apellidos */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Apellidos:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.apellidos}
            onChangeText={(value) => handleInputChange("apellidos", value)}
            editable={!loading}
          />
        </View>

        {/* Campo: Fecha de emisión */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de emisión:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.fechaEmision}
            onChangeText={(value) => handleInputChange("fechaEmision", value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#ffffff' : '#4A4A4A'}
            editable={!loading}
          />
        </View>

        {/* Campo: Inicio licencia */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Inicio licencia:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.inicioLicencia}
            onChangeText={(value) => handleInputChange("inicioLicencia", value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#ffffff' : '#4A4A4A'}
            editable={!loading}
          />
        </View>

        {/* Campo: Término licencia */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Término licencia:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.terminoLicencia}
            onChangeText={(value) => handleInputChange("terminoLicencia", value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#ffffff' : '#4A4A4A'}
            editable={!loading}
          />
        </View>

        {/* Campo: Cursos a justificar */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Cursos a justificar:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.cursosJustificar}
            onChangeText={(value) => handleInputChange("cursosJustificar", value)}
            editable={!loading}
          />
        </View>

        {/* Campo: Sección */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Sección:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.seccion}
            onChangeText={(value) => handleInputChange("seccion", value)}
            editable={!loading}
          />
        </View>

        {/* Botón de adjuntar */}
        <TouchableOpacity style={[styles.attachButton, isDark && styles.attachButtonDark]}>
          <Text style={[styles.attachButtonText, isDark && styles.attachButtonTextDark]}>Adjuntar licencia médica</Text>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>

        {/* Botón enviar */}
        <TouchableOpacity 
          style={[styles.submitButton, isDark && styles.submitButtonDark]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <A_Menu navigation={navigation} />
    </View>
  );
}
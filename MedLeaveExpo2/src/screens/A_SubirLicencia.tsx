import React, { useState } from "react";
import {View, Text, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet, Alert, ActivityIndicator} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { LICENCIA_ROUTES } from "../config/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerImage: {
    width: '100%',
    height: 130,
  },
  titleContainer: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    textAlign: 'center',
    color: '#4A4A4A',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#333333',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ADD8F1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  attachButton: {
    backgroundColor: '#C7E5FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  attachButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  attachIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function A_SubirLicencia() {
  const navigation = useNavigation();

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

      // ✅ Envío exitoso
      Alert.alert("Éxito", "Licencia enviada correctamente");
      
      // Limpiar formulario
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
    <View style={styles.container}>
      {/* Imagen de encabezado */}
      <Image
        // source={require("")}
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Título superpuesto */}
      <View style={styles.titleContainer}>
        {/* Flecha de volver atrás */}
        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-2 top-2">
          <ChevronLeft size={24} color="#007ACC" />
        </TouchableOpacity>

        <Text style={styles.title}>
          Subir licencia médica
        </Text>
      </View>

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          En esta sección podrás ingresar tu licencia médica de forma digital,
          adjuntar los documentos necesarios y enviarlos para su revisión rápida
          y segura.
        </Text>

        {/* Campo: Nombres */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nombres:</Text>
          <TextInput
            style={styles.input}
            value={formData.nombres}
            onChangeText={(value) => handleInputChange("nombres", value)}
            editable={!loading}
          />
        </View>

        {/* Campo: Apellidos */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Apellidos:</Text>
          <TextInput
            style={styles.input}
            value={formData.apellidos}
            onChangeText={(value) => handleInputChange("apellidos", value)}
            editable={!loading}
          />
        </View>

        {/* Campo: Fecha de emisión */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Fecha de emisión:</Text>
          <TextInput
            style={styles.input}
            value={formData.fechaEmision}
            onChangeText={(value) => handleInputChange("fechaEmision", value)}
            placeholder="YYYY-MM-DD"
            editable={!loading}
          />
        </View>

        {/* Campo: Inicio licencia */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Inicio licencia:</Text>
          <TextInput
            style={styles.input}
            value={formData.inicioLicencia}
            onChangeText={(value) => handleInputChange("inicioLicencia", value)}
            placeholder="YYYY-MM-DD"
            editable={!loading}
          />
        </View>

        {/* Campo: Término licencia */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Término licencia:</Text>
          <TextInput
            style={styles.input}
            value={formData.terminoLicencia}
            onChangeText={(value) => handleInputChange("terminoLicencia", value)}
            placeholder="YYYY-MM-DD"
            editable={!loading}
          />
        </View>

        {/* Campo: Cursos a justificar */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Cursos a justificar:</Text>
          <TextInput
            style={styles.input}
            value={formData.cursosJustificar}
            onChangeText={(value) => handleInputChange("cursosJustificar", value)}
            editable={!loading}
          />
        </View>

        {/* Campo: Sección */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Sección:</Text>
          <TextInput
            style={styles.input}
            value={formData.seccion}
            onChangeText={(value) => handleInputChange("seccion", value)}
            editable={!loading}
          />
        </View>

        {/* Botón de adjuntar */}
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachButtonText}>Adjuntar licencia médica</Text>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>

        {/* Botón enviar */}
        <TouchableOpacity 
          style={styles.submitButton}
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
    </View>
  );
}

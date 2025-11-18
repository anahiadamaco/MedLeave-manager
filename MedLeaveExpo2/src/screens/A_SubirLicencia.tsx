import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import Footer from "../components/Footer";
import { LICENCIA_ROUTES } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

let DocumentPicker: any;
try {
  DocumentPicker = require("react-native-document-picker");
} catch (e) {
  console.log("DocumentPicker not available");
}

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
  fileInfo: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  fileInfoText: {
    color: '#2E7D32',
    fontSize: 12,
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
  const [formData, setFormData] = React.useState({
    folio: "",
    fechaEmision: "",
    inicioLicencia: "",
    terminoLicencia: "",
    motivoMedico: "",
    cursos: "",
  });
  const [selectedFile, setSelectedFile] = React.useState<{
    uri: string;
    name: string;
    size: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSelectFile = async () => {
    try {
      if (!DocumentPicker) {
        Alert.alert("Error", "DocumentPicker no disponible");
        return;
      }

      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      if (results && results.length > 0) {
        const file = results[0];
        console.log("✅ Archivo seleccionado:", {
          uri: file.uri,
          name: file.name,
          size: file.size,
        });

        setSelectedFile({
          uri: file.uri,
          name: file.name,
          size: file.size,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("Selección cancelada");
      } else {
        console.error("Error seleccionando archivo:", err);
        Alert.alert("Error", "No se pudo seleccionar el archivo");
      }
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.folio ||
      !formData.fechaEmision ||
      !formData.inicioLicencia ||
      !formData.terminoLicencia ||
      !formData.motivoMedico ||
      !formData.cursos
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Error", "Por favor selecciona un archivo PDF");
      return;
    }

    setLoading(true);

    try {
      const userJson = await AsyncStorage.getItem("user");
      if (!userJson) {
        Alert.alert("Error", "Usuario no autenticado");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userJson);
      const id_usuario = user.id_usuario;

      console.log("📝 [1] Iniciando lectura de archivo...");
      const fileContent = await FileSystem.readAsStringAsync(selectedFile.uri, {
        encoding: "base64",
      });

      console.log("✅ [2] Archivo leído, base64 length:", fileContent.length);

      const payload = {
        folio: formData.folio,
        fecha_emision: formData.fechaEmision,
        fecha_inicio: formData.inicioLicencia,
        fecha_fin: formData.terminoLicencia,
        motivo_medico: formData.motivoMedico,
        cursos: formData.cursos,
        id_usuario,
        file: {
          name: selectedFile.name,
          base64: fileContent,
          type: "application/pdf",
        },
      };

      console.log("📦 [3] Enviando payload a:", LICENCIA_ROUTES.UPLOAD);

      const response = await fetch(LICENCIA_ROUTES.UPLOAD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log("📊 [4] Respuesta del servidor:", data);

      if (!response.ok) {
        Alert.alert("Error", data.error || "No se pudo subir la licencia");
        setLoading(false);
        return;
      }

      Alert.alert("Éxito", "Licencia subida correctamente");

      setFormData({
        folio: "",
        fechaEmision: "",
        inicioLicencia: "",
        terminoLicencia: "",
        motivoMedico: "",
        cursos: "",
      });
      setSelectedFile(null);
    } catch (error: any) {
      console.error("Error de conexión:", error);
      Alert.alert(
        "Error de conexión",
        error.message || "No se pudo conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.headerImage} resizeMode="cover" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Subir licencia médica</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          En esta sección podrás ingresar tu licencia médica de forma digital,
          adjuntar los documentos necesarios y enviarlos para su revisión rápida y segura.
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Folio:</Text>
          <TextInput
            style={styles.input}
            value={formData.folio}
            onChangeText={(value) => handleInputChange("folio", value)}
            editable={!loading}
            placeholder="Ej: FOL-2025-001"
          />
        </View>

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

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Motivo médico:</Text>
          <TextInput
            style={styles.input}
            value={formData.motivoMedico}
            onChangeText={(value) => handleInputChange("motivoMedico", value)}
            editable={!loading}
            placeholder="Ej: Consulta médica"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Cursos a justificar:</Text>
          <TextInput
            style={styles.input}
            value={formData.cursos}
            onChangeText={(value) => handleInputChange("cursos", value)}
            editable={!loading}
            placeholder="Ej: MAT101,FIS201"
          />
        </View>

        <TouchableOpacity 
          style={styles.attachButton}
          onPress={handleSelectFile}
          disabled={loading}
        >
          <Text style={styles.attachButtonText}>
            {selectedFile ? "📄 Cambiar archivo" : "Adjuntar licencia médica"}
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={styles.fileInfo}>
            <Text style={styles.fileInfoText}>✅ Archivo: {selectedFile.name}</Text>
            <Text style={styles.fileInfoText}>📦 Tamaño: {(selectedFile.size / 1024).toFixed(2)} KB</Text>
          </View>
        )}

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
        <Footer />
      </ScrollView>
    </View>
  );
}

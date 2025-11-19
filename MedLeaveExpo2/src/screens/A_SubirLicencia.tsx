import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import { ChevronLeft, Paperclip, X } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as pako from "pako";
import { LICENCIA_ROUTES } from "../config/api";
import { styles } from "../styles/A_SubirLicencia.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

// NOTIFICACIONES LOCALES (puedes reemplazarlo con Context o Redux)
type Notificacion = {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
};

type FormState = {
  nombres: string;
  apellidos: string;
  fechaEmision: string;
  inicioLicencia: string;
  terminoLicencia: string;
  cursosJustificar: string;
  seccion: string;
};

export default function A_SubirLicencia({ navigation }: any) {
  const { isDark } = useTheme();

  const [formData, setFormData] = React.useState({
    folio: "",
    fecha_emision: "",
    fecha_inicio: "",
    fecha_fin: "",
    motivo_medico: "",
    cursos: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<number | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  // Obtener ID del usuario del almacenamiento
  useEffect(() => {
    const getUserId = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          setUserId(userData.id_usuario);
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };
    getUserId();
  }, []);

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.error("Error seleccionando archivo:", error);
      Alert.alert("Error", "No se pudo seleccionar el archivo");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if ((result as any).type === "cancel" || (result as any).canceled === true) return;

      let file: any = null;
      if ((result as any).uri) {
        file = {
          uri: (result as any).uri,
          name: (result as any).name || "licencia.pdf",
          type: (result as any).mimeType || "application/pdf",
        };
      } else if ((result as any).assets && (result as any).assets.length > 0) {
        const a = (result as any).assets[0];
        file = {
          uri: a.uri,
          name: a.name || "licencia.pdf",
          type: a.mimeType || "application/pdf",
        };
      }

      if (!file) {
        Alert.alert("Error", "No se pudo obtener el archivo seleccionado.");
        return;
      }

      setPdfFile(file);
      Alert.alert("Archivo seleccionado", file.name);
    } catch (e) {
      console.error("Error al seleccionar PDF:", e);
      Alert.alert("Error", "No se pudo seleccionar el archivo PDF.");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.folio ||
      !formData.fecha_emision ||
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.motivo_medico ||
      !formData.cursos
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Error", "Por favor selecciona un archivo PDF");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "No se pudo obtener la información del usuario");
      return;
    }

    setLoading(true);

    try {
      // Leer el archivo como base64
      const fileResponse = await fetch(selectedFile.uri);
      const blob = await fileResponse.blob();
      
      const fileContent = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          // Extraer solo la parte base64 (sin el prefijo data:...)
          const base64Data = base64String.split(',')[1] || base64String;
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Convertir base64 a bytes y comprimir
      const binaryString = atob(fileContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const compressed = pako.gzip(bytes);
      
      // Convertir bytes comprimidos a base64 de forma eficiente
      let compressedBase64 = "";
      const chunkSize = 8192;
      for (let i = 0; i < compressed.length; i += chunkSize) {
        const chunk = compressed.slice(i, i + chunkSize);
        compressedBase64 += String.fromCharCode(...chunk);
      }
      compressedBase64 = btoa(compressedBase64);

      const response = await fetch(LICENCIA_ROUTES.UPLOAD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folio: formData.folio,
          fecha_emision: formData.fecha_emision,
          fecha_inicio: formData.fecha_inicio,
          fecha_fin: formData.fecha_fin,
          motivo_medico: formData.motivo_medico,
          cursos: formData.cursos,
          id_usuario: userId,
          file: {
            name: selectedFile.name,
            base64: compressedBase64,
            type: selectedFile.mimeType || "application/pdf",
            compressed: true,
          },
        }),
      });

      const data = await response.json();
      console.log("📦 [RESPUESTA] Data recibida:", data);
      console.log("📊 [RESPUESTA] Status:", response.status);
      console.log("✅ [RESPUESTA] Success:", data.success);

      if (!response.ok || !data.success) {
        console.log("Error backend:", data);
        Alert.alert("Error", data.message || "No se pudo enviar la licencia");

        // Notificación de fallo
        setNotificaciones((prev) => [
          ...prev,
          {
            id: new Date().getTime().toString(),
            titulo: "Error al enviar licencia",
            mensaje: `Licencia de ${formData.nombres} ${formData.apellidos} no enviada.`,
            fecha: new Date().toLocaleDateString(),
            leido: false,
          },
        ]);
        return;
      }

      console.log("🎉 [ÉXITO] Mostrando alert...");
      Alert.alert("✅ Éxito", "Licencia enviada correctamente", [
        {
          text: "Ir al inicio",
          onPress: () => {
            console.log("🔄 [NAVEGACIÓN] Limpiando formulario...");
            setFormData({
              folio: "",
              fecha_emision: "",
              fecha_inicio: "",
              fecha_fin: "",
              motivo_medico: "",
              cursos: "",
            });
            setSelectedFile(null);
            console.log("🔄 [NAVEGACIÓN] Navegando a A_home...");
            navigation.navigate("A_home");
            console.log("🔄 [NAVEGACIÓN] Navegación completada");
          },
        },
      ]);
    } catch (error: any) {
      console.error("Error de conexión:", error);
      Alert.alert(
        "❌ Error de conexión",
        error.message || "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
        [
          {
            text: "Reintentar",
            onPress: () => handleSubmit(),
          },
          {
            text: "Cancelar",
            style: "cancel",
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subir licencia médica</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, isDark && styles.blackDescription]}>
          En esta sección podrás ingresar tu licencia médica y adjuntar el PDF para su verificación.
        </Text>

        {/* Campo: Folio */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Folio:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.folio}
            onChangeText={(value) => handleInputChange("folio", value)}
            placeholder="Ej: LIC-2025-001"
            placeholderTextColor={isDark ? '#999999' : '#999999'}
            editable={!loading}
          />
        </View>

        {/* Campo: Fecha de emisión */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de emisión:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.fecha_emision}
            onChangeText={(value) => handleInputChange("fecha_emision", value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#999999' : '#999999'}
            editable={!loading}
          />
        </View>

        {/* Campo: Fecha de inicio */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de inicio:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.fecha_inicio}
            onChangeText={(value) => handleInputChange("fecha_inicio", value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#999999' : '#999999'}
            editable={!loading}
          />
        </View>

        {/* Campo: Fecha de fin */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de fin:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.fecha_fin}
            onChangeText={(value) => handleInputChange("fecha_fin", value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#999999' : '#999999'}
            editable={!loading}
          />
        </View>

        {/* Campo: Motivo médico */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Motivo médico:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.motivo_medico}
            onChangeText={(value) => handleInputChange("motivo_medico", value)}
            placeholder="Descripción del motivo médico"
            placeholderTextColor={isDark ? '#999999' : '#999999'}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
        </View>

        {/* Campo: Cursos a justificar */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Cursos a justificar:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.cursos}
            onChangeText={(value) => handleInputChange("cursos", value)}
            placeholder="Ej: Matemáticas, Historia, Inglés"
            placeholderTextColor={isDark ? '#999999' : '#999999'}
            multiline
            numberOfLines={3}
            editable={!loading}
          />
        </View>

        {/* Seleccionar PDF */}
        <TouchableOpacity 
          style={[styles.attachButton, isDark && styles.attachButtonDark]}
          onPress={handleSelectFile}
          disabled={loading}
        >
          <Paperclip size={20} color="#ffffff" />
          <Text style={[styles.attachButtonText, isDark && styles.attachButtonTextDark]}>
            Seleccionar licencia médica PDF
          </Text>
        </TouchableOpacity>

        {/* Mostrar archivo seleccionado */}
        {selectedFile && (
          <View style={[styles.fileContainer, isDark && styles.fileContainerDark]}>
            <Text style={[styles.fileName, isDark && styles.fileNameDark]}>
              ✓ {selectedFile.name}
            </Text>
            <TouchableOpacity onPress={handleRemoveFile} disabled={loading}>
              <X size={20} color={isDark ? "#999999" : "#666666"} />
            </TouchableOpacity>
          </View>
        )}

        {/* Botón enviar */}
        <TouchableOpacity 
          style={[styles.submitButton, isDark && styles.submitButtonDark]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar licencia</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <A_Menu navigation={navigation} />
    </View>
  );
}

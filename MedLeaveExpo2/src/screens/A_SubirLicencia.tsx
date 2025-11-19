import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { ChevronLeft, Paperclip, X } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { LICENCIA_ROUTES } from "../config/api";
import { styles } from "../styles/A_SubirLicencia.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

export default function A_SubirLicencia({ navigation }: any) {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    folio: "",
    fecha_emision: "",
    fecha_inicio: "",
    fecha_fin: "",
    motivo_medico: "",
    cursos: "",
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [processingFile, setProcessingFile] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const savedToken = await AsyncStorage.getItem("token");
        if (user) {
          const userData = JSON.parse(user);
          setUserId(userData.id_usuario);
        }
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Error obteniendo usuario o token:", error);
      }
    };
    getUserData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        // Validar tamaño máximo (5MB)
        const MAX_SIZE_MB = 5;
        if (file.size && file.size > MAX_SIZE_MB * 1024 * 1024) {
          Alert.alert("❌ Error", `El archivo no puede superar ${MAX_SIZE_MB} MB`);
          return;
        }

        setSelectedFile(file);
      }
    } catch (error) {
      console.error("Error seleccionando archivo:", error);
      Alert.alert("Error", "No se pudo seleccionar el archivo");
    }
  };

  const handleRemoveFile = () => setSelectedFile(null);

  const isValidDate = (dateStr: string) => !isNaN(Date.parse(dateStr));

  const handleSubmit = async () => {
    // Validaciones básicas
    if (!formData.folio || !formData.fecha_emision || !formData.fecha_inicio || !formData.fecha_fin || !formData.motivo_medico || !formData.cursos) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const folioRegex = /^LIC-\d{4}-\d{3}$/;
    if (!folioRegex.test(formData.folio)) {
      Alert.alert("Error", "El folio debe tener formato LIC-YYYY-NNN (ej: LIC-2025-001)");
      return;
    }

    if (!isValidDate(formData.fecha_emision) || !isValidDate(formData.fecha_inicio) || !isValidDate(formData.fecha_fin)) {
      Alert.alert("Error", "Ingresa fechas válidas en formato YYYY-MM-DD");
      return;
    }

    if (new Date(formData.fecha_emision) > new Date(formData.fecha_inicio)) {
      Alert.alert("Error", "La fecha de emisión no puede ser posterior a la fecha de inicio");
      return;
    }
    if (new Date(formData.fecha_inicio) > new Date(formData.fecha_fin)) {
      Alert.alert("Error", "La fecha de inicio no puede ser posterior a la fecha de fin");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Error", "Por favor selecciona un archivo PDF");
      return;
    }

    if (!userId || !token) {
      Alert.alert("Error", "No se pudo obtener la información del usuario o token");
      return;
    }

    setProcessingFile(true);

    try {
      // Crear FormData
      const data = new FormData();
      data.append("folio", formData.folio);
      data.append("fecha_emision", formData.fecha_emision);
      data.append("fecha_inicio", formData.fecha_inicio);
      data.append("fecha_fin", formData.fecha_fin);
      data.append("motivo_medico", formData.motivo_medico);
      data.append("cursos", formData.cursos);
      data.append("id_usuario", userId.toString());
      data.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.mimeType || "application/pdf"
      } as any);

      setLoading(true);

      // Enviar al backend con token
      const response = await fetch(LICENCIA_ROUTES.UPLOAD, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const resData = await response.json();

      if (response.status === 401) {
        Alert.alert("❌ No autorizado", "Tu sesión ha expirado o no tienes permiso. Por favor inicia sesión nuevamente.");
        setLoading(false);
        return;
      }

      if (response.ok && resData.success) {
        Alert.alert("✅ Éxito", "Licencia enviada correctamente", [
          {
            text: "Ir al inicio",
            onPress: () => {
              setFormData({ folio:"", fecha_emision:"", fecha_inicio:"", fecha_fin:"", motivo_medico:"", cursos:"" });
              setSelectedFile(null);
              navigation.navigate("A_home");
            },
          },
        ]);
      } else {
        Alert.alert("❌ Error", resData.message || "No se pudo enviar la licencia");
      }

    } catch (error: any) {
      console.error("Error de conexión:", error);
      Alert.alert("❌ Error de conexión", error.message || "No se pudo conectar al servidor");
    } finally {
      setLoading(false);
      setProcessingFile(false);
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
          Ingresa tu licencia médica digital y adjunta los documentos necesarios.
        </Text>

        {["folio","fecha_emision","fecha_inicio","fecha_fin","motivo_medico","cursos"].map((field) => (
          <View style={styles.fieldContainer} key={field}>
            <Text style={[styles.label, isDark && styles.blackLabel]}>
              {field.replace("_", " ").toUpperCase()}:
            </Text>
            <TextInput
              style={[styles.input, isDark && styles.blackInput]}
              value={formData[field as keyof typeof formData]}
              onChangeText={(value) => handleInputChange(field, value)}
              placeholder={field.replace("_", " ")}
              placeholderTextColor={isDark ? '#999999' : '#999999'}
              multiline={field === "motivo_medico" || field === "cursos"}
              numberOfLines={field === "motivo_medico" ? 4 : field === "cursos" ? 3 : 1}
              editable={!loading && !processingFile}
            />
          </View>
        ))}

        <TouchableOpacity style={[styles.attachButton, isDark && styles.attachButtonDark]} onPress={handleSelectFile} disabled={loading || processingFile}>
          <Paperclip size={20} color="#ffffff" />
          <Text style={[styles.attachButtonText, isDark && styles.attachButtonTextDark]}>
            {processingFile ? "Procesando archivo..." : "Seleccionar licencia médica PDF"}
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={[styles.fileContainer, isDark && styles.fileContainerDark]}>
            <Text style={[styles.fileName, isDark && styles.fileNameDark]}>✓ {selectedFile.name}</Text>
            <TouchableOpacity onPress={handleRemoveFile} disabled={loading || processingFile}>
              <X size={20} color={isDark ? "#999999" : "#666666"} />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={[styles.submitButton, isDark && styles.submitButtonDark]} onPress={handleSubmit} disabled={loading || processingFile}>
          {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.submitButtonText}>Enviar licencia</Text>}
        </TouchableOpacity>
      </ScrollView>

      <A_Menu navigation={navigation} />
    </View>
  );
}

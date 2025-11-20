import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator, Modal, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ChevronLeft, Paperclip, X, Calendar, ChevronDown } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as pako from "pako";
import { Calendar as RNCalendar } from "react-native-calendars";
import { LICENCIA_ROUTES, CURSOS_ROUTES } from "../config/api";
import { styles } from "../styles/A_SubirLicencia.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

export default function A_SubirLicencia({ navigation }: any) {
  const { isDark } = useTheme();

  const [formData, setFormData] = React.useState({
    folio: "",
    fecha_emision: "",
    fecha_inicio: "",
    fecha_fin: "",
    motivo_medico: "",
    id_cursos: [] as number[],
  });
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<number | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const [cursos, setCursos] = React.useState<any[]>([]);
  const [loadingCursos, setLoadingCursos] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string>("");
  const [showCursosDropdown, setShowCursosDropdown] = React.useState(false);

  const loadCursos = async (authToken: string) => {
    try {
      setLoadingCursos(true);
      const url = CURSOS_ROUTES.GET_ALL;
      console.log("📍 [CURSOS] Llamando a:", url);
      console.log("🔑 [CURSOS] Token disponible:", !!authToken);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      console.log("📊 [CURSOS] Status:", response.status);
      const data = await response.json();
      console.log("📦 [CURSOS] Respuesta completa:", JSON.stringify(data, null, 2));

      if (response.ok && data.success && Array.isArray(data.data)) {
        setCursos(data.data);
        console.log(`✅ [CURSOS] ${data.data.length} cursos cargados:`, data.data.map((c: any) => c.codigo));
      } else {
        console.error("❌ [CURSOS] Error o respuesta inválida:");
        console.error(`   Success: ${data.success}`);
        console.error(`   Data es array: ${Array.isArray(data.data)}`);
        console.error(`   Status: ${response.status}`);
        console.error(`   Message: ${data.message}`);
        setCursos([]);
      }
    } catch (error: any) {
      console.error("❌ [CURSOS] Error de conexión:", error.message);
      setCursos([]);
    } finally {
      setLoadingCursos(false);
    }
  };

  // Obtener datos del usuario y cargar cursos
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log("🔄 [INIT] Iniciando carga de datos del usuario");
        const user = await AsyncStorage.getItem("user");
        const authToken = await AsyncStorage.getItem("token");
        
        console.log("🔍 [INIT] User en AsyncStorage:", !!user);
        console.log("🔍 [INIT] Token en AsyncStorage:", !!authToken);
        
        if (user) {
          const userData = JSON.parse(user);
          setUserId(userData.id_usuario);
          console.log("✅ [INIT] Usuario ID:", userData.id_usuario);
        }
        
        if (authToken) {
          setToken(authToken);
          console.log("✅ [INIT] Token guardado en state");
          console.log("⏳ [INIT] Llamando loadCursos...");
          await loadCursos(authToken);
        } else {
          console.warn("⚠️ [INIT] No hay token en AsyncStorage");
        }
      } catch (error) {
        console.error("❌ [INIT] Error obteniendo datos del usuario:", error);
      }
    };
    getUserData();
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

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateSelect = (date: string) => {
    if (showCalendar === "emision") {
      setFormData({ ...formData, fecha_emision: date });
    } else if (showCalendar === "inicio") {
      setFormData({ ...formData, fecha_inicio: date });
    } else if (showCalendar === "fin") {
      setFormData({ ...formData, fecha_fin: date });
    }
    setShowCalendar(null);
  };

  const handleSubmit = async () => {
    // Validaciones
    if (
      !formData.folio ||
      !formData.fecha_emision ||
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.motivo_medico ||
      formData.id_cursos.length === 0
    ) {
      Alert.alert("Error", "Por favor completa todos los campos y selecciona al menos un curso");
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
      
      // Convertir bytes comprimidos a base64
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
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          folio: formData.folio,
          fecha_emision: formData.fecha_emision,
          fecha_inicio: formData.fecha_inicio,
          fecha_fin: formData.fecha_fin,
          motivo_medico: formData.motivo_medico,
          id_cursos: formData.id_cursos,
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
        Alert.alert("Error", data.message || "No se pudo enviar la licencia");
        return;
      }

      Alert.alert("✅ Éxito", "Licencia enviada correctamente", [
        {
          text: "Ir al inicio",
          onPress: () => {
            setFormData({
              folio: "",
              fecha_emision: "",
              fecha_inicio: "",
              fecha_fin: "",
              motivo_medico: "",
              id_cursos: [],
            });
            setSelectedFile(null);
            navigation.navigate("A_home");
          },
        },
      ]);
    } catch (error: any) {
      console.error("Error de conexión:", error);
      Alert.alert(
        "❌ Error de conexión",
        error.message || "No se pudo conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  };

  // Obtener nombre del curso seleccionado
  const selectedCursoName = formData.id_cursos.length > 0 
    ? `${formData.id_cursos.length} curso(s) seleccionado(s)` 
    : "Selecciona uno o más cursos";

  return (
    <View style={[styles.container, isDark && styles.blackContainer, { flex: 1 }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={[styles.header, isDark && styles.blackHeader]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subir licencia médica</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
        <Text style={[styles.description, isDark && styles.blackDescription]}>
          En esta sección podrás ingresar tu licencia médica de forma digital.
        </Text>

        {/* Folio */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Folio:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.folio}
            onChangeText={(value) => handleInputChange("folio", value)}
            placeholder="Ej: LIC-2025-001"
            editable={!loading}
          />
        </View>

        {/* Fecha Emisión */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de emisión:</Text>
          <TouchableOpacity
            style={[styles.input, isDark && styles.blackInput, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
            onPress={() => setShowCalendar("emision")}
            disabled={loading}
          >
            <Text style={{ color: formData.fecha_emision ? '#000' : '#999' }}>
              {formData.fecha_emision || "YYYY-MM-DD"}
            </Text>
            <Calendar size={20} color="#0089E0" />
          </TouchableOpacity>
        </View>

        {/* Fecha Inicio */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de inicio:</Text>
          <TouchableOpacity
            style={[styles.input, isDark && styles.blackInput, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
            onPress={() => setShowCalendar("inicio")}
            disabled={loading}
          >
            <Text style={{ color: formData.fecha_inicio ? '#000' : '#999' }}>
              {formData.fecha_inicio || "YYYY-MM-DD"}
            </Text>
            <Calendar size={20} color="#0089E0" />
          </TouchableOpacity>
        </View>

        {/* Fecha Fin */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Fecha de fin:</Text>
          <TouchableOpacity
            style={[styles.input, isDark && styles.blackInput, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
            onPress={() => setShowCalendar("fin")}
            disabled={loading}
          >
            <Text style={{ color: formData.fecha_fin ? '#000' : '#999' }}>
              {formData.fecha_fin || "YYYY-MM-DD"}
            </Text>
            <Calendar size={20} color="#0089E0" />
          </TouchableOpacity>
        </View>

        {/* Motivo Médico */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Motivo médico:</Text>
          <TextInput
            style={[styles.input, isDark && styles.blackInput]}
            value={formData.motivo_medico}
            onChangeText={(value) => handleInputChange("motivo_medico", value)}
            placeholder="Ej: Reposo por influenza"
            editable={!loading}
          />
        </View>

        {/* Cursos */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Cursos:</Text>
          {loadingCursos ? (
            <ActivityIndicator color="#0089E0" />
          ) : (
            <>
              {/* Selected Courses Display */}
              {formData.id_cursos.length > 0 && (
                <View style={{ marginBottom: 12, gap: 8 }}>
                  {formData.id_cursos.map((cursoId) => {
                    const curso = cursos.find(c => c.id_curso === cursoId);
                    return (
                      <View
                        key={cursoId}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: '#e3f2fd',
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 6,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#000' }}>
                            {curso?.codigo}
                          </Text>
                          <Text style={{ fontSize: 12, color: '#666' }}>
                            {curso?.nombre_curso}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setFormData({
                              ...formData,
                              id_cursos: formData.id_cursos.filter(id => id !== cursoId),
                            });
                          }}
                        >
                          <X size={20} color="#ff6b6b" />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}

              {/* Course Selection Dropdown */}
              <TouchableOpacity
                style={[styles.input, isDark && styles.blackInput, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
                onPress={() => setShowCursosDropdown(!showCursosDropdown)}
                disabled={loading}
              >
                <Text style={{ color: formData.id_cursos.length > 0 ? '#000' : '#999' }}>
                  {selectedCursoName}
                </Text>
                <ChevronDown size={20} color="#0089E0" style={{ transform: [{ rotate: showCursosDropdown ? '180deg' : '0deg' }] }} />
              </TouchableOpacity>

              {showCursosDropdown && cursos.length > 0 && (
                <FlatList
                  data={cursos}
                  keyExtractor={(item) => item.id_curso.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    const isSelected = formData.id_cursos.includes(item.id_curso);
                    return (
                      <TouchableOpacity
                        style={[
                          { 
                            padding: 12, 
                            borderBottomWidth: 1, 
                            borderBottomColor: '#eee',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                          },
                          isSelected && { backgroundColor: '#e3f2fd' }
                        ]}
                        onPress={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              id_cursos: formData.id_cursos.filter(id => id !== item.id_curso),
                            });
                          } else {
                            setFormData({
                              ...formData,
                              id_cursos: [...formData.id_cursos, item.id_curso],
                            });
                          }
                        }}
                      >
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 2,
                            borderColor: '#0089E0',
                            borderRadius: 4,
                            backgroundColor: isSelected ? '#0089E0' : 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {isSelected && <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✓</Text>}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 14, color: '#333', fontWeight: isSelected ? '600' : '400' }}>
                            {item.codigo} - {item.nombre_curso}
                          </Text>
                          <Text style={{ fontSize: 12, color: '#666' }}>
                            Profesor: {item.profesor_nombre}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </>
          )}
        </View>

        {/* Archivo */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, isDark && styles.blackLabel]}>Archivo PDF:</Text>
          {selectedFile ? (
            <View style={[styles.fileContainer, isDark && { backgroundColor: '#333' }]}>
              <Paperclip size={20} color="#0089E0" />
              <Text style={[styles.fileName, isDark && { color: '#fff' }]}>
                {selectedFile.name}
              </Text>
              <TouchableOpacity onPress={handleRemoveFile}>
                <X size={20} color="#ff6b6b" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.fileButton, isDark && { backgroundColor: '#333' }]}
              onPress={handleSelectFile}
              disabled={loading}
            >
              <Paperclip size={24} color="#0089E0" />
              <Text style={[styles.fileButtonText, isDark && { color: '#fff' }]}>
                Seleccionar archivo
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Enviar Licencia</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Calendario */}
      <Modal visible={showCalendar !== null} transparent animationType="slide">
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#fff', paddingTop: 20 }}>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', paddingRight: 20, marginBottom: 10 }}
              onPress={() => setShowCalendar(null)}
            >
              <X size={24} color="#000" />
            </TouchableOpacity>
            <RNCalendar
              onDayPress={(day) => handleDateSelect(day.dateString)}
              markedDates={{
                [formData.fecha_emision]: { selected: showCalendar === "emision", selectedColor: '#0089E0' },
                [formData.fecha_inicio]: { selected: showCalendar === "inicio", selectedColor: '#0089E0' },
                [formData.fecha_fin]: { selected: showCalendar === "fin", selectedColor: '#0089E0' },
              }}
            />
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>

      <A_Menu navigation={navigation} />
    </View>
  );
}

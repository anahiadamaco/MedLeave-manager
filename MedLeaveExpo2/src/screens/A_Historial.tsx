import React, { useState, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator, Modal, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ChevronLeft, X, Eye, Edit2, Trash2 } from "lucide-react-native";
import { styles } from "../styles/A_Historial.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LICENCIA_ROUTES } from "../config/api";

interface Licencia {
  id_licencia?: number;
  folio: number;
  fecha_emision: string;
  fecha_inicio: string;
  fecha_fin: string;
  motivo_medico: string;
  estado: string;
  cursos?: Array<{
    id_curso: number;
    nombre_curso: string;
    codigo: string;
  }>;
  archivo_hash?: string;
}

const ESTADO_COLORS: Record<string, string> = {
  "pendiente": "#FFD93D",
  "aprobada": "#4ECDC4",
  "rechazada": "#FF6B6B",
  "expirada": "#95A3A3",
};

const A_Historial = () => {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [licencias, setLicencias] = useState<Licencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");
  const [selectedLicencia, setSelectedLicencia] = useState<Licencia | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log("🔄 [HISTORIAL] Pantalla en foco - recargando");
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const authToken = await AsyncStorage.getItem("token");
      
      if (user) {
        const userData = JSON.parse(user);
        setUserId(userData.id_usuario);
      }
      
      if (authToken) {
        setToken(authToken);
      }
    } catch (error) {
      console.error("Error obteniendo datos del usuario:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (userId && token) {
        loadLicencias();
      }
    }, [userId, token])
  );

  const loadLicencias = async () => {
    if (!userId || !token) return;
    
    try {
      setLoading(true);
      const url = LICENCIA_ROUTES.GET_BY_USER(userId);
      console.log("📍 Cargando licencias desde:", url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("📦 Respuesta del servidor:", JSON.stringify(data, null, 2));
      
      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ ${data.data.length} licencias cargadas`);
        
        // Limpiar datos inválidos (null courses, etc)
        const licenciasLimpias = data.data.map((lic: Licencia) => ({
          ...lic,
          cursos: Array.isArray(lic.cursos) 
            ? lic.cursos.filter((c: any) => c && c.id_curso) 
            : []
        }));
        
        setLicencias(licenciasLimpias);
      } else {
        console.warn("⚠️ Respuesta inesperada:", data);
        setLicencias([]);
      }
    } catch (error) {
      console.error("❌ Error cargando licencias:", error);
      Alert.alert("Error", "No se pudieron cargar las licencias");
    } finally {
      setLoading(false);
    }
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (estado: string) => {
    return ESTADO_COLORS[estado.toLowerCase()] || "#048ED4";
  };

  const handleVerDetalles = (licencia: Licencia) => {
    setSelectedLicencia(licencia);
    setModalVisible(true);
  };

  const handleEditar = (licencia: Licencia) => {
    if (licencia.estado.toLowerCase() !== "pendiente") {
      Alert.alert("No permitido", "Solo puedes editar licencias pendientes de revisión");
      return;
    }
    
    // Navegar a la pantalla de edición con los datos de la licencia
    navigation.navigate("A_SubirLicencia", { 
      licenciaParaEditar: licencia,
      modo: "editar"
    });
    setModalVisible(false);
  };

  const handleEliminar = (licencia: Licencia) => {
    if (licencia.estado.toLowerCase() !== "pendiente") {
      Alert.alert("No permitido", "Solo puedes eliminar licencias pendientes de revisión");
      return;
    }

    Alert.alert(
      "Eliminar Licencia",
      "¿Estás seguro de que deseas eliminar esta licencia? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const url = LICENCIA_ROUTES.DELETE(licencia.id_licencia!);
              const response = await fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
              });

              if (response.ok) {
                Alert.alert("Éxito", "Licencia eliminada correctamente");
                setModalVisible(false);
                loadLicencias();
              } else {
                Alert.alert("Error", "No se pudo eliminar la licencia");
              }
            } catch (error) {
              console.error("Error eliminando licencia:", error);
              Alert.alert("Error", "Ocurrió un error al eliminar la licencia");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color={"#ffffff"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: "#ffffff" }]}>Historial de Licencias</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={"#048ED4"} />
          </View>
        ) : licencias.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={[styles.emptyText, { color: isDark ? "#9CA3AF" : "#666" }]}>
              No hay licencias registradas
            </Text>
          </View>
        ) : (
          <View style={styles.cursosList}>
            {licencias.map((licencia) => (
              <View
                key={licencia.id_licencia}
                style={[
                  styles.cursoCard,
                  isDark && styles.blackCursoCard,
                  { borderLeftWidth: 4, borderLeftColor: getStatusColor(licencia.estado) }
                ]}
              >
                <View style={styles.cursoInfo}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cursoNombre, { color: "#FFFFFF" }]}>
                        Folio: {licencia.folio}
                      </Text>
                      <View style={{ marginTop: 4 }}>
                        {licencia.cursos && licencia.cursos.length > 0 ? (
                          licencia.cursos.map((curso) => (
                            <Text key={curso.id_curso} style={[styles.cursoCodigo, { color: "#FFFFFF", fontSize: 12 }]}>
                              {curso.codigo} - {curso.nombre_curso}
                            </Text>
                          ))
                        ) : (
                          <Text style={[styles.cursoCodigo, { color: "#FFFFFF", fontSize: 12 }]}>
                            Curso no especificado
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: getStatusColor(licencia.estado),
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 12,
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>
                        {licencia.estado.charAt(0).toUpperCase() + licencia.estado.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginVertical: 8 }}>
                    <Text style={[styles.cursoCodigo, { color: "#FFFFFF", fontSize: 11 }]}>
                      📅 {formatFecha(licencia.fecha_inicio)} - {formatFecha(licencia.fecha_fin)}
                    </Text>
                    <Text style={[styles.cursoCodigo, { color: "#FFFFFF", fontSize: 11, marginTop: 4 }]}>
                      📝 {licencia.motivo_medico}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    backgroundColor: "#048ED4",
                    borderRadius: 8,
                  }}
                  onPress={() => handleVerDetalles(licencia)}
                >
                  <Eye size={18} color="#FFFFFF" />
                  <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "600", marginTop: 4 }}>
                    Ver más
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal de detalles */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View style={[{ backgroundColor: isDark ? "#1F2937" : "#FFFFFF", borderRadius: 12, padding: 20, maxWidth: "90%", maxHeight: "80%" }, isDark && { backgroundColor: "#1F2937" }]}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginBottom: 16 }}
              onPress={() => setModalVisible(false)}
            >
              <X size={24} color={isDark ? "#FFFFFF" : "#000"} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedLicencia && (
                <>
                  <Text style={[{ fontSize: 18, fontWeight: "700", marginBottom: 16 }, isDark && { color: "#FFFFFF" }]}>
                    Detalles de la Licencia
                  </Text>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Folio
                    </Text>
                    <Text style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                      {selectedLicencia.folio}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Curso(s)
                    </Text>
                    <View>
                      {selectedLicencia.cursos && selectedLicencia.cursos.length > 0 ? (
                        selectedLicencia.cursos.map((curso) => (
                          <Text key={curso.id_curso} style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                            {curso.codigo} - {curso.nombre_curso}
                          </Text>
                        ))
                      ) : (
                        <Text style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                          No especificado
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Estado
                    </Text>
                    <View style={{ backgroundColor: getStatusColor(selectedLicencia.estado), paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, alignSelf: "flex-start" }}>
                      <Text style={{ color: "#fff", fontWeight: "600", fontSize: 12 }}>
                        {selectedLicencia.estado.charAt(0).toUpperCase() + selectedLicencia.estado.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Motivo Médico
                    </Text>
                    <Text style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                      {selectedLicencia.motivo_medico}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Fecha de Emisión
                    </Text>
                    <Text style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                      {formatFecha(selectedLicencia.fecha_emision)}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Fecha de Inicio
                    </Text>
                    <Text style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                      {formatFecha(selectedLicencia.fecha_inicio)}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={[{ fontSize: 12, fontWeight: "600", marginBottom: 4 }, isDark ? { color: "#9CA3AF" } : { color: "#666" }]}>
                      Fecha de Fin
                    </Text>
                    <Text style={[{ fontSize: 14, fontWeight: "500" }, isDark && { color: "#FFFFFF" }]}>
                      {formatFecha(selectedLicencia.fecha_fin)}
                    </Text>
                  </View>

                  {/* Botones de acción solo para pendientes */}
                  {selectedLicencia.estado.toLowerCase() === "pendiente" && (
                    <View style={{ marginTop: 20, flexDirection: "row", gap: 12, justifyContent: "space-between" }}>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#3B82F6",
                          paddingVertical: 12,
                          borderRadius: 8,
                          gap: 8,
                        }}
                        onPress={() => handleEditar(selectedLicencia)}
                      >
                        <Edit2 size={16} color="#FFFFFF" />
                        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14 }}>
                          Editar
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#EF4444",
                          paddingVertical: 12,
                          borderRadius: 8,
                          gap: 8,
                        }}
                        onPress={() => handleEliminar(selectedLicencia)}
                      >
                        <Trash2 size={16} color="#FFFFFF" />
                        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 14 }}>
                          Eliminar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <A_Menu navigation={navigation} />
    </View>
  );
};

export default A_Historial;

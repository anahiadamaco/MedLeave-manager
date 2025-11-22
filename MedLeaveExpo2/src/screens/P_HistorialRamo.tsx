import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  ChevronLeft,
  X,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../components/ThemeContext";
import P_Menu from "../components/P_Menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LICENCIA_ROUTES } from "../config/api";
import { styles } from "../styles/P_HistorialRamo.styles";

interface Licencia {
  id_licencia: number;
  folio: string;
  fecha_inicio: string;
  fecha_fin: string;
  motivo_medico: string;
  estado: string;
  nombre_estudiante: string;
  correo_estudiante: string;
  archivo_hash?: string;
}

interface Curso {
  id_curso: number;
  codigo: string;
  nombre_curso: string;
  semestre: string;
}

const ESTADO_COLORS: Record<string, string> = {
  pendiente: "#FFD93D",
  aceptado: "#4ECDC4",
  rechazado: "#FF6B6B",
};

const ESTADO_ICONS: Record<string, React.ReactNode> = {
  pendiente: <Clock size={16} color="#FFD93D" />,
  aceptado: <CheckCircle size={16} color="#4ECDC4" />,
  rechazado: <XCircle size={16} color="#FF6B6B" />,
};

export default function P_HistorialRamo({ route }: any) {
  const { curso }: { curso: Curso } = route.params;
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  const [licencias, setLicencias] = useState<Licencia[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLicencia, setSelectedLicencia] = useState<Licencia | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState<string>("");
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  // Cargar datos
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (storedToken) {
            setToken(storedToken);
            await loadLicencias(storedToken);
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };
      loadData();
    }, [])
  );

  const loadLicencias = async (authToken: string) => {
    try {
      setLoading(true);
      console.log(`📍 [P_HISTORIAL_RAMO] Cargando licencias para curso: ${curso.id_curso}`);

      const url = LICENCIA_ROUTES.GET_PROFESOR_CURSO(curso.id_curso);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("📦 [P_HISTORIAL_RAMO] Respuesta:", data);

      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ [P_HISTORIAL_RAMO] ${data.data.length} licencias cargadas`);
        setLicencias(data.data);
      } else {
        console.warn("⚠️ [P_HISTORIAL_RAMO] Respuesta inesperada:", data);
        setLicencias([]);
      }
    } catch (error) {
      console.error("❌ [P_HISTORIAL_RAMO] Error cargando licencias:", error);
      Alert.alert("Error", "No se pudieron cargar las licencias");
    } finally {
      setLoading(false);
    }
  };

  const licenciasFiltradasRef = React.useMemo(() => {
    if (filtroEstado === "todos") {
      return licencias;
    }
    return licencias.filter((l) => l.estado === filtroEstado);
  }, [licencias, filtroEstado]);

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleVerDetalle = (licencia: Licencia) => {
    setSelectedLicencia(licencia);
    setModalVisible(true);
  };

  const getEstadoColor = (estado: string) => {
    return ESTADO_COLORS[estado] || "#95A3A3";
  };

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{curso.codigo}</Text>
      </View>

      {/* Información del curso */}
      <View style={[styles.courseInfo, isDark && styles.courseInfoDark]}>
        <Text style={[styles.courseTitle, isDark && styles.courseTitleDark]}>
          {curso.nombre_curso}
        </Text>
        <Text style={[styles.courseMeta, isDark && styles.courseMetaDark]}>
          Semestre {curso.semestre}
        </Text>
      </View>

      {/* Filtros por estado */}
      <View style={[styles.filterBar, isDark && styles.filterBarDark]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {["todos", "pendiente", "aceptado", "rechazado"].map((estado) => (
            <TouchableOpacity
              key={estado}
              style={[
                styles.filterBtn,
                filtroEstado === estado && styles.filterBtnActive,
                isDark && styles.filterBtnDark,
              ]}
              onPress={() => setFiltroEstado(estado)}
            >
              <Text
                style={[
                  styles.filterBtnText,
                  filtroEstado === estado && styles.filterBtnTextActive,
                ]}
              >
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contenido */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#048ED4" />
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {licenciasFiltradasRef.length > 0 ? (
            licenciasFiltradasRef.map((licencia) => (
              <TouchableOpacity
                key={licencia.id_licencia}
                style={[
                  styles.licenciaCard,
                  isDark && styles.licenciaCardDark,
                  {
                    borderLeftWidth: 4,
                    borderLeftColor: getEstadoColor(licencia.estado),
                  },
                ]}
                onPress={() => handleVerDetalle(licencia)}
              >
                <View style={styles.licenciaHeader}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.studentName,
                        isDark && styles.studentNameDark,
                      ]}
                    >
                      {licencia.nombre_estudiante}
                    </Text>
                    <Text style={[styles.folio, isDark && styles.folioDark]}>
                      Folio: {licencia.folio}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.estadoBadge,
                      { backgroundColor: getEstadoColor(licencia.estado) },
                    ]}
                  >
                    <Text style={styles.estadoText}>
                      {licencia.estado.charAt(0).toUpperCase() +
                        licencia.estado.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.licenciaBody}>
                  <Text style={[styles.fecha, isDark && styles.fechaDark]}>
                    📅 {formatFecha(licencia.fecha_inicio)} - {formatFecha(licencia.fecha_fin)}
                  </Text>
                  <Text
                    style={[styles.motivo, isDark && styles.motivoDark]}
                    numberOfLines={2}
                  >
                    {licencia.motivo_medico}
                  </Text>
                </View>

                <View style={styles.licenciaFooter}>
                  <Eye size={16} color="#048ED4" />
                  <Text style={styles.viewMoreText}>Ver detalle</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
                No hay licencias {filtroEstado !== "todos" ? filtroEstado : ""} en este curso
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      {/* Modal de detalle */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDark && styles.modalTitleDark]}>
                Detalle de Licencia
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={isDark ? "#ffffff" : "#000"} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {selectedLicencia && (
                <>
                  {/* Estudiante */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalLabel, isDark && styles.modalLabelDark]}>
                      Estudiante
                    </Text>
                    <Text style={[styles.modalValue, isDark && styles.modalValueDark]}>
                      {selectedLicencia.nombre_estudiante}
                    </Text>
                    <Text style={[styles.modalValue, isDark && styles.modalValueDark]}>
                      {selectedLicencia.correo_estudiante}
                    </Text>
                  </View>

                  {/* Folio */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalLabel, isDark && styles.modalLabelDark]}>
                      Folio
                    </Text>
                    <Text style={[styles.modalValue, isDark && styles.modalValueDark]}>
                      {selectedLicencia.folio}
                    </Text>
                  </View>

                  {/* Fechas */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalLabel, isDark && styles.modalLabelDark]}>
                      Período de Licencia
                    </Text>
                    <Text style={[styles.modalValue, isDark && styles.modalValueDark]}>
                      {formatFecha(selectedLicencia.fecha_inicio)} -{" "}
                      {formatFecha(selectedLicencia.fecha_fin)}
                    </Text>
                  </View>

                  {/* Motivo */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalLabel, isDark && styles.modalLabelDark]}>
                      Motivo Médico
                    </Text>
                    <Text style={[styles.modalValue, isDark && styles.modalValueDark]}>
                      {selectedLicencia.motivo_medico}
                    </Text>
                  </View>

                  {/* Estado */}
                  <View style={styles.modalSection}>
                    <Text style={[styles.modalLabel, isDark && styles.modalLabelDark]}>
                      Estado
                    </Text>
                    <View
                      style={[
                        styles.estadoBadgeModal,
                        {
                          backgroundColor: getEstadoColor(selectedLicencia.estado),
                        },
                      ]}
                    >
                      <Text style={styles.estadoTextModal}>
                        {selectedLicencia.estado.charAt(0).toUpperCase() +
                          selectedLicencia.estado.slice(1)}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <P_Menu navigation={navigation} />
    </View>
  );
}
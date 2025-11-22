import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/F_Solicitudes.styles";
import { LICENCIA_ROUTES } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Solicitud {
  id_licencia: string;
  estudiante: string;
  nombre?: string;
  rut: string;
  correo: string;
  fechaInicio: string;
  fecha_inicio?: string;
  fechaFin: string;
  fecha_fin?: string;
  cursos: string | Array<{id_curso: number; nombre_curso: string; codigo: string}>;
  estado: "pendiente" | "aceptado" | "rechazado";
  motivo?: string;
  motivo_rechazo?: string;
  fechaDecision?: string;
  fecha_emision?: string;
  folio?: string;
  motivo_medico?: string;
  id_usuario?: number;
}

export default function F_Solicitudes() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [rechazoMotivo, setRechazoMotivo] = useState("");
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<string | null>(null);
  const [tabActiva, setTabActiva] = useState<"pendiente" | "aceptado" | "rechazado">("pendiente");

  // Obtener token y cargar solicitudes
  const cargarSolicitudes = async () => {
    try {
      setLoading(true);
      console.log("📍 [F_SOLICITUDES] Cargando solicitudes pendientes...");

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No hay sesión activa");
        return;
      }

      const response = await fetch(LICENCIA_ROUTES.GET_SOLICITUDES_PENDIENTES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`📊 [F_SOLICITUDES] Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ [F_SOLICITUDES] ${data.data.length} solicitudes cargadas`);

      // Transformar datos al formato esperado
      const solicitudesTransformadas = data.data.map((lic: any) => ({
        id_licencia: lic.id_licencia.toString(),
        estudiante: lic.nombre,
        nombre: lic.nombre,
        rut: lic.rut,
        correo: lic.correo,
        fechaInicio: new Date(lic.fecha_inicio).toLocaleDateString("es-ES"),
        fecha_inicio: lic.fecha_inicio,
        fechaFin: new Date(lic.fecha_fin).toLocaleDateString("es-ES"),
        fecha_fin: lic.fecha_fin,
        cursos: lic.cursos || [],
        estado: lic.estado as "pendiente" | "aceptado" | "rechazado",
        motivo_medico: lic.motivo_medico,
        motivo_rechazo: lic.motivo_rechazo || undefined,
        folio: lic.folio,
        id_usuario: lic.id_usuario,
      }));

      setSolicitudes(solicitudesTransformadas);
    } catch (error) {
      console.error("❌ [F_SOLICITUDES] Error:", error);
      Alert.alert("Error", "No se pudieron cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cargarSolicitudes();
    }, [])
  );

  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString("es-ES");
  };

  const handleAprobar = async (id: string) => {
    setLoadingAction(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No hay sesión activa");
        return;
      }

      console.log(`📍 [APROBAR] Aprobando licencia: ${id}`);

      const response = await fetch(LICENCIA_ROUTES.APROBAR(parseInt(id)), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log(`✅ [APROBAR] Licencia ${id} aprobada`);

      // Actualizar el estado local
      setSolicitudes((prev) =>
        prev.filter((s) => s.id_licencia !== id)
      );

      Alert.alert("✓ Éxito", "Licencia aprobada correctamente", [
        { text: "OK", onPress: () => setTabActiva("pendiente") },
      ]);
    } catch (error) {
      console.error("❌ [APROBAR] Error:", error);
      Alert.alert("Error", "No se pudo aprobar la licencia");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRechazar = (id: string) => {
    setSolicitudSeleccionada(id);
    setRechazoMotivo("");
    setModalVisible(true);
  };

  const handleConfirmarRechazo = async () => {
    if (!rechazoMotivo.trim()) {
      Alert.alert("Error", "Debes ingresar un motivo de rechazo");
      return;
    }

    if (rechazoMotivo.trim().length < 10) {
      Alert.alert("Error", "El motivo debe tener al menos 10 caracteres");
      return;
    }

    setLoadingAction(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No hay sesión activa");
        return;
      }

      console.log(`📍 [RECHAZAR] Rechazando licencia: ${solicitudSeleccionada}`);

      const response = await fetch(LICENCIA_ROUTES.RECHAZAR(parseInt(solicitudSeleccionada!)), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          motivo_rechazo: rechazoMotivo.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log(`✅ [RECHAZAR] Licencia ${solicitudSeleccionada} rechazada`);

      // Actualizar el estado local
      setSolicitudes((prev) =>
        prev.filter((s) => s.id_licencia !== solicitudSeleccionada)
      );

      Alert.alert("✓ Rechazada", "Licencia rechazada correctamente", [
        { text: "OK", onPress: () => setTabActiva("pendiente") },
      ]);

      setModalVisible(false);
      setRechazoMotivo("");
      setSolicitudSeleccionada(null);
    } catch (error) {
      console.error("❌ [RECHAZAR] Error:", error);
      Alert.alert("Error", "No se pudo rechazar la licencia");
    } finally {
      setLoadingAction(false);
    }
  };

  const filtrarSolicitudes = (estado: "pendiente" | "aceptado" | "rechazado") => {
    return solicitudes.filter((s) => s.estado === estado);
  };

  const solicitudesPendientes = filtrarSolicitudes("pendiente");
  const solicitudesAprobadas = filtrarSolicitudes("aceptado");
  const solicitudesRechazadas = filtrarSolicitudes("rechazado");

  const formatearCursos = (cursos: any): string => {
    if (!cursos) return "Sin especificar";
    if (typeof cursos === "string") return cursos;
    if (Array.isArray(cursos)) {
      return cursos.map(c => `${c.codigo} - ${c.nombre_curso}`).join(", ") || "Sin especificar";
    }
    return "Sin especificar";
  };

  const renderTarjeta = (solicitud: Solicitud) => (
    <View key={solicitud.id_licencia} style={styles.solicitudCard}>
      <Text style={styles.studentName}>{solicitud.estudiante}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>RUT:</Text>
        <Text style={styles.value}>{solicitud.rut}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{solicitud.correo}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Fecha inicio:</Text>
        <Text style={styles.value}>{solicitud.fechaInicio}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Fecha fin:</Text>
        <Text style={styles.value}>{solicitud.fechaFin}</Text>
      </View>

      <Text style={styles.description}>Motivo médico: {solicitud.motivo_medico}</Text>

      <Text style={styles.description}>Cursos: {formatearCursos(solicitud.cursos)}</Text>

      {solicitud.estado === "pendiente" && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleAprobar(solicitud.id_licencia)}
            disabled={loadingAction}
          >
            {loadingAction ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>✓ Aprobar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleRechazar(solicitud.id_licencia)}
            disabled={loadingAction}
          >
            {loadingAction ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>✕ Rechazar</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {solicitud.estado === "aceptado" && (
        <View
          style={[
            styles.buttonContainer,
            { marginTop: 16, backgroundColor: "#ECFDF5", paddingVertical: 12, borderRadius: 8 },
          ]}
        >
          <Text style={{ color: "#10B981", fontWeight: "700", textAlign: "center", flex: 1 }}>
            ✓ Aprobada
          </Text>
        </View>
      )}

      {solicitud.estado === "rechazado" && (
        <View
          style={[
            styles.buttonContainer,
            { marginTop: 16, backgroundColor: "#FEF2F2", paddingVertical: 12, borderRadius: 8 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#EF4444", fontWeight: "700", marginBottom: 4 }}>
              ✕ Rechazada
            </Text>
            <Text style={{ color: "#DC2626", fontSize: 12, fontStyle: "italic" }}>
              Motivo: {solicitud.motivo_rechazo}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitudes de licencias</Text>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        {["pendiente", "aceptado", "rechazado"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderBottomWidth: tabActiva === tab ? 3 : 0,
              borderBottomColor: "#048ED4",
              alignItems: "center",
            }}
            onPress={() => setTabActiva(tab as "pendiente" | "aceptado" | "rechazado")}
          >
            <Text
              style={{
                fontWeight: tabActiva === tab ? "700" : "500",
                color: tabActiva === tab ? "#048ED4" : "#6B7280",
                textTransform: "capitalize",
              }}
            >
              {tab === "pendiente" && `Pendientes (${solicitudesPendientes.length})`}
              {tab === "aceptado" && `Aprobadas (${solicitudesAprobadas.length})`}
              {tab === "rechazado" && `Rechazadas (${solicitudesRechazadas.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#048ED4" />
            <Text style={{ marginTop: 12, color: "#6B7280" }}>Cargando solicitudes...</Text>
          </View>
        ) : (
          <>
            {tabActiva === "pendiente" &&
              (solicitudesPendientes.length > 0 ? (
                solicitudesPendientes.map((s) => renderTarjeta(s))
              ) : (
                <Text style={styles.emptyText}>No hay solicitudes pendientes</Text>
              ))}

            {tabActiva === "aceptado" &&
              (solicitudesAprobadas.length > 0 ? (
                solicitudesAprobadas.map((s) => renderTarjeta(s))
              ) : (
                <Text style={styles.emptyText}>No hay solicitudes aprobadas</Text>
              ))}

            {tabActiva === "rechazado" &&
              (solicitudesRechazadas.length > 0 ? (
                solicitudesRechazadas.map((s) => renderTarjeta(s))
              ) : (
                <Text style={styles.emptyText}>No hay solicitudes rechazadas</Text>
              ))}
          </>
        )}
      </ScrollView>

      {/* Modal para rechazar con motivo */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.modalBackdrop}>
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Motivo del rechazo</Text>

                <TextInput
                  style={styles.textInput}
                  placeholder="Ingresa el motivo del rechazo (mínimo 10 caracteres)..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  value={rechazoMotivo}
                  onChangeText={setRechazoMotivo}
                  editable={!loadingAction}
                />

                <Text style={{ fontSize: 12, color: "#6B7280", marginBottom: 12 }}>
                  {rechazoMotivo.length} caracteres
                </Text>

                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setModalVisible(false);
                      setRechazoMotivo("");
                    }}
                    disabled={loadingAction}
                  >
                    <Text style={[styles.modalButtonText, { color: "#1F2937" }]}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.confirmButton, loadingAction && { opacity: 0.6 }]}
                    onPress={handleConfirmarRechazo}
                    disabled={loadingAction}
                  >
                    {loadingAction ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : (
                      <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>Rechazar</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/F_Solicitudes.styles";

interface Solicitud {
  id: string;
  estudiante: string;
  rut: string;
  correo: string;
  fechaInicio: string;
  fechaFin: string;
  cursos: string;
  estado: "pendiente" | "aprobada" | "rechazada";
  motivo?: string;
  fechaDecision?: string;
}

export default function F_Solicitudes() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([
    {
      id: "1",
      estudiante: "Juan Castro",
      rut: "12.345.678-9",
      correo: "juan.castro@email.com",
      fechaInicio: "12-08-2025",
      fechaFin: "14-08-2025",
      cursos: "INFO 1111, INFO 2222",
      estado: "pendiente",
    },
    {
      id: "2",
      estudiante: "María González",
      rut: "11.234.567-8",
      correo: "maria.gonzalez@email.com",
      fechaInicio: "15-08-2025",
      fechaFin: "17-08-2025",
      cursos: "INFO 3333",
      estado: "pendiente",
    },
    {
      id: "3",
      estudiante: "Pedro Ruiz",
      rut: "10.123.456-7",
      correo: "pedro.ruiz@email.com",
      fechaInicio: "20-08-2025",
      fechaFin: "22-08-2025",
      cursos: "INFO 4444, INFO 1111",
      estado: "pendiente",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [rechazoMotivo, setRechazoMotivo] = useState("");
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<string | null>(null);
  const [tabActiva, setTabActiva] = useState<"pendiente" | "aprobada" | "rechazada">("pendiente");

  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString("es-ES");
  };

  const handleAprobar = async (id: string) => {
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSolicitudes((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                estado: "aprobada",
                fechaDecision: obtenerFechaActual(),
              }
            : s
        )
      );

      Alert.alert("✓ Éxito", "Licencia aprobada correctamente", [
        { text: "OK", onPress: () => setTabActiva("pendiente") },
      ]);

      console.log(`📋 Licencia ${id} aprobada`);
    } catch (error) {
      Alert.alert("Error", "No se pudo aprobar la licencia");
      console.error("Error al aprobar:", error);
    } finally {
      setLoading(false);
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

    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSolicitudes((prev) =>
        prev.map((s) =>
          s.id === solicitudSeleccionada
            ? {
                ...s,
                estado: "rechazada",
                motivo: rechazoMotivo.trim(),
                fechaDecision: obtenerFechaActual(),
              }
            : s
        )
      );

      Alert.alert("✓ Rechazada", "Licencia rechazada correctamente", [
        { text: "OK", onPress: () => setTabActiva("pendiente") },
      ]);

      console.log(`📋 Licencia ${solicitudSeleccionada} rechazada - Motivo: ${rechazoMotivo}`);

      setModalVisible(false);
      setRechazoMotivo("");
      setSolicitudSeleccionada(null);
    } catch (error) {
      Alert.alert("Error", "No se pudo rechazar la licencia");
      console.error("Error al rechazar:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarSolicitudes = (estado: "pendiente" | "aprobada" | "rechazada") => {
    return solicitudes.filter((s) => s.estado === estado);
  };

  const solicitudesPendientes = filtrarSolicitudes("pendiente");
  const solicitudesAprobadas = filtrarSolicitudes("aprobada");
  const solicitudesRechazadas = filtrarSolicitudes("rechazada");

  const renderTarjeta = (solicitud: Solicitud) => (
    <View key={solicitud.id} style={styles.solicitudCard}>
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

      <Text style={styles.description}>Cursos: {solicitud.cursos}</Text>

      {solicitud.estado === "pendiente" && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleAprobar(solicitud.id)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>✓ Aprobar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleRechazar(solicitud.id)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>✕ Rechazar</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {solicitud.estado === "aprobada" && (
        <View
          style={[
            styles.buttonContainer,
            { marginTop: 16, backgroundColor: "#ECFDF5", paddingVertical: 12, borderRadius: 8 },
          ]}
        >
          <Text style={{ color: "#10B981", fontWeight: "700", textAlign: "center", flex: 1 }}>
            ✓ Aprobada el {solicitud.fechaDecision}
          </Text>
        </View>
      )}

      {solicitud.estado === "rechazada" && (
        <View
          style={[
            styles.buttonContainer,
            { marginTop: 16, backgroundColor: "#FEF2F2", paddingVertical: 12, borderRadius: 8 },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#EF4444", fontWeight: "700", marginBottom: 4 }}>
              ✕ Rechazada el {solicitud.fechaDecision}
            </Text>
            <Text style={{ color: "#DC2626", fontSize: 12, fontStyle: "italic" }}>
              Motivo: {solicitud.motivo}
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
        {["pendiente", "aprobada", "rechazada"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={{
              flex: 1,
              paddingVertical: 12,
              borderBottomWidth: tabActiva === tab ? 3 : 0,
              borderBottomColor: "#048ED4",
              alignItems: "center",
            }}
            onPress={() => setTabActiva(tab as "pendiente" | "aprobada" | "rechazada")}
          >
            <Text
              style={{
                fontWeight: tabActiva === tab ? "700" : "500",
                color: tabActiva === tab ? "#048ED4" : "#6B7280",
                textTransform: "capitalize",
              }}
            >
              {tab === "pendiente" && `Pendientes (${solicitudesPendientes.length})`}
              {tab === "aprobada" && `Aprobadas (${solicitudesAprobadas.length})`}
              {tab === "rechazada" && `Rechazadas (${solicitudesRechazadas.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {tabActiva === "pendiente" &&
          (solicitudesPendientes.length > 0 ? (
            solicitudesPendientes.map((s) => renderTarjeta(s))
          ) : (
            <Text style={styles.emptyText}>No hay solicitudes pendientes</Text>
          ))}

        {tabActiva === "aprobada" &&
          (solicitudesAprobadas.length > 0 ? (
            solicitudesAprobadas.map((s) => renderTarjeta(s))
          ) : (
            <Text style={styles.emptyText}>No hay solicitudes aprobadas</Text>
          ))}

        {tabActiva === "rechazada" &&
          (solicitudesRechazadas.length > 0 ? (
            solicitudesRechazadas.map((s) => renderTarjeta(s))
          ) : (
            <Text style={styles.emptyText}>No hay solicitudes rechazadas</Text>
          ))}
      </ScrollView>

      {/* Modal para rechazar con motivo */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Motivo del rechazo</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Ingresa el motivo del rechazo (mínimo 10 caracteres)..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={rechazoMotivo}
              onChangeText={setRechazoMotivo}
              editable={!loading}
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
                disabled={loading}
              >
                <Text style={[styles.modalButtonText, { color: "#1F2937" }]}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmButton, loading && { opacity: 0.6 }]}
                onPress={handleConfirmarRechazo}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>Rechazar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
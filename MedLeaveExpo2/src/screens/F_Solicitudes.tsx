import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert,} from "react-native";
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
}

export default function F_Solicitudes() {
  const navigation = useNavigation<any>();

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

  const handleAprobar = (id: string) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: "aprobada" } : s))
    );
    Alert.alert("Éxito", "Solicitud aprobada correctamente");
  };

  const handleRechazar = (id: string) => {
    setSolicitudSeleccionada(id);
    setModalVisible(true);
  };

  const handleConfirmarRechazo = () => {
    if (!rechazoMotivo.trim()) {
      Alert.alert("Error", "Debes ingresar un motivo de rechazo");
      return;
    }

    setSolicitudes((prev) =>
      prev.map((s) =>
        s.id === solicitudSeleccionada
          ? { ...s, estado: "rechazada", motivo: rechazoMotivo }
          : s
      )
    );

    Alert.alert("Rechazada", "Solicitud rechazada correctamente");
    setModalVisible(false);
    setRechazoMotivo("");
    setSolicitudSeleccionada(null);
  };

  const solicitudesPendientes = solicitudes.filter((s) => s.estado === "pendiente");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitudes de licencias</Text>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {solicitudesPendientes.length > 0 ? (
          solicitudesPendientes.map((solicitud) => (
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

              <Text style={styles.description}>
                Cursos: {solicitud.cursos}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.approveButton}
                  onPress={() => handleAprobar(solicitud.id)}
                >
                  <Text style={styles.buttonText}>✓ Aprobar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleRechazar(solicitud.id)}
                >
                  <Text style={styles.buttonText}>✕ Rechazar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>
            No hay solicitudes pendientes
          </Text>
        )}
      </ScrollView>

      {/* Modal para rechazar con motivo */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Motivo del rechazo
            </Text>

            <TextInput
              style={styles.textInput}
              placeholder="Ingresa el motivo del rechazo..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={rechazoMotivo}
              onChangeText={setRechazoMotivo}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setRechazoMotivo("");
                }}
              >
                <Text style={[styles.modalButtonText, { color: "#1F2937" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmarRechazo}
              >
                <Text style={[styles.modalButtonText, { color: "#ffffff" }]}>
                  Rechazar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
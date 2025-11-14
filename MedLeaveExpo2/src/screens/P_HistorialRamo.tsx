import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f1fb",
  },
  header: {
    backgroundColor: "#1c75bc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 12,
    color: "#ffffff",
  },
  titleContainer: {
    backgroundColor: "#1c75bc",
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  titleMain: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  titleSub: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  tableContainer: {
    backgroundColor: "#cde2f8",
    borderRadius: 8,
    padding: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#333333",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bbbbbb",
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
  },
});

export default function P_HistorialRamo({ navigation }: any) {
  const navegation = useNavigation();
  const data = Array(4)
    .fill(null)
    .map((_, i) => ({
      nombre: "Juan Castro",
      inicio: "12-08-2025",
      fin: "14-08-2025",
    }));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
        {/* Flecha de volver atrás */}
          <TouchableOpacity onPress={() => navigation.goBack()} className="absolute left-2 top-2">
            <ChevronLeft size={24} color="#007ACC" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MedLeave Manager</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerText}>Cuenta: Juan Pérez</Text>
        </View>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleMain}>Historial</Text>
        <Text style={styles.titleSub}>INFO 1111</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <View style={styles.tableContainer}>
          {/* Encabezado */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Nombre alumno</Text>
            <Text style={styles.headerCell}>Fecha inicio</Text>
            <Text style={styles.headerCell}>Fecha fin</Text>
            <Text style={styles.headerCell}>PDF</Text>
          </View>

          {/* Filas */}
          <ScrollView>
            {data.map((row, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.cell}>{row.nombre}</Text>
                <Text style={styles.cell}>{row.inicio}</Text>
                <Text style={styles.cell}>{row.fin}</Text>
                <Text style={styles.cell}>📄</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/P_HistorialRamo.styles";
import P_Menu from "../components/P_Menu";

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
        {/* Flecha de volver atrás */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#007ACC" />
        </TouchableOpacity>

        <View style={styles.headerLeft}>
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

      <P_Menu navigation={navigation} />
    </View>
  );
}
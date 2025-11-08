import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const A_Historial = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  // Mock data - Replace with real API call
  const cursos = [
    { id: 1, nombre: "Matemáticas I", codigo: "MAT-101" },
    { id: 2, nombre: "Física General", codigo: "FIS-101" },
    { id: 3, nombre: "Química Orgánica", codigo: "QUI-201" },
    { id: 4, nombre: "Historia Universal", codigo: "HIS-101" },
  ];

  const handleSelectCurso = (curso) => {
    navigation.navigate("A_HistorialRamo", { curso });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de Licencias</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        ) : (
          <View style={styles.cursosList}>
            {cursos.map((curso) => (
              <TouchableOpacity
                key={curso.id}
                style={styles.cursoCard}
                onPress={() => handleSelectCurso(curso)}
              >
                <View style={styles.cursoInfo}>
                  <Text style={styles.cursoNombre}>{curso.nombre}</Text>
                  <Text style={styles.cursoCodigo}>{curso.codigo}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  cursosList: {
    gap: 12,
  },
  cursoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cursoInfo: {
    flex: 1,
  },
  cursoNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  cursoCodigo: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default A_Historial;

import React from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const A_Historial = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  // Datos de ejemplo
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
      {/* Barra superior fina */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Gerente de Licencia Médica</Text>
        <Text style={styles.accountText}>Cuenta: Juan Pérez</Text>
      </View>

      {/* Título centrado */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Histórico</Text>
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0369a1" />
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
                  <Text style={styles.cursoCodigo}>{curso.codigo}</Text>
                  <Text style={styles.cursoNombre}>{curso.nombre}</Text>
                </View>
                <ChevronRight size={18} color="#0369a1" />
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
    backgroundColor: "#e6f1fb",
  },
  topBar: {
    backgroundColor: "#0369a1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButton: {
    marginRight: 8,
  },
  topBarText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  accountText: {
    color: "#ffffff",
    fontSize: 12,
  },
  titleContainer: {
    backgroundColor: "#0369a1",
    paddingVertical: 14,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
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
    backgroundColor: "#cde2f6",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  cursoInfo: {
    flex: 1,
  },
  cursoCodigo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 3,
  },
  cursoNombre: {
    fontSize: 14,
    color: "#1f2937",
  },
});

export default A_Historial;

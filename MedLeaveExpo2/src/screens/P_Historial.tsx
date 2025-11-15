import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import P_Menu from "../components/P_Menu";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e6f1fb" },

  // Header
  header: {
    backgroundColor: "#1c75bc",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  headerRight: { fontSize: 12, color: "#ffffff" },

  // Título
  titleContainer: {
    backgroundColor: "#1c75bc",
    paddingVertical: 32,
    alignItems: "center",
  },
  titleText: { fontSize: 24, fontWeight: "bold", color: "#ffffff" },

  // Barra de filtros
  filterBar: {
    backgroundColor: "#c9e0f7",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#a8c7e2",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a8c7e2",
    paddingHorizontal: 12,
    height: 40,
    color: "#000000",
  },
  sortBtn: {
    marginTop: 8,
    backgroundColor: "#0096D6",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  sortText: { color: "#ffffff", fontWeight: "bold" },

  // Selector personalizado
  selector: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#a8c7e2",
    padding: 10,
    marginTop: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  // Lista
  content: { flex: 1, paddingHorizontal: 24, paddingVertical: 16 },
  courseCard: {
    backgroundColor: "#c9e0f7",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#a8c7e2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  courseInfo: { flex: 1 },
  courseName: { fontWeight: "bold", fontSize: 16, color: "#000", marginBottom: 4 },
  courseCode: { fontWeight: "600", fontSize: 14, color: "#000" },
});

export default function P_Historial() {
  const navigation = useNavigation<any>();

  //Datos
  const cursos = [
    { id: 1, codigo: "INFO 1111", nombre: "Teoría de sistemas", semestre: "2024-1" },
    { id: 2, codigo: "INFO 2222", nombre: "Programación avanzada", semestre: "2024-2" },
    { id: 3, codigo: "INFO 3333", nombre: "Bases de datos", semestre: "2023-2" },
    { id: 4, codigo: "INFO 4444", nombre: "Inteligencia artificial", semestre: "2024-2" },
  ];

  // Estados
  const [query, setQuery] = useState("");
  const [orden, setOrden] = useState<"az" | "za">("az");
  const [semestre, setSemestre] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const semestres = ["", "2024-2", "2024-1", "2023-2"];

  // Filtro y orden
  const cursosFiltrados = useMemo(() => {
    const q = query.toLowerCase();
    let out = cursos.filter(
      (c) =>
        (!semestre || c.semestre === semestre) &&
        (c.nombre.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q))
    );
    out.sort((a, b) =>
      orden === "az"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );
    return out;
  }, [cursos, query, semestre, orden]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MedLeave Manager</Text>
        </View>
        <Text style={styles.headerRight}>Cuenta: Juan Pérez</Text>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Historial</Text>
      </View>

      {/* Barra de filtros */}
      <View style={styles.filterBar}>
        <TextInput
          placeholder="Buscar por nombre o código..."
          placeholderTextColor="#7a93ad"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />

        {/* Selector de semestre */}
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {semestre ? `Semestre: ${semestre}` : "Todos los semestres"}
          </Text>
        </TouchableOpacity>

        {/* Botón de orden */}
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => setOrden(orden === "az" ? "za" : "az")}
        >
          <Text style={styles.sortText}>
            {orden === "az" ? "Orden de A a Z" : "Orden de Z a A"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal para elegir semestre */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <ScrollView style={{ maxHeight: 250 }}>
              {semestres.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => {
                    setSemestre(s);
                    setModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>
                    {s ? s : "Todos los semestres"}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ alignSelf: "flex-end", padding: 10 }}
            >
              <Text style={{ color: "#1c75bc", fontWeight: "bold" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Lista */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cursosFiltrados.length > 0 ? (
          cursosFiltrados.map((curso) => (
            <TouchableOpacity
              key={curso.id}
              style={styles.courseCard}
              onPress={() => navigation.navigate("P_HistorialRamo", { curso })}
            >
              <View style={styles.courseInfo}>
                <Text style={styles.courseName}>{curso.codigo}</Text>
                <Text style={styles.courseCode}>
                  {curso.nombre} · {curso.semestre}
                </Text>
              </View>
              <ChevronRight color="#1c75bc" size={20} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", color: "#0B3178", marginTop: 16 }}>
            No existe ningun ramo relacionado.
          </Text>
        )}
      </ScrollView>
      <P_Menu navigation={navigation} />
      
    </View>
  );
}

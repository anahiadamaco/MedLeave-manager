import React from "react";
import {View, ScrollView, TouchableOpacity, Text, StyleSheet, ActivityIndicator, TextInput, Modal,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

import A_Menu from "../components/A_Menu";


const A_Historial = () => {
  const navigation = useNavigation(); // si usas TS y te molesta el tipado: useNavigation<any>()
  const [loading, setLoading] = React.useState(false);

  // Mock data - Reemplaza con tu API
  const cursos = [
    { id: 1, nombre: "Matemáticas I",  codigo: "MAT-101", semestre: "2025-1" },
    { id: 2, nombre: "Física General",  codigo: "FIS-101", semestre: "2025-1" },
    { id: 3, nombre: "Química Orgánica", codigo: "QUI-201", semestre: "2024-2" },
    { id: 4, nombre: "Historia Universal", codigo: "HIS-101", semestre: "2024-2" },
  ];

  // Filtros
  const [query, setQuery] = React.useState("");
  const [orden, setOrden] = React.useState<"az" | "za">("az");
  const [semestre, setSemestre] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState(false);

  // Semestres disponibles desde los datos
  const semestres = React.useMemo(() => {
    const set = new Set(cursos.map(c => c.semestre));
    return ["", ...Array.from(set).sort().reverse()]; // "" = Todos
  }, [cursos]);

  // Aplicar búsqueda + filtro + orden
  const cursosFiltrados = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = cursos.filter(c =>
      (semestre ? c.semestre === semestre : true) &&
      (q ? (c.nombre.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q)) : true)
    );
    out.sort((a, b) => {
      const A = a.nombre.toLowerCase(), B = b.nombre.toLowerCase();
      if (A < B) return orden === "az" ? -1 : 1;
      if (A > B) return orden === "az" ? 1 : -1;
      return 0;
    });
    return out;
  }, [cursos, query, semestre, orden]);

  const handleSelectCurso = (curso: any) => {
    navigation.navigate("A_HistorialRamo" as never, { curso } as never);
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

      {/* Filtros */}
      <View style={styles.filterBar}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre o código…"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.selectorText}>
              {semestre ? `Semestre: ${semestre}` : "Todos los semestres"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() => setOrden(prev => (prev === "az" ? "za" : "az"))}
          >
            <Text style={styles.sortText}>
              {orden === "az" ? "Ordenar de A a Z" : "Ordenar de Z a A"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de semestres */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <ScrollView style={{ maxHeight: 280 }}>
              {semestres.map((s) => (
                <TouchableOpacity
                  key={s || "all"}
                  style={styles.modalItem}
                  onPress={() => {
                    setSemestre(s);
                    setModalVisible(false);
                  }}
                >
                  <Text>{s || "Todos los semestres"}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        ) : (
          <View style={styles.cursosList}>
            {cursosFiltrados.length ? (
              cursosFiltrados.map((curso) => (
                <TouchableOpacity
                  key={curso.id}
                  style={styles.cursoCard}
                  onPress={() => handleSelectCurso(curso)}
                >
                  <View style={styles.cursoInfo}>
                    <Text style={styles.cursoNombre}>{curso.nombre}</Text>
                    <Text style={styles.cursoCodigo}>
                      {curso.codigo} · {curso.semestre}
                    </Text>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No hay ramos con ese filtro.</Text>
            )}
          </View>
        )}
        
      </ScrollView>
      <A_Menu navigation={navigation} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

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
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1F2937" },

  filterBar: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 12,
    color: "#111827",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  selector: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  selectorText: { color: "#111827" },

  sortBtn: {
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  sortText: { color: "#FFFFFF", fontWeight: "700" },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalClose: { alignSelf: "flex-end", padding: 10 },
  modalCloseText: { color: "#2563EB", fontWeight: "700" },

  content: { flex: 1, paddingVertical: 16, paddingHorizontal: 16 },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 },
  cursosList: { gap: 12 },
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
  cursoInfo: { flex: 1 },
  cursoNombre: { fontSize: 16, fontWeight: "600", color: "#1F2937", marginBottom: 4 },
  cursoCodigo: { fontSize: 14, color: "#6B7280" },
  emptyText: { textAlign: "center", color: "#6B7280", marginTop: 16 },
});

export default A_Historial;

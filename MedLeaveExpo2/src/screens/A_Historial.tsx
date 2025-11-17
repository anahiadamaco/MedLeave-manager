import React, { useState, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator, TextInput, Modal} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { styles } from "../styles/A_Historial.styles";
import A_Menu from "../components/A_Menu";

import A_Menu from "../components/A_Menu";


const A_Historial = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = React.useState(false);

  // Datos de ejemplo
  const cursos = [
    { id: 1, nombre: "Matemáticas I", codigo: "MAT-101", semestre: "2025-1" },
    { id: 2, nombre: "Física General", codigo: "FIS-101", semestre: "2025-1" },
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
    const set = new Set(cursos.map((c) => c.semestre));
    return ["", ...Array.from(set).sort().reverse()]; // "" = Todos
  }, [cursos]);

  // Aplicar búsqueda + filtro + orden
  const cursosFiltrados = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = cursos.filter(
      (c) =>
        (semestre ? c.semestre === semestre : true) &&
        (q
          ? c.nombre.toLowerCase().includes(q) ||
            c.codigo.toLowerCase().includes(q)
          : true)
    );
    out.sort((a, b) => {
      const A = a.nombre.toLowerCase(),
        B = b.nombre.toLowerCase();
      if (A < B) return orden === "az" ? -1 : 1;
      if (A > B) return orden === "az" ? 1 : -1;
      return 0;
    });
    return out;
  }, [cursos, query, semestre, orden]);

  const handleSelectCurso = (curso: any) => {
    navigation.navigate("A_HistorialRamo", { curso });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
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
            onPress={() =>
              setOrden((prev) => (prev === "az" ? "za" : "az"))
            }
          >
            <Text style={styles.sortText}>
              {orden === "az" ? "A-Z" : "Z-A"}
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
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#048ED4" />
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
              <Text style={styles.emptyText}>
                No hay ramos con ese filtro.
              </Text>
            )}
          </View>
        )}
        
      </ScrollView>
      <A_Menu navigation={navigation} />
    </View>
  );
};

export default A_Historial;
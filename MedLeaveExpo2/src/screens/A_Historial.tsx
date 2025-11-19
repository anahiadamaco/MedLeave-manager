import React, { useState, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator, TextInput, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { styles } from "../styles/A_Historial.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

const A_Historial = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = React.useState(false);
  const { isDark } = useTheme();

  const cursos = [
    { id: 1, nombre: "Matemáticas I", codigo: "MAT-101", semestre: "2025-1" },
    { id: 2, nombre: "Física General", codigo: "FIS-101", semestre: "2025-1" },
    { id: 3, nombre: "Química Orgánica", codigo: "QUI-201", semestre: "2024-2" },
    { id: 4, nombre: "Historia Universal", codigo: "HIS-101", semestre: "2024-2" },
  ];

  const [query, setQuery] = React.useState("");
  const [orden, setOrden] = React.useState<"az" | "za">("az");
  const [semestre, setSemestre] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState(false);

  const semestres = React.useMemo(() => {
    const set = new Set(cursos.map((c) => c.semestre));
    return ["", ...Array.from(set).sort().reverse()];
  }, [cursos]);

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
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={24} color={"#ffffff"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: "#ffffff" }]}>Historial</Text>
      </View>

      <View style={[styles.filterBar, isDark && styles.blackFilterBar]}>
        <TextInput
          style={[
            styles.input,
            isDark && styles.blackInput,
            { color: "#FFFFFF", borderColor: "#FFFFFF" }
          ]}
          placeholder="Buscar por nombre o código…"
          placeholderTextColor={"#FFFFFF"}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.selector,
              isDark && styles.blackSelector,
              { borderColor: "#FFFFFF" }
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.selectorText, { color: "#FFFFFF" }]}>
              {semestre ? `Semestre: ${semestre}` : "Todos los semestres"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortBtn,
              isDark && styles.blackSortBtn,
              { borderColor: "#FFFFFF" }
            ]}
            onPress={() => setOrden((prev) => (prev === "az" ? "za" : "az"))}
          >
            <Text style={[styles.sortText, { color: "#FFFFFF" }]}>
              {orden === "az" ? "A-Z" : "Z-A"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalBox, isDark && styles.blackModalBox, { borderColor: "#FFFFFF" }]}>
            <ScrollView style={{ maxHeight: 280 }}>
              {semestres.map((s) => (
                <TouchableOpacity
                  key={s || "all"}
                  style={[styles.modalItem, isDark && styles.blackModalItem, { borderBottomColor: "#FFFFFF" }]}
                  onPress={() => {
                    setSemestre(s);
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>{s || "Todos los semestres"}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
            >
              <Text style={[styles.modalCloseText, { color: "#FFFFFF" }]}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={"#FFFFFF"} />
          </View>
        ) : (
          <View style={styles.cursosList}>
            {cursosFiltrados.length ? (
              cursosFiltrados.map((curso) => (
                <TouchableOpacity
                  key={curso.id}
                  style={[
                    styles.cursoCard,
                    isDark && styles.blackCursoCard,
                    { borderColor: "#FFFFFF" }
                  ]}
                  onPress={() => handleSelectCurso(curso)}
                >
                  <View style={styles.cursoInfo}>
                    <Text style={[styles.cursoNombre, { color: "#FFFFFF" }]}>
                      {curso.nombre}
                    </Text>
                    <Text style={[styles.cursoCodigo, { color: "#FFFFFF" }]}>
                      {curso.codigo} · {curso.semestre}
                    </Text>
                  </View>
                  <ChevronRight size={20} color={"#FFFFFF"} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={[styles.emptyText, { color: "#FFFFFF" }]}>
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

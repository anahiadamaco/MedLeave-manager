import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/P_Historial.styles";
import { useTheme } from "../components/ThemeContext";
import P_Menu from "../components/P_Menu";

export default function P_Historial() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  //Datos
  const cursos = [
    { id: 1, codigo: "INFO 1111", nombre: "Teoría de sistemas", semestre: "2024-1" },
    { id: 2, codigo: "INFO 2222", nombre: "Programación avanzada", semestre: "2024-2" },
    { id: 3, codigo: "INFO 3333", nombre: "Bases de datos", semestre: "2023-2" },
    { id: 4, codigo: "INFO 4444", nombre: "Inteligencia artificial", semestre: "2024-2" },
  ];

  const [query, setQuery] = useState("");
  const [orden, setOrden] = useState<"az" | "za">("az");
  const [semestre, setSemestre] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const semestres = ["", "2024-2", "2024-1", "2023-2"];

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
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial</Text>
      </View>

      {/* Barra de filtros */}
      <View style={[styles.filterBar, isDark && styles.blackFilterBar]}>
        <TextInput
          placeholder="Buscar por nombre o código..."
          placeholderTextColor="#7a93ad"
          style={[styles.input, isDark && styles.blackInput]}
          value={query}
          onChangeText={setQuery}
        />

        <TouchableOpacity style={[styles.selector, isDark && styles.blackSelector]} onPress={() => setModalVisible(true)}>
          <Text style={isDark ? { color: 'white' } : { color: '#9CA3AF' }}>{semestre ? `Semestre: ${semestre}` : "Todos los semestres"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sortBtn, isDark && styles.blackSortBtn]}
          onPress={() => setOrden(orden === "az" ? "za" : "az")}
        >
          <Text style={styles.sortText}>
            {orden === "az" ? "Orden de A a Z" : "Orden de Z a A"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <ScrollView style={{ maxHeight: 250 }}>
              {semestres.map((s) => (
                <TouchableOpacity
                  key={s || "all"}
                  onPress={() => {
                    setSemestre(s);
                    setModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>{s ? s : "Todos los semestres"}</Text>
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

      {/* Lista */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cursosFiltrados.length > 0 ? (
          cursosFiltrados.map((curso) => (
              <TouchableOpacity
              key={curso.id}
              style={[styles.courseCard, isDark && styles.blackCourseCard]}
              onPress={() => navigation.navigate("P_HistorialRamo", { curso })}
            >
              <View style={styles.courseInfo}>
                <Text style={[styles.courseName, isDark && styles.courseNameDark]}>{curso.codigo}</Text>
                <Text style={[styles.courseCode, isDark && styles.courseCodeDark]}>
                  {curso.nombre} · {curso.semestre}
                </Text>
              </View>
              <ChevronRight color="#1c75bc" size={20} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No existe ningun ramo relacionado.</Text>
        )}
      </ScrollView>
      <P_Menu navigation={navigation} />
    </View>
  );
}

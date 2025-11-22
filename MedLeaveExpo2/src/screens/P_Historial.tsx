import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/P_Historial.styles";
import P_Menu from "../components/P_Menu";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CURSOS_ROUTES } from "../config/api";

interface Curso {
  id_curso: number;
  codigo: string;
  nombre_curso: string;
  semestre: string;
}

export default function P_Historial() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [orden, setOrden] = useState<"az" | "za">("az");
  const [semestre, setSemestre] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState<string>("");
  
  const semestresDisponibles = useMemo(() => {
    const unicos = new Set(cursos.map((c) => c.semestre));
    return Array.from(unicos).sort().reverse();
  }, [cursos]);

  // Cargar token y datos
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (storedToken) {
            setToken(storedToken);
            await loadCursos(storedToken);
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };
      loadData();
    }, [])
  );

  const loadCursos = async (authToken: string) => {
    try {
      setLoading(true);
      console.log("📍 [P_HISTORIAL] Cargando cursos del profesor...");

      const response = await fetch(CURSOS_ROUTES.GET_PROFESOR, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("📦 [P_HISTORIAL] Respuesta de cursos:", data);

      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ [P_HISTORIAL] ${data.data.length} cursos cargados`);
        setCursos(data.data);
      } else {
        console.warn("⚠️ [P_HISTORIAL] Respuesta inesperada:", data);
        setCursos([]);
      }
    } catch (error) {
      console.error("❌ [P_HISTORIAL] Error cargando cursos:", error);
      Alert.alert("Error", "No se pudieron cargar los cursos");
    } finally {
      setLoading(false);
    }
  };

  const cursosFiltrados = useMemo(() => {
    const q = query.toLowerCase();
    let out = cursos.filter(
      (c) =>
        (!semestre || c.semestre === semestre) &&
        (c.nombre_curso.toLowerCase().includes(q) ||
          c.codigo.toLowerCase().includes(q))
    );
    out.sort((a, b) =>
      orden === "az"
        ? a.nombre_curso.localeCompare(b.nombre_curso)
        : b.nombre_curso.localeCompare(a.nombre_curso)
    );
    return out;
  }, [cursos, query, semestre, orden]);

  const handleNavToCurso = (curso: Curso) => {
    navigation.navigate("P_HistorialRamo", { curso });
  };

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de Licencias</Text>
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

        <TouchableOpacity
          style={[styles.selector, isDark && styles.blackSelector]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={isDark ? { color: "white" } : { color: "#9CA3AF" }}>
            {semestre ? `Semestre: ${semestre}` : "Todos los semestres"}
          </Text>
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

      {/* Modal de semestres */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={[styles.modalBox, isDark && styles.blackModalBox]}>
            <ScrollView style={{ maxHeight: 250 }}>
              <TouchableOpacity
                onPress={() => {
                  setSemestre("");
                  setModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text style={isDark ? { color: "white" } : { color: "#000" }}>
                  Todos los semestres
                </Text>
              </TouchableOpacity>
              {semestresDisponibles.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => {
                    setSemestre(s);
                    setModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text style={isDark ? { color: "white" } : { color: "#000" }}>
                    {s}
                  </Text>
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

      {/* Contenido */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#048ED4" />
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <TouchableOpacity
                key={curso.id_curso}
                style={[styles.courseCard, isDark && styles.blackCourseCard]}
                onPress={() => handleNavToCurso(curso)}
              >
                <View style={styles.courseInfo}>
                  <Text
                    style={[styles.courseName, isDark && styles.courseNameDark]}
                  >
                    {curso.codigo}
                  </Text>
                  <Text
                    style={[styles.courseCode, isDark && styles.courseCodeDark]}
                  >
                    {curso.nombre_curso} · {curso.semestre}
                  </Text>
                </View>
                <ChevronRight color="#1c75bc" size={20} />
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={[styles.emptyText, isDark && styles.emptyTextDark]}
            >
              No hay cursos para mostrar
            </Text>
          )}
        </ScrollView>
      )}

      <P_Menu navigation={navigation} />
    </View>
  );
}

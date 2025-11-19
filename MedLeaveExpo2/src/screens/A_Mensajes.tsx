import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

export default function A_Mensajes({ navigation }: any) {
  const { isDark } = useTheme();

  const [notificaciones, setNotificaciones] = useState([
    { id: "1", titulo: "Licencia subida", mensaje: "Tu licencia fue subida correctamente.", fecha: "20/11/2025", leido: false, ramo: "Matemáticas" },
    { id: "2", titulo: "Licencia rechazada", mensaje: "Tu licencia fue rechazada.", fecha: "19/11/2025", leido: true, ramo: "Historia" },
    { id: "3", titulo: "Licencia aprobada", mensaje: "Tu licencia fue aprobada correctamente.", fecha: "18/11/2025", leido: false, ramo: "Matemáticas" },
    { id: "4", titulo: "Licencia subida", mensaje: "Tu licencia fue subida correctamente.", fecha: "17/11/2025", leido: false, ramo: "Historia" },
  ]);

  const [ramoSeleccionado, setRamoSeleccionado] = useState<string>("Todos");
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("Todos");

  const toggleLeida = (id: string) => {
    setNotificaciones(prev =>
      prev.map(n => n.id === id ? { ...n, leido: !n.leido } : n)
    );
  };

  const eliminar = (id: string) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  const ramos = ["Todos", ...Array.from(new Set(notificaciones.map(n => n.ramo)))];
  const tipos = ["Todos", ...Array.from(new Set(notificaciones.map(n => n.titulo)))];

  const notificacionesFiltradas = notificaciones.filter(n =>
    (ramoSeleccionado === "Todos" || n.ramo === ramoSeleccionado) &&
    (tipoSeleccionado === "Todos" || n.titulo === tipoSeleccionado)
  );

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      {/* Filtros con chips */}
      <View style={styles.chipsContainer}>
        <Text style={[styles.filtroLabel, isDark && styles.filtroLabelDark]}>Filtrar por ramo:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {ramos.map(r => (
            <TouchableOpacity
              key={r}
              onPress={() => setRamoSeleccionado(r)}
              style={[
                styles.chip,
                ramoSeleccionado === r && styles.chipSelected,
                isDark && styles.chipDark,
              ]}
            >
              <Text style={[
                styles.chipText,
                ramoSeleccionado === r && styles.chipTextSelected,
                isDark && styles.chipTextDark
              ]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.filtroLabel, isDark && styles.filtroLabelDark]}>Filtrar por tipo:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tipos.map(t => (
            <TouchableOpacity
              key={t}
              onPress={() => setTipoSeleccionado(t)}
              style={[
                styles.chip,
                tipoSeleccionado === t && styles.chipSelected,
                isDark && styles.chipDark,
              ]}
            >
              <Text style={[
                styles.chipText,
                tipoSeleccionado === t && styles.chipTextSelected,
                isDark && styles.chipTextDark
              ]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contador de notificaciones */}
      <Text style={[styles.contador, isDark && styles.contadorDark]}>
        {notificacionesFiltradas.length} notificación(es) encontradas
      </Text>

      {/* Lista de notificaciones */}
      <ScrollView style={styles.scroll}>
        {notificacionesFiltradas.map(item => (
          <View key={item.id} style={[
            styles.card,
            isDark && styles.blackCard,
            item.leido ? styles.cardLeido : styles.cardNoLeido
          ]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={[styles.titulo, isDark && styles.blackTitulo]}>{item.titulo}</Text>
                <Text style={[styles.mensaje, isDark && styles.blackMensaje]}>{item.mensaje}</Text>
                <Text style={[styles.ramo, isDark && styles.blackMensaje]}>Ramo: {item.ramo}</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 6 }}>
                <Text style={[styles.fecha, isDark && styles.blackFecha]}>{item.fecha}</Text>
                <TouchableOpacity onPress={() => toggleLeida(item.id)} style={styles.smallButton}>
                  <Text style={styles.smallButtonText}>{item.leido ? "No leída" : "Leída"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminar(item.id)} style={[styles.smallButton, styles.deleteButton]}>
                  <Text style={styles.smallButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <A_Menu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  blackContainer: { backgroundColor: "#121212" },
  header: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#6200ee" },
  blackHeader: { backgroundColor: "#1f1f1f" },
  backButton: { marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  chipsContainer: { padding: 10 },
  filtroLabel: { fontWeight: "bold", marginBottom: 5, color: "#333" },
  filtroLabelDark: { color: "#ccc" },
  chip: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#e0e0e0", borderRadius: 20, marginRight: 8 },
  chipSelected: { backgroundColor: "#6200ee" },
  chipDark: { backgroundColor: "#333" },
  chipText: { color: "#333", fontWeight: "500" },
  chipTextSelected: { color: "#fff" },
  chipTextDark: { color: "#fff" },

  contador: { paddingHorizontal: 10, marginBottom: 5, color: "#555" },
  contadorDark: { color: "#ccc" },

  scroll: { flex: 1, paddingHorizontal: 10 },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  blackCard: { backgroundColor: "#1f1f1f" },
  cardLeido: { borderLeftWidth: 5, borderLeftColor: "#4caf50" },
  cardNoLeido: { borderLeftWidth: 5, borderLeftColor: "#f44336" },
  titulo: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  blackTitulo: { color: "#fff" },
  mensaje: { fontSize: 14, color: "#555" },
  blackMensaje: { color: "#ccc" },
  ramo: { fontSize: 13, color: "#777", marginTop: 3 },
  fecha: { fontSize: 12, color: "#999" },
  blackFecha: { color: "#bbb" },
  smallButton: { backgroundColor: "#6200ee", paddingVertical: 4, paddingHorizontal: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: "#e53935" },
  smallButtonText: { color: "#fff", fontSize: 12 },
});

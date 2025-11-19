import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { styles } from "../styles/A_Mensajes.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

export default function A_Mensajes({ navigation }: any) {
  const { isDark } = useTheme();
  const [notificaciones, setNotificaciones] = useState([
    {
      id: "1",
      titulo: "Licencia subida",
      mensaje: "Tu licencia fue subida correctamente.",
      fecha: "20/11/2025",
      leido: false,
    },
    {
      id: "2",
      titulo: "Licencia rechazada",
      mensaje: "Tu licencia fue rechazada. Debes volver a subirla.",
      fecha: "19/11/2025",
      leido: true,
    },
    {
      id: "3",
      titulo: "Licencia aprobada",
      mensaje: "Tu licencia fue aprobada correctamente.",
      fecha: "18/11/2025",
      leido: false,
    },
  ]);

  const toggleLeida = (id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leido: !n.leido } : n))
    );
  };

  const eliminar = (id: string) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <ScrollView style={styles.content}>
        {notificaciones.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card, isDark && styles.blackCard,
              item.leido ? styles.cardLeido : styles.cardNoLeido,
            ]}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={[styles.titulo, isDark && styles.blackTitulo]}>{item.titulo}</Text>
                <Text style={[styles.mensaje, isDark && styles.blackMensaje]}>{item.mensaje}</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 6 }}>
                <Text style={[styles.fecha, isDark && styles.blackFecha]}>{item.fecha}</Text>
                <TouchableOpacity
                  onPress={() => toggleLeida(item.id)}
                  style={styles.smallButton}
                >
                  <Text style={styles.smallButtonText}>
                    {item.leido ? "No leída" : "Leída"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => eliminar(item.id)}
                  style={[styles.smallButton, styles.deleteButton]}
                >
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

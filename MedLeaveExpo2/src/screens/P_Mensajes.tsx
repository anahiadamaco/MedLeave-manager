import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import P_Menu from "../components/P_Menu";
import { styles } from "../styles/P_Mensajes.styles";

export default function A_NotificacionesProfesor({ navigation }: any) {
  const [notificaciones, setNotificaciones] = useState([
    {
      id: "1",
      titulo: "Nueva licencia",
      mensaje: "El alumno Juan Pérez subió una licencia para Cálculo I.",
      fecha: "20/11/2025",
      leido: false,
    },
    {
      id: "2",
      titulo: "Nueva licencia",
      mensaje: "El alumno Diego Soto subió una licencia para Física General.",
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>
      <ScrollView style={styles.content}>
        {notificaciones.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              item.leido ? styles.cardLeido : styles.cardNoLeido,
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.mensaje}>{item.mensaje}</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 6 }}>
                <Text style={styles.fecha}>{item.fecha}</Text>
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
      <P_Menu navigation={navigation} />
    </View>
  );
}

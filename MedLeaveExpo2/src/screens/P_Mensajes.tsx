import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { ChevronLeft, Trash2, Check, CheckCheck } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import P_Menu from "../components/P_Menu";
import { styles } from "../styles/P_Mensajes.styles";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOTIFICACION_ROUTES } from "../config/api";

interface Notificacion {
  id_notificacion: number;
  asunto: string;
  contenido: string;
  fecha_envio: string;
  leido: number;
}

export default function P_Mensajes({ navigation }: any) {
  const { isDark } = useTheme();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");

  // Cargar datos al entrar a la pantalla
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem("id_usuario");
          const storedToken = await AsyncStorage.getItem("token");
          
          if (storedUserId && storedToken) {
            const userId = parseInt(storedUserId, 10);
            setUserId(userId);
            setToken(storedToken);
            await loadNotificaciones(userId, storedToken);
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      };
      loadData();
    }, [])
  );

  const loadNotificaciones = async (usuarioId: number, authToken: string) => {
    try {
      setLoading(true);
      console.log("📬 [MENSAJES] Cargando notificaciones para usuario:", usuarioId);

      const url = NOTIFICACION_ROUTES.GET_BY_USER(usuarioId);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log("📦 [MENSAJES] Respuesta:", data);

      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ [MENSAJES] ${data.data.length} notificaciones cargadas`);
        setNotificaciones(data.data);
      } else {
        console.warn("⚠️ [MENSAJES] Respuesta inesperada:", data);
        setNotificaciones([]);
      }
    } catch (error) {
      console.error("❌ [MENSAJES] Error cargando notificaciones:", error);
      Alert.alert("Error", "No se pudieron cargar las notificaciones");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    if (userId && token) {
      setRefreshing(true);
      await loadNotificaciones(userId, token);
    }
  };

  const handleMarcarLeida = async (id_notificacion: number, yaLeida: boolean) => {
    try {
      if (yaLeida) {
        // Si ya está leída, simplemente actualizar la UI
        setNotificaciones((prev) =>
          prev.map((n) =>
            n.id_notificacion === id_notificacion ? { ...n, leido: 0 } : n
          )
        );
        return;
      }

      console.log("📌 [MENSAJES] Marcando notificación como leída:", id_notificacion);

      const url = NOTIFICACION_ROUTES.MARK_READ(id_notificacion);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ [MENSAJES] Notificación marcada como leída");
        // Actualizar estado local
        setNotificaciones((prev) =>
          prev.map((n) =>
            n.id_notificacion === id_notificacion ? { ...n, leido: 1 } : n
          )
        );
      }
    } catch (error) {
      console.error("❌ [MENSAJES] Error marcando notificación:", error);
      Alert.alert("Error", "No se pudo marcar la notificación");
    }
  };

  const handleEliminar = async (id_notificacion: number) => {
    try {
      Alert.alert(
        "Eliminar notificación",
        "¿Estás seguro que deseas eliminar esta notificación?",
        [
          { text: "Cancelar", onPress: () => {} },
          {
            text: "Eliminar",
            onPress: async () => {
              try {
                console.log("🗑️ [MENSAJES] Eliminando notificación:", id_notificacion);

                const url = NOTIFICACION_ROUTES.DELETE(id_notificacion);
                const response = await fetch(url, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                });

                const data = await response.json();

                if (data.success) {
                  console.log("✅ [MENSAJES] Notificación eliminada");
                  setNotificaciones((prev) =>
                    prev.filter((n) => n.id_notificacion !== id_notificacion)
                  );
                  Alert.alert("Éxito", "Notificación eliminada");
                }
              } catch (error) {
                console.error("❌ [MENSAJES] Error eliminando:", error);
                Alert.alert("Error", "No se pudo eliminar la notificación");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMarcarTodasLeidas = async () => {
    try {
      if (!userId || !token) return;

      console.log("📌 [MENSAJES] Marcando todas como leídas");

      const url = NOTIFICACION_ROUTES.MARK_ALL_READ(userId);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log("✅ [MENSAJES] Todas marcadas como leídas");
        setNotificaciones((prev) =>
          prev.map((n) => ({ ...n, leido: 1 }))
        );
      }
    } catch (error) {
      console.error("❌ [MENSAJES] Error:", error);
      Alert.alert("Error", "No se pudo completar la acción");
    }
  };

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const noLeidas = notificaciones.filter((n) => n.leido === 0).length;

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        {noLeidas > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{noLeidas}</Text>
          </View>
        )}
      </View>

      {/* Botón marcar todas como leídas */}
      {noLeidas > 0 && (
        <View style={[styles.actionBar, isDark && styles.actionBarDark]}>
          <TouchableOpacity
            onPress={handleMarcarTodasLeidas}
            style={styles.markAllBtn}
          >
            <CheckCheck size={18} color="#ffffff" />
            <Text style={styles.markAllBtnText}>Marcar todas como leídas</Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && !refreshing ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#048ED4" />
        </View>
      ) : (
        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {notificaciones.length > 0 ? (
            notificaciones.map((notif) => (
              <View
                key={notif.id_notificacion}
                style={[
                  styles.card,
                  isDark && styles.blackCard,
                  notif.leido === 0 && styles.cardNoLeido,
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.titulo, isDark && styles.blackTitulo]}
                      numberOfLines={1}
                    >
                      {notif.asunto}
                    </Text>
                    <Text
                      style={[styles.mensaje, isDark && styles.blackMensaje]}
                      numberOfLines={2}
                    >
                      {notif.contenido}
                    </Text>
                  </View>
                  {notif.leido === 0 && (
                    <View style={styles.unreadIndicator} />
                  )}
                </View>

                <View style={styles.cardFooter}>
                  <Text style={[styles.fecha, isDark && styles.blackFecha]}>
                    {formatFecha(notif.fecha_envio)}
                  </Text>

                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      onPress={() =>
                        handleMarcarLeida(notif.id_notificacion, notif.leido === 1)
                      }
                      style={[
                        styles.actionBtn,
                        notif.leido === 1 && styles.actionBtnActive,
                      ]}
                    >
                      {notif.leido === 1 ? (
                        <Check size={16} color="#048ED4" />
                      ) : (
                        <Check size={16} color="#999" />
                      )}
                      <Text
                        style={[
                          styles.actionBtnText,
                          notif.leido === 1 && styles.actionBtnTextActive,
                        ]}
                      >
                        {notif.leido === 1 ? "Leída" : "Marcar"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleEliminar(notif.id_notificacion)}
                      style={[styles.actionBtn, styles.deleteBtn]}
                    >
                      <Trash2 size={16} color="#FF6B6B" />
                      <Text style={styles.deleteBtnText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text
                style={[styles.emptyText, isDark && styles.emptyTextDark]}
              >
                No tienes notificaciones
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      <P_Menu navigation={navigation} />
    </View>
  );
}

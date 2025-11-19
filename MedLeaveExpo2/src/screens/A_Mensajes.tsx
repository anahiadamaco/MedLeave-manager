import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { ChevronLeft, CheckCircle } from "lucide-react-native";
import { styles } from "../styles/A_Mensajes.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOTIFICACION_ROUTES } from "../config/api";
import { useFocusEffect } from "@react-navigation/native";

interface Notificacion {
  id_notificacion: number;
  asunto: string;
  contenido: string;
  fecha_envio: string;
  leido: number;
}

export default function A_Mensajes({ navigation }: any) {
  const { isDark } = useTheme();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const authToken = await AsyncStorage.getItem("token");
        
        if (user) {
          const userData = JSON.parse(user);
          setUserId(userData.id_usuario);
        }
        
        if (authToken) {
          setToken(authToken);
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      }
    };
    getUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (userId && token) {
        loadNotificaciones();
      }
    }, [userId, token])
  );

  const loadNotificaciones = async () => {
    if (!userId || !token) return;
    
    try {
      setLoading(true);
      const response = await fetch(NOTIFICACION_ROUTES.GET_BY_USER(userId), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setNotificaciones(data.data);
      }
    } catch (error) {
      console.error("Error cargando notificaciones:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNotificaciones();
  };

  const toggleLeida = async (id: number) => {
    if (!token) return;
    
    try {
      const response = await fetch(NOTIFICACION_ROUTES.MARK_READ(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setNotificaciones((prev) =>
          prev.map((n) =>
            n.id_notificacion === id ? { ...n, leido: n.leido ? 0 : 1 } : n
          )
        );
      }
    } catch (error) {
      console.error("Error actualizando notificación:", error);
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

  if (loading) {
    return (
      <View style={[styles.container, isDark && styles.blackContainer]}>
        <View style={[styles.header, isDark && styles.blackHeader]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft size={26} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#048ED4" />
        </View>
        <A_Menu navigation={navigation} />
      </View>
    );
  }

  return (
    <View style={[styles.container, isDark && styles.blackContainer]}>
      <View style={[styles.header, isDark && styles.blackHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#048ED4" />
        }
      >
        {notificaciones.length === 0 ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <Text style={[styles.mensaje, isDark && styles.blackMensaje]}>No hay notificaciones</Text>
          </View>
        ) : (
          notificaciones.map((item) => (
            <View
              key={item.id_notificacion}
              style={[
                styles.card,
                isDark && styles.blackCard,
                item.leido ? styles.cardLeido : styles.cardNoLeido,
              ]}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={[styles.titulo, isDark && styles.blackTitulo]}>{item.asunto}</Text>
                  <Text style={[styles.mensaje, isDark && styles.blackMensaje]}>{item.contenido}</Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <Text style={[styles.fecha, isDark && styles.blackFecha]}>
                    {formatFecha(item.fecha_envio)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleLeida(item.id_notificacion)}
                    style={styles.smallButton}
                  >
                    <CheckCircle size={16} color="#048ED4" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <A_Menu navigation={navigation} />
    </View>
  );
}

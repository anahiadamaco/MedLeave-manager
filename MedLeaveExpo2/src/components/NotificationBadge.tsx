import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { NOTIFICACION_ROUTES } from "../config/api";

interface NotificationBadgeProps {
  size?: number;
  badgeSize?: number;
}

export default function NotificationBadge({ size = 22, badgeSize = 18 }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      let userId = await AsyncStorage.getItem("userId");
      
      // Si no está userId, intenta obtenerlo del objeto user
      if (!userId) {
        const userStr = await AsyncStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          userId = user.id_usuario?.toString();
        }
      }

      if (!token || !userId) {
        console.log("❌ [BADGE] No token o userId");
        return;
      }

      console.log(`🔔 [BADGE] Obteniendo notificaciones para usuario: ${userId}`);

      const response = await fetch(NOTIFICACION_ROUTES.GET_BY_USER(parseInt(userId)), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          // Contar solo las no leídas (leido = 0)
          const unread = data.data.filter((n: any) => n.leido === 0).length;
          setUnreadCount(unread);
          console.log(`📬 [BADGE] ${unread} notificaciones sin leer`);
        }
      } else {
        console.log(`❌ [BADGE] Response status: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ [BADGE] Error cargando notificaciones:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("🔔 [BADGE] Pantalla enfocada, cargando notificaciones...");
      loadUnreadCount();
      
      // Recargar cada 5 segundos mientras la pantalla está enfocada
      const interval = setInterval(loadUnreadCount, 5000);
      return () => clearInterval(interval);
    }, [])
  );

  if (unreadCount === 0) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: "#EF4444",
        width: badgeSize,
        height: badgeSize,
        borderRadius: badgeSize / 2,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#ffffff",
        zIndex: 100,
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontWeight: "900",
          fontSize: badgeSize > 24 ? 13 : 12,
          textAlign: "center",
        }}
      >
        {unreadCount > 99 ? "99+" : unreadCount}
      </Text>
    </View>
  );
}

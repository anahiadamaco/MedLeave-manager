import * as React from "react";
import { View, Text, TouchableOpacity, Switch, ActivityIndicator, ScrollView } from "react-native";
import { ChevronLeft, User as UserIcon } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { styles } from "../styles/A_ProfileUser.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  id_usuario: number;
  nombre: string;
  correo_usuario: string;
  id_rol: number;
}

const ROLES = {
  1: "Profesor",
  2: "Estudiante",
  3: "Funcionario",
  4: "Administrador",
};

const ROLE_COLORS = {
  1: "#FF6B6B", // Profesor - Rojo
  2: "#4ECDC4", // Estudiante - Turquesa
  3: "#FFD93D", // Funcionario - Amarillo
  4: "#6C5CE7", // Administrador - Púrpura
};

export default function A_ProfileUser() {
  const navigation = useNavigation<any>();
  const { isDark, toggleTheme } = useTheme();
  const [user, setUser] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error cargando datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (roleId: number) => {
    return ROLE_COLORS[roleId as keyof typeof ROLE_COLORS] || "#048ED4";
  };

  if (loading || !user) {
    return (
      <View style={[styles.container, isDark && styles.containerDark]}>
        <View style={[styles.header, isDark && styles.headerDark]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi perfil</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#048ED4" />
        </View>
        <A_Menu navigation={navigation} />
      </View>
    );
  }

  const getRoleName = (roleId: number) => ROLES[roleId as keyof typeof ROLES] || "Usuario";
  const roleColor = getRoleColor(user.id_rol);
  const roleName = getRoleName(user.id_rol);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        <View style={styles.avatarContainer}>
          {/* Avatar con color dinámico según rol */}
          <View style={[styles.avatarCircle, isDark && styles.blackAvatarCircle, { backgroundColor: roleColor }]}>
            <UserIcon size={36} color="#ffffff" />
          </View>
          <Text style={[styles.userName, isDark && styles.textDarkPrimary]}>
            {user.nombre}
          </Text>
          <Text style={[styles.userRole, isDark && styles.textDarkSecondary, { color: roleColor }]}>
            {roleName}
          </Text>
        </View>

        {/*Tarjeta de Datos Principales*/}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDarkPrimary]}>
            Datos personales
          </Text>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Nombre:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.nombre}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Correo:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.correo_usuario}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>ID Usuario:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.id_usuario}</Text>
          </View>

          <Text style={[styles.infoText, isDark && styles.textDarkSecondary]}>
            Para editar estos datos, ingrese desde el apartado web.
          </Text>
        </View>

        {/*Tarjeta de Rol y Permisos*/}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDarkPrimary]}>
            Información de rol
          </Text>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Rol:</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: roleColor }} />
              <Text style={[styles.value, isDark && styles.textDarkPrimary]}>
                {roleName}
              </Text>
            </View>
          </View>

          <Text style={[styles.infoText, isDark && styles.textDarkSecondary]}>
            {user.id_rol === 1 && "Tienes acceso como profesor. Puedes calificar trabajos y gestionar tu calendario."}
            {user.id_rol === 2 && "Tienes acceso como estudiante. Puedes subir licencias médicas y ver tu historial."}
            {user.id_rol === 3 && "Tienes acceso como funcionario. Puedes aprobar o rechazar licencias médicas."}
            {user.id_rol === 4 && "Tienes acceso como administrador. Tienes control total del sistema."}
          </Text>
        </View>

        {/*Preferencias*/}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDarkPrimary]}>
            Preferencias
          </Text>

          <View style={styles.rowBetween}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>
              Modo oscuro
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
            />
          </View>
        </View>
      </ScrollView>
      <A_Menu navigation={navigation} />
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { ChevronLeft, User as UserIcon } from "lucide-react-native";
import { styles } from "../styles/P_ProfileUser.styles";
import P_Menu from "../components/P_Menu";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function P_ProfileUser({ navigation }: any) {
  const { isDark, toggleTheme } = useTheme();
  const [correoReal, setCorreoReal] = useState<string>("");

  useEffect(() => {
    AsyncStorage.getItem("correoUsuario").then((value) => {
      if (value) setCorreoReal(value);
    });
  }, []);

  // Datos de ejemplo (puedes luego leer también nombre/rut desde AsyncStorage si quieres)
  const user = {
    nombre: "Juan Castro",
    rut: "12.345.678-9",
    correo: correoReal || "Cargando...",
    carrera: "Ingeniería en Informática",
    rol: "Profesor",
  };

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
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {/* En dado caso de que se use foto */}
          <View style={[styles.avatarCircle, isDark && styles.blackAvatarCircle]}>
            <UserIcon size={36} color="#ffffff" />
          </View>
          <Text style={[styles.userName, isDark && styles.textDarkPrimary]}>
            {user.nombre}
          </Text>
          <Text style={[styles.userRole, isDark && styles.textDarkSecondary]}>
            {user.rol}
          </Text>
        </View>

        {/* Tarjeta datos */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDarkPrimary]}>
            Datos del usuario
          </Text>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>
              RUT:
            </Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>
              {user.rut}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>
              Correo:
            </Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>
              {user.correo}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>
              Carrera:
            </Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>
              {user.carrera}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>
              Rol:
            </Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>
              {user.rol}
            </Text>
          </View>

          <Text style={[styles.infoText, isDark && styles.textDarkSecondary]}>
            Para editar estos datos, ingrese desde el apartado web.
          </Text>
        </View>

        {/* Tarjeta preferencias */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDarkPrimary]}>
            Preferencias
          </Text>

          <View style={styles.rowBetween}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>
              Modo oscuro
            </Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>
      </View>

      {/* Menú profesor */}
      <P_Menu navigation={navigation} />
    </View>
  );
}

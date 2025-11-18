import * as React from "react";
import { View, Text, TouchableOpacity, Switch, Image, Linking } from "react-native";
import { ChevronLeft, User as UserIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/A_ProfileUser.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";

export default function A_ProfileUser() {
  const navigation = useNavigation<any>();
  const { isDark, toggleTheme } = useTheme();  

  // Datos de ejemplo
  const user = {
    nombre: "Juan Castro",
    rut: "12.345.678-9",
    correo: "juan.castro@ejemplo.cl",
    carrera: "Ingeniería en Informática",
    rol: "Estudiante",
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
          {/* En daDO CASO de que importemos foto usar foto*/}
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

        {/*Tarjeta*/}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <Text style={[styles.cardTitle, isDark && styles.textDarkPrimary]}>
            Datos del usuario
          </Text>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>RUT:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.rut}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Correo:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.correo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Carrera:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.carrera}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, isDark && styles.textDarkSecondary]}>Rol:</Text>
            <Text style={[styles.value, isDark && styles.textDarkPrimary]}>{user.rol}</Text>
          </View>

          <Text style={[styles.infoText, isDark && styles.textDarkSecondary]}>
            Para editar estos datos, ingrese desde el apartado web.
          </Text>
        </View>

        {/*Modo Oscuro*/}
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
      </View>
      <A_Menu navigation={navigation} />
    </View>
  );
}

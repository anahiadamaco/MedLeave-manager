import * as React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { ChevronLeft, User as UserIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/A_ProfileUser.styles";
import A_Menu from "../components/A_Menu";
import { useTheme } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function A_ProfileUser() {
  const navigation = useNavigation<any>();
  const { isDark, toggleTheme } = useTheme();
  const [correo, setCorreo] = React.useState("Cargando...");

  React.useEffect(() => {
    AsyncStorage.getItem("user").then((data) => {
      if (data) {
        try {
          const userData = JSON.parse(data);
          setCorreo(userData.correo || userData.email || "No disponible");
        } catch {
          setCorreo("No disponible");
        }
      }
    });
  }, []);

  const user = {
    nombre: "Juan Castro",
    rut: "12.345.678-9",
    correo,
    carrera: "Ingeniería en Informática",
    rol: "Estudiante",
  };

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

      <View style={styles.content}>
        <View style={[styles.userBox, isDark && styles.userBoxDark]}>
          <View style={[styles.avatarCircle, isDark && styles.blackAvatarCircle]}>
            <UserIcon size={36} color="#ffffff" />
          </View>
          <Text style={[styles.userName, isDark && styles.blackUserName]}>{user.nombre}</Text>
          <Text style={[styles.userRole, isDark && styles.blackUserRole]}>{user.rol}</Text>
        </View>

        <View style={[styles.centerDataBox, isDark && styles.darkBox]}>
          <Text style={[styles.centerDataText, isDark && styles.blackCenterDataText]}>RUT: {user.rut}</Text>
          <Text style={[styles.centerDataText, isDark && styles.blackCenterDataText]}>Correo: {user.correo}</Text>
          <Text style={[styles.centerDataText, isDark && styles.blackCenterDataText]}>Carrera: {user.carrera}</Text>
          <Text style={[styles.centerDataText, isDark && styles.blackCenterDataText]}>Rol: {user.rol}</Text>
        </View>

        <View style={[styles.colorCard, isDark && styles.darkBox]}>
          <Text style={styles.cardTitle}>Preferencias</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Modo oscuro</Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>
        </View>
      </View>
      <A_Menu navigation={navigation} />
    </View>
  );
}
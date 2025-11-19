import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Bell, User } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import A_Menu from "../components/A_Menu";
import { styles } from "../styles/A_Home.styles";
import { useTheme } from "../components/ThemeContext";

export default function A_Home({ navigation }: any) {
  const { isDark } = useTheme();
  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("isLoggedIn");
          navigation.navigate("A_Login");
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? "#020617" : "#ffffff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={[styles.navbar, isDark && styles.blackNavbar]}>
          <View style={styles.navbarIcons}>
            <TouchableOpacity onPress={() => navigation.navigate("A_Mensajes")}>
              <Bell color="white" size={22}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <User color="white" size={22} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerBg}>
          <Image
            source={require("../assets/licencia_fondo.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <LinearGradient
            //colors={["#048ED4", "rgba(4,142,212,0)"]}
            colors={[isDark ? "rgba(2,6,23,0.8)" : "rgba(4,142,212,0.8)", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientOverlay}
          />
          <View style={styles.headerContent}>
            <Text style={[styles.title, isDark && styles.blackTitle]}>Bienvenido{"\n"}a</Text>
            <Text style={[styles.title2, isDark && styles.blackTitle2]}>MedLeave Manager</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={[styles.reminder, isDark && styles.blackReminder]}>
            <Text style={styles.reminderTitle}>RECUERDA</Text>
            <Text style={styles.reminderText}>
              Tienes un plazo de 48 horas para poder subir tu licencia médica una vez emitida.
            </Text>
          </View>
          <Text style={[styles.infoText, isDark && styles.blackInfoText]}>
            Accede a la normativa vigente sobre licencias médicas, incluyendo información sobre plazos de entrega, documentación requerida y criterios de validación.
          </Text>
          <TouchableOpacity
            style={[styles.regButton, isDark && styles.blackRegButton]}
            onPress={() => navigation.navigate("A_FyQ")}
          >
            <Text style={[styles.regButtonText, isDark && styles.blackRegButtonText]}>Ver{"\n"}reglamentos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <A_Menu navigation={navigation} />
    </View>
  );
}

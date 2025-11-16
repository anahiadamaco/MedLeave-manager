import React from "react";
import {View, Text, TouchableOpacity, ScrollView, Image, Alert} from "react-native";
import { Bell, User, MoreHorizontal } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import A_Menu from "../components/A_Menu";
import { styles } from "../styles/A_Home.styles";

export default function A_Home({ navigation }: any) {
  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("isLoggedIn");
          navigation.navigate("A_Login");
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* NAVBAR */}
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>MED LEAVE MANAGER</Text>
          <View style={styles.navbarIcons}>
            <TouchableOpacity>
              <Bell color="white" size={22} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <User color="white" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Fondo decorativo */}
        <View style={styles.decorativeBg}>
          <Image
            source={require("../assets/licencia_fondo.jpg")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
        </View>

        {/* Contenido */}
        <View style={styles.contentContainer}>
          {/* Botón principal */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => navigation.navigate("A_SubirLicencia")}
          >
            <Text style={styles.uploadButtonText}>Subir licencia</Text>
          </TouchableOpacity>

          {/* Recordatorio */}
          <View style={styles.reminder}>
            <Text style={styles.reminderTitle}>RECUERDA</Text>
            <Text style={styles.reminderText}>
              Tienes un plazo de 48 horas para poder subir tu licencia médica
              una vez emitida.
            </Text>
          </View>

          {/* Navegación */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("A_HistorialRamo")}
            >
              <Text style={styles.navButtonText}>Estado de mis licencias</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("A_Historial")}
            >
              <Text style={styles.navButtonText}>Historial</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("A_FyQ")}
            >
              <Text style={styles.navButtonText}>Preguntas frecuentes</Text>
            </TouchableOpacity>
          </View>

          {/* Información */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Accede a la normativa vigente sobre licencias médicas, incluyendo
              información sobre plazos de entrega, documentación requerida y
              criterios de validación.
            </Text>
          </View>
          
          {/* Botón reglamentos */}
          <TouchableOpacity
            style={styles.regulationsButton}
            onPress={() => navigation.navigate("A_FyQ")}
          >
            <Text style={styles.regulationsButtonText}>Ver reglamentos</Text>
            <MoreHorizontal color="#1E3A8A" size={22} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    
      <A_Menu navigation={navigation} />
    </View>
  );
}
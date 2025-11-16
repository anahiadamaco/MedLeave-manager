import React from "react";
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { styles } from "../styles/Admin_Home.styles";
import Footer from "../components/Footer";

export default function Admin_Home({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <ChevronLeft color="#0089E0" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>⚙️ Bienvenido Admin</Text>
          <Text style={styles.infoText}>
            Aquí podrás administrar el sistema, usuarios y configuraciones.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gestionar Usuarios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reportes Generales</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Configuración</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
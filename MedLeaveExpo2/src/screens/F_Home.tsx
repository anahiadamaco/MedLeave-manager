import React from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { styles } from "../styles/F_Home.styles";
import Footer from "../components/Footer";

export default function F_Home({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <ChevronLeft color="#0089E0" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Funcionario</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>👔 Bienvenido Funcionario</Text>
          <Text style={styles.infoText}>
            Aquí podrás gestionar las solicitudes de licencias médicas de los estudiantes.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Revisar Solicitudes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reportes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}
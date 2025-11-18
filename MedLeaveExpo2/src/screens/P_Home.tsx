import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Mail, FileText, HelpCircle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/P_Home.styles";
import P_Menu from "../components/P_Menu";

export default function P_Home() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: '#E8F3FA' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.hamburger}>☰</Text>
          <Text style={styles.headerTitle}>Bienvenido, Profesor</Text>
        </View>

        {/* Tarjeta 1 - Mensajes */}
        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <Mail color="#0096D6" size={36} />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Mensajes</Text>
            <Text style={styles.cardText}>
              Aquí puede revisar los mensajes más recientes.
            </Text>
          </View>

          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta 2 - Historial */}
        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <FileText color="#0096D6" size={36} />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Historial</Text>
            <Text style={styles.cardText}>
              Consulta el historial de cada uno de tus ramos.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.cardButton} 
            onPress={() => navigation.navigate("P_Historial")}
          >
            <Text style={styles.cardButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta 3 - Preguntas frecuentes */}
        <View style={styles.card}>
          <View style={styles.cardIconContainer}>
            <HelpCircle color="#0096D6" size={36} />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Preguntas frecuentes</Text>
            <Text style={styles.cardText}>
              Encuentra respuestas a las dudas de uso de la plataforma.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.cardButton} 
            onPress={() => navigation.navigate("P_FyQ")}
          > 
            <Text style={styles.cardButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <P_Menu navigation={navigation} />
    </View>
  );
}
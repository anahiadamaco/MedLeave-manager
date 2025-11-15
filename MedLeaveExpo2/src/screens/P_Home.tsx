import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Mail, FileText, HelpCircle } from "lucide-react-native";
import P_Menu from "../components/P_Menu";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F3FA',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#0096D6',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  hamburger: {
    color: '#ffffff',
    fontSize: 24,
    marginRight: 12,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCEAF7',
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconContainer: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: '#facc15',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#ffffff',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0B3178',
  },
  cardText: {
    fontSize: 12,
    color: '#0B3178',
  },
  cardButton: {
    backgroundColor: '#0096D6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  cardButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

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

          <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate("P_Historial")}>
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

          <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate("P_FyQ")}> 
            <Text style={styles.cardButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <P_Menu navigation={navigation} />
    </View>
  );
}

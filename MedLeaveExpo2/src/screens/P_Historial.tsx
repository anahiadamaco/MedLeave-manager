import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f1fb',
  },
  header: {
    backgroundColor: '#1c75bc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    fontSize: 12,
    color: '#ffffff',
  },
  titleContainer: {
    backgroundColor: '#1c75bc',
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  courseCard: {
    backgroundColor: '#c9e0f7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#a8c7e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  courseCode: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000000',
  },
});

export default function P_Historial() {
  const navigation = useNavigation();

  const cursos = [
    { id: 1, codigo: 'INFO 1111', nombre: 'Teoría de sistemas' },
    { id: 2, codigo: 'INFO 2222', nombre: 'Programación avanzada' },
    { id: 3, codigo: 'INFO 3333', nombre: 'Bases de datos' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MedLeave Manager</Text>
        </View>
        <Text style={styles.headerRight}>Cuenta: Juan Pérez</Text>
      </View>

      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Historial</Text>
      </View>

      {/* Contenido principal */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cursos.map((curso) => (
          <TouchableOpacity
            key={curso.id}
            style={styles.courseCard}
            onPress={() => navigation.navigate('P_HistorialRamo', { curso })}
          >
            <View style={styles.courseInfo}>
              <Text style={styles.courseName}>{curso.codigo}</Text>
              <Text style={styles.courseCode}>{curso.nombre}</Text>
            </View>
            <ChevronRight color="#1c75bc" size={20} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Footer />
    </View>
  );
}
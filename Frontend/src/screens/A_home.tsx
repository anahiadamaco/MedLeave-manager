import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import NavbarAlumno from "../components/A_Navbar";
import FooterAlumno from "../components/Footer";

export default function HomeAlumno() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Navbar */}
      <NavbarAlumno />

      {/* Boton principal */}
      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.mainButtonText}>Subir licencia</Text>
      </TouchableOpacity>

      {/* Recordatorio */}
      <View style={styles.reminderBox}>
        <Text style={styles.reminderTitle}>RECUERDA</Text>
        <Text style={styles.reminderText}>
          Tienes un plazo de 48 horas para poder subir tu licencia médica una vez emitida.
        </Text>
      </View>

      {/* Navegacion */}
      <View style={styles.navSection}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Estado de mis licencias</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Preguntas frecuentes</Text>
        </TouchableOpacity>
      </View>

      {/* Informacion */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Accede a la normativa vigente sobre licencias médicas, incluyendo información sobre plazos de entrega, documentación requerida y criterios de validación.
        </Text>
      </View>
      
      {/* Boton reglamentos */}
      <TouchableOpacity style={styles.regButton}>
        <Text style={styles.regButtonText}>Ver reglamentos</Text>
      </TouchableOpacity>

      {/* Footer */}
      <FooterAlumno />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 22,
  },
  mainButton: {
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 20,
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  reminderBox: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
  },
  reminderTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 15,
    textAlign: 'center',
  },
  reminderText: {
    fontSize: 13,
    textAlign: 'center',
  },
  navSection: {
    marginBottom: 24,
  },
  navButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    textAlign: 'justify',
  },
  regButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 40,
  },
  regButtonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

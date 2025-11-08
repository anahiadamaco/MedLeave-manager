import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { Bell, User, MoreHorizontal } from "lucide-react-native";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#004AAD',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navbarTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navbarIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  decorativeBg: {
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: 128,
    opacity: 0.6,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  uploadButton: {
    backgroundColor: '#0078D4',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#facc15',
  },
  uploadButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  reminder: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  reminderTitle: {
    color: '#DC2626',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  reminderText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  navigationContainer: {
    marginTop: 24,
    gap: 12,
  },
  navButton: {
    backgroundColor: '#004AAD',
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#facc15',
  },
  navButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  infoText: {
    textAlign: 'justify',
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
  },
  regulationsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  regulationsButtonText: {
    textAlign: 'center',
    color: '#1E3A8A',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default function A_Home() {
  return (
    <ScrollView style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>MED LEAVE MANAGER</Text>
        <View style={styles.navbarIcons}>
          <TouchableOpacity>
            <Bell color="white" size={22} />
          </TouchableOpacity>
          <TouchableOpacity>
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
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Subir licencia
          </Text>
        </TouchableOpacity>

        {/* Recordatorio */}
        <View style={styles.reminder}>
          <Text style={styles.reminderTitle}>
            RECUERDA
          </Text>
          <Text style={styles.reminderText}>
            Tienes un plazo de 48 horas para poder subir tu licencia médica una
            vez emitida.
          </Text>
        </View>

        {/* Navegación */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>
              Estado de mis licencias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>
              Historial
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>
              Preguntas frecuentes
            </Text>
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
        <TouchableOpacity style={styles.regulationsButton}>
          <Text style={styles.regulationsButtonText}>
            Ver reglamentos
          </Text>
          <MoreHorizontal color="#1E3A8A" size={22} />
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}

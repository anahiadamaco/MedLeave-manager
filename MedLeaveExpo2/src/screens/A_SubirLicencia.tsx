import React from "react";
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet} from "react-native";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF5FF',
  },
  headerImage: {
    width: '100%',
    height: 130,
  },
  titleContainer: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    textAlign: 'center',
    color: '#4A4A4A',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#333333',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ADD8F1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  attachButton: {
    backgroundColor: '#C7E5FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  attachButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  attachIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default function A_SubirLicencia() {
  return (
    <View style={styles.container}>
      {/* Imagen de encabezado */}
      <Image
        // source={require("")}
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Título superpuesto */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Subir licencia médica
        </Text>
      </View>

      {/* Contenido principal */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          En esta sección podrás ingresar tu licencia médica de forma digital,
          adjuntar los documentos necesarios y enviarlos para su revisión rápida
          y segura.
        </Text>

        {/* Campo: Nombres */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Nombres:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Campo: Apellidos */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Apellidos:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Campo: Fecha de emisión */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Fecha de emisión:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Campo: Inicio licencia */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Inicio licencia:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Campo: Término licencia */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Término licencia:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Campo: Cursos a justificar */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Cursos a justificar:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Campo: Sección */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Sección:</Text>
          <TextInput style={styles.input} />
        </View>

        {/* Botón de adjuntar */}
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachButtonText}>Adjuntar licencia médica</Text>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>

        {/* Botón enviar */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
        <Footer />
      </ScrollView>
    </View>
  );
}

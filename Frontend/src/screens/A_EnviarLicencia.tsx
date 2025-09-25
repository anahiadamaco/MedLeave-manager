import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SubirLicencia() {
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    fechaEmision: '',
    inicioLicencia: '',
    terminoLicencia: '',
    cursos: '',
    seccion: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <Text style={styles.title}>Subir licencia médica</Text>

      {/*Descripción*/}
      <Text style={styles.description}>
        En esta sección podrás ingresar tu licencia médica de forma digital,
        adjuntar los documentos necesarios y enviarlos para su revisión rápida
        y segura.
      </Text>

      {/*Formulario*/}
      <View style={styles.form}>
        <Text>Nombres:</Text>
        <TextInput
          style={styles.input}
          value={form.nombres}
          onChangeText={(text) => handleChange('nombres', text)}
        />

        <Text>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={form.apellidos}
          onChangeText={(text) => handleChange('apellidos', text)}
        />

        <Text>Fecha de emision:</Text>
        <TextInput
          style={styles.input}
          value={form.fechaEmision}
          onChangeText={(text) => handleChange('fechaEmision', text)}
        />

        <Text>Inicio licencia:</Text>
        <TextInput
          style={styles.input}
          value={form.inicioLicencia}
          onChangeText={(text) => handleChange('inicioLicencia', text)}
        />

        <Text>Término licencia:</Text>
        <TextInput
          style={styles.input}
          value={form.terminoLicencia}
          onChangeText={(text) => handleChange('terminoLicencia', text)}
        />

        <Text>Cursos a justificar:</Text>
        <TextInput
          style={styles.input}
          value={form.cursos}
          onChangeText={(text) => handleChange('cursos', text)}
        />

        <Text>Sección:</Text>
        <TextInput
          style={styles.input}
          value={form.seccion}
          onChangeText={(text) => handleChange('seccion', text)}
        />

        {/*boton adjuntar archivo*/}
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachText}>Adjuntar licencia medica</Text>
        </TouchableOpacity>

        {/*boton enviar*/}
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  attachButton: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  attachText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sendButton: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
  },
  sendText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
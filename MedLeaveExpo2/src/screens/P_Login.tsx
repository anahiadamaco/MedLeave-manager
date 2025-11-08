import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2FF',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#0089E0',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    tintColor: '#0089E0',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#FFB700',
    borderRadius: 12,
    width: '85%',
    marginTop: 32,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  userIconBg: {
    backgroundColor: '#E6F2FF',
    borderRadius: 999,
    padding: 10,
    marginBottom: 12,
  },
  userIcon: {
    width: 40,
    height: 40,
    tintColor: '#0089E0',
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    color: '#000000',
    marginTop: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#B9DCFA',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginTop: 4,
    color: '#000000',
  },
  forgotPassword: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#444444',
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0089E0',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFB700',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function LoginScreen() {
  const [rut, setRut] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenido</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/Logo_normal.png")}
            style={styles.logo}
          />
        </View>
      </View>

      {/* FORMULARIO */}
      <View style={styles.formContainer}>
        <View style={styles.userIconBg}>
          <Image
            source={require("../assets/user.png")}
            style={styles.userIcon}
          />
        </View>

        <Text style={styles.label}>Rut:</Text>
        <TextInput
          style={styles.input}
          value={rut}
          onChangeText={setRut}
          placeholder="Ej: 12.345.678-9"
          placeholderTextColor="#9EC9E8"
        />

        <Text style={styles.label}>Correo:</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="#9EC9E8"
        />

        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="********"
          placeholderTextColor="#9EC9E8"
        />

        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}
